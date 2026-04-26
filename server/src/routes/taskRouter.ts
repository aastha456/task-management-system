import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { authenticate } from "../middlewares/authenticate";
import { validateRequestBody, validateRequestParams } from "../middlewares/validation";
import { createTaskSchema } from "../schemas/task";
import { idSchema } from "../schemas/common";

const router = Router();

router.post("/", validateRequestBody(createTaskSchema), authenticate, taskController.createTask);
router.get("/", validateRequestBody(createTaskSchema), authenticate, taskController.getAllTasks);
router.get("/:id", validateRequestParams(idSchema), authenticate, taskController.getTaskById);
router.put("/:id", validateRequestParams(idSchema), authenticate, taskController.updateTask);
router.delete("/:id", validateRequestParams(idSchema), authenticate, taskController.deleteTask);

export default router;