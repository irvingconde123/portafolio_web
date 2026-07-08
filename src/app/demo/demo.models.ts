export type DemoSlug = 'adastra' | 'landing' | 'cms' | 'hostlyc';
export type AppView = 'home' | 'reports' | 'capture' | 'drafts';
export type ReportStatus = 'Pendiente' | 'En curso' | 'Cerrado' | 'Rechazado';
export type CmsView = 'Resumen' | 'Páginas y menú' | 'Landing' | 'Medios' | 'Estilos' | 'SEO';

export interface DemoReport {
  id: string;
  folio: string;
  title: string;
  sampleType: string;
  status: ReportStatus;
  owner: string;
  customer: string;
  location: string;
  notes: string;
  tags: string[];
  evidence: string[];
}

export interface DemoDraft {
  id: string;
  customer: string;
  sampleType: string;
  location: string;
  state: 'Borrador' | 'Por sincronizar';
}

export interface CaptureModel {
  customer: string;
  sampleType: string;
  collectedAt: string;
  assignmentMode: string;
  location: string;
  notes: string;
  evidence: number;
}

export interface CmsPageItem {
  label: string;
  route: string;
  active: boolean;
}

export interface CmsBlock {
  title: string;
  type: string;
  visible: boolean;
}

export interface DemoFeedback {
  id: number;
  message: string;
}
