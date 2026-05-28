"use server";

import z from "zod";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { AppError } from "@/lib/errors";
import { connection } from "@/db/schema";
import { editConnectionSchema } from "@/modules/connection/schema/connection";
import { ConnectionEditInput, EditConnection } from "@/modules/connection/types/connection.types";
import { requireUser } from "@/modules/auth/utils/require-user";
import { handleServerActionError } from "@/utils/handle-errors";
import { maskSecret } from "@/modules/connection/utils/mask-secret";
import { encrypt } from "@/modules/connection/utils/crypto";

export async function updateConnection(
    connId: string,
    payload: ConnectionEditInput,
): Promise<EditConnection> {
    try {
        // check schema
        const valid = editConnectionSchema.safeParse(payload);
        if (!valid.success) {
            throw new AppError("bad_request:api", z.prettifyError(valid.error));
        }

        // session get
        const user = await requireUser();

        // save in db
        const updatablePayload: ConnectionEditInput = {
            ...payload,
            ...(valid.data.name && {
                name: valid.data.name,
            }),

            ...(valid.data.ssl !== undefined && {
                ssl: valid.data.ssl,
            }),

            ...(valid.data.uri && {
                uri: encrypt(valid.data.uri),
                maskUri: maskSecret(valid.data.uri),
            }),
        };

        const [data] = await db
            .update(connection)
            .set(updatablePayload)
            .where(eq(connection.id, connId))
            .returning();

        return { success: true, data };
    } catch (error) {
        return handleServerActionError(error);
    }
}