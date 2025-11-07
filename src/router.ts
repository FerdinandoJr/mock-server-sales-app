import { Router } from "express";
import express from 'express';
import path from 'path';
import auth from "./modules/auth/auth.router";
import customers from "./modules/customers/customers.router";
import products from "./modules/products/products.router";
import orders from "./modules/orders/orders.router";


const apiRouter = Router();

apiRouter.use("/auth", auth)
apiRouter.use("/orders", orders)
apiRouter.use("/customers", customers)
apiRouter.use("/products", products)


apiRouter.use('/images', express.static(path.join(__dirname, 'public', 'images')));

export default apiRouter