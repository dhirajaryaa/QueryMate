import { db } from "@/db";
import { connection } from "@/db/schema";
import { eq } from "drizzle-orm";
import { PostgresClient } from "./connection-client";
import { logger } from "../logger";
import { decrypt } from "../crypto";

export async function runDBQuery({
  query,
  connId,
}: {
  query: string;
  connId: string;
}): Promise<string> {
  const [conn] = await db
    .select()
    .from(connection)
    .where(eq(connection.id, connId))
    .limit(1);

  if (!conn) {
    return "Connection Not found!";
  };
   //? decode secret
     const decryptedUri = decrypt(conn.uri, conn.userId); 

  //?   postgres
  if (conn.type === "pg") {
    try {
      const pgConn = new PostgresClient({
        connectionString: decryptedUri,
        ssl: conn.ssl ? { rejectUnauthorized: false } : false,
      });
      if (!pgConn) {
        return "Database Connection Failed To connect";
      }

      const res = await pgConn.pool.query(query);

      // console.log("DB query Result 🍞:", JSON.stringify(res, null, 2));

      return JSON.stringify({
        rows: res.rows,
        rowCount: res.rowCount,
      });
    } catch (error) {
      logger.error(error);
      return JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return "Database not support this time.";
}
