import { pgTable, index, text, boolean, pgEnum, uuid, timestamp } from 'drizzle-orm/pg-core';
import { user } from './user.schema';

export const dbType = pgEnum("type", ["pg", "mysql", "sqlite", "mongodb"])

export const connection = pgTable("connection", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    uri: text("uri"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    type: dbType("type").default("pg"),
    status: text("status").default("pending"), //active,pending,error
    ssl: boolean("ssl").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().$onUpdateFn(() => new Date())
},
    (table) => [index("connection_idx").on(table.id)]
);