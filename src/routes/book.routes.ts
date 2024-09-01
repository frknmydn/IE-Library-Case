// src/routes/bookRoutes.ts
import { Router } from 'express';
import bookController from '../controllers/books.controller';
import { createBookValidator } from '../middleware/book-validator';

const router = Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post('/', createBookValidator, bookController.createBook);

export default router;
