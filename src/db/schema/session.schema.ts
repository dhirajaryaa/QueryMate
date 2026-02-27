import {
    index,
    uniqueIndex,
    pgTable,
    uuid,
    text,
    timestamp
} from "drizzle-orm/pg-core";

import { users } from "./user.schema";

export const sessions = pgTable(
    "sessions",
    {
        id: uuid("id")
            .primaryKey()
            .defaultRandom(),

        userId: text("user_id")
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade"
            }),

        token: text("token")
            .notNull(),

        expiresAt: timestamp("expires_at")
            .notNull(),

        createdAt: timestamp("created_at")
            .defaultNow()
            .notNull(),

        updatedAt: timestamp("updated_at")
            .$onUpdateFn(() => new Date()),

        ipAddress: text("ip_address"),

        userAgent: text("user_agent"),
    },

    (table) => [
        uniqueIndex("session_token_idx")
            .on(table.token),

        index("session_user_idx")
            .on(table.userId),

        index("session_expires_idx")
            .on(table.expiresAt),
    ]
);