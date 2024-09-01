import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Review from './review.model';

export class Book extends Model {
  public id!: number;
  public name!: string;
  public averageScore!: number;
}

Book.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  averageScore: {
    type: DataTypes.STRING(128),
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'Books',
  timestamps: true
});

export default Book;