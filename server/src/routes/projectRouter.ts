import { Router } from "express";
import * as projectController from "../controllers/projectController";
import { authenticate } from "../middlewares/authenticate"; 

const roouter = Router();

roouter.post("/", authenticate, projectController.createProject);
roouter.get("/", authenticate, projectController.getAllProject);
roouter.get("/:id", authenticate, projectController.getProjectById);
roouter.put("/:id", authenticate, projectController.updateProject);
roouter.delete("/:id", authenticate, projectController.deleteProject);

export default roouter;