import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonContent, IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('scrolls the Ionic container to projects from the hero action', async () => {
    const content = fixture.debugElement.query(By.directive(IonContent))
      .componentInstance as IonContent;
    const scrollElement = document.createElement('div');
    Object.defineProperty(scrollElement, 'scrollTop', { value: 0 });
    spyOn(scrollElement, 'getBoundingClientRect').and.returnValue({
      top: 0,
    } as DOMRect);
    spyOn(content, 'getScrollElement').and.resolveTo(scrollElement);
    const scrollSpy = spyOn(content, 'scrollToPoint').and.resolveTo();

    const button = fixture.nativeElement.querySelector(
      '.hero-actions .primary',
    ) as HTMLButtonElement;
    button.click();
    await fixture.whenStable();

    expect(scrollSpy).toHaveBeenCalled();
  });
});
