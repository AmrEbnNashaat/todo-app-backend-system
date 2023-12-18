import express from 'express';
import * as todoController from '../controllers/todoController';

const router = express.Router();

router.post('/', todoController.createTodo);
router.get('/', todoController.getTodos);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.post('/user/:userId', todoController.addTodoForUser);
//router.get('/user/:userId', todoController.getTodosForUser);
router.put('/:id/user/:userId', todoController.updateTodoForUser);
router.delete('/:id/user/:userId', todoController.deleteTodoForUser);

export default router;
