import { authRepository, userRepository } from '../repositories/index.js'
import { APP_NAME, AUTH_ERRORS } from '../constants.js';
import { ApiError, handleInternalServerError, sendMail } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/user.model.js';
import { verifyEmailHTML } from '../utils/HTMLTemplate/verifyEmail.js';

async function createAuth(email, password, role, name) {
    try {
        await authRepository.createAuth(email, password);
        const user = await userRepository.createUser(email, role, name);
        const token = await user.generateToken();
        sendMail(
            email,
            `Welcome to ${APP_NAME} - Verify Your Email`,
            verifyEmailHTML(token)
        );
        return { email, role, name };
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.SERVICE_LAYER);
    }
}

async function authenticate(email, password) {
    try {
        const auth = await authRepository.getAuthByEmail(email);
        const isPasswordValid = await auth.comparePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.INVALID_CREDENTIALS);
        }
        const user = await userRepository.getUserByEmail(email);
        if (!auth.verified) {
            if (new Date() - auth.verificationEmailSentAt > 3 * 60 * 1000) {
                const token = await user.generateToken();
                sendMail(
                    email,
                    `Welcome to ${APP_NAME} - Verify Your Email`,
                    verifyEmailHTML(token)
                );
                auth.verificationEmailSentAt = new Date();
                await auth.save();
                throw new ApiError(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.VERIFICATION_EMAIL_SENT);
            } else {
                throw new ApiError(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.VERIFICATION_EMAIL_SENT_RECENTLY);
            }
        }
        const token = await user.generateToken();
        return { email, role: user.role, name: user.name, token };
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.SERVICE_LAYER);
    }
}

async function validateToken(token) {
    try {
        const user = await User.decodedToken(token);
        return user;
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.SERVICE_LAYER);
    }
}

async function verifyEmail(token) {
    try {
        const user = await User.decodedToken(token);
        if (!user) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.INVALID_TOKEN);
        }
        await authRepository.updateAuth(user.email, { verified: true });
        return { email: user.email, role: user.role, name: user.name, isVerified: true };
    } catch (error) {
        handleInternalServerError(error, AUTH_ERRORS.SERVICE_LAYER);
    }
}

const authService = {
    createAuth,
    authenticate,
    validateToken,
    verifyEmail
}

export default authService;