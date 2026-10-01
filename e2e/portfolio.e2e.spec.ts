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

    const presentation = await page.evaluate((path) => {
      function backgroundBrightness(element: Element | null): number {
        if (!element) return 1;
        const styles = getComputedStyle(element);
        const blend = (color: string, behind: number) => {
          const channels = color.match(/[\d.]+/g)?.map(Number) ?? [];
          if (channels.length < 3) return behind;
          const alpha = channels[3] ?? 1;
          const brightness = (0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]) / 255;
          return alpha * brightness + (1 - alpha) * behind;
        };
        const base = blend(styles.backgroundColor, backgroundBrightness(element.parentElement));
        const gradientColors = styles.backgroundImage.match(/rgba?\([^)]+\)/g) ?? [];
        return gradientColors.length ? Math.min(...gradientColors.map((color) => blend(color, base))) : base;
      }
      const selectors = path === '/'
        ? ['body', '.page-shell']
        : path.startsWith('/casos/')
          ? ['body', '.case-shell', '.architecture-section', '.architecture-nodes article']
          : ['body', '.demo-shell', '.demo-header', '.demo-stage', '.demo-window'];

      return {
        surfaces: selectors.map((selector) => {
          const element = document.querySelector(selector);
          if (!element) return { selector, brightness: 0, colorScheme: '' };
          const styles = getComputedStyle(element);
          return {
            selector,
            brightness: backgroundBrightness(element),
            colorScheme: styles.colorScheme,
          };
        }),
        headings: Array.from(document.querySelectorAll('main h1, main h2')).map(
          (element) => ({ tag: element.tagName, size: parseFloat(getComputedStyle(element).fontSize) }),
        ),
      };
    }, route);

    for (const surface of presentation.surfaces) {
      expect(surface.brightness, `${route} ${surface.selector} stays light`).toBeGreaterThan(0.7);
      expect(surface.colorScheme, `${route} ${surface.selector} uses light controls`).toBe('light');
    }
    for (const heading of presentation.headings) {
      const maximum = heading.tag === 'H1' || route.startsWith('/demos/') ? 48 : 36;
      expect(heading.size, `${route} ${heading.tag} remains moderate`).toBeLessThan(maximum);
    }

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
      firstProjectTop: document.querySelector('.case-card')?.getBoundingClientRect().top ?? Infinity,
      heroHeight: document.querySelector('.hero')?.getBoundingClientRect().height ?? Infinity,
      scrollHeight: Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
      ),
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };
  });

  if (layout.viewportWidth >= 700) {
    expect(layout.heroHeight, 'the introduction leaves room for selected work').toBeLessThanOrEqual(
      layout.viewportHeight * 0.55,
    );
    expect(layout.firstProjectTop, 'the first project enters the initial viewport').toBeLessThan(
      layout.viewportHeight * 0.9,
    );
  } else {
    expect(layout.firstProjectTop, 'selected work follows the mobile introduction').toBeLessThan(
      layout.viewportHeight * 1.25,
    );
  }
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
    const notice = page.locator('.demo-data-notice');
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(/datos ficticios/i);
    await expect(page.getByText('Recorrido sugerido')).toBeVisible();
  }
});

test('Hostlyc exposes its real sites separately from the local example', async ({
  page,
}) => {
  for (const route of ['/', '/casos/hostlyc']) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const liveSites = route === '/'
      ? page.locator('main .case-card')
      : page.locator('.case-hero .live-projects');

    for (const url of ['https://hostlyc.com/', 'https://hostlyc-parent-web.vercel.app/']) {
      const link = liveSites.locator(`a[href="${url}"]`);
      await expect(link).toHaveCount(1);
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeInViewport();
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /(?:^|\s)noopener(?:\s|$)/);
      await expect(link).toHaveAttribute('rel', /(?:^|\s)noreferrer(?:\s|$)/);
    }

    const localExample = page.locator(route === '/'
      ? 'main .case-card a[href="/demos/hostlyc"]'
      : 'main > .case-actions a[href="/demos/hostlyc"]');
    await expect(localExample).toHaveCount(1);
    await expect(localExample).toHaveAccessibleName(/ejemplo|interactivo/i);
    await expect(localExample).not.toHaveAttribute('target', '_blank');
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

    await page.locator('.demo-window').evaluate((element) => {
      element.scrollTo({ top: 0 });
    });

    const touchBox = await page.locator('.demo-window').boundingBox();
    expect(touchBox).not.toBeNull();
    await page.evaluate(({ x, y }) => {
      const target = document.elementFromPoint(x, y);
      if (!target) return;

      target.dispatchEvent(
        new TouchEvent('touchstart', {
          bubbles: true,
          cancelable: true,
          touches: [
            new Touch({ clientX: x, clientY: y, identifier: 1, target }),
          ],
        }),
      );
      target.dispatchEvent(
        new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [
            new Touch({
              clientX: x,
              clientY: y - 220,
              identifier: 1,
              target,
            }),
          ],
        }),
      );
      target.dispatchEvent(
        new TouchEvent('touchend', {
          bubbles: true,
          cancelable: true,
          touches: [],
        }),
      );
    }, {
      x: (touchBox?.x ?? 0) + (touchBox?.width ?? 0) / 2,
      y: (touchBox?.y ?? 0) + (touchBox?.height ?? 0) / 2,
    });

    const touchScroll = await page
      .locator('.demo-window')
      .evaluate((element) => element.scrollTop);
    if (preview.scrollHeight > preview.clientHeight) {
      expect(touchScroll).toBeGreaterThan(0);
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
    await page.evaluate(() => document.fonts.ready);
    await page.getByRole('button', { name: 'Móvil', exact: true }).click();
    await page.waitForTimeout(120);

    const preview = page.locator('.demo-window');
    await preview.evaluate((element) =>
      element.scrollTo({ top: element.scrollHeight }),
    );
    await page.waitForFunction(() => {
      const element = document.querySelector<HTMLElement>('.demo-window');
      if (!element) return false;
      return element.scrollHeight <= element.clientHeight || element.scrollTop > 0;
    });

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
      const sizeButton = page.getByRole('button', { name: viewport, exact: true });
      await sizeButton.press('Enter');
      await expect(sizeButton).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('.demo-view-toggle button[aria-pressed="true"]')).toHaveCount(1);
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
      await page.waitForFunction(() => {
        const element = document.querySelector<HTMLElement>('.demo-window');
        return !!element && element.scrollTop === 0;
      });

      const preview = page.locator('.demo-window');
      await preview.evaluate((element) =>
        element.scrollTo({ top: element.scrollHeight }),
      );
      await page.waitForFunction(() => {
        const element = document.querySelector<HTMLElement>('.demo-window');
        if (!element) return false;
        return element.scrollTop >= element.scrollHeight - element.clientHeight - 1;
      });
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
