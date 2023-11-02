import { Request, Response } from "express";
import Groupmodel from "../models/Groups";
import TaskWriteModel from "../models/TaskWrite";
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
      usersId: [(req as any).user.id],
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
  
  const taskIds = group.tasksId;
  
  for (const taskId of taskIds) {
    await TaskWriteModel.findByIdAndDelete(taskId);
  }
  return res.sendStatus(204);
};

// Actualizar un grupo por su ID
export const updateGroup = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.id;
    const { name } = req.body;

    // Verifica si el grupo existe
    const group = await Groupmodel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: 'El grupo no existe' });
    }

    // Actualiza el nombre del grupo si se proporciona en la solicitud
    if (name) {
      group.name = name;
    }

    // Guarda los cambios en el grupo
    const updatedGroup = await group.save();

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el grupo" });
  }
};
