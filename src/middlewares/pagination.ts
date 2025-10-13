// middlewares/pagination.ts
import { Request, Response, NextFunction } from "express";


export function pagination(defaultLimit = 30) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const page = Math.max(1, parseInt((req.query.page as string) || "1", 10));
    const limit = Math.max(1, Math.min(200, parseInt((req.query.limit as string) || String(defaultLimit), 10)));
    const order = (req.query.order as string) || undefined; // ex.: "name asc"
    (req as any).paginated = { page, limit, order };
    next();
  };
}
