import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/index.js'
import { handleError, handleResponse, validateFields } from '../utils/index.js';

async function signUp(req, res) {
    try {
        validateFields(req, { body: ['email', 'password', 'role', 'name'] });
        const { email, password, role, name } = req.body;
        const user = await authService.createAuth(email, password, role, name);
        res.cookie('token', user.token, { httpOnly: true, secure: true });
        handleResponse(res, StatusCodes.CREATED, user, 'User created successfully');
    } catch (error) {
        handleError(error, res);
    }
}

async function signIn(req, res) {
    try {
        validateFields(req, { body: ['email', 'password'] });
        const { email, password } = req.body;
        const user = await authService.authenticate(email, password);
        res.cookie('token', user.token, { httpOnly: true, secure: true });
        handleResponse(res, StatusCodes.OK, user, 'User signed in successfully');
    } catch (error) {
        handleError(error, res);
    }
}

const authController = {
    signUp,
    signIn
}

export default authController;