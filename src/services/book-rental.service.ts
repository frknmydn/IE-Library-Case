// src/services/user.service.ts
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import { Review } from '../models/review.model';
import sequelize from '../../config/database';

export const borrowBook = async (userId: number, bookId: number) => {
    const user = await User.findByPk(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
        throw new Error('Book not found');
    }

    const existingUserReview = await Review.findOne({
        where: {
            userId: user.id,
            bookId: book.id,
            status: 'borrowed'
        }
    });

    if (existingUserReview) {
        throw new Error('Book is already borrowed by same user');
    }

    const existingReview = await Review.findOne({
        where: {
            bookId: book.id,
            status: 'borrowed'
        }
    });

    if (existingReview) {
        throw new Error('Book is already borrowed');
    }

    const review = await Review.create({
        userId: user.id,
        bookId: book.id,
        status: 'borrowed',
        score: null  
    });

    return review;
};

export const returnBookAndRate = async (userId: number, bookId: number, score: number) => {
    const transaction = await sequelize.transaction();

    try {
        const user = await User.findByPk(userId, { transaction });
        if (!user) {
            throw new Error('User not found');
        }

        const book = await Book.findByPk(bookId, { transaction });
        if (!book) {
            throw new Error('Book not found');
        }

        const review = await Review.findOne({
            where: { userId, bookId, status: 'borrowed' },
            transaction
        });

        if (!review) {
            throw new Error('Book is not currently borrowed by this user');
        }

        review.status = 'returned';
        review.score = score;
        await review.save({ transaction });

        const reviews = await Review.findAll({ where: { bookId }, transaction });
        const totalScore = reviews.reduce((sum, review) => sum + (review.score || 0), 0);
        const averageScore = totalScore / reviews.length;
        await book.update({ averageScore }, { transaction });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};