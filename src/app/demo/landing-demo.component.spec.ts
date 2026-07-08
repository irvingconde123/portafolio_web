import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingDemoComponent } from './landing-demo.component';

interface LandingHarness {
  selectedSection: string;
}

describe('LandingDemoComponent', () => {
  let fixture: ComponentFixture<LandingDemoComponent>;
  let harness: LandingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [LandingDemoComponent] }).compileComponents();
    fixture = TestBed.createComponent(LandingDemoComponent);
    harness = fixture.componentInstance as unknown as LandingHarness;
    fixture.detectChanges();
  });

  it('marks the selected navigation target for assistive technology', () => {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('nav div button'));
    buttons.find((button) => button.textContent?.trim() === 'Servicios')?.click();
    fixture.detectChanges();

    const current = fixture.nativeElement.querySelector('nav [aria-current="location"]');
    expect(harness.selectedSection).toBe('Servicios');
    expect(current.textContent.trim()).toBe('Servicios');
  });
});
