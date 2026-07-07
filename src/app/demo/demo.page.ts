import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PROJECTS, ProjectItem } from '../data/portfolio-content';

type DemoSlug = 'adastra' | 'landing' | 'cms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.page.html',
  standalone: false,
})
export class DemoPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  protected slug: DemoSlug = 'adastra';
  protected project?: ProjectItem;
  protected offline = false;
  protected selectedSection = 'Inicio';
  protected reportStatus = 'Pendiente';

  ngOnInit(): void {
    const candidate = this.route.snapshot.paramMap.get('slug');
    this.slug =
      candidate === 'landing' || candidate === 'cms' ? candidate : 'adastra';
    this.project = PROJECTS.find((item) => item.slug === this.slug);
  }

  protected toggleConnection(): void {
    this.offline = !this.offline;
  }

  protected advanceReport(): void {
    this.reportStatus =
      this.reportStatus === 'Pendiente' ? 'En curso' : 'Completado';
  }
}
