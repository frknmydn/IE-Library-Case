"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// associations.ts
const user_model_1 = __importDefault(require("./user.model"));
const review_model_1 = __importDefault(require("./review.model"));
const book_model_1 = __importDefault(require("./book.model"));
user_model_1.default.hasMany(review_model_1.default, { foreignKey: 'userId', as: 'Reviews' });
book_model_1.default.hasMany(review_model_1.default, { foreignKey: 'bookId', as: 'Reviews' });
review_model_1.default.belongsTo(book_model_1.default, { foreignKey: 'bookId', as: 'Book' });
review_model_1.default.belongsTo(user_model_1.default, { foreignKey: 'userId', as: 'User' });
