import { body } from 'express-validator';

export const updateTodoValidationRules = [
  body('id').trim().exists().withMessage('Id is required'),
  body('completed')
    .exists()
    .withMessage('Completed is required')
    .isBoolean()
    .withMessage('Completed should be boolean'),
];
export const addTodoValidationRules = [
  body('label')
    .trim()
    .exists()
    .withMessage('Label is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Label must be between 1 andd 100 characters'),
];
