import { body, validationResult } from 'express-validator';
import todoModel from '../models/todoModel.js';

// @desc Get all todo
// @route GET /api/v1/todos/
const getAllTodo = async (req, res, next) => {
  try {
    const todos = await todoModel.getAllTodo();
    res.status(200).json(todos);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

const validateTodoLabel = [
  body('label')
    .trim()
    .exists()
    .withMessage('Label is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Label must be between 1 andd 100 characters'),
];
// @desc Add new todo
// @route POST /api/v1/todos/
const addTodo = [
  validateTodoLabel,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error(
          errors
            .array()
            .map((err) => err.msg)
            .join(', ')
        );
        throw error;
      }
      const { label } = req.body;
      await todoModel.addTodo(label);
      res.sendStatus(201);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  },
];

const validateUpdateTodo = [
  body('id').trim().exists().withMessage('Id is required'),
  body('completed')
    .exists()
    .withMessage('Completed is required')
    .isBoolean()
    .withMessage('Completed should be boolean'),
];

// @desc Update todo completed
// @route Patch /api/v1/todos/
const updateTodoCompleted = [
  validateUpdateTodo,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const error = new Error(
          errors
            .array()
            .map((err) => err.msg)
            .join(', ')
        );
        throw error;
      }
      let { id, completed } = req.body;
      // map form data
      completed = completed ? 1 : 0;
      await todoModel.updateTodoCompleted(id, completed);
      res.sendStatus(201);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  },
];

export default { getAllTodo, updateTodoCompleted, addTodo };
