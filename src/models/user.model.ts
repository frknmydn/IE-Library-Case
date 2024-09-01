import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import Review from './review.model';


export class User extends Model {
  public id!: number;
  public name!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true
});

export default User;
