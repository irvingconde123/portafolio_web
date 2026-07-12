import { CaseStudy } from '../portfolio.models';
import {
  CASE_STUDIES,
  findCaseStudy,
  hasValidArchitecture,
  hasValidEvidence,
} from '.';

function architectureWith(
  changes: Partial<Pick<CaseStudy, 'nodes' | 'edges'>>,
): CaseStudy {
  return {
    ...CASE_STUDIES[0],
    nodes: changes.nodes ?? CASE_STUDIES[0].nodes,
    edges: changes.edges ?? CASE_STUDIES[0].edges,
  };
}

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

  it('rejects empty or whitespace-padded node identifiers', () => {
    const [firstNode, ...nodes] = CASE_STUDIES[0].nodes;

    expect(
      hasValidArchitecture(
        architectureWith({
          nodes: [{ ...firstNode, id: '' }, ...nodes],
        }),
      ),
    ).toBeFalse();
    expect(
      hasValidArchitecture(
        architectureWith({
          nodes: [{ ...firstNode, id: ` ${firstNode.id}` }, ...nodes],
        }),
      ),
    ).toBeFalse();
  });

  it('rejects self-referencing edges and empty protocols', () => {
    const [firstEdge, ...edges] = CASE_STUDIES[0].edges;

    expect(
      hasValidArchitecture(
        architectureWith({
          edges: [{ ...firstEdge, to: firstEdge.from }, ...edges],
        }),
      ),
    ).toBeFalse();
    expect(
      hasValidArchitecture(
        architectureWith({
          edges: [{ ...firstEdge, protocol: '  ' }, ...edges],
        }),
      ),
    ).toBeFalse();
  });

  it('uses semantic node kinds and complete edge contracts', () => {
    const kinds = new Set([
      'actor',
      'system',
      'container',
      'component',
      'datastore',
      'external',
    ]);

    expect(
      CASE_STUDIES.every(
        (item) =>
          item.nodes.every((node) => kinds.has(node.kind)) &&
          item.edges.every(
            (edge) =>
              edge.protocol.trim().length > 0 && edge.purpose.trim().length > 0,
          ),
      ),
    ).toBeTrue();
  });

  it('returns no fallback for an unknown case', () => {
    expect(findCaseStudy('not-published')).toBeUndefined();
  });

  it('uses only verified evidence with a valid and dated source', () => {
    const evidence = CASE_STUDIES.reduce(
      (items, item) => [...items, ...item.evidence],
      [] as CaseStudy['evidence'],
    );
    expect(
      evidence.every((item) => item.verified && item.source.length > 0),
    ).toBeTrue();
    expect(CASE_STUDIES.every(hasValidEvidence)).toBeTrue();
  });

  it('rejects undated, insecure or malformed evidence sources', () => {
    const caseStudy = CASE_STUDIES[0];

    expect(
      hasValidEvidence({
        ...caseStudy,
        evidence: [
          { label: 'Fuente', source: 'http://example.com', verified: true },
        ],
      }),
    ).toBeFalse();
    expect(
      hasValidEvidence({
        ...caseStudy,
        evidence: [
          {
            label: 'Fuente',
            source: '../secret.txt',
            verified: true,
            verifiedAt: '2026-07-11',
          },
        ],
      }),
    ).toBeFalse();
  });
});
