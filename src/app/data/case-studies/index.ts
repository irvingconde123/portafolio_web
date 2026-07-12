import { ArchitectureNodeKind, CaseStudy } from '../portfolio.models';
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

const REPOSITORY_SOURCE =
  /^src\/app\/(?:data|demo)\/[a-z0-9./-]+\.(?:ts|html)$/;
const PUBLIC_SOURCE = /^https:\/\/[a-z0-9.-]+(?:\/[^\s]*)?$/i;

export function hasValidEvidence(caseStudy: CaseStudy): boolean {
  return (
    caseStudy.evidence.length > 0 &&
    caseStudy.evidence.every(
      (item) =>
        item.label.trim().length > 0 &&
        item.source === item.source.trim() &&
        (REPOSITORY_SOURCE.test(item.source) ||
          PUBLIC_SOURCE.test(item.source)) &&
        item.verified &&
        /^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt ?? ''),
    )
  );
}

const ARCHITECTURE_NODE_KINDS = new Set<ArchitectureNodeKind>([
  'actor',
  'system',
  'container',
  'component',
  'datastore',
  'external',
]);

export function hasValidArchitecture(caseStudy: CaseStudy): boolean {
  const nodeIds = new Set(caseStudy.nodes.map((node) => node.id));

  return (
    caseStudy.nodes.length > 0 &&
    caseStudy.edges.length > 0 &&
    nodeIds.size === caseStudy.nodes.length &&
    caseStudy.nodes.every(
      (node) =>
        node.id.length > 0 &&
        node.id === node.id.trim() &&
        node.label.trim().length > 0 &&
        node.detail.trim().length > 0 &&
        ARCHITECTURE_NODE_KINDS.has(node.kind),
    ) &&
    caseStudy.edges.every(
      (edge) =>
        edge.from.length > 0 &&
        edge.to.length > 0 &&
        edge.from === edge.from.trim() &&
        edge.to === edge.to.trim() &&
        edge.from !== edge.to &&
        edge.protocol.trim().length > 0 &&
        edge.purpose.trim().length > 0 &&
        nodeIds.has(edge.from) &&
        nodeIds.has(edge.to),
    )
  );
}
