import { StatusCodes } from 'http-status-codes';
import { asyncHandler, handleResponse } from '../utils/index.js';

export const checkHealth = asyncHandler((_, res) => {
    handleResponse(res, StatusCodes.OK, {}, 'Server is healthy...');
});
