import { AUTH_ERRORS } from '../constants.js';
import { Auth } from '../models/index.js'
import { ApiError, handleInternalServerError } from '../utils/index.js'
import { StatusCodes } from 'http-status-codes'

async function createAuth(email, password) {
    try {
        if (await Auth.isEmailAlreadyRegistered(email)) {
            throw new ApiError(StatusCodes.BAD_REQUEST, AUTH_ERRORS.EMAIL_ALREADY_REGISTERED);
        }
        const auth = new Auth({ email, password });
        auth.verificationEmailSentAt = new Date();
        await auth.save();
        return auth;
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

async function getAuthByEmail(email) {
    try {
        const auth = await Auth.findOne({ email });
        if (!auth) {
            throw new ApiError(StatusCodes.NOT_FOUND, AUTH_ERRORS.AUTH_NOT_FOUND);
        }
        return auth;
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

async function updateAuth(email, data) {
    try {
        const auth = await Auth.findOneAndUpdate({ email }, data);
        return auth;
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

const authRepository = {
    createAuth,
    getAuthByEmail,
    updateAuth
}

export default authRepository;