import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { auth } from "./auth.schema";

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("auth_id").references(() => auth.id),
  refreshToken: text("refresh_token").notNull(),
  device: text("device").default("browser"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
