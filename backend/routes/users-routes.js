import { Router } from 'express';
import { getProfileInfo, deleteProfile } from '../controllers/users-controller.js';
import checkAuth from '../middlewares/auth-middleware.js';

const router = Router();

router.use(checkAuth);

router.get('/', getProfileInfo);

router.delete('/', deleteProfile);

export default router;