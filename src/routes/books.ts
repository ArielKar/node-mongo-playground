import express from 'express';

const booksRouter = express.Router();

booksRouter.get('/', (req, res) => {
    res.send('Main Books Route')
});

export default booksRouter;