import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

const CASE_SLUGS = [
  'adastra',
  'plataforma-contenido',
  'gateway-datos',
  'hostlyc',
] as const;

const DEMO_SLUGS = ['adastra', 'landing', 'cms', 'hostlyc'] as const;

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'casos/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return CASE_SLUGS.map((slug) => ({ slug }));
    },
  },
  {
    path: 'demos/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.None,
    async getPrerenderParams() {
      return DEMO_SLUGS.map((slug) => ({ slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
