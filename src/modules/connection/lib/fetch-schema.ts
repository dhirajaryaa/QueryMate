import {
  MongoDBClient,
  MySQLClient,
  PostgresClient,
} from "@/modules/connection/lib/connection-client";
import { db } from "@/db";
import { connection } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AppError } from "@/lib/errors";
import { getAdapter } from "@/utils/db-adapter";
import { Relation } from "@/modules/connection/types/connection.types";
import { decrypt } from "../utils/crypto";

export async function fetchDBSchema(connId: string) {
  const [conn] = await db
    .select()
    .from(connection)
    .where(eq(connection.id, connId))
    .limit(1);

  if (!conn) {
    throw new AppError("not_found:api", "Connection not found!");
  };

  const secretUri = decrypt(conn.uri);

  //! Postgres
  if (conn.type === "pg") {
    const pgConn = new PostgresClient({
      connectionString: secretUri,
      ssl: conn.ssl ? { rejectUnauthorized: false } : false,
    });

    if (!pgConn) {
      throw new Error("Unable to connect database");
    }

    try {
      const adapter = getAdapter(conn.type);
      const schema = await pgConn.pool.query(adapter.getSchema());
      const relations = await pgConn.pool.query(adapter.getRelations());

      const group = schema.rows.reduce<Record<string, Set<string>>>(
        (acc: any, row: any) => {
          if (!acc[row.table_name]) {
            acc[row.table_name] = new Set();
          }
          acc[row.table_name].add(row.column_name);
          return acc;
        },
        {},
      );
      const entries = Object.entries(group) as [string, Set<string>][];

      const schemaResult: Record<string, string[]> = Object.fromEntries(
        entries.map(([table, cols]) => [
          table,
          [...cols],
        ]),
      );

      return {
        schema: schemaResult,
        relations: relations.rows,
      };
    } catch (err: any) {
      console.error(err);
      return err.message;
    } finally {
      await pgConn.close();
    }

    //! my sql
  }
  //! MySql
  else if (conn.type === "mysql") {
    const sqlConn = new MySQLClient({
      uri: secretUri,
      ssl: conn.ssl ? { rejectUnauthorized: false } : undefined,
    });

    if (!sqlConn) {
      throw new Error("Unable to connect database");
    }
    try {
      const adapter = getAdapter(conn.type);
      const [schemaRows] = await sqlConn.pool.query(adapter.getSchema());
      const [relationRows] = await sqlConn.pool.query(adapter.getRelations());

      // validate
      if (!Array.isArray(schemaRows) || !Array.isArray(relationRows)) {
        throw new Error("Expected SELECT result type");
      }

      const group = schemaRows.reduce<Record<string, Set<string>>>(
        (acc, row: any) => {
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

      const relationsResult: Relation[] = relationRows.map(
        (relation: any): Relation => ({
          table_name: relation.table_name,
          column_name: relation.column_name,
          foreign_table: relation.referenced_table_name,
          foreign_column: relation.referenced_column_name,
        }),
      );

      return {
        schema: schemaResult,
        relations: relationsResult,
      };
    } catch (error: any) {
      console.error(error);
      return error.message;
    } finally {
      await sqlConn.close();
    }
  }
  //! Mongodb - Experimental
  else if (conn.type === "mongodb") {
    const mongoConn = new MongoDBClient(secretUri);

    try {
      await mongoConn.connect(); // ✅ MUST

      const schemaRows = await mongoConn.getSchema();
      const relationRows = await mongoConn.getRelations();

      console.log("Schema:", schemaRows);
      console.log("Relations:", relationRows);

      return {
        schema: schemaRows,
        relations: relationRows,
      };
    } catch (error: any) {
      console.error(error);
      return error.message;
    } finally {
      await mongoConn.close();
    }
  } else {
    return;
  }
}
