import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let fixture: ComponentFixture<FilterComponent>;
  let component: FilterComponent;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent]
    });

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;

    component.selectOptions = [
      { value: 'name', name: 'Name' },
      { value: 'created_at', name: 'Created at' }
    ];

    inputElement = fixture.debugElement.query(By.css('.filter-input'));
    fixture.detectChanges();
  });

  it('should display 2 options inside a select element', () => {
    expect(fixture.debugElement.queryAll(By.css('option')).length).toBe(2);
  });

  it('should call notifySort, emit a sortEvent and call setElementColor', waitForAsync(() => {
    spyOn(component, 'notifySort').and.callThrough();
    spyOn(component, 'setElementColor').and.callFake(() => {});
    spyOn(component.sortEvent, 'emit').and.callFake(() => {});
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(component.notifySort).toHaveBeenCalledTimes(1);
      expect(component.setElementColor).toHaveBeenCalledTimes(3);
      expect(component.sortEvent.emit).toHaveBeenCalledTimes(1);
    });
  }));

  it('should call notifyFilter and emit a filterEvent', waitForAsync(() => {
    spyOn(component, 'notifyFilter').and.callThrough();
    spyOn(component.filterEvent, 'emit').and.callFake(() => {});
    const buttonElement = fixture.debugElement.queryAll(By.css('button'))[2];
    buttonElement.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(component.notifyFilter).toHaveBeenCalledWith(
        inputElement.nativeElement.value
      );
      expect(component.filterEvent.emit).toHaveBeenCalledTimes(1);
    });
  }));

  it('should call notifyResetFilter, emit a resetEvent and call setElementColor', waitForAsync(() => {
    spyOn(component, 'notifyResetFilter').and.callThrough();
    spyOn(component, 'setElementColor').and.callFake(() => {});
    spyOn(component.resetEvent, 'emit').and.callFake(() => {});
    const buttonElement = fixture.debugElement.queryAll(By.css('button'))[3];
    buttonElement.nativeElement.click();
    fixture.whenStable().then(() => {
      expect(component.notifyResetFilter).toHaveBeenCalledTimes(1);
      expect(component.resetEvent.emit).toHaveBeenCalledTimes(1);
      expect(component.setElementColor).toHaveBeenCalledTimes(2);
    });
  }));
});
