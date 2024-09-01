"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/bookRoutes.ts
const express_1 = require("express");
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const book_validator_1 = require("../middleware/book-validator");
const router = (0, express_1.Router)();
router.get('/', books_controller_1.default.getBooks);
router.get('/:id', books_controller_1.default.getBook);
router.post('/', book_validator_1.createBookValidator, books_controller_1.default.createBook);
exports.default = router;
