import { Router } from 'express';
import { userController } from '../../controllers/index.js';

const router = Router();

router.post('/get', userController.get)

export default router;