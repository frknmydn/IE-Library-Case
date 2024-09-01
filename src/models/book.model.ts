import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Review from './review.model';

export class Book extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public isBorrowed!: boolean; 
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
  },
  isBorrowed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false 
  }
}, {
  sequelize,
  modelName: 'Book',
  tableName: 'Books',
  timestamps: true
});

export default Book;