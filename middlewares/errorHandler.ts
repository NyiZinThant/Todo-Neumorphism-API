import { NextFunction, Request, Response } from 'express';
import ExpressError from '../CustomError/ExpressError';

const errorHandler = (
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(err?.status || 500).json({ message: err.message });
};

export default errorHandler;
