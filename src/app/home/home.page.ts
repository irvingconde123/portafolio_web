import { Component } from '@angular/core';
import {
  CASE_STUDIES,
  EXPERIENCES,
  SKILL_GROUPS,
} from '../data/portfolio-content';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: false,
})
export class HomePage {
  protected readonly experiences = EXPERIENCES;
  protected readonly caseStudies = CASE_STUDIES;
  protected readonly skillGroups = SKILL_GROUPS;
  protected mobileMenuOpen = false;

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected scrollTo(sectionId: string): void {
    this.mobileMenuOpen = false;
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - 72;

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }
}
