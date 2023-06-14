import { Request, Response } from "express";
import Groupmodel from "../models/Groups";
import { createAccessToken } from "../libs/jwt";

//Obtener todos los grupos:
export const getGroups = async (req: Request, res: Response) => {
  const groups = await Groupmodel.find({
    adminId: (req as any).user.id,
  });
  res.json(groups);
};

//Crear un grupo:
export const createGroups = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {

    const newGroup = new Groupmodel({
      name,
      usersId: [],
      adminId: (req as any).user.id,
      tasksId: [],
    });

    const groupSaved = await newGroup.save();
    res.json(groupSaved);
    // const groupToken = await createAccessToken({ id: groupSaved._id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear grupo" });
  }
};

//Obtener un grupo:
export const getGroup = async (req: Request, res: Response) => {
  const group = await Groupmodel.findById(req.params.id);
  if (!group)
    return res.status(404).json({ message: "No se encontro el grupo" });
  res.json(group);
};

//Eliminar un grupo:
export const deleteGroup = async (req: Request, res: Response) => {
  const group = await Groupmodel.findByIdAndDelete(req.params.id);
  if (!group) return res.status(404).json("No se encontró el grupo");
  return res.sendStatus(204);
};
