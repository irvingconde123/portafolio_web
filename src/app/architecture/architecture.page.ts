import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, ProjectItem, SequenceStep } from '../data/portfolio-content';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.page.html',
  styleUrls: ['./architecture.page.scss'],
  standalone: false,
})
export class ArchitecturePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected project: ProjectItem = PROJECTS[0];
  protected activeView: 'containers' | 'sequence' | 'resilience' = 'containers';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.project = PROJECTS.find((item) => item.slug === slug) ?? PROJECTS[0];
  }

  protected get sequenceActors(): string[] {
    return this.project.sequence.reduce<string[]>((actors, step) => {
      if (!actors.includes(step.from)) actors.push(step.from);
      if (!actors.includes(step.to)) actors.push(step.to);
      return actors;
    }, []);
  }

  protected sequenceStart(step: SequenceStep): number {
    return Math.min(this.sequencePosition(step.from), this.sequencePosition(step.to));
  }

  protected sequenceWidth(step: SequenceStep): number {
    return Math.max(
      Math.abs(this.sequencePosition(step.to) - this.sequencePosition(step.from)),
      4,
    );
  }

  protected sequenceIsReverse(step: SequenceStep): boolean {
    return this.sequencePosition(step.to) < this.sequencePosition(step.from);
  }

  private sequencePosition(actor: string): number {
    const index = this.sequenceActors.indexOf(actor);
    return ((index + 0.5) / this.sequenceActors.length) * 100;
  }
}
