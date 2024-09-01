import { body } from 'express-validator';

export const createBookValidator = [
    body('name').isString().withMessage('name must be a string'),
];

export const returnBookValidator = [
    body('score').isInt({ min: 1, max: 10 }).withMessage('Score must be an integer between 1 and 5')
];