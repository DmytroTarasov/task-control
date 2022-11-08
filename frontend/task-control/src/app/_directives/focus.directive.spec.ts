import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FocusDirective } from './focus.directive';

@Component({
  template: `
    <input type="text" #inputEl />
    <p [appFocus]="inputEl">Text</p>
  `,
})
class TestFocusComponent {}

describe('Focus Directive', () => {
  let component: TestFocusComponent;
  let fixture: ComponentFixture<TestFocusComponent>;
  let queryInputElement = () =>
    fixture.debugElement.query(By.css('input')).nativeElement;
  let queryParagraphElement = () =>
    fixture.debugElement.query(By.css('p')).nativeElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFocusComponent, FocusDirective],
    });

    fixture = TestBed.createComponent(TestFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be initialized', () => {
    expect(queryInputElement()).not.toBeNull();
    expect(queryParagraphElement()).not.toBeNull();
  });

  it('should set focus on an input', waitForAsync(() => {
    const input = queryInputElement();
    const paragraph = queryParagraphElement();
    spyOn(input, 'focus');
    paragraph.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(input.focus).toHaveBeenCalled();
    });
  }));
});
