import { body } from 'express-validator';

export const createUserValidator = [
    body('name').isString().withMessage('Name must be a string')
];