import { body, validationResult } from 'express-validator';
import todoModel from '../models/todoModel.ts';
import { NextFunction, Request, Response } from 'express';

// @desc Get all todo
// @route GET /api/v1/todos/
const getAllTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await todoModel.getAllTodo();
    res.status(200).json(todos);
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

// @desc Add new todo
// @route POST /api/v1/todos/
const addTodo = async (req: Request, res: Response, next: NextFunction) => {
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
};

// @desc Update todo completed
// @route Patch /api/v1/todos/
const updateTodoCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export default { getAllTodo, updateTodoCompleted, addTodo };
