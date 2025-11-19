import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";

const router = Router();

//@route POST /api/users/register
router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
