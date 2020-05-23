import express from 'express';
import Book from '../models/Book';
import { createStatusedError } from '../helpers/errorCreators';

const booksRouter = express.Router();

booksRouter.get('/', (req, res) => {
  res.send('Main Books Route');
});

booksRouter.post('/create', async (req, res) => {
  try {
    const body = req.body;
    const { title, description, author } = body;
    const book = new Book({ title, description, author });
    const savedBook = await book.save();
    res.status(200).json(savedBook);
  } catch (e) {
    const errorRes = createStatusedError(e._message, 400);
    res.status(errorRes.status).json({ error: errorRes.error.message });
  }
});

export default booksRouter;
