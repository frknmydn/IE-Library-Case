"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class Book extends sequelize_1.Model {
}
exports.Book = Book;
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false
    },
    averageScore: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'Book',
    tableName: 'Books',
    timestamps: true
});
exports.default = Book;
