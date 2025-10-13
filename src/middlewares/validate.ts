// // middlewares/validate.ts
// import { Request, Response, NextFunction } from "express";

// type Schemas = { body?: AnyZodObject; params?: AnyZodObject; query?: AnyZodObject };

// export function validate(schemas: Schemas) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (schemas.body) req.body = schemas.body.parse(req.body);
//       if (schemas.params) req.params = schemas.params.parse(req.params);
//       if (schemas.query) req.query = schemas.query.parse(req.query);
//       next();
//     } catch (e) {
//       const err = e as ZodError;
//       res.status(400).json({ error: "Validation error", issues: err.issues });
//     }
//   };
// }
