import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { INITIAL_CAPTURE, INITIAL_DRAFTS, INITIAL_REPORTS } from './demo.fixtures';
import { AppView, DemoDraft, DemoReport, DemoViewport, ReportStatus, SyncCheckpoint } from './demo.models';

@Component({
  selector: 'app-adastra-demo',
  templateUrl: './adastra-demo.component.html',
  standalone: false,
})
export class AdastraDemoComponent {
  @Input() viewport: DemoViewport = 'desktop';
  @Output() readonly feedback = new EventEmitter<string>();

  protected offline = false;
  protected mobileMenuOpen = false;
  protected appView: AppView = 'home';
  protected reportSearch = '';
  protected reportStatusFilter = 'Todos';
  protected selectedReportId: string | null = null;
  protected editingReport = false;
  protected syncCheckpoint: SyncCheckpoint = {
    batchId: 'sync-20260707-0001',
    state: 'Sin iniciar',
    sent: 0,
    total: INITIAL_DRAFTS.length,
    detail: 'Sin envío activo. El próximo intento consultará el estado del lote antes de mandar datos.',
  };
  protected captureModel = { ...INITIAL_CAPTURE };
  protected reports = INITIAL_REPORTS.map((report) => ({
    ...report,
    tags: [...report.tags],
    evidence: [...report.evidence],
  }));
  protected drafts = INITIAL_DRAFTS.map((draft) => ({ ...draft }));
  private dialogTrigger: HTMLElement | null = null;

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

  protected get platformSummary(): string {
    if (this.viewport !== 'desktop') {
      return 'Vista compacta: captura offline, revisión de reportes y sincronización sin perder el menú principal.';
    }

    return 'Vista web: operación extendida con barra lateral, filtros, detalle de reportes y control de sincronización.';
  }

  protected countReports(status: ReportStatus): number {
    return this.reports.filter((report) => report.status === status).length;
  }

  protected selectAppView(view: AppView): void {
    this.appView = view;
    this.mobileMenuOpen = false;
    this.closeReport();
  }

  protected toggleConnection(): void {
    this.offline = !this.offline;
    this.notify(
      this.offline
        ? 'Modo sin conexión activo: los cambios se guardarán cifrados en este dispositivo.'
        : 'Conexión restaurada: ya puedes sincronizar los cambios pendientes.',
    );
  }

  protected openReport(reportId: string): void {
    this.dialogTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.selectedReportId = reportId;
    this.editingReport = false;
    setTimeout(() => document.querySelector<HTMLElement>('.report-detail-demo')?.focus());
  }

  protected closeReport(): void {
    this.selectedReportId = null;
    this.editingReport = false;
    this.dialogTrigger?.focus();
    this.dialogTrigger = null;
  }

  @HostListener('document:keydown.escape')
  protected closeReportWithKeyboard(): void {
    if (this.selectedReportId) this.closeReport();
  }

  protected changeReportStatus(report: DemoReport, status: string): void {
    report.status = status as ReportStatus;
    this.notify(
      this.offline
        ? `Cambio de “${report.title}” encolado para sincronización.`
        : `Estado actualizado a ${report.status}.`,
    );
  }

  protected addEvidence(report: DemoReport): void {
    report.evidence.push(`Evidencia ${report.evidence.length + 1}`);
    this.notify('Se agregó una evidencia simulada al reporte.');
  }

  protected replaceEvidence(report: DemoReport, index: number): void {
    report.evidence[index] = `Evidencia reemplazada ${index + 1}`;
    this.notify('La evidencia fue reemplazada.');
  }

  protected removeEvidence(report: DemoReport, index: number): void {
    report.evidence.splice(index, 1);
    this.notify('La evidencia fue retirada del reporte.');
  }

  protected saveReport(report: DemoReport): void {
    this.editingReport = false;
    this.notify(
      this.offline
        ? 'Edición cifrada y pendiente de sincronización.'
        : `Cambios de “${report.title}” guardados.`,
    );
  }

  protected addCaptureEvidence(): void {
    this.captureModel.evidence = Math.min(8, this.captureModel.evidence + 1);
    this.notify('Fotografía simulada agregada a la captura.');
  }

  protected saveDraft(): void {
    if (!this.captureModel.customer.trim() || !this.captureModel.location.trim()) {
      this.notify('Completa cliente y ubicación para guardar la muestra.');
      return;
    }

    this.drafts.unshift({
      id: `d-${Date.now()}`,
      customer: this.captureModel.customer,
      sampleType: this.captureModel.sampleType,
      location: this.captureModel.location,
      state: 'Por sincronizar',
    });
    this.syncCheckpoint = {
      ...this.syncCheckpoint,
      state: 'Sin iniciar',
      total: this.drafts.length,
      detail: 'Hay cambios locales listos para verificación por batchId.',
    };
    this.captureModel = { ...INITIAL_CAPTURE };
    this.selectAppView('drafts');
    this.notify('Formulario cifrado guardado en este dispositivo.');
  }

  protected editDraft(draft: DemoDraft): void {
    this.captureModel = {
      ...this.captureModel,
      customer: draft.customer,
      sampleType: draft.sampleType,
      location: draft.location,
    };
    this.selectAppView('capture');
    this.notify('Borrador cargado para edición.');
  }

  protected removeDraft(index: number): void {
    this.drafts.splice(index, 1);
    this.syncCheckpoint = {
      ...this.syncCheckpoint,
      total: this.drafts.length,
      sent: Math.min(this.syncCheckpoint.sent, this.drafts.length),
    };
    this.notify('Borrador eliminado del dispositivo.');
  }

  protected syncDrafts(): void {
    if (this.offline) {
      this.notify('No hay conexión. Los borradores permanecen protegidos localmente.');
      return;
    }

    if (!this.drafts.length) {
      this.syncCheckpoint = {
        ...this.syncCheckpoint,
        state: 'Confirmada',
        sent: 0,
        total: 0,
        detail: 'No hay pendientes locales. El último lote consultado no requiere reenvío.',
      };
      this.notify('No hay borradores pendientes por sincronizar.');
      return;
    }

    this.syncCheckpoint = {
      ...this.syncCheckpoint,
      state: 'Verificando batchId',
      sent: Math.min(this.syncCheckpoint.sent, this.drafts.length),
      total: this.drafts.length,
      detail: 'El cliente consulta al API si el lote ya fue confirmado antes de reenviar datos.',
    };

    this.drafts = [];
    this.syncCheckpoint = {
      ...this.syncCheckpoint,
      state: 'Confirmada',
      sent: this.syncCheckpoint.total,
      detail: 'API confirmó el lote completo; el cliente liberó la bandeja local sin duplicados.',
    };
    this.notify('Sincronización simulada completada después de validar batchId.');
  }

  protected interruptSync(): void {
    if (!this.drafts.length) {
      this.notify('No hay pendientes para simular una interrupción.');
      return;
    }

    this.syncCheckpoint = {
      ...this.syncCheckpoint,
      state: 'Interrumpida',
      sent: Math.min(1, this.drafts.length),
      total: this.drafts.length,
      detail: 'Se perdió conexión/proceso después de enviar parte del lote. Los borradores siguen locales.',
    };
    this.notify('Interrupción simulada: el batch quedó pendiente de verificación.');
  }

  protected verifyBatchBeforeSync(): void {
    this.syncCheckpoint = {
      ...this.syncCheckpoint,
      state: 'Lista para reintento',
      total: this.drafts.length,
      detail: `API respondió que ${this.syncCheckpoint.sent} de ${this.syncCheckpoint.total} operaciones no deben duplicarse; se reenviará solo lo pendiente.`,
    };
    this.notify('Batch verificado. El siguiente intento reanuda sin duplicar operaciones.');
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
