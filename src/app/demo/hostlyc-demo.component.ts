import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hostlyc-demo',
  templateUrl: './hostlyc-demo.component.html',
  standalone: false,
})
export class HostlycDemoComponent {
  @Output() readonly feedback = new EventEmitter<string>();
  protected selectedSection = 'Inicio';
  protected mobileMenuOpen = false;

  protected jumpToSection(section: string): void {
    this.selectedSection = section;
    this.mobileMenuOpen = false;
    const target = document.getElementById(
      `demo-hostlyc-${section.toLowerCase()}`,
    );
    const scrollContainer = target?.closest<HTMLElement>('.demo-window');

    if (!target || !scrollContainer) return;

    const stickyNavigation =
      scrollContainer.querySelector<HTMLElement>(':scope > nav');
    const targetTop = target.offsetTop - (stickyNavigation?.offsetHeight ?? 0);
    scrollContainer.scrollTo({
      behavior: 'smooth',
      top: Math.max(0, targetTop),
    });
  }

  protected notify(message: string): void {
    this.feedback.emit(message);
  }
}
