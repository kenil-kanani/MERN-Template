import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/index.js'
import { ApiError, handleError, handleResponse, validateFields } from '../utils/index.js';

async function signUp(req, res) {
    try {
        validateFields(req, { body: ['email', 'password', 'role', 'name'] });
        const { email, password, role, name } = req.body;
        const user = await authService.createAuth(email, password, role, name);
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

async function me(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Token not found, please login to continue');
        }
        const user = await authService.validateToken(token);
        handleResponse(res, StatusCodes.OK, user, 'User fetched successfully');
    } catch (error) {
        handleError(error, res);
    }
}

async function logout(_, res) {
    res.clearCookie('token');
    handleResponse(res, StatusCodes.OK, null, 'User logged out successfully');
}

async function verifyEmail(req, res) {
    try {
        const { token } = req.params;
        await authService.verifyEmail(token);
        handleResponse(res, StatusCodes.OK, null, 'Email verified successfully');
    } catch (error) {
        handleError(error, res);
    }
}

const authController = {
    signUp,
    signIn,
    me,
    logout,
    verifyEmail
}

export default authController;