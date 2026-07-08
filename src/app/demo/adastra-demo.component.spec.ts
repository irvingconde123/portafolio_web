import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdastraDemoComponent } from './adastra-demo.component';

interface AdastraHarness {
  appView: string;
  captureModel: { customer: string; location: string };
  demoPlatform: 'web' | 'android' | 'desktop';
  drafts: unknown[];
  offline: boolean;
  reports: Array<{ status: string; evidence: string[] }>;
  saveDraft(): void;
  syncDrafts(): void;
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
  });

  it('updates report status and evidence in memory', () => {
    const report = harness.reports[0];
    const initialEvidence = report.evidence.length;
    harness.changeReportStatus(report, 'En curso');
    harness.removeEvidence(report, 0);
    expect(report.status).toBe('En curso');
    expect(report.evidence.length).toBe(initialEvidence - 1);
  });

  it('only offers application updates for packaged platforms', () => {
    harness.demoPlatform = 'web';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.update-strip')).toBeNull();

    harness.demoPlatform = 'android';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.update-strip')).not.toBeNull();
  });
});
