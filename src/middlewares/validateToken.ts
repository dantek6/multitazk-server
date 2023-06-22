import jwt from "jsonwebtoken";
import env from "dotenv";
import { USER } from "../models/Users";
import { Request, Response, NextFunction } from "express";

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try{
    const { token } = req.cookies;
    env.config();
    const tokenSecret = process.env.TOKEN_SECRET;
  
    // const userId: USER | undefined = (req as any).user.id;
  
    if (!token) {
      return res.status(401).json({ error: "No hay token" });
    }
  
    jwt.verify(token, tokenSecret!, (err: jwt.VerifyErrors | null, user: any) => {
      if (err) return res.status(401).json({ error: "Token no válido" });
  
      (req as any).user = user as USER;
      next();
    });
  }catch(error){
    res.status(500).json({ error: "Error al verificar el token" });
  }
};
