import { Router } from "express";
import { createBoard, getAllBoards } from "../controllers/boards-controller.js";
import { validateBoardCreate } from "../models/board.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

router.get('/', getAllBoards);
router.post('/', [joiValidator(validateBoardCreate)], createBoard);

export default router;