import { Component, OnInit, ViewChild } from '@angular/core';
import { TodosService } from 'src/app/services/todos/todos.service';
import { Todos } from 'src/app/interfaces/todos';
import { Observable } from 'rxjs';
import { TodosEmit } from 'src/app/interfaces/todosEmit';
import { AlertsComponent } from 'src/app/components/alerts/alerts.component';
import { Alerts } from 'src/app/interfaces/alerts';
import { CompletedTask } from 'src/app/interfaces/completedTask';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild(AlertsComponent)
  alertsComponent: AlertsComponent;

  public todosList: Array<Todos> = [];
  public loaded: boolean = false;
  public completedTask: CompletedTask = {
    all: 0,
    done: 0,
    undone: 0
  }

  private alertMessage = (type, message) => {
    let alerts: Alerts;
    alerts = {
      type,
      message
    }
    this.alertsComponent.appendMessages(alerts);
  }

  private countCompletedTast = (todos: Array<Todos>) => {
    this.completedTask.all = 0;
    this.completedTask.done = 0;
    this.completedTask.undone = 0;
    todos.forEach((e: Todos) => {
      this.completedTask.all ++;
      if(e.completed){
        this.completedTask.done ++;
      }
      if(!e.completed){
        this.completedTask.undone ++;
      }
    });
  }

  private addTodos = (todos: Todos) => {
    this.loaded = false;
    this.todosService.add(todos)
    .subscribe((data) => {
      this.getTodosList();
    }, (error) => {
      this.loaded = true;
      this.alertMessage('warn', 'Technical Error Please Try Again Later');
      this.countCompletedTast(this.todosList);
    });
  }

  private getTodosList = () => {
    this.todosService.getList().subscribe((data) => {
      this.loaded = true;
      this.todosList = data;
      this.countCompletedTast(data);
    }, (error) => {
      this.loaded = true;
      if(error && error.error.message != 'Record Not Found'){
        this.alertMessage('warn', 'Technical Error Please Try Again Later');
        this.countCompletedTast(this.todosList);
      }
    });
  }

  private completedTodosTask = (todos: Todos) => {
    this.todosService.update(todos)
    .subscribe((data) => {
      todos.completed = todos.completed ? false: true;
      this.countCompletedTast(this.todosList);
    }, (error) => {
      this.alertMessage('warn', 'Technical Error Please Try Again Later');
      this.countCompletedTast(this.todosList);
    });
  }

  private deleteTodosTask = (todos: Todos, index: number) => {
    this.todosService.deleteId(todos._id)
    .subscribe((data) => {
      this.todosList.splice(index, 1);
      this.countCompletedTast(this.todosList);
    }, (error) => {
      this.alertMessage('warn', 'Technical Error Please Try Again Later');
      this.countCompletedTast(this.todosList);
    });
  }

  private deleteAllTodosTask = () => {
    this.todosService.deleteAll()
    .subscribe((data) => {
      this.todosList = [];
      this.countCompletedTast(this.todosList);
    }, (error) => {
      this.alertMessage('warn', 'Technical Error Please Try Again Later');
      this.countCompletedTast(this.todosList);
    });
  }

  private todosUpdate = (todosEmit: TodosEmit) => {
    switch(todosEmit.type){
      case "complete":
        this.completedTodosTask(todosEmit.todos);
        break;
      case "delete":
        this.deleteTodosTask(todosEmit.todos, todosEmit.index);
        break;
    }
  }

  constructor(private readonly todosService: TodosService) {
  }

  todosAdd(todos: Todos) {
    this.addTodos(todos);
  }

  todosUpdated(todosEmit: TodosEmit){
    this.todosUpdate(todosEmit);
  }

  deleteAll(event: Event) {
    this.deleteAllTodosTask();
  }

  ngOnInit() {
    this.getTodosList();
  }

}
