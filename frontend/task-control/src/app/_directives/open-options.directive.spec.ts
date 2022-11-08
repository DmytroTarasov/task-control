import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OpenOptionsDirective } from './open-options.directive';

@Component({
  template: `
    <ul #options class="hide">
      <li>option1</li>
      <li>option2</li>
    </ul>
    <button [appOpenOptions]="options">open options</button>
  `,
})
class TestOpenOptionsComponent {}

describe('OpenOptions Directive', () => {
  let component: TestOpenOptionsComponent;
  let fixture: ComponentFixture<TestOpenOptionsComponent>;
  let listELement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOpenOptionsComponent, OpenOptionsDirective],
    });

    fixture = TestBed.createComponent(TestOpenOptionsComponent);
    component = fixture.componentInstance;

    listELement = fixture.debugElement.query(By.css('ul'));
    buttonElement = fixture.debugElement.query(By.css('button'));

    fixture.detectChanges();
  });

  it('should be initialized', () => {
    expect(listELement).not.toBeNull();
    expect(buttonElement).not.toBeNull();
  });

  it('should remove hide class from list element', waitForAsync(() => {
    buttonElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(listELement.nativeElement.classList).not.toContain('hide');
    });
  }));

  it('should not remove hide class from list element', waitForAsync(() => {
    buttonElement.nativeElement.dispatchEvent(new Event('click'));
    buttonElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(listELement.nativeElement.classList).toContain('hide');
    });
  }));
});
