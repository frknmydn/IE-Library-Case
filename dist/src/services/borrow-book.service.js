"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = void 0;
// src/services/user.service.ts
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const borrowBook = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const book = yield book_model_1.Book.findByPk(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    if (book.isBorrowed) {
        throw new Error('Book is already borrowed');
    }
    yield book.update({ isBorrowed: true });
});
exports.borrowBook = borrowBook;
