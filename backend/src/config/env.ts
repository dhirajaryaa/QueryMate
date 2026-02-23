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

    QM_FRONTEND_URL: z.url(),

    QM_ACCESS_TOKEN_SECRET: z.string(),
    QM_REFRESH_TOKEN_SECRET: z.string()
});

const env = envSchema.parse(process.env);

export const { PORT,
    NODE_ENV,
    QM_DATABASE_URL,
    QM_FRONTEND_URL,
    QM_REFRESH_TOKEN_SECRET,
    QM_ACCESS_TOKEN_SECRET
} = env;

// cookies secure 
export const cookiesOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: true,
    maxAge: 7 * 24 * 60 * 60 * 1000
}