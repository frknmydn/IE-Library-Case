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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnBookAndRate = exports.borrowBook = void 0;
// src/services/user.service.ts
const user_model_1 = require("../models/user.model");
const book_model_1 = require("../models/book.model");
const review_model_1 = require("../models/review.model");
const database_1 = __importDefault(require("../../config/database"));
const borrowBook = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const book = yield book_model_1.Book.findByPk(bookId);
    if (!book) {
        throw new Error('Book not found');
    }
    const existingUserReview = yield review_model_1.Review.findOne({
        where: {
            userId: user.id,
            bookId: book.id,
            status: 'borrowed'
        }
    });
    if (existingUserReview) {
        throw new Error('Book is already borrowed by same user');
    }
    const existingReview = yield review_model_1.Review.findOne({
        where: {
            bookId: book.id,
            status: 'borrowed'
        }
    });
    if (existingReview) {
        throw new Error('Book is already borrowed');
    }
    const review = yield review_model_1.Review.create({
        userId: user.id,
        bookId: book.id,
        status: 'borrowed',
        score: null
    });
    return review;
});
exports.borrowBook = borrowBook;
const returnBookAndRate = (userId, bookId, score) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield database_1.default.transaction();
    try {
        const user = yield user_model_1.User.findByPk(userId, { transaction });
        if (!user) {
            throw new Error('User not found');
        }
        const book = yield book_model_1.Book.findByPk(bookId, { transaction });
        if (!book) {
            throw new Error('Book not found');
        }
        const review = yield review_model_1.Review.findOne({
            where: { userId, bookId, status: 'borrowed' },
            transaction
        });
        if (!review) {
            throw new Error('Book is not currently borrowed by this user');
        }
        review.status = 'returned';
        review.score = score;
        yield review.save({ transaction });
        const reviews = yield review_model_1.Review.findAll({ where: { bookId }, transaction });
        const totalScore = reviews.reduce((sum, review) => sum + (review.score || 0), 0);
        const averageScore = totalScore / reviews.length;
        yield book.update({ averageScore }, { transaction });
        yield transaction.commit();
    }
    catch (error) {
        yield transaction.rollback();
        throw error;
    }
});
exports.returnBookAndRate = returnBookAndRate;
