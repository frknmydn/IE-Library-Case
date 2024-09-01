import { Book } from '../models/book.model';

export const listBooks = async (): Promise<Book[]> => {
    try {
        const books = await Book.findAll({
            attributes: ['name', 'averageScore', 'id']
        });
        return books;
    } catch (error) {
        console.error('Error while retrieving books:', error);
        throw new Error('Error retrieving books');
    }
};

export const createBook = async (bookData: { name: string; }): Promise<Book> => {
    try {
        const book = await Book.create(bookData);
        return book;
    } catch (error) {
        console.error('Error while creating book:', error);
        throw new Error('Error creating book');
    }
};

export const getBookById = async (id: number): Promise<Book | null> => {
    try {
        const book = await Book.findByPk(id,{
            attributes: { exclude: [ 'createdAt', 'updatedAt'] }
        });
        if (!book) {
            throw new Error('Book not found');
        }
        return book;
    } catch (error) {
        console.error('Error while retrieving book:', error);
        throw new Error('Error retrieving book');
    }
};

export const updateBook = async (id: number, updateData: { name?: string; }): Promise<Book> => {
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


