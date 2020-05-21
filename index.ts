import express from 'express';

const app: express.Application = express();

const PORT = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Online!");
});

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));