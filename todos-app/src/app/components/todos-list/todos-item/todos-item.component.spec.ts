import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosItemComponent } from './todos-item.component';
import moment from 'moment';

describe('TodosItemComponent', () => {
  let component: TodosItemComponent;
  let fixture: ComponentFixture<TodosItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call complete method', () => {
    component.index = 1;
    component.todos = {
      _id: undefined,
      subject: undefined,
      completed: false,
      date: moment().toDate()
    }
    const completeSpyOn: jasmine.Spy = spyOn(component, 'complete').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosUpdate, 'emit').and.callThrough();
    expect(completeSpyOn).not.toHaveBeenCalled();
    expect(emitSpyOn).not.toHaveBeenCalled();
    component.complete();
    expect(completeSpyOn).toHaveBeenCalledWith();
    expect(completeSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).toHaveBeenCalledWith({
      todos: component.todos,
      type: 'complete',
      index: 1
    });
    expect(emitSpyOn.calls.count()).toBe(1);
  });

  it('should call delete method', () => {
    component.index = 1;
    component.todos = {
      _id: 'ID',
      subject: 'test',
      completed: true,
      date: moment().toDate()
    }
    let event: any = {
      stopPropagation: () => {},
      preventDefault: () => {},
    };
    const stopPropagationSpyOn: jasmine.Spy = spyOn(event, 'stopPropagation').and.callThrough();
    const preventDefaultSpyOn: jasmine.Spy = spyOn(event, 'preventDefault').and.callThrough();
    const deleteSpyOn: jasmine.Spy = spyOn(component, 'delete').and.callThrough();
    const emitSpyOn: jasmine.Spy = spyOn(component.todosUpdate, 'emit').and.callThrough();
    expect(stopPropagationSpyOn).not.toHaveBeenCalled();
    expect(preventDefaultSpyOn).not.toHaveBeenCalled();
    expect(deleteSpyOn).not.toHaveBeenCalled();
    component.delete(event);
    expect(stopPropagationSpyOn).toHaveBeenCalledWith();
    expect(stopPropagationSpyOn.calls.count()).toBe(1);
    expect(preventDefaultSpyOn).toHaveBeenCalledWith();
    expect(preventDefaultSpyOn.calls.count()).toBe(1);
    expect(deleteSpyOn).toHaveBeenCalledWith(event);
    expect(deleteSpyOn.calls.count()).toBe(1);
    expect(emitSpyOn).toHaveBeenCalledWith({
      todos: component.todos,
      type: 'delete',
      index: 1
    });
    expect(emitSpyOn.calls.count()).toBe(1);
  });
});
