import { Router } from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import healthRouter from "./health.routes.js"

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/user', userRouter);
v1Router.use('/health',healthRouter);

export default v1Router;
