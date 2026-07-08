import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hostlyc-demo',
  templateUrl: './hostlyc-demo.component.html',
  standalone: false,
})
export class HostlycDemoComponent {
  @Output() readonly feedback = new EventEmitter<string>();
  protected selectedSection = 'Inicio';

  protected jumpToSection(section: string): void {
    this.selectedSection = section;
    document
      .getElementById(`demo-hostlyc-${section.toLowerCase()}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
