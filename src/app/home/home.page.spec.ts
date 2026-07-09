import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('scrolls the document to projects from the hero action', () => {
    const scrollSpy = spyOn(window, 'scrollTo');

    const button = fixture.nativeElement.querySelector(
      '.hero-actions .primary',
    ) as HTMLButtonElement;
    button.click();

    expect(scrollSpy).toHaveBeenCalled();
  });
});
