import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighlightButtonDirective } from './highlight-button.directive';

@Component({
  template: `
    <button id='button1' #button1 [appHighlightButton]="button2">button1</button>
    <button id='button2' #button2>button2</button>
  `,
})
class TestHighLightButtonComponent {}

describe('HighLightButton Directive', () => {
  let component: TestHighLightButtonComponent;
  let fixture: ComponentFixture<TestHighLightButtonComponent>;
  let queryButtonElement = (id: string) =>
    fixture.debugElement.query(By.css(id)).nativeElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHighLightButtonComponent, HighlightButtonDirective],
    });

    fixture = TestBed.createComponent(TestHighLightButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set appropriate colors on both buttons', waitForAsync(() => {
    const button1 = queryButtonElement('#button1');
    const button2 = queryButtonElement('#button2');
    button1.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(button1.style.backgroundColor).toBe('rgb(199, 200, 190)');
      expect(button2.style.backgroundColor).toBe('rgb(240, 240, 240)');
    });
  }));
});
