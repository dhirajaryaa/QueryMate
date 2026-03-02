import { pgTable, index, text, boolean, pgEnum, uuid, timestamp } from 'drizzle-orm/pg-core';
import { user } from './user.schema';

export const dbType = pgEnum("type", ["pg", "mysql", "sqlite", "mongodb"]);
export const statusEnum = pgEnum("status", ["active", "pending", "issus"]);

export const connection = pgTable("connection", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    uri: text("uri"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    type: dbType("type").notNull().default("pg"),
    status: statusEnum("status").notNull().default("pending"),
    ssl: boolean("ssl").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdateFn(() => new Date())
},
    (table) => [index("connection_idx").on(table.id)]
);