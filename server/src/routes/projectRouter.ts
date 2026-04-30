import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { authenticate } from "../middlewares/authenticate"; 

const router = Router();

router.post("/", authenticate, projectController.createProject);
router.get("/", authenticate, projectController.getAllProject);
router.get("/:id", authenticate, projectController.getProjectById);
router.put("/:id", authenticate, projectController.updateProject);
router.delete("/:id", authenticate, projectController.deleteProject);

export default router;