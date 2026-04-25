import { Router } from 'express';
import authRoutes from './authRouter';
import userRoutes from './userRouter';
import taskRoutes from './taskRouter';


const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);


export default router;

