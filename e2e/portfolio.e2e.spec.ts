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
