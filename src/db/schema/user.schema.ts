import { pgTable, pgEnum, varchar, text, uuid, boolean, timestamp } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const planEnum = pgEnum("plan", ["free", "pro"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 80 }).notNull(),
    email: text("email").notNull().unique(),
    password: text("password"),
    avatarUrl: text("avatar_url").default(""),
    role: roleEnum("role").default("user"),
    plan: planEnum("plan").default("free"),
    emailVerified: boolean("email_verified").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("update_at").defaultNow().$onUpdateFn(() => new Date())
})