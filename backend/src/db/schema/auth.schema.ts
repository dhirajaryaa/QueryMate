import { pgTable, uuid, text, pgEnum, timestamp } from 'drizzle-orm/pg-core';


export const providerEnum = pgEnum("provider", ["google", "github", "email", "link"]);

export const authSchema = pgTable("auth", {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    password: text('password'),
    provider: providerEnum("provider").default("email"),
    createdAt: timestamp("created_at").defaultNow().notNull()
})