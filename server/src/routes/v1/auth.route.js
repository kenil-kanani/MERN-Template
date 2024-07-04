import { Router } from 'express';
import { authController } from '../../controllers/index.js';

const router = Router();

router.post('/signup', authController.signUp);

export default router;