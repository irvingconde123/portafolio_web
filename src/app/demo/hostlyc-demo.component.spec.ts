import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HostlycDemoComponent } from './hostlyc-demo.component';

interface HostlycHarness {
  selectedSection: string;
}

describe('HostlycDemoComponent', () => {
  let fixture: ComponentFixture<HostlycDemoComponent>;
  let harness: HostlycHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [HostlycDemoComponent] }).compileComponents();
    fixture = TestBed.createComponent(HostlycDemoComponent);
    harness = fixture.componentInstance as unknown as HostlycHarness;
    fixture.detectChanges();
  });

  it('keeps navigation state synchronized with the selected section', () => {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('nav div button'));
    buttons.find((button) => button.textContent?.trim() === 'Contacto')?.click();
    fixture.detectChanges();

    const current = fixture.nativeElement.querySelector('nav [aria-current="location"]');
    expect(harness.selectedSection).toBe('Contacto');
    expect(current.textContent.trim()).toBe('Contacto');
  });
});
