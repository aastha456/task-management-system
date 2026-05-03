import { Router } from "express";
import * as workspaceController from "../controllers/workspaceController";
import { authenticate } from "../middlewares/authenticate";


const router = Router();
router.post("/", authenticate, workspaceController.createWorkspace);
router.get("/", authenticate, workspaceController.getAllWorkspaces);
router.get("/:id", authenticate, workspaceController.getWorkspaceById);
router.put("/:id", authenticate, workspaceController.updateWorkspace);
router.delete("/:id", authenticate, workspaceController.deleteWorkspace);
router.post("/:id/members", authenticate, workspaceController.addMember);
router.delete("/:id/members", authenticate, workspaceController.removeMember);
router.get("/:id/members", authenticate, workspaceController.getMembers);


export default router;