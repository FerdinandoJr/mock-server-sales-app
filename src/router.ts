import { Router } from "express";
import express from 'express';
import path from 'path';
import customers from "./modules/customers/customers.router";

export const apiRouter = Router();

apiRouter.use("/customers", customers)


apiRouter.use('/images', express.static(path.join(__dirname, 'public', 'images')));

