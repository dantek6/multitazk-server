import { Request, Response } from "express";
import TaskWriteModel from "../models/TaskWrite";
import GroupModel from "../models/Groups";

//Obtener todas las tareas:
export const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskWriteModel.find({
    adminId: (req as any).user.id,
  });
  res.json(tasks);
};

//Crear una tarea:
export const createTasks = async (req: Request, res: Response) => {
  const { title, instruction, date, lengthMin, points } = req.body;
  const { groupId } = req.params;
  
  // Verificar si el usuario es el administrador del grupo
  const user = (req as any).user;
  const isAdmin = await GroupModel.exists({ _id: groupId, adminId: user.id });
  
  console.log(user.id, groupId)

  if (!isAdmin) {
    return res.status(403).json({ error: "No eres el administrador de este grupo" });
  }

  const newTask = new TaskWriteModel({
    title,
    instruction,
    date,
    lengthMin,
    points,
    groupId,
    adminId: (req as any).user.id,
    responses: [],
  });

  const taskSaved = await newTask.save();
  res.json(taskSaved);
};

//Obtener una tarea:
export const getTask = async (req: Request, res: Response) => {
  const task = await TaskWriteModel.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "No se encontro la tarea" });
  res.json(task);
};

//Eliminar una tarea:
export const deleteTask = async (req: Request, res: Response) => {
  const { taskId, groupId } = req.params;

  // Verificar si el usuario es el administrador del grupo
  const user = (req as any).user;
  const isAdmin = await GroupModel.exists({ _id: groupId, adminId: user.id });

  if (!isAdmin) {
    return res.status(403).json({ error: "No eres el administrador de este grupo" });
  }

  const task = await TaskWriteModel.findByIdAndDelete(taskId);
  if (!task) return res.status(404).json("No se encontró la tarea");
  res.json(task);
};

//Actualizar una tarea:
export const updateTask = async (req: Request, res: Response) => {
  const { taskId, groupId } = req.params;

  // Verificar si el usuario es el administrador del grupo
  const user = (req as any).user;
  const isAdmin = await GroupModel.exists({ _id: groupId, adminId: user.id });

  if (!isAdmin) {
    return res.status(403).json({ error: "No eres el administrador de este grupo" });
  }

  const task = await TaskWriteModel.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json("No se encontró la tarea");
  res.json(task._id);
};
