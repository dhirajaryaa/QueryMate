import { drizzle } from 'drizzle-orm/postgres-js';
import { QM_DATABASE_URL } from '../config/env.js';

export const db = drizzle(QM_DATABASE_URL);