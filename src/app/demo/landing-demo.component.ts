import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-landing-demo',
  templateUrl: './landing-demo.component.html',
  standalone: false,
})
export class LandingDemoComponent {
  @Output() readonly feedback = new EventEmitter<string>();

  protected jumpToSection(section: string): void {
    document
      .getElementById(`demo-landing-${section.toLowerCase()}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
