import express, {Request, Response, NextFunction} from "express";
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';
import './models/associations';

const app = express();
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});
app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('oops server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;