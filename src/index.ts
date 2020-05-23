import { createStatusedError } from './helpers/errorCreators';
import express from 'express';
import { PORT } from './config';
import connectToDB from './db';
import router from './routes';

connectToDB();

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', router);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusedError: StatusedError = createStatusedError('not found', 404);
  throw statusedError;
});

app.use(
  (err: StatusedError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {
      status,
      error: { message },
    } = err;
    res.status(status || 500).json({ error: message, status });
  }
);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
