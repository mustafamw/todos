import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todos } from 'src/app/interfaces/todos';
import { TodosEmit } from 'src/app/interfaces/todosEmit';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})

export class TodosListComponent implements OnInit {

  @Input() todosList: Array<Todos> = [];
  @Output() todosUpdate: EventEmitter<TodosEmit> = new EventEmitter();

  constructor() { }

  todosUpdated(todos: TodosEmit){
    this.todosUpdate.emit(todos);
  }

  ngOnInit() {
  }

}
