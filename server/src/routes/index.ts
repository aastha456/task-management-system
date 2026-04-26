import { Router } from 'express';
import authRoutes from './authRouter';
import userRoutes from './userRouter';
import taskRoutes from './taskRouter';
import workspaceRoutes from './workspaceRouter';
import projectRoutes from './projectRouter';


const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/projects", projectRoutes); 


export default router;

