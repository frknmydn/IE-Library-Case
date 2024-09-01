"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Review extends sequelize_1.Model {
}
exports.Review = Review;
Review.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Books',
            key: 'id'
        }
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('borrowed', 'returned'),
        allowNull: false,
        defaultValue: 'borrowed'
    }
}, {
    sequelize: database_1.default,
    modelName: 'Review',
    tableName: 'Reviews',
    timestamps: true
});
exports.default = Review;
