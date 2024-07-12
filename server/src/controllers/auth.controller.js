import { StatusCodes } from 'http-status-codes';
import { authService } from '../services/index.js';
import {
    asyncHandler,
    handleResponse,
    validateFields,
} from '../utils/index.js';

const signUp = asyncHandler(async (req, res) => {
    // validate fields
    validateFields(req, { body: ['email', 'password', 'role', 'name'] });
    // fetch fields
    const { email, password, role, name } = req.body;
    // pass control to the service layer
    const user = await authService.createAuth(email, password, role, name);
    // set the token in a cookie
    res.cookie('token', user.token, { httpOnly: true, secure: true });
    // send the response
    handleResponse(res, StatusCodes.CREATED, user, 'User created successfully');
});

const signIn = asyncHandler(async (req, res) => {
    // validate fields
    validateFields(req, { body: ['email', 'password'] });
    // fetch field
    const { email, password } = req.body;
    // pass control to the service layer
    const user = await authService.authenticate(email, password);
    // set the token in a cookie
    res.cookie('token', user.token, { httpOnly: true, secure: true });
    // send the response
    handleResponse(res, StatusCodes.OK, user, 'User signed in successfully');
});

const signOut = asyncHandler((req, res) => {
    // clear token from cookie
    res.clearCookie('token');
    // send the response
    handleResponse(res, StatusCodes.OK, null, 'User signed out successfully');
});

const getCurrentUser = asyncHandler((req, res) => {
    // send user from request
    const user = req.user;
    // send response
    handleResponse(res, StatusCodes.OK, user, 'User retrieved successfully');
});

const authController = {
    signUp,
    signIn,
    signOut,
    getCurrentUser,
};

export default authController;
