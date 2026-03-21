import { PostgresClient } from "./connection-client";
import { db } from "@/db";
import { connection } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AppError } from "../errors";
import { getAdapter } from "@/utils/db-adapter";
import { logger } from "../logger";

export async function GetDbSchema(connId: string) {
  const [conn] = await db
    .select()
    .from(connection)
    .where(eq(connection.id, connId))
    .limit(1);
  if (!conn) {
    throw new AppError("not_found:api", "Connection not found!");
  }

  // select adapter
  const adapter = getAdapter(conn.type);

  if (!adapter) return;

  //? postgres
  if (conn.type === "pg") {
    const pgConn = new PostgresClient({
      connectionString: conn.uri as string,
      ssl: conn.ssl ? { rejectUnauthorized: false } : false,
    });

    if (!pgConn) {
      throw new Error("Unable to connect database");
    }

    try {
      const schema = await pgConn.pool.query(adapter.getSchema());
      const relations = await pgConn.pool.query(adapter.getRelations());

      const group = schema.rows.reduce<Record<string, Set<string>>>(
        (acc, row) => {
          if (!acc[row.table_name]) {
            acc[row.table_name] = new Set();
          }
          acc[row.table_name].add(row.column_name);
          return acc;
        },
        {},
      );
      const schemaResult = Object.fromEntries(
        Object.entries(group).map(([table, cols]) => [table, [...cols]]),
      );

      return {
        schema: schemaResult,
        relations: relations.rows,
      };
    } catch (err: any) {
      logger.error(err);
      return err.message;
    } finally {
      await pgConn.close();
    }
  } else {
    return;
  }
}
