import express from 'express';
import todoController from './../controllers/todoController.ts';
import {
  addTodoValidationRules,
  updateTodoValidationRules,
} from '../validators/todoValidators.ts';
// create router
const router = express.Router();

// todo routes
router.get('/', todoController.getAllTodo);
router.patch(
  '/',
  updateTodoValidationRules,
  todoController.updateTodoCompleted
);
router.post('/', addTodoValidationRules, todoController.addTodo);
export default router;
