import express from 'express';
import Book from '../models/Book';
import { createStatusedError } from '../helpers/errorCreators';

const booksRouter = express.Router();

booksRouter.get('/', async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
  try {
  } catch (e) {
    const errorRes = createStatusedError(e._message, 400);
    res.status(errorRes.status).json({ error: errorRes.error.message });
  }
});

booksRouter.post('/', async (req, res) => {
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

booksRouter.get('/:id', async (req, res) => {
  try {
    const bookID = req.params.id;
    const reqBook = await Book.findById(bookID);
    res.status(200).json(reqBook);
  } catch (e) {
    const errorRes = createStatusedError(e._message, 400);
    res.status(errorRes.status).json({ error: errorRes.error.message });
  }
});

booksRouter.delete('/:id', async (req, res) => {
  try {
    const bookID = req.params.id;
    const removedBook = await Book.deleteOne({ _id: bookID });
    res.status(200).send('OK');
  } catch (e) {
    const errorRes = createStatusedError(e._message, 400);
    res.status(errorRes.status).json({ error: errorRes.error.message });
  }
});

booksRouter.put('/:id', async (req, res) => {
  try {
    const bookID = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(
      bookID,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (e) {
    const errorRes = createStatusedError(e._message, 400);
    res.status(errorRes.status).json({ error: errorRes.error.message });
  }
});

export default booksRouter;
