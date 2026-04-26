import { Router } from 'express';
import * as userController from "../controllers/userController"
import { authenticate, UserRequest} from "../middlewares/authenticate";
import { validateRequestParams, validateRequestBody } from "../middlewares/validation";
import { updateUserSchema } from "../schemas/user";
import { idSchema } from "../schemas/common";

const router = Router();

router.get('/me', authenticate, (req: UserRequest, res) => {
    console.log("Authentication user");

    console.log("Request", req.user);
    res.send({ user: req.user})

});

router.get("/", authenticate, userController.getAll);
router.get("/:id",authenticate, userController.getById);
router.put("/:id", validateRequestParams(idSchema), validateRequestBody(updateUserSchema), authenticate, userController.update);
router.delete("/:id", validateRequestParams(idSchema), authenticate, userController.remove);


export default router;