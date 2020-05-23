import express from 'express';
import booksRouter from './books';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Online!');
});

router.use('/books', booksRouter);

export default router;
