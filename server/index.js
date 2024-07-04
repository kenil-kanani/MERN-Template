import express from "express";
import { BASE_URL, PORT } from "./src/config/serverConfig.js";
import connectDB from "./src/config/dbConfig.js";
import router from "./src/routes/index.js";
import cors from "cors";

const app = express();

const corsOptions = {
    origin: BASE_URL,
    optionsSuccessStatus: 200
}

async function startServer() {
    await connectDB();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cors(corsOptions));

    app.use('/api', router);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${BASE_URL}`);
    });
}

startServer();