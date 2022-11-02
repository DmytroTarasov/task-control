import { Router } from "express";
import { createComment } from "../controllers/comments-controller.js";
import { validateCommentCreate } from "../models/comment.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

router.post('/', [joiValidator(validateCommentCreate)], createComment);

export default router;