import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CaseStudyPage } from '../../case-study/case-study.page';

describe('CaseStudyPage', () => {
  let fixture: ComponentFixture<CaseStudyPage>;
  let routeParams: BehaviorSubject<ParamMap>;

  beforeEach(async () => {
    routeParams = new BehaviorSubject(convertToParamMap({ slug: 'adastra' }));

    await TestBed.configureTestingModule({
      declarations: [CaseStudyPage],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: routeParams.asObservable() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyPage);
    fixture.detectChanges();
  });

  it('renders a published case from its slug without calling the map C4', () => {
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('h1')?.textContent).toContain('Adastra');
    expect(page.textContent).not.toContain('C4');
  });

  it('renders the not-found state for an unknown slug', () => {
    routeParams.next(convertToParamMap({ slug: 'not-published' }));
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.not-found h1').textContent,
    ).toContain('no está publicada');
  });

  it('exposes all semantic node labels in the architecture map', () => {
    const page = fixture.nativeElement as HTMLElement;
    const labels = Array.from(
      page.querySelectorAll<HTMLElement>('.architecture-nodes small'),
    ).map((element) => element.textContent?.trim());

    expect(labels).toContain('Actor');
    expect(labels).toContain('Sistema');
    expect(labels).toContain('Contenedor');
    expect(labels).toContain('Componente');
    expect(labels).toContain('Datos');
    expect(labels).toContain('Dependencia externa');
  });

  it('builds an encoded repository URL for public evidence', () => {
    const link = fixture.nativeElement.querySelector(
      '.evidence-section a',
    ) as HTMLAnchorElement;

    expect(link.href).toBe(
      'https://github.com/irvingconde123/portafolio_web/blob/main/' +
        'src/app/data/code-evidence/hybrid-sync-orchestrator.ts',
    );
    expect(link.rel).toContain('noopener');
    expect(link.getAttribute('aria-label')).toContain('pestaña nueva');
  });

  it('renders architecture contracts as an accessible table', () => {
    const table = (fixture.nativeElement as HTMLElement).querySelector(
      '.architecture-edges table',
    ) as HTMLTableElement;

    expect(table.querySelector('caption')?.textContent).toContain(
      'Contratos entre elementos',
    );
    expect(table.querySelectorAll('thead th[scope="col"]').length).toBe(3);
    expect(
      table.querySelectorAll('tbody th[scope="row"]').length,
    ).toBeGreaterThan(0);
  });
});
