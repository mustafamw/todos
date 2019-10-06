import { Todos } from './todos';

export interface TodosEmit {
    todos: Todos;
    type: string;
    index: number;
}