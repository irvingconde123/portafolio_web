import { resolveLegacyCaseSlug } from './legacy-route.redirect';

describe('legacy architecture redirects', () => {
  it('groups the CMS and landing in the content platform case', () => {
    expect(resolveLegacyCaseSlug('landing')).toBe('plataforma-contenido');
    expect(resolveLegacyCaseSlug('cms')).toBe('plataforma-contenido');
  });

  it('groups gateway and dynamic data in one case', () => {
    expect(resolveLegacyCaseSlug('edge-gateway')).toBe('gateway-datos');
    expect(resolveLegacyCaseSlug('cloud-automation')).toBe('gateway-datos');
  });

  it('uses Adastra as the safe fallback', () => {
    expect(resolveLegacyCaseSlug(undefined)).toBe('adastra');
    expect(resolveLegacyCaseSlug('unknown')).toBe('adastra');
  });
});
