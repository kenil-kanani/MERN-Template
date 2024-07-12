import express from 'express';
import { BASE_URL, PORT } from './src/config/serverConfig.js';
import connectDB from './src/config/dbConfig.js';
import router from './src/routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
    origin: BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};

async function startServer() {
    await connectDB();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(cookieParser());

    app.use(cors(corsOptions));

    app.use('/api', router);

    app.listen(PORT, () => {
        console.log(`⚙️  server is running on port ${PORT}`);
    });
}

startServer();
