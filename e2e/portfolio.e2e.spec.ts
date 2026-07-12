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

test('all public routes fit the viewport and pass critical accessibility checks', async ({
  page,
}) => {
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
    expect(
      dimensions.content,
      `${route} should not overflow horizontally`,
    ).toBeLessThanOrEqual(dimensions.viewport);

    const results = await new AxeBuilder({ page }).analyze();
    const blockers = results.violations.filter(
      ({ impact }) => impact === 'critical' || impact === 'serious',
    );
    expect(blockers, `${route} has serious accessibility violations`).toEqual(
      [],
    );
  }
});

test('home keeps the selected work close to the first viewport', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  const layout = await page.evaluate(() => {
    return {
      projectsTop: (document.querySelector('#projects') as HTMLElement)
        .offsetTop,
      scrollHeight: Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      ),
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.projectsTop).toBeLessThanOrEqual(layout.viewportHeight * 2);
  const maximumScreens = layout.viewportHeight <= 800 ? 7.5 : 7.25;
  expect(layout.scrollHeight).toBeLessThanOrEqual(
    layout.viewportHeight * maximumScreens,
  );
});

test('demos expose their fictional-data notice and guided workflow', async ({
  page,
}) => {
  for (const route of ROUTES.filter((path) => path.startsWith('/demos/'))) {
    await page.goto(route);
    await expect(
      page.getByText('DEMOSTRACIÓN CON DATOS FICTICIOS'),
    ).toBeVisible();
    await expect(page.getByText('Recorrido sugerido')).toBeVisible();
  }
});

test('mobile demo previews scroll inside the simulated device', async ({
  page,
}) => {
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

test('mobile demo menus overlay content without pushing it down', async ({
  page,
}) => {
  for (const route of [
    '/demos/adastra',
    '/demos/cms',
    '/demos/landing',
    '/demos/hostlyc',
  ] as const) {
    await page.goto(route, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Móvil', exact: true }).click();

    const preview = page.locator('.demo-window');
    await preview.evaluate((element) =>
      element.scrollTo({ top: element.scrollHeight }),
    );

    const contentSelector = route.endsWith('adastra')
      ? '.ops-content'
      : route.endsWith('cms')
        ? '.cms-workspace > header'
        : route.endsWith('landing')
          ? '.laboratory-hero'
          : '.hostlyc-hero';
    const menuButton = page
      .getByRole('button', {
        name: route.endsWith('adastra')
          ? 'Abrir menú de la aplicación'
          : route.endsWith('cms')
            ? /Módulos/
            : /Menú/,
      })
      .first();
    const before = await page
      .locator(contentSelector)
      .evaluate((element) => (element as HTMLElement).offsetTop);

    await menuButton.click();
    const after = await page
      .locator(contentSelector)
      .evaluate((element) => (element as HTMLElement).offsetTop);

    expect(after).toBe(before);
    const menu = page.locator(
      route.endsWith('adastra')
        ? '.mobile-nav-panel'
        : route.endsWith('cms')
          ? '.cms-mobile-menu'
          : '.landing-nav-links.open',
    );
    await expect(menu).toBeVisible();

    const [previewBox, menuBox] = await Promise.all([
      preview.boundingBox(),
      menu.boundingBox(),
    ]);
    expect(menuBox?.y ?? 0).toBeGreaterThanOrEqual(previewBox?.y ?? 0);
    expect((menuBox?.y ?? 0) + (menuBox?.height ?? 0)).toBeLessThanOrEqual(
      (previewBox?.y ?? 0) + (previewBox?.height ?? 0) + 1,
    );
  }
});

test('forced demo overscroll keeps the simulated device geometry stable', async ({
  page,
}) => {
  for (const route of ROUTES.filter((path) => path.startsWith('/demos/'))) {
    await page.goto(route, { waitUntil: 'networkidle' });

    for (const viewport of ['Escritorio', 'Tablet', 'Móvil'] as const) {
      await page.getByRole('button', { name: viewport, exact: true }).click();
      await page.waitForTimeout(260);
      const frame = page.locator('.demo-viewport');
      const before = await frame.boundingBox();

      await page
        .locator('.demo-window')
        .evaluate((element) => element.scrollTo({ top: 0 }));
      await page.mouse.wheel(0, -600);
      await page
        .locator('.demo-window')
        .evaluate((element) => element.scrollTo({ top: element.scrollHeight }));
      await page.mouse.wheel(0, 900);

      const after = await frame.boundingBox();
      expect(Math.round(after?.width ?? 0), `${route}/${viewport} width`).toBe(
        Math.round(before?.width ?? 0),
      );
      expect(
        Math.round(after?.height ?? 0),
        `${route}/${viewport} height`,
      ).toBe(Math.round(before?.height ?? 0));
    }
  }
});

test('CMS exposes every module through the complete tablet and mobile scroll', async ({
  page,
}) => {
  const views = [
    { name: 'Resumen', last: '.cms-dashboard' },
    { name: 'Páginas y menú', last: '.cms-table > div:last-child' },
    { name: 'Landing', last: '.cms-editor article:last-child' },
    { name: 'Medios', last: '.media-grid article:last-child' },
    { name: 'Estilos', last: '.token-list article:last-child' },
    { name: 'SEO', last: '.seo-form .cms-form-submit' },
  ] as const;

  for (const viewport of ['Tablet', 'Móvil'] as const) {
    await page.goto('/demos/cms', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: viewport, exact: true }).click();

    for (const view of views) {
      await page
        .getByRole('button', { name: /Módulos/ })
        .first()
        .click();
      await page
        .locator('.cms-mobile-menu')
        .getByRole('button', { name: view.name, exact: true })
        .click();

      const preview = page.locator('.demo-window');
      await preview.evaluate((element) =>
        element.scrollTo({ top: element.scrollHeight }),
      );
      const last = page.locator(view.last);
      await expect(last).toBeVisible();

      const geometry = await Promise.all([
        preview.boundingBox(),
        last.boundingBox(),
        preview.evaluate((element) => ({
          maximum: element.scrollHeight - element.clientHeight,
          scrollTop: element.scrollTop,
        })),
      ]);
      const [previewBox, lastBox, scroll] = geometry;
      expect(
        scroll.scrollTop,
        `${viewport}/${view.name} reaches the final scroll position`,
      ).toBeGreaterThanOrEqual(scroll.maximum - 1);
      expect(
        lastBox?.y ?? Infinity,
        `${viewport}/${view.name} final content enters the device`,
      ).toBeLessThan((previewBox?.y ?? 0) + (previewBox?.height ?? 0));
    }
  }
});

test('mobile architecture keeps all content in compact horizontal tracks', async ({
  page,
}) => {
  test.skip(
    (page.viewportSize()?.width ?? 0) > 760,
    'Mobile-only architecture layout',
  );
  await page.goto('/casos/gateway-datos#arquitectura', {
    waitUntil: 'networkidle',
  });

  const architecture = await page
    .locator('.architecture-section')
    .evaluate((section) => {
      const nodes = section.querySelector<HTMLElement>('.architecture-nodes');
      const contracts = section.querySelector<HTMLElement>(
        '.architecture-edges tbody',
      );
      return {
        height: section.clientHeight,
        nodesOverflow: (nodes?.scrollWidth ?? 0) > (nodes?.clientWidth ?? 0),
        contractsOverflow:
          (contracts?.scrollWidth ?? 0) > (contracts?.clientWidth ?? 0),
      };
    });

  expect(architecture.height).toBeLessThan(800);
  expect(architecture.nodesOverflow).toBe(true);
  expect(architecture.contractsOverflow).toBe(true);
});
