import express from 'express';
import todoController from './../controllers/todoController';
import {
  addTodoValidationRules,
  updateTodoValidationRules,
} from '../validators/todoValidators';
import validator from '../middlewares/validator';
// create router
const router = express.Router();

// todo routes
router.get('/', todoController.getAllTodo);
router.patch(
  '/',
  updateTodoValidationRules,
  validator,
  todoController.updateTodoCompleted
);
router.post('/', addTodoValidationRules, validator, todoController.addTodo);
export default router;
