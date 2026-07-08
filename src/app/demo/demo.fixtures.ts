import { CaptureModel, CmsBlock, CmsPageItem, DemoDraft, DemoReport } from './demo.models';

export const INITIAL_CAPTURE: CaptureModel = {
  customer: '',
  sampleType: 'Agua residual',
  collectedAt: '2026-07-07T13:30',
  assignmentMode: 'Disponible para laboratoristas',
  location: '',
  notes: '',
  evidence: 0,
};

export const INITIAL_REPORTS: DemoReport[] = [
  {
    id: 'r-1',
    folio: 'AA-20260707-0042',
    title: 'Caracterización de agua de proceso',
    sampleType: 'Agua residual',
    status: 'Pendiente',
    owner: 'María Torres',
    customer: 'Planta Industrial Norte',
    location: 'Punto de descarga 03',
    notes: 'Muestra conservada a 4 °C. Analizar DBO, DQO y sólidos suspendidos.',
    tags: ['agua', 'prioridad'],
    evidence: ['Punto de muestreo', 'Contenedor sellado'],
  },
  {
    id: 'r-2',
    folio: 'AA-20260706-0037',
    title: 'Control microbiológico de cisterna',
    sampleType: 'Agua potable',
    status: 'En curso',
    owner: 'Carlos Méndez',
    customer: 'Centro Médico del Valle',
    location: 'Cisterna principal',
    notes: 'Verificar coliformes totales, E. coli y cloro residual.',
    tags: ['microbiología'],
    evidence: ['Cisterna principal'],
  },
  {
    id: 'r-3',
    folio: 'AA-20260704-0029',
    title: 'Evaluación de suelo agrícola',
    sampleType: 'Suelo',
    status: 'Cerrado',
    owner: 'Ana Ruiz',
    customer: 'Productores del Centro',
    location: 'Parcela demostrativa B',
    notes: 'Resultado validado y entregado al responsable técnico.',
    tags: ['suelo', 'nutrientes'],
    evidence: ['Cuadrante B-04'],
  },
];

export const INITIAL_DRAFTS: DemoDraft[] = [{
  id: 'd-1',
  customer: 'Empaque del Golfo',
  sampleType: 'Agua residual',
  location: 'Descarga sanitaria',
  state: 'Por sincronizar',
}];

export const INITIAL_CMS_PAGES: CmsPageItem[] = [
  { label: 'Inicio', route: '/', active: true },
  { label: 'Servicios', route: '/servicios', active: true },
  { label: 'Nosotros', route: '/nosotros', active: true },
  { label: 'Contacto', route: '/contacto', active: true },
];

export const INITIAL_CMS_BLOCKS: CmsBlock[] = [
  { title: 'Hero principal', type: 'Hero', visible: true },
  { title: 'Capacidad analítica', type: 'Tarjetas', visible: true },
  { title: 'Misión del laboratorio', type: 'Contenido + media', visible: true },
  { title: 'Acreditaciones y normas', type: 'Colección', visible: true },
  { title: 'Solicitud de cotización', type: 'Llamado a la acción', visible: true },
];

export const INITIAL_CMS_MEDIA = [
  { name: 'laboratory-hero.webp', type: 'Imagen', size: '182 KB' },
  { name: 'microbiology-team.webp', type: 'Imagen', size: '146 KB' },
  { name: 'quality-certificate.pdf', type: 'Documento', size: '94 KB' },
];

export const INITIAL_CMS_TOKENS = [
  { key: 'color.brand.primary', value: '#FFD400' },
  { key: 'color.background.canvas', value: '#080E18' },
  { key: 'radius.card', value: '12px' },
  { key: 'spacing.section', value: '96px' },
];
