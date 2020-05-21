import { createStatusedError } from './helpers/errorCreators';
import express from 'express';

const app: express.Application = express();

const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Online!");
});

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusedError: StatusedError = createStatusedError('not found', 404)
    throw statusedError;
});

app.use((err: StatusedError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { status, error: { message } } = err;
    res.status(status || 500).json({ error: message, status })
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));