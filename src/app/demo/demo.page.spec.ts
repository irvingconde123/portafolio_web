import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DemoPage } from './demo.page';

interface DemoHarness {
  appView: string;
  captureModel: {
    customer: string;
    location: string;
  };
  drafts: unknown[];
  feedback: string;
  offline: boolean;
  reports: Array<{ id: string; status: string; evidence: string[] }>;
  cmsVersion: number;
  saveDraft(): void;
  syncDrafts(): void;
  changeReportStatus(report: unknown, status: string): void;
  removeEvidence(report: unknown, index: number): void;
  publishCms(): void;
}

describe('DemoPage', () => {
  let fixture: ComponentFixture<DemoPage>;
  let component: DemoPage;
  let harness: DemoHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoPage],
      imports: [FormsModule, IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'adastra' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPage);
    component = fixture.componentInstance;
    harness = component as unknown as DemoHarness;
    fixture.detectChanges();
  });

  it('creates a local draft from the capture workflow', () => {
    const initialDrafts = harness.drafts.length;
    harness.captureModel.customer = 'Cliente de prueba';
    harness.captureModel.location = 'Punto de muestreo 01';

    harness.saveDraft();

    expect(harness.drafts.length).toBe(initialDrafts + 1);
    expect(harness.appView).toBe('drafts');
  });

  it('preserves pending drafts offline and synchronizes them online', () => {
    harness.offline = true;
    harness.syncDrafts();
    expect(harness.drafts.length).toBeGreaterThan(0);
    expect(harness.feedback).toContain('No hay conexión');

    harness.offline = false;
    harness.syncDrafts();
    expect(harness.drafts.length).toBe(0);
  });

  it('updates reports, evidence and CMS versions in memory', () => {
    const report = harness.reports[0];
    const initialEvidence = report.evidence.length;
    harness.changeReportStatus(report, 'En curso');
    harness.removeEvidence(report, 0);
    expect(report.status).toBe('En curso');
    expect(report.evidence.length).toBe(initialEvidence - 1);

    const initialVersion = harness.cmsVersion;
    harness.publishCms();
    expect(harness.cmsVersion).toBe(initialVersion + 1);
  });
});
