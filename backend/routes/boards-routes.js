import { Router } from "express";
import { createBoard, getBoards, getBoardById, editBoard, deleteBoard, setColumnColor} from "../controllers/boards-controller.js";
import { validateBoardCreate, validateBoardEdit } from "../models/board.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

router.get('/', getBoards);
router.get('/:boardId', getBoardById);
router.post('/', [joiValidator(validateBoardCreate)], createBoard);
router.patch('/:boardId', [joiValidator(validateBoardEdit)], editBoard);
router.patch('/:boardId/setColumnColor', setColumnColor);
router.delete('/:boardId', deleteBoard);

export default router;