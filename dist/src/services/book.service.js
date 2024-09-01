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
exports.updateBook = exports.getBookById = exports.createBook = exports.listBooks = void 0;
const book_model_1 = require("../models/book.model");
const listBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.Book.findAll({
            attributes: ['name', 'averageScore', 'id']
        });
        return books;
    }
    catch (error) {
        console.error('Error while retrieving books:', error);
        throw new Error('Error retrieving books');
    }
});
exports.listBooks = listBooks;
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(bookData);
        return book;
    }
    catch (error) {
        console.error('Error while creating book:', error);
        throw new Error('Error creating book');
    }
});
exports.createBook = createBook;
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    }
    catch (error) {
        console.error('Error while retrieving book:', error);
        throw new Error('Error retrieving book');
    }
});
exports.getBookById = getBookById;
const updateBook = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        const updatedBook = yield book.update(updateData);
        return updatedBook;
    }
    catch (error) {
        console.error('Error while updating book:', error);
        throw new Error('Error updating book');
    }
});
exports.updateBook = updateBook;
