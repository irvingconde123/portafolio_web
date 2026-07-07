import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, ProjectItem } from '../data/portfolio-content';

type DemoSlug = 'adastra' | 'landing' | 'cms' | 'hostlyc';
type AppView = 'home' | 'reports' | 'capture' | 'drafts';
type ReportStatus = 'Pendiente' | 'En curso' | 'Cerrado' | 'Rechazado';
type CmsView =
  | 'Resumen'
  | 'Páginas y menú'
  | 'Landing'
  | 'Medios'
  | 'Estilos'
  | 'SEO';

interface DemoReport {
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

interface DemoDraft {
  id: string;
  customer: string;
  sampleType: string;
  location: string;
  state: 'Borrador' | 'Por sincronizar';
}

interface CmsPageItem {
  label: string;
  route: string;
  active: boolean;
}

interface CmsBlock {
  title: string;
  type: string;
  visible: boolean;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  standalone: false,
})
export class DemoPage implements OnInit {
  private readonly route = inject(ActivatedRoute);

  protected slug: DemoSlug = 'adastra';
  protected project?: ProjectItem;
  protected offline = false;
  protected selectedSection = 'Inicio';
  protected appView: AppView = 'home';
  protected cmsView: CmsView = 'Resumen';
  protected feedback = '';
  protected reportSearch = '';
  protected reportStatusFilter = 'Todos';
  protected selectedReportId: string | null = null;
  protected editingReport = false;
  protected cmsEditing: string | null = null;
  protected cmsDraftValue = '';
  protected cmsVersion = 12;

  protected captureModel = {
    customer: '',
    sampleType: 'Agua residual',
    collectedAt: '2026-07-07T13:30',
    assignmentMode: 'Disponible para laboratoristas',
    location: '',
    notes: '',
    evidence: 0,
  };

  protected reports: DemoReport[] = [
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

  protected drafts: DemoDraft[] = [
    {
      id: 'd-1',
      customer: 'Empaque del Golfo',
      sampleType: 'Agua residual',
      location: 'Descarga sanitaria',
      state: 'Por sincronizar',
    },
  ];

  protected cmsPages: CmsPageItem[] = [
    { label: 'Inicio', route: '/', active: true },
    { label: 'Servicios', route: '/servicios', active: true },
    { label: 'Nosotros', route: '/nosotros', active: true },
    { label: 'Contacto', route: '/contacto', active: true },
  ];

  protected cmsBlocks: CmsBlock[] = [
    { title: 'Hero principal', type: 'Hero', visible: true },
    { title: 'Capacidad analítica', type: 'Tarjetas', visible: true },
    { title: 'Misión del laboratorio', type: 'Contenido + media', visible: true },
    { title: 'Acreditaciones y normas', type: 'Colección', visible: true },
    { title: 'Solicitud de cotización', type: 'CTA', visible: true },
  ];

  protected cmsMedia = [
    { name: 'laboratory-hero.webp', type: 'Imagen', size: '182 KB' },
    { name: 'microbiology-team.webp', type: 'Imagen', size: '146 KB' },
    { name: 'quality-certificate.pdf', type: 'Documento', size: '94 KB' },
  ];

  protected cmsTokens = [
    { key: 'color.brand.primary', value: '#FFD400' },
    { key: 'color.background.canvas', value: '#080E18' },
    { key: 'radius.card', value: '12px' },
    { key: 'spacing.section', value: '96px' },
  ];

  ngOnInit(): void {
    const candidate = this.route.snapshot.paramMap.get('slug');
    this.slug =
      candidate === 'landing' || candidate === 'cms' || candidate === 'hostlyc'
        ? candidate
        : 'adastra';
    this.project = PROJECTS.find((item) => item.slug === this.slug);
  }

  protected get filteredReports(): DemoReport[] {
    const term = this.reportSearch.trim().toLowerCase();
    return this.reports.filter(
      (report) =>
        (this.reportStatusFilter === 'Todos' || report.status === this.reportStatusFilter) &&
        (!term ||
          report.title.toLowerCase().includes(term) ||
          report.folio.toLowerCase().includes(term) ||
          report.owner.toLowerCase().includes(term)),
    );
  }

  protected get selectedReport(): DemoReport | undefined {
    return this.reports.find((report) => report.id === this.selectedReportId);
  }

  protected countReports(status: ReportStatus): number {
    return this.reports.filter((report) => report.status === status).length;
  }

  protected selectAppView(view: AppView): void {
    this.appView = view;
    this.selectedReportId = null;
    this.editingReport = false;
  }

  protected toggleConnection(): void {
    this.offline = !this.offline;
    this.showFeedback(
      this.offline
        ? 'Modo offline activo: los cambios se guardarán cifrados en este dispositivo.'
        : 'Conexión restaurada: ya puedes sincronizar los cambios pendientes.',
    );
  }

  protected openReport(reportId: string): void {
    this.selectedReportId = reportId;
    this.editingReport = false;
  }

  protected closeReport(): void {
    this.selectedReportId = null;
    this.editingReport = false;
  }

  protected changeReportStatus(report: DemoReport, status: string): void {
    report.status = status as ReportStatus;
    this.showFeedback(
      this.offline
        ? `Cambio de “${report.title}” encolado para sincronización.`
        : `Estado actualizado a ${report.status}.`,
    );
  }

  protected addEvidence(report: DemoReport): void {
    report.evidence.push(`Evidencia ${report.evidence.length + 1}`);
    this.showFeedback('Se agregó una evidencia mock al reporte.');
  }

  protected replaceEvidence(report: DemoReport, index: number): void {
    report.evidence[index] = `Evidencia reemplazada ${index + 1}`;
    this.showFeedback('La evidencia fue reemplazada.');
  }

  protected removeEvidence(report: DemoReport, index: number): void {
    report.evidence.splice(index, 1);
    this.showFeedback('La evidencia fue retirada del reporte.');
  }

  protected saveReport(report: DemoReport): void {
    this.editingReport = false;
    this.showFeedback(
      this.offline
        ? 'Edición cifrada y pendiente de sincronización.'
        : 'Cambios del reporte guardados.',
    );
  }

  protected addCaptureEvidence(): void {
    this.captureModel.evidence = Math.min(8, this.captureModel.evidence + 1);
    this.showFeedback('Fotografía mock agregada a la captura.');
  }

  protected saveDraft(): void {
    if (!this.captureModel.customer.trim() || !this.captureModel.location.trim()) {
      this.showFeedback('Completa cliente y ubicación para guardar la muestra.');
      return;
    }

    this.drafts.unshift({
      id: `d-${Date.now()}`,
      customer: this.captureModel.customer,
      sampleType: this.captureModel.sampleType,
      location: this.captureModel.location,
      state: 'Por sincronizar',
    });
    this.captureModel = {
      ...this.captureModel,
      customer: '',
      location: '',
      notes: '',
      evidence: 0,
    };
    this.selectAppView('drafts');
    this.showFeedback('Formulario cifrado guardado en este dispositivo.');
  }

  protected editDraft(draft: DemoDraft): void {
    this.captureModel = {
      ...this.captureModel,
      customer: draft.customer,
      sampleType: draft.sampleType,
      location: draft.location,
    };
    this.selectAppView('capture');
    this.showFeedback('Borrador cargado para edición.');
  }

  protected removeDraft(index: number): void {
    this.drafts.splice(index, 1);
    this.showFeedback('Borrador eliminado del dispositivo.');
  }

  protected syncDrafts(): void {
    if (this.offline) {
      this.showFeedback('No hay conexión. Los borradores permanecen protegidos localmente.');
      return;
    }
    this.drafts = [];
    this.showFeedback('Sincronización mock completada sin duplicados.');
  }

  protected setCmsView(view: CmsView): void {
    this.cmsView = view;
    this.cmsEditing = null;
  }

  protected publishCms(): void {
    this.cmsVersion += 1;
    this.showFeedback(`Versión ${this.cmsVersion} publicada. La landing ya consume el cambio.`);
  }

  protected openCmsEditor(label: string, value: string): void {
    this.cmsEditing = label;
    this.cmsDraftValue = value;
  }

  protected saveCmsEditor(): void {
    this.cmsEditing = null;
    this.showFeedback('Cambio guardado como borrador editorial.');
  }

  protected addCmsPage(): void {
    this.cmsPages.push({ label: 'Nueva página', route: '/nueva-pagina', active: false });
    this.showFeedback('Página agregada como borrador.');
  }

  protected toggleCmsPage(item: CmsPageItem): void {
    item.active = !item.active;
    this.showFeedback(`La página quedó ${item.active ? 'activa' : 'inactiva'}.`);
  }

  protected moveCmsBlock(index: number, direction: -1 | 1): void {
    const next = index + direction;
    if (next < 0 || next >= this.cmsBlocks.length) return;
    [this.cmsBlocks[index], this.cmsBlocks[next]] = [
      this.cmsBlocks[next],
      this.cmsBlocks[index],
    ];
    this.showFeedback('Orden de bloques actualizado.');
  }

  protected addCmsMedia(): void {
    this.cmsMedia.unshift({ name: 'nuevo-recurso.webp', type: 'Imagen', size: '128 KB' });
    this.showFeedback('Recurso mock agregado a la biblioteca.');
  }

  protected demoAction(message: string): void {
    this.showFeedback(message);
  }

  protected jumpToDemoSection(section: string): void {
    this.selectedSection = section;
    document
      .getElementById(`demo-${this.slug}-${section.toLowerCase()}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected clearFeedback(): void {
    this.feedback = '';
  }

  private showFeedback(message: string): void {
    this.feedback = message;
  }
}
