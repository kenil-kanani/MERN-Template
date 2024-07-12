import mongoose from 'mongoose';
import { USER_ROLES } from '../constants.js';
import { TOKEN_SECRET, TOKEN_EXPIRY } from '../config/serverConfig.js';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: USER_ROLES,
            default: USER_ROLES[0],
        }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
        },
        TOKEN_SECRET,
        {
            expiresIn: TOKEN_EXPIRY,
        }
    );
}

export const User = mongoose.model('User', userSchema);