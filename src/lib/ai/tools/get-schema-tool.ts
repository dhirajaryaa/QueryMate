import { db } from "@/db";
import { connectionSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getSchemaTool = {
  details: {
    name: "get_schema",
    description: "Get schema of a database",
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
  execute: async ({
    connection_id,
  }: {
    connection_id: string;
  }): Promise<string | string[]> => {
    if (!connection_id) return "connection id missing";

    const [schema] = await db
      .select()
      .from(connectionSchema)
      .where(eq(connectionSchema.connectionId, connection_id))
      .limit(1);

    if (!schema) {
      return "Failed to Get schema form database, Abort!";
    };
    
    return JSON.stringify({
      schema: schema.structure,
      relation: schema.relationships,
    });
  },
};
