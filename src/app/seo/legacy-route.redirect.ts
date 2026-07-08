import { inject } from '@angular/core';
import { RedirectFunction, Router } from '@angular/router';

const LEGACY_CASES: Readonly<Record<string, string>> = {
  adastra: 'adastra',
  landing: 'plataforma-contenido',
  cms: 'plataforma-contenido',
  'edge-gateway': 'gateway-datos',
  'cloud-automation': 'gateway-datos',
  hostlyc: 'hostlyc',
};

export function resolveLegacyCaseSlug(slug: string | undefined): string {
  return LEGACY_CASES[slug ?? ''] ?? 'adastra';
}

export const legacyArchitectureRedirect: RedirectFunction = ({ params }) => {
  const caseSlug = resolveLegacyCaseSlug(params['slug']);

  return inject(Router).createUrlTree(['/casos', caseSlug], {
    fragment: 'arquitectura',
  });
};
