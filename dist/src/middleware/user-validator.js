"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createUserValidator = [
    (0, express_validator_1.body)('name').isString().withMessage('Name must be a string')
];
