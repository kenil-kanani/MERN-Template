import { AUTH_ERRORS } from '../constants.js';
import { Auth } from '../models/index.js'
import { ApiError } from '../utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'

async function createAuth(email, password) {
    try {
        if (await Auth.isEmailAlreadyRegistered(email)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, AUTH_ERRORS.EMAIL_ALREADY_REGISTERED);
        }
        const auth = new Auth({ email, password });
        await auth.save();
        return auth;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

const authRepository = {
    createAuth
}

export default authRepository;