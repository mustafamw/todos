import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TodosAddComponent } from './todos-add.component';
import { FormsModule } from '@angular/forms';
import moment from 'moment';

describe('TodosAddComponent', () => {
  let component: TodosAddComponent;
  let fixture: ComponentFixture<TodosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TodosAddComponent 
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call add method with invalid', () => {
    component.todos = {
      _id: undefined,
      subject: undefined,
      completed: false,
      date: moment().toDate()
    }
    const addSpyOn: jasmine.Spy = spyOn(component, 'add').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosAdded, 'emit').and.callThrough();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.add();
    expect(addSpyOn).toHaveBeenCalled();
    expect(addSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).not.toHaveBeenCalled();
  });

  it('should call add method with valid', () => {
    component.todos = {
      _id: 'ID',
      subject: 'subject',
      completed: false,
      date: moment().toDate()
    }
    component.valid = true;
    const addSpyOn: jasmine.Spy = spyOn(component, 'add').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosAdded, 'emit').and.callThrough();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.add();
    expect(addSpyOn).toHaveBeenCalled();
    expect(addSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).toHaveBeenCalledWith(component.todos);
    expect(emitSpyOn.calls.count()).toBe(1);
    expect(component.todos.subject).toBeUndefined();
  });

  it('should call add method with 1 character subject', () => {
    component.todos = {
      _id: 'ID',
      subject: 'a',
      completed: false,
      date: moment().toDate()
    }
    const addSpyOn: jasmine.Spy = spyOn(component, 'add').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosAdded, 'emit').and.callThrough();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.inputBlur();
    component.add();
    expect(addSpyOn).toHaveBeenCalled();
    expect(addSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).not.toHaveBeenCalled();
  });

  it('should call add method with over 51 character subject', () => {
    component.todos = {
      _id: 'ID',
      subject: 'charactercharactercharactercharactercharactercharactercharactercharactercharactercharactercharacter',
      completed: false,
      date: moment().toDate()
    }
    const addSpyOn: jasmine.Spy = spyOn(component, 'add').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosAdded, 'emit').and.callThrough();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.inputBlur();
    component.add();
    expect(addSpyOn).toHaveBeenCalled();
    expect(addSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).not.toHaveBeenCalled();
  });

  it('should call add method with 50 character subject', () => {
    component.todos = {
      _id: 'ID',
      subject: 'charactercharactercharactercharactercharacterchara',
      completed: false,
      date: moment().toDate()
    }
    const addSpyOn: jasmine.Spy = spyOn(component, 'add').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosAdded, 'emit').and.callThrough();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.inputBlur();
    component.add();
    expect(addSpyOn).toHaveBeenCalled();
    expect(addSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).toHaveBeenCalledWith(component.todos);
    expect(emitSpyOn.calls.count()).toBe(1);
    expect(component.todos.subject).toBeUndefined();
  });

  it('should call inputFocus method', () => {
    const inputFocusSpyOn: jasmine.Spy = spyOn(component, 'inputFocus').and.callThrough();
    expect(component.valid).toBeUndefined();
    component.valid = false;
    expect(component.valid).toBeFalsy();
    component.valid = true;
    expect(component.valid).toBeTruthy();
    expect(inputFocusSpyOn).not.toHaveBeenCalled();
    component.inputFocus();
    expect(component.valid).toBeUndefined();
    expect(inputFocusSpyOn).toHaveBeenCalledWith();
    expect(inputFocusSpyOn.calls.count()).toBe(1);
  });

  it('should call inputBlur method', () => {
    const inputBlurSpyOn: jasmine.Spy = spyOn(component, 'inputBlur').and.callThrough();
    component.todos = {
      _id: 'ID',
      subject: 'test',
      completed: false,
      date: moment().toDate()
    }
    expect(component.valid).toBeUndefined();
    expect(inputBlurSpyOn).not.toHaveBeenCalled();
    component.inputBlur();
    expect(inputBlurSpyOn).toHaveBeenCalledWith();
    expect(inputBlurSpyOn.calls.count()).toBe(1);
    expect(component.valid).toBeTruthy();
  });

  it('should call inputBlur method with undefined', () => {
    const inputBlurSpyOn: jasmine.Spy = spyOn(component, 'inputBlur').and.callThrough();
    component.todos = {
      _id: 'ID',
      subject: undefined,
      completed: false,
      date: moment().toDate()
    }
    expect(component.valid).toBeUndefined();
    expect(inputBlurSpyOn).not.toHaveBeenCalled();
    component.inputBlur();
    expect(inputBlurSpyOn).toHaveBeenCalledWith();
    expect(inputBlurSpyOn.calls.count()).toBe(1);
    expect(component.valid).toBeUndefined();
  });

  it('should call inputBlur method with false valid', () => {
    const inputBlurSpyOn: jasmine.Spy = spyOn(component, 'inputBlur').and.callThrough();
    component.todos = {
      _id: 'ID',
      subject: 's',
      completed: false,
      date: moment().toDate()
    }
    expect(component.valid).toBeUndefined();
    expect(inputBlurSpyOn).not.toHaveBeenCalled();
    component.inputBlur();
    expect(inputBlurSpyOn).toHaveBeenCalledWith();
    expect(inputBlurSpyOn.calls.count()).toBe(1);
    expect(component.valid).toBeFalsy();
  });
});
