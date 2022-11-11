import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { By } from '@angular/platform-browser';

import { ModalComponent } from './modal.component';
import { AppState } from '../../store/app.reducer';
import { getModalOpen } from './store/modal.selectors';
import * as ModalActions from './store/modal.actions';
import * as BoardsActions from '../../boards/store/board.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../_forms/text-input/text-input.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;
  let store: MockStore<AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ModalComponent, TextInputComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;

    store.overrideSelector(getModalOpen, true);
    component.modalHeader = 'Create board';
    component.btnSubmitText = 'Create';
    component.mode = 'board';
    component.formInputNames = ['name', 'description'];
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should display the modal', () => {
    const modalElement = fixture.debugElement.query(By.css('.modal-wrapper'));
    expect(modalElement).not.toBeNull();
  });

  it('should have open class', () => {
    const modalElement = fixture.debugElement.query(By.css('.modal-wrapper'));
    expect(modalElement.nativeElement.classList).toContain('open');
  });

  it('should call close method inside a component', waitForAsync(() => {
    spyOn(component, 'close').and.callThrough();
    spyOn(component.form, 'reset').and.callThrough();
    const closeBtnElement = fixture.debugElement.query(
      By.css('button[type="button"]')
    );
    closeBtnElement.nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.close).toHaveBeenCalledTimes(1);
      expect(component.form.reset).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(ModalActions.closeModal());
    });
  }));

  it('should display modal header', () => {
    const headerElement = fixture.debugElement.query(By.css('.modal-header'));
    expect(headerElement.nativeElement.textContent).toBe('Create board');
  });

  it('should display submit button', () => {
    const btnSubmitElement = fixture.debugElement.query(
      By.css('button[type="submit"]')
    );
    expect(btnSubmitElement.nativeElement.textContent).toBe('Create');
  });

  it('should dispatch createBoard action', waitForAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});
    const formElement = fixture.debugElement.query(By.css('.form'));
    formElement.nativeElement.dispatchEvent(new Event('submit'));
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
      expect(component.close).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardsActions.createBoard({ board: component.form.value })
      );
    });
  }));

  it('should dispatch createTask action', waitForAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(component, 'close').and.callFake(() => {});
    component.mode = 'task';
    component.formInputNames = ['name'];
    component.taskStatus = 'Todo';
    fixture.detectChanges();
    const formElement = fixture.debugElement.query(By.css('.form'));
    formElement.nativeElement.dispatchEvent(new Event('submit'));
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
      expect(component.close).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(
        BoardsActions.createTask({
          ...component.form.value,
          status: component.taskStatus
        })
      );
    });
  }));
});
