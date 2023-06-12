import jwt from "jsonwebtoken";
import env from "dotenv";
import { Request, Response, NextFunction } from "express";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;
  env.config();
  const tokenSecret = process.env.TOKEN_SECRET;

  if (!token) {
    return res.status(401).json({ error: "No hay token" });
  }

  jwt.verify(token, tokenSecret!, (err: jwt.VerifyErrors | null, user: any) => {
    if (err) return res.status(403).json({ error: "Token no válido" });

    (req as any).user = user;
    next();
  });
};
