'use server';

import { db } from "@/db";
import { connection } from "@/db/schema";
import { auth } from "@/lib/auth";
import { testDatabaseConnection } from "@/lib/db/test.connection";
import { connectionSchema } from "@/schema/connection.schema";
import { ConnectionInput, ConnectionResponse, NewConnection } from "@/types/connection.types";
import { headers } from "next/headers";
import { z } from "zod";

export async function createNewConnection(payload: ConnectionInput): Promise<ConnectionResponse> {

    // check schema 
    const valid = connectionSchema.safeParse(payload);
    if (!valid.success) {
        return { success: false, error: z.prettifyError(valid.error) }
    };

    // session get 
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
        return { success: false, error: "UnAuthorized Request!" }
    };
    // save in db
    const data = await db.insert(connection).values({
        ...payload,
        userId: session.user.id,
    }).returning();

    return { success: true, data }
}