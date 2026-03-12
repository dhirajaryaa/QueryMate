import { db } from "@/db";
import { eq } from "drizzle-orm";
import { connection } from "@/db/schema";

export const getDbInfoTool = {
  details: {
    name: "get_db_info",
    description: "Get Database information",
    parameters: {
      type: "object",
      properties: {
        connection_id: {
          type: "string",
          description: "Connection ID of the database",
        },
      },
      required: ["connection_id"],
    },
  },
  //? run tool
  execute: async ({
    connection_id,
  }: {
    connection_id: string;
  }): Promise<string> => {
    console.log("dbid", connection_id);

    if (!connection_id) {
      return "Failed:connection_id not provided";
    }

    // db information get
    const [dbInfo] = await db
      .select({
        id: connection.id,
        type: connection.type,
        name: connection.name,
        status: connection.status,
      })
      .from(connection)
      .where(eq(connection.id, connection_id))
      .limit(1);

    if (!dbInfo) {
      return "Database not found!";
    };

    return `id:${dbInfo.id}|dbType:${dbInfo.type}|name:${dbInfo.name}|status:${dbInfo.status}`;
  },
};
