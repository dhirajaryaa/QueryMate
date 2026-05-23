"use server";

import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { connection } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { requireUser } from "@/modules/auth/utils/require-user";
import { GetConnection } from "@/modules/connection/types/connection.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { decrypt } from "@/modules/connection/utils/crypto";
import { maskSecret } from "@/modules/connection/utils/mask-secret";

export async function getConnection(
  connId: string,
): Promise<GetConnection> {
  try {
    if (!connId) {
      throw new AppError("bad_request:api", "connection id is invalid.");
    }
    // session get
    const user = await requireUser();
    // get connection
    const [conn] = await db
      .select()
      .from(connection)
      .where(and(eq(connection.id, connId), eq(connection.userId, user.id)))
      .limit(1);

    if (!conn) {
      throw new AppError("not_found:database", "Connection not found!");
    };

    //? mask secret 
    const decryptedUri = decrypt(conn.uri);
    const maskedUri = maskSecret(decryptedUri);



    return { success: true, data: { ...conn, uri: maskedUri } };
  } catch (error) {
    return handleServerActionError(error);
  }
}