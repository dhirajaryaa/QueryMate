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
        const [data] = await db
            .update(connection)
            .set({
                ...payload,
            })
            .where(eq(connection.id, connId))
            .returning();

        return { success: true, data };
    } catch (error) {
        return handleServerActionError(error);
    }
}