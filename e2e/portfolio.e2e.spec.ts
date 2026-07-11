import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/casos/adastra',
  '/casos/plataforma-contenido',
  '/casos/gateway-datos',
  '/casos/hostlyc',
  '/demos/adastra',
  '/demos/landing',
  '/demos/cms',
  '/demos/hostlyc',
] as const;

test('all public routes fit the viewport and pass critical accessibility checks', async ({ page }) => {
  for (const route of ROUTES) {
    const response = await page.goto(route, { waitUntil: 'networkidle' });
    expect(response?.ok(), `${route} should respond successfully`).toBe(true);
    await expect(page.locator('main').first()).toBeVisible();

    const dimensions = await page.evaluate(() => {
      const contentWidth = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
      );
      return { viewport: window.innerWidth, content: contentWidth };
    });
    expect(dimensions.content, `${route} should not overflow horizontally`).toBeLessThanOrEqual(
      dimensions.viewport,
    );

    const results = await new AxeBuilder({ page }).analyze();
    const blockers = results.violations.filter(({ impact }) =>
      impact === 'critical' || impact === 'serious',
    );
    expect(blockers, `${route} has serious accessibility violations`).toEqual([]);
  }
});

test('home keeps the selected work close to the first viewport', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const layout = await page.evaluate(() => {
    return {
      projectsTop: (document.querySelector('#projects') as HTMLElement).offsetTop,
      scrollHeight: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.projectsTop).toBeLessThanOrEqual(layout.viewportHeight * 2);
  const maximumScreens = layout.viewportHeight <= 800 ? 7.5 : 7.25;
  expect(layout.scrollHeight).toBeLessThanOrEqual(layout.viewportHeight * maximumScreens);
});

test('demos expose their fictional-data notice and guided workflow', async ({ page }) => {
  for (const route of ROUTES.filter((path) => path.startsWith('/demos/'))) {
    await page.goto(route);
    await expect(page.getByText('DEMOSTRACIÓN CON DATOS FICTICIOS')).toBeVisible();
    await expect(page.getByText('Recorrido sugerido')).toBeVisible();
  }
});

test('mobile demo previews scroll inside the simulated device', async ({ page }) => {
  for (const route of ROUTES.filter((path) => path.startsWith('/demos/'))) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Móvil', exact: true }).click();

    await page.locator('.demo-window').hover();
    const pageYBefore = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 150);

    const preview = await page.locator('.demo-window').evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        clientHeight: element.clientHeight,
        overflowY: styles.overflowY,
        scrollTop: element.scrollTop,
        scrollHeight: element.scrollHeight,
      };
    });
    const pageYAfter = await page.evaluate(() => window.scrollY);

    expect(['auto', 'scroll']).toContain(preview.overflowY);
    expect(Math.abs(pageYAfter - pageYBefore)).toBeLessThanOrEqual(1);
    if (preview.scrollHeight > preview.clientHeight) {
      expect(preview.scrollTop).toBeGreaterThan(0);
    }
  }
});

test('mobile demo menus overlay content without pushing it down', async ({ page }) => {
  for (const route of ['/demos/adastra', '/demos/cms'] as const) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Móvil', exact: true }).click();

    const contentSelector = route.endsWith('adastra') ? '.ops-content' : '.cms-workspace > header';
    const before = await page.locator(contentSelector).boundingBox();

    await page.getByRole('button', { name: route.endsWith('adastra') ? 'Abrir menú de la aplicación' : /Módulos/ }).first().click();
    const after = await page.locator(contentSelector).boundingBox();

    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    expect(Math.abs((after?.y ?? 0) - (before?.y ?? 0))).toBeLessThan(1);
    await expect(page.locator(route.endsWith('adastra') ? '.mobile-nav-panel' : '.cms-mobile-menu')).toBeVisible();
  }
});

test('mobile architecture keeps all content in compact horizontal tracks', async ({ page }) => {
  test.skip((page.viewportSize()?.width ?? 0) > 760, 'Mobile-only architecture layout');
  await page.goto('/casos/gateway-datos#arquitectura', { waitUntil: 'networkidle' });

  const architecture = await page.locator('.architecture-section').evaluate((section) => {
    const nodes = section.querySelector<HTMLElement>('.architecture-nodes');
    const contracts = section.querySelector<HTMLElement>('.architecture-edges tbody');
    return {
      height: section.clientHeight,
      nodesOverflow: (nodes?.scrollWidth ?? 0) > (nodes?.clientWidth ?? 0),
      contractsOverflow: (contracts?.scrollWidth ?? 0) > (contracts?.clientWidth ?? 0),
    };
  });

  expect(architecture.height).toBeLessThan(800);
  expect(architecture.nodesOverflow).toBe(true);
  expect(architecture.contractsOverflow).toBe(true);
});
