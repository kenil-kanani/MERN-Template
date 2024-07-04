import { StatusCodes } from 'http-status-codes';
import { authRepository } from '../repositories/index.js'
import { AUTH_ERRORS } from '../constants.js';
import { ApiError } from '../utils/ApiError.js';

async function createAuth(email, password) {
    try {
        const auth = await authRepository.createAuth(email, password);
        return auth;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        } else {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, AUTH_ERRORS.SERVICE_LAYER);
        }
    }
}

const authService = {
    createAuth
}

export default authService;