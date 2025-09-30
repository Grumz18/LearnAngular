import express from 'express';
import type {Express, Request, Response} from "express";

const PORT: number = 3000;
const server: Express = express();

let submissions: any[] = []; //пока данные будут храниться в памяти

server.use(express.json()); // для парсинга json в post запросах
//разрешение CORS (Чтобы клиент мог делать запросы)
server.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'GET, POST');
    res.header('Access-Control-Allow-Origin', 'Content-Type');
    next();
});

server.get('/', (req: Request, res: Response) => {
    res.send('Привет, Это тест.')
});

server.post("/data", (req: Request, res: Response) => { //принимаю данные с клиента
    const data = req.body;
    console.log('Получено', data);
    submissions.push({id: Date.now(), ...data, timestamp: new Date().toISOString()});
    res.json({sucsess: true, recived: data});
});

//отдаю данные админке
server.get("/admin/data", (req: Request, res: Response) => {
    res.json(submissions);
})

server.listen(PORT, "0.0.0.0",  () => {
    console.log(`Запустил на порту ${PORT}`);
});

server.on('error', (err) => {
    console.error(err);
});