// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import * as bookRentalService from '../services/book-rental.service';
import { validationResult } from 'express-validator';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.listUsers();
        res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(parseInt(id));
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: `User created Successfully` });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};


export const borrowBook = async (req: Request, res: Response) => {
    try {
        const { userId, bookId } = req.params;
        await bookRentalService.borrowBook(parseInt(userId), parseInt(bookId));
        res.status(200).json({ message: `User ${userId} borrowed book ${bookId}` });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const returnBook = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { userId, bookId } = req.params;
        const { score } = req.body;

        await bookRentalService.returnBookAndRate(parseInt(userId), parseInt(bookId), score);

        res.status(200).json({ message: `User ${userId} returned book ${bookId} and rated it with score ${score}` });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export default {
    getUsers,
    getUser,
    createUser,
    borrowBook,
    returnBook
};
