import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
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
  let inputElement: DebugElement;
  let paragraphElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFocusComponent, FocusDirective],
    });

    fixture = TestBed.createComponent(TestFocusComponent);
    component = fixture.componentInstance;

    inputElement = fixture.debugElement.query(By.css('input'));
    paragraphElement = fixture.debugElement.query(By.css('p'));

    fixture.detectChanges();
  });

  it('should be initialized', () => {
    expect(inputElement.nativeElement).not.toBeNull();
    expect(paragraphElement.nativeElement).not.toBeNull();
  });

  it('should set focus on an input', waitForAsync(() => {
    spyOn(inputElement.nativeElement, 'focus');
    paragraphElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(inputElement.nativeElement.focus).toHaveBeenCalled();
    });
  }));
});
