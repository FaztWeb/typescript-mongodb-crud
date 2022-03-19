import { Request, Response } from "express";
import Task from "../models/task.model";

export const renderTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find().lean();
  res.render("tasks/list", {
    tasks,
  });
};

export const renderTaskForm = (req: Request, res: Response) => {
  res.render("tasks/create");
};

export const saveTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.redirect("/tasks/list");
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const taskDeleted = await Task.findByIdAndDelete(id);
  if (!taskDeleted) return res.sendStatus(404);
  res.redirect("/tasks/list");
};

export const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).lean();
  return res.render("tasks/create", { task });
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  await Task.findByIdAndUpdate(id, {
    title,
    description,
  });
  return res.redirect("/tasks/list");
};
