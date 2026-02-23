import { Router, Router as ExpressRouter } from 'express';
import { loginController, signupController } from './auth.controller';

export const authRouter: ExpressRouter = Router();

//? routes 
authRouter.post("/signup",signupController);
authRouter.post("/login",loginController);