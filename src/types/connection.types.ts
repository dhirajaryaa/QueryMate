import { connection } from "@/db/schema";
import { connectionSchema } from "@/schema/connection.schema";
import { z } from "zod";

export type DBType = "pg" | "mysql" | "sqlite" | "mongodb";

export type Connection = typeof connection.$inferSelect;
export type NewConnection = typeof connection.$inferInsert;

export type ConnectionInput = z.infer<typeof connectionSchema>

export type ConnectionResponse = { success: boolean, data?: any, error?: String }