import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CmsDemoComponent } from './cms-demo.component';

interface CmsHarness {
  cmsVersion: number;
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
});
