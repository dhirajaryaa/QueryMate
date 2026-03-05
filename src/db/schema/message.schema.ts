import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { chat } from "./chat.schema";

export const message = pgTable(
  "message",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id").references(() => chat.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    role: text("role").default("user").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("message_chatId_idx").on(table.chatId)],
);
