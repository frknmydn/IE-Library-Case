"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookRating = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../config/database"));
class UserBookRating extends sequelize_1.Model {
}
exports.UserBookRating = UserBookRating;
UserBookRating.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        allowNull: false
    },
    bookId: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'books', key: 'id' },
        allowNull: false
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    tableName: 'userBookRatings'
});
