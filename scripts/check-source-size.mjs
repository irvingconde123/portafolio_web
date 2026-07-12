import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const maximumLinesByExtension = new Map([
  ['.ts', 300],
  ['.html', 650],
  ['.scss', 1500],
]);
const allowedExtensions = new Set(['.ts', '.html', '.scss']);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  }));
  return nested.flat();
}

const files = (await collectFiles(root)).filter((file) => allowedExtensions.has(extname(file)));
const violations = [];

for (const file of files) {
  const lines = (await readFile(file, 'utf8')).split(/\r?\n/u).length;
  const maximumLines = maximumLinesByExtension.get(extname(file)) ?? 300;
  if (lines > maximumLines) {
    violations.push(`${relative(root, file)}: ${lines}/${maximumLines} líneas`);
  }
}

if (violations.length) {
  console.error('Archivos por encima del límite configurado:');
  console.error(violations.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Norma de tamaño aprobada: ${files.length} archivos.`);
}
