// src/tests/user.service.test.ts
import { listUsers, getUserById, createUser } from '../src/services/user.service';
import sequelize  from '../config/database';
import request from 'supertest';
import app from '../src/app'; 

describe('User Service', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); 
    });

    afterAll(async () => {
        await sequelize.close(); 
    });

    it('should list all users', async () => {
        await createUser({ name: 'Furkytest'});

        const users = await listUsers();
        expect(users).toHaveLength(1);
        expect(users[0].name).toBe('Furkytest');
    });

    it('should get user by id', async () => {
        const createdUser = await createUser({ name: 'Furkytest' });

        const response = await getUserById(createdUser.id);
        expect(response.name).toBe('Furkytest');
        expect(response.currentBorrowedBooks).toBeDefined();
        expect(response.pastBorrowedBooks).toBeDefined();
    });

    it('should return error when user not found', async () => {
        await expect(getUserById(999)).rejects.toThrow('User not found');
    });

    it('should create a new user', async () => {
        const userData = { name: 'Furkyyy', email: 'Furkyyy@test.com' };
        const newUser = await createUser(userData);

        expect(newUser.name).toBe(userData.name);
    });
});