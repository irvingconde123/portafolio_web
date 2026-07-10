import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, ProjectItem } from '../data/portfolio-content';
import { DemoFeedback, DemoSlug, DemoViewport } from './demo.models';

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
  protected viewport: DemoViewport = 'desktop';

  protected get suggestedJourney(): string {
    const journeys: Record<DemoSlug, string> = {
      adastra: 'Cambia de módulo, edita un reporte y prueba la sincronización sin red.',
      landing: 'Recorre una landing alimentada por CMS con respaldo local.',
      cms: 'Edita un bloque, cambia de módulo y publica una versión simulada.',
      hostlyc: 'Explora servicios, proyectos y rutas de contacto verificables.',
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

  protected selectViewport(viewport: DemoViewport): void {
    this.viewport = viewport;
  }
}
