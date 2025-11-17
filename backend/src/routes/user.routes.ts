import { Router } from "express";
import { registerUser } from "../controllers/user.controller";

const router = Router();

//@route POST /api/users/register
router.post("/register", registerUser);

// Additional user routes can be added here

export default router;
