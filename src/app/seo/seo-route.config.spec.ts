import { CASE_STUDY_PATHS, SEO_ROUTES } from './seo-route.config';

describe('SEO route configuration', () => {
  it('defines metadata for every public prerendered route', () => {
    const expectedPaths = [
      '/',
      ...CASE_STUDY_PATHS,
      '/demos/adastra',
      '/demos/landing',
      '/demos/cms',
      '/demos/hostlyc',
    ];

    expect(Object.keys(SEO_ROUTES).sort()).toEqual(expectedPaths.sort());
  });

  it('keeps titles and descriptions useful for search results', () => {
    for (const route of Object.values(SEO_ROUTES)) {
      expect(route.title.length).toBeLessThanOrEqual(60);
      expect(route.description.length).toBeGreaterThan(50);
      expect(route.description.length).toBeLessThanOrEqual(160);
    }
  });
});
