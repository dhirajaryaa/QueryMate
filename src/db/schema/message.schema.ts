import { index, jsonb, pgEnum, pgTable, timestamp, uuid, } from "drizzle-orm/pg-core";
import { chat } from "./chat.schema";

export const rolesEnum = pgEnum("roles", ["system", "user", "assistant"]);


export const message = pgTable(
  "message",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id").references(() => chat.id, { onDelete: "cascade" }),
    role: rolesEnum().default("user").notNull(),
    parts: jsonb("parts").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("message_chatId_idx").on(table.chatId)],
);
