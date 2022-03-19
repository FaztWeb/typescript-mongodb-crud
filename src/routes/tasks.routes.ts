import { Router, Request, Response } from "express";
import {
  deleteTask,
  renderEditForm,
  renderTaskForm,
  renderTasks,
  saveTask,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/list", renderTasks);

router.get("/create", renderTaskForm);
router.post("/create", saveTask);

router.get("/delete/:id", deleteTask);

router.get("/edit/:id", renderEditForm);
router.post("/edit/:id", updateTask);

export default router;
