// associations.ts
import User from './user.model';
import Review from './review.model';
import Book from './book.model';

User.hasMany(Review, { foreignKey: 'userId', as: 'Reviews' });
Book.hasMany(Review, { foreignKey: 'bookId', as: 'Reviews' });

Review.belongsTo(Book, { foreignKey: 'bookId', as: 'Book' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'User' });