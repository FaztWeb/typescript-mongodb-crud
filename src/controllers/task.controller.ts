import { Request, Response } from "express";
import Task from "../models/task.model";
import {
  createTaskSchema,
  createTaskType,
  updateTaskSchema,
  updateTaskType,
} from "../schemas/task.schema";

export const renderTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find().lean();
  res.render("tasks/list", {
    tasks,
  });
};

export const renderTaskForm = (req: Request, res: Response) => {
  res.render("tasks/create");
};

export const createTask = async (
  req: Request<{}, {}, createTaskType>,
  res: Response
) => {
  try {
    const { title, description } = createTaskSchema.parse(req.body);
    const task = new Task({ title, description });
    await task.save();
    res.redirect("/tasks/list");
  } catch (errors) {
    if (errors.issues) {
      return res.render("tasks/create", { errors: errors.issues });
    }
    return res.render("tasks/create", {
      errors: [{ message: "Something Goes Wrong" }],
    });
  }
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

export const updateTask = async (
  req: Request<any, {}, updateTaskType>,
  res: Response
) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body);
  return res.redirect("/tasks/list");
};
