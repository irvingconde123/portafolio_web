import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CmsDemoComponent } from './cms-demo.component';

interface CmsHarness {
  activeSiteSlug: string;
  cmsSites: Array<{ name: string; slug: string }>;
  cmsEditing: string | null;
  cmsVersion: number;
  closeEditorWithKeyboard(): void;
  openCmsEditor(label: string, value: string): void;
  publishCms(): void;
  selectSite(site: { name: string; slug: string }): void;
}

describe('CmsDemoComponent', () => {
  let fixture: ComponentFixture<CmsDemoComponent>;
  let harness: CmsHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsDemoComponent],
      imports: [FormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CmsDemoComponent);
    harness = fixture.componentInstance as unknown as CmsHarness;
  });

  it('publishes a new editorial version', () => {
    const initialVersion = harness.cmsVersion;
    harness.publishCms();
    expect(harness.cmsVersion).toBe(initialVersion + 1);
  });

  it('changes the editable project context from the welcome dashboard', () => {
    const nextSite = harness.cmsSites[1];
    harness.selectSite(nextSite);
    fixture.detectChanges();

    expect(harness.activeSiteSlug).toBe(nextSite.slug);
    expect(fixture.nativeElement.textContent).toContain(nextSite.name);
  });

  it('provides an accessible editor dialog that Escape can close', () => {
    harness.openCmsEditor('Editar página', 'Inicio');
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('.cms-modal');
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.querySelector('[aria-label="Cerrar editor"]')).not.toBeNull();

    harness.closeEditorWithKeyboard();
    fixture.detectChanges();
    expect(harness.cmsEditing).toBeNull();
    expect(fixture.nativeElement.querySelector('.cms-modal')).toBeNull();
  });
});
