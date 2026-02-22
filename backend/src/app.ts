import express, { type Express } from 'express';
import cors from 'cors';
import { QM_FRONTEND_URL } from './config/env';
import { authRouter } from 'auth/auth.routes';
import { errorHandler } from 'middleware/error.middleware';

const app: Express = express();

// built in middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ORIGIN middleware 
app.use(cors({
    origin: QM_FRONTEND_URL,
    credentials: true
}));


//? routes setup 
app.use("/api/auth",authRouter);

//! error middleware
app.use(errorHandler)

export default app;