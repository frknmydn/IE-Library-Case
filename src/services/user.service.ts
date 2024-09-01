// src/services/user.service.ts
import { User } from '../models/user.model';
import sequelize from '../../config/database';
import { QueryTypes } from 'sequelize';

export interface UserBooks {
    name: string;
    averageScore: number | null;
    score?: number | null;
}

export interface UserWithBooks {
    userId: number;
    name: string;
    currentBorrowedBooks: UserBooks[];
    pastBorrowedBooks: UserBooks[];
}

export const listUsers = async () => {
    return await User.findAll({
        attributes: ['name', 'id']
    });
};

export const getUserById = async (id: number): Promise<UserWithBooks> => {
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
        const results: UserWithBooks[] = await sequelize.query(query, {
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


export const createUser = async (userData: { name: string; }) => {
    return await User.create(userData);
};

export default {
    listUsers,
    getUserById,
    createUser
};
