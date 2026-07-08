import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { INITIAL_CAPTURE, INITIAL_DRAFTS, INITIAL_REPORTS } from './demo.fixtures';
import { AppView, DemoDraft, DemoReport, ReportStatus } from './demo.models';

@Component({
  selector: 'app-adastra-demo',
  templateUrl: './adastra-demo.component.html',
  standalone: false,
})
export class AdastraDemoComponent {
  @Output() readonly feedback = new EventEmitter<string>();

  protected offline = false;
  protected demoPlatform: 'web' | 'android' | 'desktop' = 'android';
  protected appView: AppView = 'home';
  protected reportSearch = '';
  protected reportStatusFilter = 'Todos';
  protected selectedReportId: string | null = null;
  protected editingReport = false;
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

  protected countReports(status: ReportStatus): number {
    return this.reports.filter((report) => report.status === status).length;
  }

  protected selectAppView(view: AppView): void {
    this.appView = view;
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
    this.notify('Borrador eliminado del dispositivo.');
  }

  protected syncDrafts(): void {
    if (this.offline) {
      this.notify('No hay conexión. Los borradores permanecen protegidos localmente.');
      return;
    }
    this.drafts = [];
    this.notify('Sincronización simulada completada sin duplicados.');
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
