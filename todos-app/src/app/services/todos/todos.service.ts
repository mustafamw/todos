import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Todos } from '../../interfaces/todos';
import { Observable, of, throwError } from 'rxjs';
import { MessageResponse } from 'src/app/interfaces/messageResponse';

@Injectable({
  providedIn: 'root'
})

export class TodosService {

  private api = `${environment.api.domain}${environment.api.path}/create`;
  public todos: Observable<Array<Todos>>;

  constructor(private readonly http: HttpClient) {
    
  }

  public getList = () => {
    this.todos = this.http.get<Array<Todos>>(`${this.api}/list`);
    return this.todos;
  }

  public add = (todos: Todos) => {
    return this.http.post<MessageResponse>(`${this.api}/create`, {
      subject: todos.subject
    });
  }

  public update = (todos: Todos) => {
    const completed: boolean = todos.completed ? false: true;
    return this.http.put<MessageResponse>(`${this.api}/update`, {
      id: todos._id,
      completed: completed
    });
  }

  public deleteAll = () => {
    return this.http.delete<MessageResponse>(`${this.api}/delete`);
  }

  public deleteId = (id: string) => {
    return this.http.delete<MessageResponse>(`${this.api}/delete/${id}`);
  }

}
