// src/routes/userRoutes.ts
import { Router } from 'express';
import userController from '../controllers/users.controller';
import { createUserValidator } from '../middleware/user-validator';
import { returnBookValidator } from '../middleware/book-validator';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', createUserValidator, userController.createUser);
router.post('/:userId/borrow/:bookId', userController.borrowBook);
router.post('/:userId/return/:bookId',returnBookValidator ,userController.returnBook);


export default router;
