import express from 'express';
import authRoutes from './auth/routes';
import userRoutes from './user/routes';

const rootRouter = express.Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/user",userRoutes);

export default rootRouter;