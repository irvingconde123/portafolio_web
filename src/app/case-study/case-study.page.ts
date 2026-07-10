import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ArchitectureNodeKind,
  CaseStudy,
  findCaseStudy,
  hasValidArchitecture,
} from '../data/portfolio-content';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.page.html',
  styleUrls: ['./case-study.page.scss'],
  standalone: false,
})
export class CaseStudyPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private routeSubscription?: Subscription;

  protected caseStudy?: CaseStudy;
  protected architectureIsValid = false;

  private readonly kindLabels: Record<ArchitectureNodeKind, string> = {
    actor: 'Actor',
    system: 'Sistema',
    container: 'Contenedor',
    component: 'Componente',
    datastore: 'Datos',
    external: 'Dependencia externa',
  };

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      this.caseStudy = findCaseStudy(params.get('slug'));
      this.architectureIsValid = this.caseStudy
        ? hasValidArchitecture(this.caseStudy)
        : false;
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  protected kindLabel(kind: ArchitectureNodeKind): string {
    return this.kindLabels[kind];
  }

  protected evidenceUrl(source: string): string {
    if (/^https?:\/\//.test(source)) return source;

    const repositoryPath = source
      .replace(/^\/+/, '')
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    return `https://github.com/irvingconde123/portafolio_web/blob/main/${repositoryPath}`;
  }
}
