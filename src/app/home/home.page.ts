import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
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
  @ViewChild(IonContent) private content?: IonContent;

  protected readonly experiences = EXPERIENCES;
  protected readonly caseStudies = CASE_STUDIES;
  protected readonly skillGroups = SKILL_GROUPS;
  protected mobileMenuOpen = false;

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  protected async scrollTo(sectionId: string): Promise<void> {
    this.mobileMenuOpen = false;
    const target = document.getElementById(sectionId);
    const scrollElement = await this.content?.getScrollElement();

    if (!target || !scrollElement || !this.content) {
      return;
    }

    const top =
      target.getBoundingClientRect().top -
      scrollElement.getBoundingClientRect().top +
      scrollElement.scrollTop -
      72;

    await this.content.scrollToPoint(0, Math.max(0, top), 420);
  }
}
