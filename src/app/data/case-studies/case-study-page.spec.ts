import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CaseStudyPage } from '../../case-study/case-study.page';
import { findCaseStudy } from '.';

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

  it('selects a Hostlyc flow and updates its content and accessible state', () => {
    routeParams.next(convertToParamMap({ slug: 'hostlyc' }));
    fixture.detectChanges();

    const page = fixture.nativeElement as HTMLElement;
    const flows = findCaseStudy('hostlyc')?.flows ?? [];
    const buttons = page.querySelectorAll<HTMLButtonElement>(
      '.flow-selector button',
    );

    expect(buttons.length).toBeGreaterThan(1);
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
    expect(page.querySelector('#flow-title')?.textContent).toBe(flows[0].title);

    buttons[1].click();
    fixture.detectChanges();

    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-controls')).toBe(
      page.querySelector('.flow-detail')?.id ?? null,
    );
    expect(page.querySelector('#flow-title')?.textContent).toBe(flows[1].title);
    expect(page.querySelectorAll('.flow-detail li').length).toBe(
      flows[1].steps.length,
    );
  });

  it('keeps cases without flows free of flow controls and details', () => {
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('h1')?.textContent).toContain('Adastra');
    expect(page.querySelector('.architecture-flows')).toBeNull();
    expect(page.querySelector('#architecture-flow-detail')).toBeNull();
  });

  it('clears flows between cases and restores the default when returning', () => {
    const page = fixture.nativeElement as HTMLElement;
    routeParams.next(convertToParamMap({ slug: 'hostlyc' }));
    fixture.detectChanges();

    const initialTitle = page.querySelector('#flow-title')?.textContent;
    page.querySelectorAll<HTMLButtonElement>('.flow-selector button')[1].click();
    fixture.detectChanges();
    expect(page.querySelector('#flow-title')?.textContent).not.toBe(initialTitle);

    routeParams.next(convertToParamMap({ slug: 'gateway-datos' }));
    fixture.detectChanges();
    const gateway = findCaseStudy('gateway-datos');
    expect(page.querySelector('h1')?.textContent).toBe(gateway?.displayName ?? gateway?.name);
    expect(page.querySelector('.architecture-flows')).toBeNull();
    expect(page.querySelector('#architecture-flow-detail')).toBeNull();

    routeParams.next(convertToParamMap({ slug: 'hostlyc' }));
    fixture.detectChanges();
    const buttons = page.querySelectorAll<HTMLButtonElement>(
      '.flow-selector button',
    );
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[1].getAttribute('aria-pressed')).toBe('false');
    expect(page.querySelector('#flow-title')?.textContent).toBe(initialTitle);
  });
});
