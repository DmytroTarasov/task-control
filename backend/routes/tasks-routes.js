import { Router } from "express";
import { createTask } from "../controllers/tasks-controller.js";
import { validateTaskCreate } from "../models/task.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

// router.get('/', getBoards);
router.post('/', [joiValidator(validateTaskCreate)], createTask);
// router.patch('/:boardId', [joiValidator(validateBoardEdit)], editBoard);

export default router;