import { handleError } from './index.js';

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) =>
            handleError(error, res)
        );
    };
};

export { asyncHandler };
