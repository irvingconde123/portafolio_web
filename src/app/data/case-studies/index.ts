import { CaseStudy } from '../portfolio.models';
import { ADASTRA_CASE } from './adastra.case';
import { CONTENT_PLATFORM_CASE } from './content-platform.case';
import { GATEWAY_DATA_CASE } from './gateway-data.case';
import { HOSTLYC_CASE } from './hostlyc.case';

export const CASE_STUDIES: CaseStudy[] = [
  ADASTRA_CASE,
  CONTENT_PLATFORM_CASE,
  GATEWAY_DATA_CASE,
  HOSTLYC_CASE,
];

export function findCaseStudy(slug: string | null): CaseStudy | undefined {
  return CASE_STUDIES.find((item) => item.slug === slug);
}

export function hasValidArchitecture(caseStudy: CaseStudy): boolean {
  const nodeIds = new Set(caseStudy.nodes.map((node) => node.id));
  return (
    nodeIds.size === caseStudy.nodes.length &&
    caseStudy.edges.every(
      (edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to),
    )
  );
}
