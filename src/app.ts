import express, {Request, Response, NextFunction} from "express";
//import userRoutes from './routes/users';
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';
import './models/associations';

const app = express();
app.use(express.json());


// Routes
//app.use('/users', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;