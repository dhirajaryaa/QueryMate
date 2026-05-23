"use server";

import { db } from "@/db";
import { connection } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { requireUser } from "@/modules/auth/utils/require-user";
import { handleServerActionError } from "@/utils/handle-errors";
import { DeleteConnection } from "@/modules/connection/types/connection.types";

export async function connectionRemove(
  connId: string,
): Promise<DeleteConnection> {
  try {
    // session get
    const user = await requireUser()

    // connection find
     await db
      .delete(connection)
      .where(
        and(eq(connection.id, connId), eq(connection.userId, user.id)),
      );

    return { success: true, data: null };
  } catch (error) {
    return handleServerActionError(error);
  }
}