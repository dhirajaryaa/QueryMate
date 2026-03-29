import { db } from "@/db";
import { connectionSchema, connection, message } from "@/db/schema";
import { AgentMessage } from "@/types/agent.types";
import { eq } from "drizzle-orm";

export async function injectDBContext(history: AgentMessage[], connId: string) {
  // get db info
  const [schema] = await db
    .select()
    .from(connectionSchema)
    .leftJoin(connection, eq(connectionSchema.connectionId, connection.id))
    .where(eq(connectionSchema.connectionId, connId));

  if (!schema || history.length === 0) return history;

  const lastMessage = history.at(-1);

  if (lastMessage?.role !== "user") return history;

  const updateMessage = {
    ...lastMessage,
    content: `db_name: "${schema.connection?.name}", db_type: "${schema.connection?.type}" , schema: ${JSON.stringify(schema.connection_schema.structure)}, question: ${lastMessage.content}`,
  };

  return [...history.slice(0, -1), updateMessage];
};

export function injectDBResultContext(history:AgentMessage[],result:string){
  const lastMessage = history.at(-1);

  if (lastMessage?.role !== "user") return history;

  const updateMessage = {
    ...lastMessage,
    content: `question: ${lastMessage.content}, dbResult: ${result}`,
  };

  return [...history.slice(0, -1), updateMessage];
}
