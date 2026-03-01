import { connection } from "@/db/schema";

export type DBType = "pg" | "mysql" | "sqlite" | "mongodb";

export type Connection = typeof connection.$inferSelect;