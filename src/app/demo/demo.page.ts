import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
export class DemoPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('demoViewport') private demoViewport?: ElementRef<HTMLElement>;
  private readonly route = inject(ActivatedRoute);
  private readonly feedbackDuration = 3000;
  private feedbackTimer?: ReturnType<typeof setTimeout>;
  private feedbackSequence = 0;
  private scrollCleanup: Array<() => void> = [];
  private lastTouchY?: number;

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
    this.scrollCleanup.forEach((cleanup) => cleanup());
  }

  ngAfterViewInit(): void {
    const viewport = this.demoViewport?.nativeElement;
    if (!viewport) return;

    const wheelHandler = (event: WheelEvent) => {
      this.redirectDeviceScroll(event, event.deltaY);
    };
    const touchStartHandler = (event: TouchEvent) => {
      this.lastTouchY = event.touches[0]?.clientY;
    };
    const touchMoveHandler = (event: TouchEvent) => {
      const nextY = event.touches[0]?.clientY;
      if (nextY === undefined || this.lastTouchY === undefined) return;
      this.redirectDeviceScroll(event, this.lastTouchY - nextY);
      this.lastTouchY = nextY;
    };
    const touchEndHandler = () => {
      this.lastTouchY = undefined;
    };

    viewport.addEventListener('wheel', wheelHandler, { passive: false });
    viewport.addEventListener('touchstart', touchStartHandler, { passive: true });
    viewport.addEventListener('touchmove', touchMoveHandler, { passive: false });
    viewport.addEventListener('touchend', touchEndHandler, { passive: true });
    viewport.addEventListener('touchcancel', touchEndHandler, { passive: true });

    this.scrollCleanup = [
      () => viewport.removeEventListener('wheel', wheelHandler),
      () => viewport.removeEventListener('touchstart', touchStartHandler),
      () => viewport.removeEventListener('touchmove', touchMoveHandler),
      () => viewport.removeEventListener('touchend', touchEndHandler),
      () => viewport.removeEventListener('touchcancel', touchEndHandler),
    ];
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
    requestAnimationFrame(() => {
      this.demoViewport?.nativeElement.querySelector<HTMLElement>('.demo-window')?.scrollTo({ top: 0 });
    });
  }

  private redirectDeviceScroll(event: WheelEvent | TouchEvent, deltaY: number): void {
    if (Math.abs(deltaY) < 1) return;

    const viewport = this.demoViewport?.nativeElement;
    const demoWindow = viewport?.querySelector<HTMLElement>('.demo-window');
    const target = event.target instanceof HTMLElement ? event.target : null;
    if (!viewport || !demoWindow || !target || !viewport.contains(target)) return;

    const nestedScrollable = this.findScrollableAncestor(target, viewport, demoWindow, deltaY);
    if (nestedScrollable && nestedScrollable !== demoWindow) return;

    if (event.cancelable) event.preventDefault();
    demoWindow.scrollBy({ top: deltaY, behavior: 'auto' });
  }

  private findScrollableAncestor(
    target: HTMLElement,
    viewport: HTMLElement,
    demoWindow: HTMLElement,
    deltaY: number,
  ): HTMLElement {
    let current: HTMLElement | null = target;

    while (current && current !== viewport) {
      if (current !== demoWindow && this.canScrollVertically(current, deltaY)) {
        return current;
      }
      if (current === demoWindow) return demoWindow;
      current = current.parentElement;
    }

    return demoWindow;
  }

  private canScrollVertically(element: HTMLElement, deltaY: number): boolean {
    const overflowY = window.getComputedStyle(element).overflowY;
    if (!['auto', 'scroll'].includes(overflowY)) return false;
    if (element.scrollHeight <= element.clientHeight + 1) return false;

    if (deltaY > 0) {
      return element.scrollTop < element.scrollHeight - element.clientHeight - 1;
    }

    return element.scrollTop > 1;
  }
}
