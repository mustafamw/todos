import { Todos } from '../interfaces/todos';
import moment from 'moment';

export const todosMock: Array<Todos> = [{
    completed: false,
    _id: 'ID',
    date: moment().toDate(),
    subject: 'subject'
}];