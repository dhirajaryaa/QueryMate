import {
  MongoDBClient,
  MySQLClient,
  PostgresClient,
} from "./connection-client";
import { db } from "@/db";
import { connection } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AppError } from "../errors";
import { getAdapter } from "@/utils/db-adapter";
import { logger } from "../logger";
import { Relation, SchemaAdapter } from "@/types/connection.types";

export async function GetDbSchema(connId: string) {
  const [conn] = await db
    .select()
    .from(connection)
    .where(eq(connection.id, connId))
    .limit(1);
  if (!conn) {
    throw new AppError("not_found:api", "Connection not found!");
  }

  //! postgres
  if (conn.type === "pg") {
    const pgConn = new PostgresClient({
      connectionString: conn.uri as string,
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

    //! my sql
  } else if (conn.type === "mysql") {
    const sqlConn = new MySQLClient({
      uri: conn.uri,
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
      logger.error(error);
      return error.message;
    } finally {
      await sqlConn.close();
    }
  } else if (conn.type === "mongodb") {
    console.log("😱 I am mongoConn working");
    const mongoConn = new MongoDBClient(conn.uri);

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
      logger.error(error);
      return error.message;
    } finally {
      await mongoConn.close();
    }
  } else {
    return;
  }
}
