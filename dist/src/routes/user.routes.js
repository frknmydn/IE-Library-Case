"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express_1 = require("express");
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
const user_validator_1 = require("../middleware/user-validator");
const book_validator_1 = require("../middleware/book-validator");
const router = (0, express_1.Router)();
router.get('/', users_controller_1.default.getUsers);
router.get('/:id', users_controller_1.default.getUser);
router.post('/', user_validator_1.createUserValidator, users_controller_1.default.createUser);
router.post('/:userId/borrow/:bookId', users_controller_1.default.borrowBook);
router.post('/:userId/return/:bookId', book_validator_1.returnBookValidator, users_controller_1.default.returnBook);
exports.default = router;
