import { AUTH_ERRORS } from '../constants.js';
import { User } from '../models/index.js';
import { handleInternalServerError } from '../utils/index.js';

async function createUser(email, role, name) {
    try {
        const user = new User({ email, role, name });
        await user.save();
        return user;
    } catch (error) {
        console.log('REPOSITORY_LAYER_ERROR ::: ', error.message);
        handleInternalServerError(error, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        console.log('REPOSITORY_LAYER_ERROR ::: ', error.message);
        handleInternalServerError(error, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

async function getUserById(_id) {
    try {
        const user = await User.findOne({ _id });
        return user;
    } catch (error) {
        console.log('REPOSITORY_LAYER_ERROR ::: ', error.message);
        handleInternalServerError(error, AUTH_ERRORS.REPOSITORY_LAYER);
    }
}

const userRepository = {
    createUser,
    getUserByEmail,
    getUserById,
};

export default userRepository;
