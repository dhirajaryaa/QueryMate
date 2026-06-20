"use server"

import z from "zod";
import { db } from "@/db";
import { connection } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { addConnectionSchema } from "@/modules/connection/schema/connection";
import { ConnectionInput, ConnectionResponse } from "@/modules/connection/types/connection.types";
import { requireUser } from "@/modules/auth/utils/require-user";
import { handleServerActionError } from "@/utils/handle-errors";
import { encrypt } from "@/modules/connection/utils/crypto";
import { maskSecret } from "@/modules/connection/utils/mask-secret";

//new connection
export async function createNewConnection(
  payload: ConnectionInput,
): Promise<ConnectionResponse> {
  try {
    // check schema 
    // Todo: dangers input normalize for prevent script injection attack
    const valid = addConnectionSchema.safeParse(payload);
    if (!valid.success) {
      throw new AppError("bad_request:api", z.prettifyError(valid.error));
    }

    // session get
    const user = await requireUser();

    // save in db
    const secureUri = encrypt(valid.data.uri);
    const maskedUri = maskSecret(valid.data.uri);

    const [data] = await db
      .insert(connection)
      .values({
        ...valid.data,
        uri: secureUri,
        maskUri: maskedUri,
        userId: user.id,
      })
      .returning({ id: connection.id });


    return { success: true, data };

  } catch (error) {
    return handleServerActionError(error);
  }
}