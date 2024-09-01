import sequelize  from '../config/database';
import { listBooks,createBook, getBookById } from '../src/services/book.service';
import { Book } from '../src/models/book.model'

describe('listBooks', () => {
    it('should return a list of books with only name and averageScore', async () => {
        const mockBooks: Partial<Book>[] = [
            { name: 'Book 1', averageScore: 8.5 },
            { name: 'Book 2', averageScore: 7.0 },
        ];

        jest.spyOn(Book, 'findAll').mockResolvedValue(mockBooks as Book[]);

        const books = await listBooks();

        expect(books).toEqual(mockBooks);
        expect(books[0]).not.toHaveProperty('createdAt');
        expect(books[0]).not.toHaveProperty('updatedAt');
        expect(books[0]).not.toHaveProperty('id');
    });
});

describe('createBook', () => {
    it('should create and return a new book', async () => {
        const mockBookData = { name: 'New Book' };
        const mockBook = { id: 1, ...mockBookData };

        jest.spyOn(Book, 'create').mockResolvedValue(mockBook as Book);

        const book = await createBook(mockBookData);

        expect(book).toEqual(mockBook);
    });

    it('should throw an error if book creation fails', async () => {
        const mockBookData = { name: 'New Book' };

        jest.spyOn(Book, 'create').mockRejectedValue(new Error('Error creating book'));

        await expect(createBook(mockBookData)).rejects.toThrow('Error creating book');
    });
});

describe('getBookById', () => {
    it('should return a book with only name and averageScore', async () => {
        const mockBook = { name: 'Book 1', averageScore: 8.5 };

        jest.spyOn(Book, 'findByPk').mockResolvedValue(mockBook as Book);

        const book = await getBookById(1);

        expect(book).toEqual(mockBook);
        expect(book).not.toHaveProperty('createdAt');
        expect(book).not.toHaveProperty('updatedAt');
        expect(book).not.toHaveProperty('id');
    });

    it('should throw an error if book is not found', async () => {
        jest.spyOn(Book, 'findByPk').mockResolvedValue(null);

        await expect(getBookById(1)).rejects.toThrow('Error retrieving book');
    });
});