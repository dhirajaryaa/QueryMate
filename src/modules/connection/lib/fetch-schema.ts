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
import { decrypt } from "@/modules/connection/utils/crypto";
import { normalizeResult } from "@/modules/connection/utils/format-schema";

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

    try {
      const adapter = getAdapter(conn.type);
      const schema = await pgConn.pool.query(adapter.getSchema());
      const relations = await pgConn.pool.query(adapter.getRelations());

      const result = await normalizeResult(schema.rows, relations.rows);
      return result;
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message); // string nahi, throw karo — consistent
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

    try {
      const adapter = getAdapter(conn.type);
      const [schemaRows] = await sqlConn.pool.query(adapter.getSchema());
      const [relationRows] = await sqlConn.pool.query(adapter.getRelations());

      if (!Array.isArray(schemaRows) || !Array.isArray(relationRows)) {
        throw new Error("Expected SELECT result type");
      };

      const result = await normalizeResult(schemaRows, relationRows);
      return result
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message);
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
