import { validationResult } from 'express-validator';
import todoModel from '../models/todoModel';
import { NextFunction, Request, Response } from 'express';
import ExpressError from '../CustomError/ExpressError';

// @desc Get all todo
// @route GET /api/v1/todos/
const getAllTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await todoModel.getAllTodo();
    res.status(200).json(todos);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};

// @desc Add new todo
// @route POST /api/v1/todos/
const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { label } = req.body;
    await todoModel.addTodo(label);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
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
    let { id, completed } = req.body;
    // map form data
    completed = completed ? 1 : 0;
    await todoModel.updateTodoCompleted(id, completed);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof Error) error = new ExpressError(error.message, 404);
    next(error);
  }
};

export default { getAllTodo, updateTodoCompleted, addTodo };
