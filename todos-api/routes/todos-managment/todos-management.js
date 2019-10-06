import { TodosManagementService } from '../../services/todos-service/todos-service';

const mapping = '/todos';
const router = require('express').Router();
const todosDatabase = new TodosManagementService('todos');

router.post(`${mapping}/create`, (req, res) => {
    const data = req.body;
    todosDatabase.insert(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.put(`${mapping}/update`, (req, res) => {
    const data = req.body;
    todosDatabase.update(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.get(`${mapping}/list`, (req, res) => {
    todosDatabase.find()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.get(`${mapping}/list/:id`, (req, res) => {
    const data = {
        id: req.params.id
    };
    todosDatabase.find(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.delete(`${mapping}/delete`, (req, res) => {
    todosDatabase.delete()
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

router.delete(`${mapping}/delete/:id`, (req, res) => {
    const data = {
        id: req.params.id
    };
    todosDatabase.delete(data)
    .then((response) => {
        res.send(response);
    })
    .catch((error) => {
        res.statusCode = error.statusCode;
        res.send(error);
    });
});

export const TodosManagement = router;