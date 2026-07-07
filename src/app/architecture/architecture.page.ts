import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, ProjectItem } from '../data/portfolio-content';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.page.html',
  standalone: false,
})
export class ArchitecturePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected project: ProjectItem = PROJECTS[0];

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.project = PROJECTS.find((item) => item.slug === slug) ?? PROJECTS[0];
  }
}
