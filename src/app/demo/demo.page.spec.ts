import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { DemoPage } from './demo.page';

interface DemoHarness {
  feedback?: { id: number; message: string };
  showFeedback(message: string): void;
}

describe('DemoPage', () => {
  let fixture: ComponentFixture<DemoPage>;
  let harness: DemoHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemoPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: () => 'adastra' } } },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoPage);
    harness = fixture.componentInstance as unknown as DemoHarness;
    fixture.detectChanges();
  });

  it('creates the demo shell', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('dismisses feedback automatically after three seconds', fakeAsync(() => {
    harness.showFeedback('Solicitud de cotización simulada enviada.');
    expect(harness.feedback?.message).toContain('Solicitud de cotización');
    tick(2999);
    expect(harness.feedback).toBeDefined();
    tick(1);
    expect(harness.feedback).toBeUndefined();
  }));
});
