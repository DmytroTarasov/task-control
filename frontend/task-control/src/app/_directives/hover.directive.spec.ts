import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HoverDirective } from './hover.directive';

@Component({
  template: `
    <div #wrapper class="hide"></div>
    <h3 [appHover]="wrapper">Text1</h3>
  `,
})
class TestHoverComponent {}

describe('Hover Directive', () => {
  let component: TestHoverComponent;
  let fixture: ComponentFixture<TestHoverComponent>;
  let divElement: DebugElement;
  let headingElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverComponent, HoverDirective],
    });

    fixture = TestBed.createComponent(TestHoverComponent);
    component = fixture.componentInstance;

    divElement = fixture.debugElement.query(By.css('div'));
    headingElement = fixture.debugElement.query(By.css('h3'));

    fixture.detectChanges();
  });

  it('should be initialized', () => {
    expect(divElement).not.toBeNull();
    expect(headingElement).not.toBeNull();
    expect(divElement.nativeElement.classList).toContain('hide');
  });

  it('should handle mouseenter event', waitForAsync(() => {
    headingElement.nativeElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(divElement.nativeElement.classList).not.toContain('hide');
      expect(headingElement.nativeElement.classList).toContain('hide-text');
    });
  }));

  it('should handle mouseleave event', waitForAsync(() => {
    headingElement.nativeElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(divElement.nativeElement.classList).toContain('hide');
      expect(headingElement.nativeElement.classList).not.toContain('hide-text');
    });
  }));
});
