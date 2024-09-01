"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBookValidator = exports.createBookValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createBookValidator = [
    (0, express_validator_1.body)('name').isString().withMessage('name must be a string'),
];
exports.returnBookValidator = [
    (0, express_validator_1.body)('score').isInt({ min: 1, max: 10 }).withMessage('Score must be an integer between 1 and 5')
];
