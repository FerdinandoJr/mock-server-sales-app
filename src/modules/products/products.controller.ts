// // controllers/products.controller.ts
// import { Request, Response } from "express";
// import * as svc from "../services/products.service";
// import { asyncHandler } from "../libs/asyncHandler";

// export const listProducts = asyncHandler(async (req: Request, res: Response) => {
//   const { page, limit, order } = (req as any).paginated; // vindo do middleware
//   const { search } = req.query as { search?: string };
//   const data = await svc.list({ page, limit, order, search });
//   res.status(200).json(data);
// });

// export const getProductById = asyncHandler(async (req, res) => {
//   const product = await svc.getById(req.params.id);
//   res.status(200).json(product);
// });

// export const createProduct = asyncHandler(async (req, res) => {
//   const created = await svc.create(req.body);
//   res.status(201).json(created);
// });

// export const updateProduct = asyncHandler(async (req, res) => {
//   const updated = await svc.update(req.params.id, req.body);
//   res.status(200).json(updated);
// });

// export const deleteProduct = asyncHandler(async (req, res) => {
//   await svc.remove(req.params.id);
//   res.status(204).send();
// });

// export const getProductStocks = asyncHandler(async (req, res) => {
//   const stocks = await svc.getStocks(req.params.id);
//   res.status(200).json(stocks);
// });
