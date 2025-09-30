import express from 'express';
import type {Express, Request, Response} from "express";

const PORT: number = 3000;

const server: Express = express();

server.use(express.json()); // для парсинга json в post запросах

server.get('/', (req: Request, res: Response) => {
    res.send('Привет, Это тест.')
});

server.listen(PORT, "0.0.0.0",  () => {
    console.log(`Запустил на порту ${PORT}`);
});

server.on('error', (err) => {
    console.error(err);
});