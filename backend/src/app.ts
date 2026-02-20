import express, { type Express } from 'express';

const app: Express = express();

// built in middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export default app;