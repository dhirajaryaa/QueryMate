import z from 'zod';
import dotenv from 'dotenv';

// config dotenv 
dotenv.config({
    path: "./.env"
});

// env schema 
const envSchema = z.object({
    PORT: z.string().default('5000'),

    NODE_ENV: z.enum([
        "development",
        "production",
        "test"
    ]),

    QM_DATABASE_URL: z.string().min(1),

    QM_FRONTEND_URL: z.url()
});

const env = envSchema.parse(process.env);

export const { PORT,
    NODE_ENV,
    QM_DATABASE_URL,
    QM_FRONTEND_URL
} = env;