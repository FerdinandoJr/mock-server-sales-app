// middlewares/error.ts
import { Request, Response, NextFunction } from "express";

export function notFoundMiddleware(req: Request, res: Response) {
  res.status(404).json({ error: "Route not found" });
}

export function errorMiddleware(err: any, req: Request, res: Response, _next: NextFunction) {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Internal Server Error",
    details: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
}
