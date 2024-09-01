"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.listUsers = void 0;
// src/services/user.service.ts
const user_model_1 = require("../models/user.model");
const database_1 = __importDefault(require("../../config/database"));
const sequelize_1 = require("sequelize");
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findAll({
        attributes: ['name', 'id']
    });
});
exports.listUsers = listUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT 
        u.id AS "userId", 
        u.name AS "name",
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'name', b.name,
                    'averageScore', b."averageScore"
                )
            ) FILTER (WHERE r.status = 'borrowed'), '[]'
        ) AS "currentBorrowedBooks",
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'name', b.name,
                    'averageScore', b."averageScore",
                    'score', r.score
                )
            ) FILTER (WHERE r.status != 'borrowed'), '[]'
        ) AS "pastBorrowedBooks"
    FROM 
        "Users" u
    LEFT JOIN 
        "Reviews" r ON u.id = r."userId"
    LEFT JOIN 
        "Books" b ON r."bookId" = b.id
    WHERE 
        u.id = :userId
    GROUP BY 
        u.id;
    `;
    try {
        const results = yield database_1.default.query(query, {
            replacements: { userId: id },
            type: sequelize_1.QueryTypes.SELECT
        });
        if (results.length === 0) {
            throw new Error('User not found');
        }
        const user = results[0];
        return user;
    }
    catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
});
exports.getUserById = getUserById;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(userData);
});
exports.createUser = createUser;
exports.default = {
    listUsers: exports.listUsers,
    getUserById: exports.getUserById,
    createUser: exports.createUser
};
