"use server"

import z from "zod";
import { db } from "@/db";
import { connection } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { addConnectionSchema } from "@/modules/connection/schema/connection";
import { ConnectionInput, ConnectionResponse } from "@/modules/connection/types/connection.types";
import { requireUser } from "@/modules/auth/utils/require-user";
import { handleServerActionError } from "@/utils/handle-errors";

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
    const [data] = await db
      .insert(connection)
      .values({
        ...payload,
        userId: user.id,
      })
      .returning({ id: connection.id });

      // Todo: trigger pg pubsub feature to schema fetching


    return { success: true, data };

  } catch (error) {
    return handleServerActionError(error);
  }
}