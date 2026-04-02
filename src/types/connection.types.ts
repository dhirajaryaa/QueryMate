import { connection, connectionSchema } from "@/db/schema";
import {
  addConnectionSchema,
  editConnectionSchema,
} from "@/schema/connection.schema";
import { z } from "zod";
import { AppErrorPayload, AppResponse } from "./app.types";

export type DBType = "pg" | "mysql" | "sqlite" | "mongodb";

export type Connection = typeof connection.$inferSelect;
export type ConnectionSchema = typeof connectionSchema.$inferSelect;

export type NewConnection = typeof connection.$inferInsert;

export type ConnectionInput = z.infer<typeof addConnectionSchema>;

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

export type GetConnections = AppResponse<{
  connections: Connection[];
  stats: ConnectionStats;
}>;

export type TestConnection = AppResponse<null>;

export type DeleteConnection = AppResponse<null>;

export type ConnectionsList = AppResponse<
  Pick<Connection, "id" | "type" | "name">[]
>;
export type GetConnectionSchema = AppResponse<ConnectionSchema>;

export interface SchemaAdapter {
  getSchema(): string;
  getRelations(): string;
}

export type ConnectionSchemaRefresh = AppResponse<ConnectionSchema>;

export type Relation = {
  table_name: string;
  column_name: string;
  foreign_table: string;
  foreign_column: string;
};
