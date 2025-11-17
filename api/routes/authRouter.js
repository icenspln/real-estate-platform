import express from "express";
import validate from "../middleware/validate.js";
import { authLoginSchema, authSignupSchema } from "../config/schemas.js";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validate(authSignupSchema), signup);
router.post("/login", validate(authLoginSchema), login);

export default router;
