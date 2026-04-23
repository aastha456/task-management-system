import { Router } from 'express';
import * as userController from "../controllers/userController"
import { authenticate, UserRequest} from "../middlewares/authenticate";

const router = Router();

router.get('/me', authenticate, (req: UserRequest, res) => {
    console.log("Authentication user");

    console.log("Request", req.user);
    res.send({ user: req.user})

});

router.get("/", authenticate, userController.getAll);


export default router;