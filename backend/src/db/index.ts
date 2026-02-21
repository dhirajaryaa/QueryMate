import { drizzle } from 'drizzle-orm/postgres-js';
import { QM_DATABASE_URL } from '../config/env';

export const db = drizzle(QM_DATABASE_URL,{casing :"snake_case"});