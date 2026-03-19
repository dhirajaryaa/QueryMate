import { connection } from "@/db/schema";
import {
  connectionSchema,
  editConnectionSchema,
} from "@/schema/connection.schema";
import { z } from "zod";
import { AppErrorPayload, AppResponse } from "./app.types";

export type DBType = "pg" | "mysql" | "sqlite" | "mongodb";

export type Connection = typeof connection.$inferSelect;
export type NewConnection = typeof connection.$inferInsert;

export type ConnectionInput = z.infer<typeof connectionSchema>;

export type ConnectionEditInput = z.infer<typeof editConnectionSchema>;

export type ConnectionResponse = AppResponse<{ id: Connection["id"] }>;

export type ConnectionStats = {
  total: number;
  pending: number;
  active: number;
  issus: number;
};

export type GetConnection = AppResponse<Connection>;

export type EditConnection = AppResponse<Connection>;

export type GetConnections =
  | {
      success: true;
      data: { connections: Connection[]; stats: ConnectionStats };
    }
  | { success: false; error: AppErrorPayload };

export type TestConnection = AppResponse<null>;

export type ConnectionsList = AppResponse<
  Pick<Connection, "id" | "type" | "name">[]
>;

export interface SchemaAdapter {
  getSchema(): string;
  getRelations(): string;
}
