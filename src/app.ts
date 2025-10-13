// src/server.ts
import express from 'express';
import path from 'path';
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/v1')


export default app;