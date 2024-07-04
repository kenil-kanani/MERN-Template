import mongoose from 'mongoose';
import { MONGO_URL } from './serverConfig.js';

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export default connectDB;