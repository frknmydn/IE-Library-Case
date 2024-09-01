import { Request, Response } from 'express';
import * as bookService from '../services/book.service';
import { validationResult } from 'express-validator';


export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.listBooks();
        res.json(books);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(parseInt(id));
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const createBook = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export default {
    getBooks,
    getBook,
    createBook
};
