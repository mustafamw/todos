import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todos } from 'src/app/interfaces/todos';
import { TodosEmit } from 'src/app/interfaces/todosEmit';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styleUrls: ['./todos-item.component.scss']
})
export class TodosItemComponent implements OnInit {

  @Input() todos: Todos = <Todos>{};
  @Input() index: number;
  @Output() todosUpdate: EventEmitter<TodosEmit> = new EventEmitter();

  private todosEmit = (type) => {
    this.todosUpdate.emit({
      todos: this.todos,
      type: type,
      index: this.index
    });
  }

  constructor() { }
  

  complete() {
    this.todosEmit('complete');
  }

  delete(event: Event){ 
    event.stopPropagation();
    event.preventDefault();
    this.todosEmit('delete');
  }

  ngOnInit() {
  }

}
