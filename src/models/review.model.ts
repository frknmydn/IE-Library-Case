import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';

export class Review extends Model {
  public id!: number;
  public bookId!: number;
  public userId!: number;
  public score!: number;
  public status!: string;
}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Books',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('borrowed', 'returned'),
    allowNull: false,
    defaultValue: 'borrowed'
  }
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'Reviews',
  timestamps: true
});

export default Review;