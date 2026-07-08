import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, ProjectItem } from '../data/portfolio-content';
import { DemoFeedback, DemoSlug } from './demo.models';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  styleUrls: ['./demo.page.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class DemoPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly feedbackDuration = 3000;
  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private feedbackSequence = 0;

  protected slug: DemoSlug = 'adastra';
  protected project?: ProjectItem;
  protected feedback?: DemoFeedback;

  protected get suggestedJourney(): string {
    const journeys: Record<DemoSlug, string> = {
      adastra: 'Revisa un reporte, edítalo, fuerza el modo sin conexión y sincroniza el borrador.',
      landing: 'Explora servicios, acreditaciones y contacto como visitante del laboratorio.',
      cms: 'Edita contenido, medios y SEO; después publica una versión simulada.',
      hostlyc: 'Recorre servicios y proyectos; termina con el diagnóstico de contacto.',
    };
    return journeys[this.slug];
  }

  ngOnInit(): void {
    const candidate = this.route.snapshot.paramMap.get('slug');
    this.slug =
      candidate === 'landing' || candidate === 'cms' || candidate === 'hostlyc'
        ? candidate
        : 'adastra';
    this.project = PROJECTS.find((item) => item.slug === this.slug);
  }

  ngOnDestroy(): void {
    if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
  }

  protected clearFeedback(): void {
    if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
    this.feedback = undefined;
  }

  protected showFeedback(message: string): void {
    if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
    this.feedback = { id: ++this.feedbackSequence, message };
    this.feedbackTimer = setTimeout(() => {
      this.feedback = undefined;
    }, this.feedbackDuration);
  }
}
