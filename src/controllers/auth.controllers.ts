import { Request, Response } from "express";
import UserModel from "../models/Users";
import { createAccessToken } from "../libs/jwt";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import jwt from "jsonwebtoken";
import env from "dotenv";

//Registro de Usuario:
export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await UserModel.findOne({ email });
    if (userFound) {
      return res.status(400).json(["El usuario / correo ya está registrado"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: passwordHash,
      groups: [],
      taskId: [],
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      groups: userSaved.groups,
      taskId: userSaved.taskId,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

//Login de Usuario:
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await UserModel.findOne({
      // $or: [{ email }, { username }],
      email,
    });

    if (!userFound)
      return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch){
      return res.status(400).json(["Contraseña incorrecta"]);
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      groups: userFound.groups,
      taskId: userFound.taskId,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

//Cierre de sesión:
export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

//Ver Perfil de Usuario:
export const profile = async (req: Request, res: Response) => {
  const userFound = await UserModel.findById((req as any).user.id);

  console.log("userFound: ", userFound);

  if (!userFound) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  console.log("DESPUÉS DE ESO!");

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: moment(userFound.createdAt).tz(userTimezone).format(),
    updatedAt: moment(userFound.updatedAt).tz(userTimezone).format(),
  });
};

//Verificación de Token:
export const verifyToken = async (req: Request, res: Response) => {

  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No hay token" });

  env.config();

  jwt.verify(token, process.env.TOKEN_SECRET!, async (err: jwt.VerifyErrors | null, user: any) => {
    // if (err) return res.status(403).json({ error: "Token no válido" });

    if (err) return res.status(401).json({ error: "Token no válido" });

    const userFound = await UserModel.findById(user.id);

    if (!userFound) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });

  });
};
