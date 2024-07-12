import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/index.js';
import { asyncHandler } from '../utils/index.js';
import { StatusCodes } from 'http-status-codes';
import { AUTH_ERRORS } from '../constants.js';
import { TOKEN_SECRET } from '../config/serverConfig.js';

const verifyJWT = asyncHandler(async (req, res, next) => {
    const accessToken =
        req.cookies?.token ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, AUTH_ERRORS.UNAUTHORIZED);
    }

    const decodedToken = jwt.verify(accessToken, TOKEN_SECRET);

    if (!decodedToken) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            AUTH_ERRORS.INVALID_ACCESS_TOKEN
        );
    }

    const user = await User.findById(decodedToken.id).select('-password');

    if (!user) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            AUTH_ERRORS.INVALID_ACCESS_TOKEN
        );
    }

    req.user = user;

    next();
});

export { verifyJWT };
