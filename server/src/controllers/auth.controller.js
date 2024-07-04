import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/index.js'
import { handleError, handleResponse, validateFields } from '../utils/index.js';

async function signUp(req, res) {
    try {
        validateFields(req, { body: ['email', 'password'] });
        const { email, password } = req.body;
        const auth = await authService.createAuth(email, password);
        handleResponse(res, StatusCodes.CREATED, auth, 'User created successfully');
    } catch (error) {
        handleError(error, res);
    }
}

const authController = {
    signUp
}

export default authController;