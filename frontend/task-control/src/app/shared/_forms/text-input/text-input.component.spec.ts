import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import {
  FormControl,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let fixture: ComponentFixture<TextInputComponent>;
  let component: TextInputComponent;
  let inputElement: DebugElement;
  const simulateUserInput = (value: string) => {
    inputElement.nativeElement.value = value;
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    component.ngControl.control.markAsTouched();
    fixture.detectChanges();
  }

  beforeEach(() => {
    const NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        control = new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ]);
        viewToModelUpdate() {}
      }
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [TextInputComponent],
    }).overrideComponent(TextInputComponent, {
      add: { providers: [NG_CONTROL_PROVIDER] }
    });

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;

    component.label = 'Username';
    inputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should add is-invalid class to an element', waitForAsync(() => {
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(inputElement.nativeElement.classList).toContain('is-invalid');
    });
  }));

  it('should display a required error', waitForAsync(() => {
    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorElement = fixture.debugElement.query(By.css('.text-danger'));
      expect(component.ngControl.control.errors?.required).toBeDefined();
      expect(errorElement.nativeElement.textContent).toContain('Please enter a Username');
    });
  }));

  it('should display a minlength error', waitForAsync(() => {
    simulateUserInput('bbbb');
    fixture.whenStable().then(() => {
        const errorElement = fixture.debugElement.query(By.css('.text-danger'));
        expect(component.ngControl.control.errors?.minlength).toBeDefined();
        expect(errorElement.nativeElement.textContent).toContain('Username must be at least 6 characters long');
      });
  }));

  it('should display a maxlength error', waitForAsync(() => {
    simulateUserInput('bbbbbbbbbbbb');
    fixture.whenStable().then(() => {
        const errorElement = fixture.debugElement.query(By.css('.text-danger'));
        expect(component.ngControl.control.errors?.maxlength).toBeDefined();
        expect(errorElement.nativeElement.textContent).toContain('Username must be at most 10 characters long');
      });
  }));

  it('should not display any errors', waitForAsync(() => {
    simulateUserInput('bbbbbbbb');
    fixture.whenStable().then(() => {
        expect(component.ngControl.control.errors).toBeNull();
        expect(fixture.debugElement.query(By.css('.text-danger'))).toBeNull();
      });
  }));

  it('should display a pattern error', waitForAsync(() => {
    component.ngControl.control.addValidators([Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9]+\\.[a-z]{2,4}$')]);
    simulateUserInput('bobtest.com');
    fixture.whenStable().then(() => {
        const errorElement = fixture.debugElement.query(By.css('.text-danger'));
        expect(component.ngControl.control.errors?.pattern).toBeDefined();
        expect(errorElement.nativeElement.textContent).toContain('Please provide a valid Username');
      });
  }));
});
