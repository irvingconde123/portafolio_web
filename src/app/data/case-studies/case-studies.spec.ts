import { CASE_STUDIES, findCaseStudy, hasValidArchitecture } from '.';

describe('CASE_STUDIES', () => {
  it('publishes exactly the four selected solutions', () => {
    expect(CASE_STUDIES.map((item) => item.slug)).toEqual([
      'adastra',
      'plataforma-contenido',
      'gateway-datos',
      'hostlyc',
    ]);
  });

  it('keeps every architecture edge connected to known nodes', () => {
    expect(CASE_STUDIES.every(hasValidArchitecture)).toBeTrue();
  });

  it('returns no fallback for an unknown case', () => {
    expect(findCaseStudy('not-published')).toBeUndefined();
  });

  it('uses only evidence with a repository source', () => {
    const evidence = CASE_STUDIES.flatMap((item) => item.evidence);
    expect(evidence.every((item) => item.verified && item.source.length > 0)).toBeTrue();
  });
});
