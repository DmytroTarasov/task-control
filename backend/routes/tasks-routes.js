import { Router } from "express";
import { createTask, editTask, deleteTask, archiveTask, getTaskById } from "../controllers/tasks-controller.js";
import { validateTaskCreate, validateTaskEdit} from "../models/task.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

router.post('/', [joiValidator(validateTaskCreate)], createTask);
router.patch('/:taskId', [joiValidator(validateTaskEdit)], editTask);
router.post('/:taskId/archive', archiveTask);
router.delete('/:taskId', deleteTask);
router.get('/:taskId', getTaskById);

export default router;