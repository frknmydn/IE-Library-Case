// src/services/user.service.ts
import { User } from '../models/user.model';
import { Book } from '../models/book.model';
import sequelize from '../../config/database';
import { QueryTypes } from 'sequelize';

export const listUsers = async () => {
    return await User.findAll();
};

export const getUserById = async (id: number) => {
    const query = `
    SELECT 
        u.id AS "userId", 
        u.name AS "userName",
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', b.id,
                    'name', b.name,
                    'averageScore', b."averageScore",
                )
            ) FILTER (WHERE r.status = 'borrowed'), '[]'
        ) AS "currentBorrowedBooks",
        COALESCE(
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', b.id,
                    'name', b.name,
                    'averageScore', b."averageScore",
                    'score', r.score,
                    'borrowedAt', r."createdAt"
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
        const results = await sequelize.query(query, {
            replacements: { userId: id },
            type: QueryTypes.SELECT
        });

        if (results.length === 0) {
            throw new Error('User not found');
        }

        const user = results[0];
        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
export const createUser = async (userData: { name: string; email: string; }) => {
    return await User.create(userData);
};

export default {
    listUsers,
    getUserById,
    createUser
};
