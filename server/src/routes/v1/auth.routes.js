import { Router } from 'express';
import { authController } from '../../controllers/index.js';
import { verifyJWT } from '../../middlewares/index.js';
const router = Router();

// http://localhost:3000/api/v1/auth

router.get('/', verifyJWT, authController.getCurrentUser);
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/signout', verifyJWT, authController.signOut);

export default router;
