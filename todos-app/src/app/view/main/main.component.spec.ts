import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MainComponent } from './main.component';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';
import { CompletedComponent } from 'src/app/components/completed/completed.component';
import { TodosAddComponent } from 'src/app/components/todos-add/todos-add.component';
import { TodosListComponent } from 'src/app/components/todos-list/todos-list.component';
import { TodosItemComponent } from 'src/app/components/todos-list/todos-item/todos-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TodosService } from 'src/app/services/todos/todos.service';
import { Observable, of, throwError } from 'rxjs';
import { Todos } from 'src/app/interfaces/todos';
import moment from 'moment';
import { TodosEmit } from 'src/app/interfaces/todosEmit';

const todosListMock: Array<Todos> = [{
  completed: false,
  _id: 'ID',
  date: moment().toDate(),
  subject: 'test'
}];

fdescribe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let todosService: TodosService;
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MainComponent,
        AlertsComponent,
        CompletedComponent,
        TodosListComponent,
        TodosAddComponent ,
        TodosItemComponent
      ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    todosService = TestBed.get(TodosService);
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit method', fakeAsync(() => {
    const ngOnInitSpyOn: jasmine.Spy = spyOn(component, 'ngOnInit').and.callThrough();
    const todosSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.returnValue(of(todosListMock));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(ngOnInitSpyOn).not.toHaveBeenCalled();
    expect(todosSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.loaded).toBeFalsy();
    tick();
    component.ngOnInit();
    expect(ngOnInitSpyOn).toHaveBeenCalledWith();
    expect(ngOnInitSpyOn.calls.count()).toBe(1);
    expect(todosSpyOn).toHaveBeenCalledWith();
    expect(todosSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.loaded).toBeTruthy();
    expect(component.todosList).toEqual(todosListMock);
    expect(component.completedTask).toEqual({
      all: 1,
      done: 0,
      undone: 1
    })
  }));

  it('should call ngOnInit method with error response', fakeAsync(() => {
    const error = {
      error: {
        message: 'Error'
      }
    }
    const ngOnInitSpyOn: jasmine.Spy = spyOn(component, 'ngOnInit').and.callThrough();
    const todosSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.returnValue(throwError(error));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(ngOnInitSpyOn).not.toHaveBeenCalled();
    expect(todosSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.loaded).toBeFalsy();
    tick();
    component.ngOnInit();
    expect(ngOnInitSpyOn).toHaveBeenCalledWith();
    expect(ngOnInitSpyOn.calls.count()).toBe(1);
    expect(todosSpyOn).toHaveBeenCalledWith();
    expect(todosSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).toHaveBeenCalledWith({
      type: 'warn',
      message: 'Technical Error Please Try Again Later'
    });
    expect(appendMessagesSpyOn.calls.count()).toBe(1);
    expect(component.loaded).toBeTruthy();
    expect(component.todosList).toEqual([]);
    expect(component.completedTask).toEqual({
      all: 0,
      done: 0,
      undone: 0
    })
  }));

  it('should call ngOnInit method with error response "Record Not Found"', fakeAsync(() => {
    const error = {
      error: {
        message: 'Record Not Found'
      }
    }
    const ngOnInitSpyOn: jasmine.Spy = spyOn(component, 'ngOnInit').and.callThrough();
    const todosSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.returnValue(throwError(error));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(ngOnInitSpyOn).not.toHaveBeenCalled();
    expect(todosSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.loaded).toBeFalsy();
    tick();
    component.ngOnInit();
    expect(ngOnInitSpyOn).toHaveBeenCalledWith();
    expect(ngOnInitSpyOn.calls.count()).toBe(1);
    expect(todosSpyOn).toHaveBeenCalledWith();
    expect(todosSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.loaded).toBeTruthy();
    expect(component.todosList).toEqual([]);
    expect(component.completedTask).toEqual({
      all: 0,
      done: 0,
      undone: 0
    })
  }));


  it('should call todosAdd method', fakeAsync(() => {
    const todos: Todos = {
      completed: true,
      _id: 'ID',
      date: moment().toDate(),
      subject: 'test'
    }
    const todosAddSpyOn: jasmine.Spy = spyOn(component, 'todosAdd').and.callThrough();
    const addSpyOn: jasmine.Spy = spyOn(todosService, 'add').and.returnValue(of('test'));
    const todosSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.returnValue(of([todos]));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(todosAddSpyOn).not.toHaveBeenCalled();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(todosSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    component.todosAdd(todos);
    tick();
    expect(todosAddSpyOn).toHaveBeenCalledWith(todos);
    expect(todosAddSpyOn.calls.count()).toBe(1);
    expect(addSpyOn).toHaveBeenCalledWith(todos);
    expect(addSpyOn.calls.count()).toBe(1);
    expect(todosSpyOn).toHaveBeenCalledWith();
    expect(todosSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.loaded).toBeTruthy();
    expect(component.todosList).toEqual([todos]);
    expect(component.completedTask).toEqual({
      all: 1,
      done: 1,
      undone: 0
    })
  }));

  it('should call todosAdd method with error response', fakeAsync(() => {
    const todos: Todos = {
      completed: true,
      _id: 'ID',
      date: moment().toDate(),
      subject: 'test'
    }
    const todosAddSpyOn: jasmine.Spy = spyOn(component, 'todosAdd').and.callThrough();
    const addSpyOn: jasmine.Spy = spyOn(todosService, 'add').and.returnValue(throwError('error'));
    const todosSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.returnValue(throwError('error'));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(todosAddSpyOn).not.toHaveBeenCalled();
    expect(addSpyOn).not.toHaveBeenCalled();
    expect(todosSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    component.todosAdd(todos);
    tick();
    expect(todosAddSpyOn).toHaveBeenCalledWith(todos);
    expect(todosAddSpyOn.calls.count()).toBe(1);
    expect(addSpyOn).toHaveBeenCalledWith(todos);
    expect(addSpyOn.calls.count()).toBe(1);
    expect(todosSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).toHaveBeenCalledWith({
      type: 'warn',
      message: 'Technical Error Please Try Again Later'
    });
    expect(appendMessagesSpyOn.calls.count()).toBe(1);
    expect(component.loaded).toBeTruthy();
    expect(component.todosList).toEqual([]);
    expect(component.completedTask).toEqual({
      all: 0,
      done: 0,
      undone: 0
    });
  }));


  it('should call todosUpdated method with complete type', fakeAsync(() => {
    component.todosList = JSON.parse(JSON.stringify(todosListMock));
    const todosEmit: TodosEmit = {
      todos: component.todosList[0],
      type: 'complete',
      index: 1
    }
    const todosUpdatedSpyOn: jasmine.Spy = spyOn(component, 'todosUpdated').and.callThrough();
    const updateSpyOn: jasmine.Spy = spyOn(todosService, 'update').and.returnValue(of(component.todosList));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(todosUpdatedSpyOn).not.toHaveBeenCalled();
    expect(updateSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList[0].completed).toBeFalsy();
    component.todosUpdated(todosEmit);
    expect(todosUpdatedSpyOn).toHaveBeenCalledWith(todosEmit);
    expect(todosUpdatedSpyOn.calls.count()).toBe(1);
    expect(updateSpyOn).toHaveBeenCalledWith(component.todosList[0]);
    expect(updateSpyOn.calls.count()).toBe(1);
    expect(component.todosList[0].completed).toBeTruthy();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.completedTask).toEqual({
      all: 1,
      done: 1,
      undone: 0
    });
  }));

  it('should call todosUpdated method with complete type & error response', fakeAsync(() => {
    component.todosList = JSON.parse(JSON.stringify(todosListMock));
    const todosEmit: TodosEmit = {
      todos: component.todosList[0],
      type: 'complete',
      index: 1
    }
    const todosUpdatedSpyOn: jasmine.Spy = spyOn(component, 'todosUpdated').and.callThrough();
    const updateSpyOn: jasmine.Spy = spyOn(todosService, 'update').and.returnValue(throwError('error'));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(todosUpdatedSpyOn).not.toHaveBeenCalled();
    expect(updateSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList[0].completed).toBeFalsy();
    component.todosUpdated(todosEmit);
    expect(todosUpdatedSpyOn).toHaveBeenCalledWith(todosEmit);
    expect(todosUpdatedSpyOn.calls.count()).toBe(1);
    expect(updateSpyOn).toHaveBeenCalledWith(component.todosList[0]);
    expect(updateSpyOn.calls.count()).toBe(1);
    expect(component.todosList[0].completed).toBeFalsy();
    expect(appendMessagesSpyOn).toHaveBeenCalledWith({
      type: 'warn',
      message: 'Technical Error Please Try Again Later'
    });
    expect(appendMessagesSpyOn.calls.count()).toBe(1);
    expect(component.completedTask).toEqual({
      all: 1,
      done: 0,
      undone: 1
    });
  }));

  it('should call todosUpdated method with delete type', fakeAsync(() => {
    component.todosList = JSON.parse(JSON.stringify(todosListMock));
    const todosEmit: TodosEmit = {
      todos: component.todosList[0],
      type: 'delete',
      index: 0
    }
    const todosUpdatedSpyOn: jasmine.Spy = spyOn(component, 'todosUpdated').and.callThrough();
    const deleteIdSpyOn: jasmine.Spy = spyOn(todosService, 'deleteId').and.returnValue(of(component.todosList));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(todosUpdatedSpyOn).not.toHaveBeenCalled();
    expect(deleteIdSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList.length).toBe(1);
    component.todosUpdated(todosEmit);
    expect(todosUpdatedSpyOn).toHaveBeenCalledWith(todosEmit);
    expect(todosUpdatedSpyOn.calls.count()).toBe(1);
    expect(deleteIdSpyOn).toHaveBeenCalledWith('ID');
    expect(deleteIdSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList.length).toBe(0);
    expect(component.completedTask).toEqual({
      all: 0,
      done: 0,
      undone: 0
    });
  }));


  it('should call todosUpdated method with delete type with error response', fakeAsync(() => {
    component.todosList = JSON.parse(JSON.stringify(todosListMock));
    const todosEmit: TodosEmit = {
      todos: component.todosList[0],
      type: 'delete',
      index: 0
    }
    const todosUpdatedSpyOn: jasmine.Spy = spyOn(component, 'todosUpdated').and.callThrough();
    const deleteIdSpyOn: jasmine.Spy = spyOn(todosService, 'deleteId').and.returnValue(throwError('error'));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(todosUpdatedSpyOn).not.toHaveBeenCalled();
    expect(deleteIdSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList.length).toBe(1);
    component.todosUpdated(todosEmit);
    expect(todosUpdatedSpyOn).toHaveBeenCalledWith(todosEmit);
    expect(todosUpdatedSpyOn.calls.count()).toBe(1);
    expect(deleteIdSpyOn).toHaveBeenCalledWith('ID');
    expect(deleteIdSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).toHaveBeenCalledWith({
      type: 'warn',
      message: 'Technical Error Please Try Again Later'
    });
    expect(appendMessagesSpyOn.calls.count()).toBe(1);
    expect(component.todosList.length).toBe(1);
    expect(component.completedTask).toEqual({
      all: 1,
      done: 0,
      undone: 1
    });
  }));

  it('should call deleteAll method', fakeAsync(() => {
    let event: Event;
    component.todosList = JSON.parse(JSON.stringify(todosListMock));
    const deleteAllSpyOn: jasmine.Spy = spyOn(component, 'deleteAll').and.callThrough();
    const serviceDeleteAllSpyOn: jasmine.Spy = spyOn(todosService, 'deleteAll').and.returnValue(of(component.todosList));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(deleteAllSpyOn).not.toHaveBeenCalled();
    expect(serviceDeleteAllSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList.length).toBe(1);
    component.deleteAll(event);
    expect(deleteAllSpyOn).toHaveBeenCalledWith(event);
    expect(deleteAllSpyOn.calls.count()).toBe(1);
    expect(serviceDeleteAllSpyOn).toHaveBeenCalledWith();
    expect(serviceDeleteAllSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList.length).toBe(0);
    expect(component.completedTask).toEqual({
      all: 0,
      done: 0,
      undone: 0
    });
  }));

  it('should call deleteAll method with error response', fakeAsync(() => {
    let event: Event;
    component.todosList = JSON.parse(JSON.stringify(todosListMock));
    const deleteAllSpyOn: jasmine.Spy = spyOn(component, 'deleteAll').and.callThrough();
    const serviceDeleteAllSpyOn: jasmine.Spy = spyOn(todosService, 'deleteAll').and.returnValue(throwError('error'));
    const appendMessagesSpyOn: jasmine.Spy = spyOn(component.alertsComponent, 'appendMessages').and.callThrough();
    expect(deleteAllSpyOn).not.toHaveBeenCalled();
    expect(serviceDeleteAllSpyOn).not.toHaveBeenCalled();
    expect(appendMessagesSpyOn).not.toHaveBeenCalled();
    expect(component.todosList.length).toBe(1);
    component.deleteAll(event);
    expect(deleteAllSpyOn).toHaveBeenCalledWith(event);
    expect(deleteAllSpyOn.calls.count()).toBe(1);
    expect(serviceDeleteAllSpyOn).toHaveBeenCalledWith();
    expect(serviceDeleteAllSpyOn.calls.count()).toBe(1);
    expect(appendMessagesSpyOn).toHaveBeenCalledWith({
      type: 'warn',
      message: 'Technical Error Please Try Again Later'
    });
    expect(appendMessagesSpyOn.calls.count()).toBe(1);
    expect(component.todosList.length).toBe(1);
    expect(component.completedTask).toEqual({
      all: 1,
      done: 0,
      undone: 1
    });
  }));
});
