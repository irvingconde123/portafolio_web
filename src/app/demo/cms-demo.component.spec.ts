import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CmsDemoComponent } from './cms-demo.component';

interface CmsHarness {
  cmsEditing: string | null;
  cmsVersion: number;
  closeEditorWithKeyboard(): void;
  openCmsEditor(label: string, value: string): void;
  publishCms(): void;
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
