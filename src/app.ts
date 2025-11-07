// src/server.ts
import express from 'express';
import cors from "cors";
import apiRouter from './router';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/v1', apiRouter)


export default app;