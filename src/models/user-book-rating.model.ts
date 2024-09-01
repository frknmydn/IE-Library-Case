import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

export class UserBookRating extends Model {
  public userId!: number;
  public bookId!: number;
  public score!: number;
}

UserBookRating.init({
  userId: {
    type: DataTypes.INTEGER,
    references: { model: 'users', key: 'id' },
    allowNull: false
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: { model: 'books', key: 'id' },
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'userBookRatings'
});