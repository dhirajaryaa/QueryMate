import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// dotenv setup 
configDotenv({ path: "./.env" });

export default defineConfig({
    dialect: 'postgresql',
    out: "./src/db/migrations",
    schema: "./src/db/schema",
    dbCredentials: {
        url: process.env.QM_DATABASE_URL!
    },
    verbose: true,
    strict: true
});
