import { Book } from '../models/book.model';

export const listBooks = async (): Promise<Book[]> => {
    try {
        const books = await Book.findAll();
        return books;
    } catch (error) {
        console.error('Error while retrieving books:', error);
        throw new Error('Error retrieving books');
    }
};

export const createBook = async (bookData: { title: string; author: string; }): Promise<Book> => {
    try {
        const book = await Book.create(bookData);
        return book;
    } catch (error) {
        console.error('Error while creating book:', error);
        throw new Error('Error creating book');
    }
};

// Belirli bir kitap bilgisini getirme servisi
export const getBookById = async (id: number): Promise<Book | null> => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (error) {
        console.error('Error while retrieving book:', error);
        throw new Error('Error retrieving book');
    }
};

export const updateBook = async (id: number, updateData: { title?: string; author?: string; }): Promise<Book> => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        const updatedBook = await book.update(updateData);
        return updatedBook;
    } catch (error) {
        console.error('Error while updating book:', error);
        throw new Error('Error updating book');
    }
};

export const deleteBook = async (id: number): Promise<void> => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error('Book not found');
        }
        await book.destroy();
    } catch (error) {
        console.error('Error while deleting book:', error);
        throw new Error('Error deleting book');
    }
};
