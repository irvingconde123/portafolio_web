export interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  summary: string;
  technologies: string[];
}

export interface ArchitectureStep {
  label: string;
  detail: string;
}

export interface SequenceStep {
  from: string;
  action: string;
  to: string;
}

export interface QualityAttribute {
  name: string;
  mechanism: string;
}

export interface FailureMode {
  trigger: string;
  response: string;
}

export interface ProjectEvidence {
  value: string;
  label: string;
}

export type ArchitectureNodeKind =
  | 'actor'
  | 'system'
  | 'container'
  | 'component'
  | 'datastore'
  | 'external';

export interface ArchitectureNode {
  id: string;
  label: string;
  kind: ArchitectureNodeKind;
  detail: string;
  boundary?: string;
  technology?: string;
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  protocol: string;
  purpose: string;
}

export interface QualityScenario {
  attribute: string;
  stimulus: string;
  response: string;
  measure?: string;
}

export interface DecisionRecord {
  id: string;
  status: 'accepted' | 'proposed' | 'superseded';
  context: string;
  decision: string;
  consequences: string;
}

export interface EvidenceItem {
  label: string;
  source: string;
  verified: boolean;
  value?: string;
  verifiedAt?: string;
}

export interface CaseDemoLink {
  label: string;
  slug: 'adastra' | 'landing' | 'cms' | 'hostlyc';
}

export interface CaseStudy {
  slug: 'adastra' | 'plataforma-contenido' | 'gateway-datos' | 'hostlyc';
  name: string;
  eyebrow: string;
  summary: string;
  problem: string;
  context: string;
  role: string;
  status: string;
  solution: string;
  constraints: string[];
  technologies: string[];
  evidence: EvidenceItem[];
  demos: CaseDemoLink[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  qualityScenarios: QualityScenario[];
  decisions: DecisionRecord[];
}

export interface ProjectItem {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  impact: string;
  ownership: string;
  team: string;
  status: string;
  solutionFor: string;
  constraints: string[];
  evidence: ProjectEvidence[];
  accent: 'blue' | 'yellow' | 'teal' | 'rose' | 'violet' | 'green';
  technologies: string[];
  architecture: ArchitectureStep[];
  sequence: SequenceStep[];
  decisions: string[];
  preview: 'operations' | 'laboratory' | 'cms' | 'agency' | 'gateway' | 'cloud';
  hasDemo: boolean;
  architectureType: string;
  architectureScope: string;
  patterns: string[];
  qualityAttributes: QualityAttribute[];
  failureModes: FailureMode[];
  tradeoffs: string[];
  observability: string[];
}

export interface SkillItem {
  name: string;
  evidence: string;
  projectSlug?: string;
}

export interface SkillGroup {
  name: string;
  description: string;
  skills: SkillItem[];
}
