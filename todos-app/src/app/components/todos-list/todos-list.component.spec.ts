import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TodosListComponent } from './todos-list.component';
import { TodosItemComponent } from './todos-item/todos-item.component';
import moment from 'moment';

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TodosListComponent,
        TodosItemComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.todosList).toEqual([]);
  });

  it('should call todosUpdated method', () => {
    component.todosList = [{
      _id: 'ID',
      subject: 'test',
      completed: true,
      date: moment().toDate()
    }]
    const todosUpdatedSpyOn: jasmine.Spy = spyOn(component, 'todosUpdated').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosUpdate, 'emit').and.callThrough();
    expect(todosUpdatedSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.todosUpdated({
      todos: component.todosList[0],
      type: 'test',
      index: 1
    });
    expect(todosUpdatedSpyOn).toHaveBeenCalledWith({
      todos: component.todosList[0],
      type: 'test',
      index: 1
    });
    expect(todosUpdatedSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).toHaveBeenCalledWith({
      todos: component.todosList[0],
      type: 'test',
      index: 1
    });
    expect(emitSpyOn.calls.count()).toBe(1);
  })
});
