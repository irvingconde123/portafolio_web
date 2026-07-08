import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../../environments/environment';
import { CASE_STUDY_PATHS, SEO_ROUTES, SeoRouteConfig } from './seo-route.config';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly title = inject(Title);

  initialize(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.apply(event.urlAfterRedirects));
  }

  private apply(rawUrl: string): void {
    const path = this.normalizePath(rawUrl);
    const config = SEO_ROUTES[path] ?? SEO_ROUTES['/'];
    const canonicalUrl = `${environment.canonicalUrl}${path === '/' ? '/' : path}`;

    this.title.setTitle(config.title);
    this.setName('description', config.description);
    this.setName('robots', environment.robots);
    this.setProperty('og:type', config.type);
    this.setProperty('og:title', config.title);
    this.setProperty('og:description', config.description);
    this.setProperty('og:url', canonicalUrl);
    this.setProperty('og:locale', 'es_MX');
    this.setName('twitter:card', 'summary');
    this.setName('twitter:title', config.title);
    this.setName('twitter:description', config.description);
    this.setCanonical(canonicalUrl);
    this.setStructuredData();
  }

  private normalizePath(rawUrl: string): string {
    const path = rawUrl.split(/[?#]/, 1)[0].replace(/\/$/, '');
    return path || '/';
  }

  private setName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  private setStructuredData(): void {
    const id = 'portfolio-structured-data';
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          name: 'Irving Conde',
          jobTitle: 'Full Stack Engineer',
          url: `${environment.canonicalUrl}/`,
        },
        {
          '@type': 'ItemList',
          name: 'Casos de estudio de ingeniería de software',
          itemListElement: CASE_STUDY_PATHS.map((path, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${environment.canonicalUrl}${path}`,
          })),
        },
      ],
    });
  }
}
