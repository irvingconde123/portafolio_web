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
