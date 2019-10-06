import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todos } from 'src/app/interfaces/todos';
import { validation } from '../../config/validation';
import { Validation } from 'src/app/interfaces/validation';

@Component({
  selector: 'app-todos-add',
  templateUrl: './todos-add.component.html',
  styleUrls: ['./todos-add.component.scss']
})

export class TodosAddComponent implements OnInit {

  @Output() todosAdded: EventEmitter<Todos> = new EventEmitter();

  public todos: Todos = <Todos>{};
  public valid;
  public validation:Validation = validation;

  private readonly isSubjectValid = () => {
    if (!this.todos ||
      !this.todos.subject ||
      this.todos.subject === null ||
      this.todos.subject === undefined ||
      this.todos.subject === ''){
        this.valid = undefined;
        return;
    }
    if (this.todos.subject.length <= validation.subject.minLength ||
      this.todos.subject.length > validation.subject.maxLength) {
      this.valid = false;
      return;
    }else{
      this.valid = true;
      return;
    }
  }

  constructor() {

  }

  add() {
    if(this.valid === true) {
      this.todosAdded.emit(this.todos);
      this.todos.subject = undefined;
      this.isSubjectValid();
    }
  }

  inputFocus() {
    this.valid = undefined;
  }

  inputBlur() {
    this.isSubjectValid();
  }

  ngOnInit() {
  }

}
