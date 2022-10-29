import { Router } from "express";
import { createTask, editTask } from "../controllers/tasks-controller.js";
import { validateTaskCreate, validateTaskEdit} from "../models/task.js";
import joiValidator from "../middlewares/joi-validator-middleware.js";
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

router.post('/', [joiValidator(validateTaskCreate)], createTask);
router.patch('/:taskId', [joiValidator(validateTaskEdit)], editTask);

export default router;