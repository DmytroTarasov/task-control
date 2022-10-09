import { Router } from "express";
import { createProfile, login } from "../controllers/auth-controller.js";
import { validateUserRegister, validateUserLogin } from "../models/user.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";

const router = Router();

router.post('/register', [joiValidator(validateUserRegister)], createProfile);

router.post('/login', [joiValidator(validateUserLogin)], login);

export default router;