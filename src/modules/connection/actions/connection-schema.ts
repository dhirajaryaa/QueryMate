"use server";

import { requireUser } from "@/modules/auth/utils/require-user";
import { GetConnectionSchema } from "@/modules/connection/types/connection.types";
import { db } from "@/db";
import { connectionSchema } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { handleServerActionError } from "@/utils/handle-errors";

export async function getConnectionSchema(
  connId: string,
): Promise<GetConnectionSchema> {
  try {
    // session get
   const user = await requireUser();

    // connection schema find
    const [schema] = await db
      .select()
      .from(connectionSchema)
      .where(and(eq(connectionSchema.connectionId, connId)))
      .limit(1);

    return { success: true, data: schema };
  } catch (error) {
    return handleServerActionError(error);
  }
}