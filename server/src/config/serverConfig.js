import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const TOKEN_EXPIRY = process.env.TOKEN_EXPIRY;
export const BASE_URL = process.env.BASE_URL;