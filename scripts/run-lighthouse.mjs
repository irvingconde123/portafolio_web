import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(root, 'lighthouserc.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8')).ci;
const collect = config.collect;
const outputDir = path.resolve(root, config.upload.outputDir);
const staticDir = path.resolve(root, collect.staticDistDir);
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

function resolveRequest(requestUrl) {
  const url = new URL(requestUrl, 'http://localhost');
  const decodedPath = decodeURIComponent(url.pathname);
  const safePath = path
    .normalize(decodedPath)
    .replace(/^(\.\.[/\\])+/, '')
    .replace(/^[/\\]+/, '');
  const directPath = path.join(staticDir, safePath);

  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    return directPath;
  }

  const indexPath = path.join(directPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  return path.join(staticDir, 'index.html');
}

function startStaticServer() {
  const server = http.createServer((request, response) => {
    const filePath = resolveRequest(request.url ?? '/');
    const extension = path.extname(filePath);
    response.setHeader('Content-Type', mimeTypes.get(extension) ?? 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('Vary', 'Accept-Encoding');

    const acceptsGzip = request.headers['accept-encoding']?.includes('gzip');
    const canCompress = ['.css', '.html', '.js', '.json', '.svg', '.txt'].includes(extension);
    const stream = fs.createReadStream(filePath);

    if (acceptsGzip && canCompress) {
      response.setHeader('Content-Encoding', 'gzip');
      stream.pipe(zlib.createGzip()).pipe(response);
      return;
    }

    stream.pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') throw new Error('No se pudo iniciar el servidor Lighthouse.');
      resolve({ server, port: address.port });
    });
  });
}

function assertionValue(lhr, auditId) {
  if (auditId.startsWith('categories:')) {
    const category = auditId.split(':')[1];
    return lhr.categories[category]?.score;
  }

  return lhr.audits[auditId]?.numericValue;
}

function checkAssertions(lhr, assertions) {
  const failures = [];

  for (const [auditId, [level, options]] of Object.entries(assertions)) {
    const value = assertionValue(lhr, auditId);
    if (value === undefined || value === null) continue;

    if ('minScore' in options && value < options.minScore) {
      failures.push(`${auditId}: ${value} < ${options.minScore} (${level})`);
    }

    if ('maxNumericValue' in options && value > options.maxNumericValue) {
      failures.push(`${auditId}: ${Math.round(value)} > ${options.maxNumericValue} (${level})`);
    }
  }

  return failures;
}

function writeReports(lhr, report, route) {
  const safeRoute = route === '/' ? 'home' : route.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.writeFileSync(path.join(outputDir, `${safeRoute}-${timestamp}.report.json`), report[0]);
  fs.writeFileSync(path.join(outputDir, `${safeRoute}-${timestamp}.report.html`), report[1]);
  return {
    route,
    performance: lhr.categories.performance.score,
    accessibility: lhr.categories.accessibility.score,
    bestPractices: lhr.categories['best-practices'].score,
    seo: lhr.categories.seo.score,
    lcp: lhr.audits['largest-contentful-paint'].numericValue,
    cls: lhr.audits['cumulative-layout-shift'].numericValue,
  };
}

async function main() {
  if (!fs.existsSync(staticDir)) {
    throw new Error(`No existe staticDistDir: ${staticDir}. Ejecuta build:qa antes.`);
  }

  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(outputDir, { recursive: true });

  const { server, port } = await startStaticServer();
  const chrome = await chromeLauncher.launch({
    chromePath: process.env.CHROME_PATH || edgePath,
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check'],
  });

  const summaries = [];
  const failures = [];

  try {
    for (const route of collect.url) {
      const url = `http://127.0.0.1:${port}${route}`;
      const runnerResult = await lighthouse(url, {
        port: chrome.port,
        output: ['json', 'html'],
        logLevel: 'error',
        formFactor: collect.settings.formFactor,
        screenEmulation: collect.settings.screenEmulation,
      });

      if (!runnerResult) throw new Error(`Lighthouse no devolvió resultado para ${route}.`);

      summaries.push(writeReports(runnerResult.lhr, runnerResult.report, route));
      failures.push(...checkAssertions(runnerResult.lhr, config.assert.assertions).map((failure) => `${route} ${failure}`));
    }
  } finally {
    server.close();
    try {
      await chrome.kill();
    } catch (error) {
      if (error?.code !== 'EPERM') throw error;
      console.warn(`Lighthouse terminó, pero Windows bloqueó la limpieza temporal: ${error.message}`);
    }
  }

  fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(summaries, null, 2));
  console.table(summaries.map((item) => ({
    route: item.route,
    perf: item.performance,
    a11y: item.accessibility,
    bp: item.bestPractices,
    seo: item.seo,
    lcp: Math.round(item.lcp),
    cls: item.cls,
  })));

  if (failures.length > 0) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
