import { pgTable, uuid, text, timestamp, index } from "drizzle-orm/pg-core";
import { connection } from "./connection.schema";
import { user } from "./user.schema";

export const chat = pgTable(
  "chat",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    connectionId: uuid("connection_id")
      .notNull()
      .references(() => connection.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [index("chat_userId_idx").on(table.userId)],
);
