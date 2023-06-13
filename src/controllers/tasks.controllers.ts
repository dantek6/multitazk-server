import { Request, Response } from "express";
import TaskWriteModel from "../models/TaskWrite";

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

  console.log((req as any).user);

  const newTask = new TaskWriteModel({
    title,
    instruction,
    date,
    lengthMin,
    points,
    groupId: (req as any).user.id,
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
  const task = await TaskWriteModel.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json("No se encontró la tarea");
  res.json(task);
};

//Actualizar una tarea:
export const updateTask = async (req: Request, res: Response) => {
  const task = await TaskWriteModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json("No se encontró la tarea");
  res.json(task);
};
