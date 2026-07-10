export type DemoSlug = 'adastra' | 'landing' | 'cms' | 'hostlyc';
export type DemoViewport = 'desktop' | 'tablet' | 'mobile';
export type AppView = 'home' | 'reports' | 'capture' | 'drafts';
export type ReportStatus = 'Pendiente' | 'En curso' | 'Cerrado' | 'Rechazado';
export type CmsView = 'Resumen' | 'Páginas y menú' | 'Landing' | 'Medios' | 'Estilos' | 'SEO';
export type SyncState = 'Sin iniciar' | 'Verificando batchId' | 'Interrumpida' | 'Lista para reintento' | 'Confirmada';

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

export interface SyncCheckpoint {
  batchId: string;
  state: SyncState;
  sent: number;
  total: number;
  detail: string;
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

export interface CmsSiteItem {
  name: string;
  slug: string;
  type: string;
  status: string;
  modules: string[];
}

export interface DemoFeedback {
  id: number;
  message: string;
}
