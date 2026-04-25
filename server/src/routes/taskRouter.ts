import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/", authenticate, taskController.createTask);
router.get("/", authenticate, taskController.getAllTasks);
router.get("/:id", authenticate, taskController.getTaskById);
router.put("/:id", authenticate, taskController.updateTask);
router.delete("/:id", authenticate, taskController.deleteTask);

export default router;