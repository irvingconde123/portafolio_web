import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-landing-demo',
  templateUrl: './landing-demo.component.html',
  standalone: false,
})
export class LandingDemoComponent {
  @Output() readonly feedback = new EventEmitter<string>();
  protected selectedSection = 'Inicio';
  protected mobileMenuOpen = false;

  protected jumpToSection(section: string): void {
    this.selectedSection = section;
    this.mobileMenuOpen = false;
    document
      .getElementById(`demo-landing-${section.toLowerCase()}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
