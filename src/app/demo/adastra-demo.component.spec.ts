import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdastraDemoComponent } from './adastra-demo.component';

interface AdastraHarness {
  appView: string;
  captureModel: { customer: string; location: string };
  drafts: unknown[];
  offline: boolean;
  selectedReportId: string | null;
  syncCheckpoint: { state: string; sent: number; total: number };
  reports: Array<{ status: string; evidence: string[] }>;
  closeReportWithKeyboard(): void;
  openReport(reportId: string): void;
  saveDraft(): void;
  syncDrafts(): void;
  interruptSync(): void;
  verifyBatchBeforeSync(): void;
  changeReportStatus(report: unknown, status: string): void;
  removeEvidence(report: unknown, index: number): void;
}

describe('AdastraDemoComponent', () => {
  let fixture: ComponentFixture<AdastraDemoComponent>;
  let harness: AdastraHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdastraDemoComponent],
      imports: [FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AdastraDemoComponent);
    harness = fixture.componentInstance as unknown as AdastraHarness;
  });

  it('creates a local draft from the capture workflow', () => {
    const initialDrafts = harness.drafts.length;
    harness.captureModel.customer = 'Cliente de prueba';
    harness.captureModel.location = 'Punto de muestreo 01';
    harness.saveDraft();
    expect(harness.drafts.length).toBe(initialDrafts + 1);
    expect(harness.appView).toBe('drafts');
  });

  it('preserves drafts without connection and synchronizes them online', () => {
    harness.offline = true;
    harness.syncDrafts();
    expect(harness.drafts.length).toBeGreaterThan(0);
    harness.offline = false;
    harness.syncDrafts();
    expect(harness.drafts.length).toBe(0);
    expect(harness.syncCheckpoint.state).toBe('Confirmada');
  });

  it('keeps drafts after an interrupted sync and resumes by batchId', () => {
    const pendingDrafts = harness.drafts.length;
    harness.interruptSync();
    expect(harness.drafts.length).toBe(pendingDrafts);
    expect(harness.syncCheckpoint.state).toBe('Interrumpida');

    harness.verifyBatchBeforeSync();
    expect(harness.syncCheckpoint.state).toBe('Lista para reintento');

    harness.syncDrafts();
    expect(harness.drafts.length).toBe(0);
    expect(harness.syncCheckpoint.state).toBe('Confirmada');
  });

  it('updates report status and evidence in memory', () => {
    const report = harness.reports[0];
    const initialEvidence = report.evidence.length;
    harness.changeReportStatus(report, 'En curso');
    harness.removeEvidence(report, 0);
    expect(report.status).toBe('En curso');
    expect(report.evidence.length).toBe(initialEvidence - 1);
  });

  it('only offers application updates in the mobile preview', () => {
    fixture.componentRef.setInput('viewport', 'web');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.update-strip')).toBeNull();

    fixture.componentRef.setInput('viewport', 'mobile');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.update-strip')).not.toBeNull();
  });

  it('exposes report detail as a modal dialog and closes it from the keyboard', () => {
    harness.openReport('r-1');
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.report-detail-demo');
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');

    harness.closeReportWithKeyboard();
    fixture.detectChanges();
    expect(harness.selectedReportId).toBeNull();
    expect(fixture.nativeElement.querySelector('.report-detail-demo')).toBeNull();
  });
});
