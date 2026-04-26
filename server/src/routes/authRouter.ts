import { Router } from "express";
import * as authController from "../controllers/authController"
import { validateRequestBody } from "../middlewares/validation";
import { registerSchema, loginSchema, refreshTokenSchema, logoutSchema } from "../schemas/auth";

const router = Router();

router.post("/register", validateRequestBody(registerSchema), authController.register);
router.post("/login", validateRequestBody(loginSchema), authController.login);
router.post("/refresh-token", validateRequestBody(refreshTokenSchema), authController.refreshToken);
router.post("/logout", validateRequestBody(logoutSchema), authController.logout);



export default router;

