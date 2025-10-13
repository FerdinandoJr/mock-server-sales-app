// middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // valide JWT, extraia tenant, usuário, etc.
  // (req as any).tenantId = tid;
  next();
}
