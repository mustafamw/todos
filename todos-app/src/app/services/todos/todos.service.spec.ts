import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { TodosService } from './todos.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { todosMock } from '../../mocks/todos';
import { Todos } from 'src/app/interfaces/todos';
import { MessageResponse } from 'src/app/interfaces/messageResponse';

describe('Service: Todos', () => {

  let todosService: TodosService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosService
      ], 
      imports: [
        HttpClientModule
      ]
    });
    todosService = TestBed.get(TodosService);
    http = TestBed.get(HttpClient);
  });

  it('should create', () => {
    expect(todosService).toBeTruthy();
  });

  it('should getList method', fakeAsync(() => {
    const getListSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.callThrough();
    const getSpyOn: jasmine.Spy = spyOn(http, 'get').and.returnValue(of());
    expect(getListSpyOn).not.toHaveBeenCalledWith();
    expect(getSpyOn).not.toHaveBeenCalledWith();
    todosService.getList();
    tick();
    expect(getListSpyOn).toHaveBeenCalledWith();
    expect(getListSpyOn.calls.count()).toBe(1);
    expect(getSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/list');
    expect(getSpyOn.calls.count()).toBe(1);
  }));

  it('should getList method', fakeAsync(() => {
    let value: Array<Todos>;
    const getListSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.callThrough();
    const getSpyOn: jasmine.Spy = spyOn(http, 'get').and.returnValue(of(todosMock));
    expect(getListSpyOn).not.toHaveBeenCalledWith();
    expect(getSpyOn).not.toHaveBeenCalledWith();
    todosService.getList()
    .subscribe((data) => {
      value = data;
    });
    tick();
    expect(getListSpyOn).toHaveBeenCalledWith();
    expect(getListSpyOn.calls.count()).toBe(1);
    expect(getSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/list');
    expect(getSpyOn.calls.count()).toBe(1);
    expect(value).toEqual(todosMock);
  }));

  it('should getList method with error response', fakeAsync(() => {
    let value;
    const getListSpyOn: jasmine.Spy = spyOn(todosService, 'getList').and.callThrough();
    const getSpyOn: jasmine.Spy = spyOn(http, 'get').and.returnValue(throwError('error'));
    expect(getListSpyOn).not.toHaveBeenCalledWith();
    expect(getSpyOn).not.toHaveBeenCalledWith();
    todosService.getList()
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(getListSpyOn).toHaveBeenCalledWith();
    expect(getListSpyOn.calls.count()).toBe(1);
    expect(getSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/list');
    expect(getSpyOn.calls.count()).toBe(1);
    expect(value).toEqual('error');
  }));

  it('should add method', fakeAsync(() => {
    let value: MessageResponse;
    const addSpyOn: jasmine.Spy = spyOn(todosService, 'add').and.callThrough();
    const postSpyOn: jasmine.Spy = spyOn(http, 'post').and.returnValue(of({
      message: 'success'
    }));
    expect(addSpyOn).not.toHaveBeenCalledWith();
    expect(postSpyOn).not.toHaveBeenCalledWith();
    todosService.add(todosMock[0])
    .subscribe((data) => {
      value = data;
    });
    tick();
    expect(addSpyOn).toHaveBeenCalledWith(todosMock[0]);
    expect(addSpyOn.calls.count()).toBe(1);
    expect(postSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/create', {subject: 'subject'});
    expect(postSpyOn.calls.count()).toBe(1);
    expect(value).toEqual({
      message: 'success'
    });
  }));

  it('should add method with error', fakeAsync(() => {
    let value;
    const addSpyOn: jasmine.Spy = spyOn(todosService, 'add').and.callThrough();
    const postSpyOn: jasmine.Spy = spyOn(http, 'post').and.returnValue(throwError('error'));
    expect(addSpyOn).not.toHaveBeenCalledWith();
    expect(postSpyOn).not.toHaveBeenCalledWith();
    todosService.add(todosMock[0])
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(addSpyOn).toHaveBeenCalledWith(todosMock[0]);
    expect(addSpyOn.calls.count()).toBe(1);
    expect(postSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/create', {subject: 'subject'});
    expect(postSpyOn.calls.count()).toBe(1);
    expect(value).toEqual('error');
  }));

  it('should update method', fakeAsync(() => {
    let value;
    const updateSpyOn: jasmine.Spy = spyOn(todosService, 'update').and.callThrough();
    const putSpyOn: jasmine.Spy = spyOn(http, 'put').and.returnValue(of({
      message: 'success'
    }));
    expect(updateSpyOn).not.toHaveBeenCalledWith();
    expect(putSpyOn).not.toHaveBeenCalledWith();
    todosService.update(todosMock[0])
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(updateSpyOn).toHaveBeenCalledWith(todosMock[0]);
    expect(updateSpyOn.calls.count()).toBe(1);
    expect(putSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/update', {
      id: 'ID',
      completed: true
    });
    expect(putSpyOn.calls.count()).toBe(1);
    expect(value).toEqual({
      message: 'success'
    });
  }));

  it('should update method with error', fakeAsync(() => {
    let value;
    const updateSpyOn: jasmine.Spy = spyOn(todosService, 'update').and.callThrough();
    const putSpyOn: jasmine.Spy = spyOn(http, 'put').and.returnValue(throwError('error'));
    expect(updateSpyOn).not.toHaveBeenCalledWith();
    expect(putSpyOn).not.toHaveBeenCalledWith();
    todosService.update(todosMock[0])
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(updateSpyOn).toHaveBeenCalledWith(todosMock[0]);
    expect(updateSpyOn.calls.count()).toBe(1);
    expect(putSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/update', {
      id: 'ID',
      completed: true
    });
    expect(putSpyOn.calls.count()).toBe(1);
    expect(value).toEqual('error');
  }));

  it('should deleteAll method', fakeAsync(() => {
    let value;
    const completedSpyOn: jasmine.Spy = spyOn(todosService, 'deleteAll').and.callThrough();
    const deleteSpyOn: jasmine.Spy = spyOn(http, 'delete').and.returnValue(of({
      message: 'success'
    }));
    expect(completedSpyOn).not.toHaveBeenCalledWith();
    expect(deleteSpyOn).not.toHaveBeenCalledWith();
    todosService.deleteAll()
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(completedSpyOn).toHaveBeenCalledWith();
    expect(completedSpyOn.calls.count()).toBe(1);
    expect(deleteSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/delete');
    expect(deleteSpyOn.calls.count()).toBe(1);
    expect(value).toEqual({
      message: 'success'
    });
  }));

  it('should deleteAll method with error response', fakeAsync(() => {
    let value;
    const completedSpyOn: jasmine.Spy = spyOn(todosService, 'deleteAll').and.callThrough();
    const deleteSpyOn: jasmine.Spy = spyOn(http, 'delete').and.returnValue(throwError('error'));
    expect(completedSpyOn).not.toHaveBeenCalledWith();
    expect(deleteSpyOn).not.toHaveBeenCalledWith();
    todosService.deleteAll()
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(completedSpyOn).toHaveBeenCalledWith();
    expect(completedSpyOn.calls.count()).toBe(1);
    expect(deleteSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/delete');
    expect(deleteSpyOn.calls.count()).toBe(1);
    expect(value).toEqual('error');
  }));

  it('should deleteId method', fakeAsync(() => {
    let value;
    const deleteIdSpyOn: jasmine.Spy = spyOn(todosService, 'deleteId').and.callThrough();
    const deleteSpyOn: jasmine.Spy = spyOn(http, 'delete').and.returnValue(of({
      message: 'success'
    }));
    expect(deleteIdSpyOn).not.toHaveBeenCalledWith();
    expect(deleteSpyOn).not.toHaveBeenCalledWith();
    todosService.deleteId('ID')
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(deleteIdSpyOn).toHaveBeenCalledWith('ID');
    expect(deleteIdSpyOn.calls.count()).toBe(1);
    expect(deleteSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/delete/ID');
    expect(deleteSpyOn.calls.count()).toBe(1);
    expect(value).toEqual({
      message: 'success'
    });
  }));

  it('should deleteId method with error', fakeAsync(() => {
    let value;
    const deleteIdSpyOn: jasmine.Spy = spyOn(todosService, 'deleteId').and.callThrough();
    const deleteSpyOn: jasmine.Spy = spyOn(http, 'delete').and.returnValue(throwError('error'));
    expect(deleteIdSpyOn).not.toHaveBeenCalledWith();
    expect(deleteSpyOn).not.toHaveBeenCalledWith();
    todosService.deleteId('ID')
    .subscribe((data) => {
      value = data;
    }, (error) => {
      value = error;
    });
    tick();
    expect(deleteIdSpyOn).toHaveBeenCalledWith('ID');
    expect(deleteIdSpyOn.calls.count()).toBe(1);
    expect(deleteSpyOn).toHaveBeenCalledWith('http://localhost:3000/api/v1/todos/delete/ID');
    expect(deleteSpyOn.calls.count()).toBe(1);
    expect(value).toEqual('error');
  }));
});
