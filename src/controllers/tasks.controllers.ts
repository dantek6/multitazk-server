import { Request, Response } from "express";
import TaskWriteModel from "../models/TaskWrite";

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await TaskWriteModel.find();
    res.json(tasks);
};

export const createTasks = async (req: Request, res: Response) => {
    
};

export const getTask = async (req: Request, res: Response) => {};

export const updateTask = async (req: Request, res: Response) => {};

export const deleteTask = async (req: Request, res: Response) => {};
