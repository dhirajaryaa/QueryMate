"use server";

import { db } from "@/db";
import { connection, connectionSchema } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { requireUser } from "@/modules/auth/utils/require-user";
import { ConnectionSchemaRefresh } from "@/modules/connection/types/connection.types";
import { eq } from "drizzle-orm";
import { fetchDBSchema } from "../lib/fetch-schema";
import { handleServerActionError } from "@/utils/handle-errors";

export async function connectionSchemaRefresh(
    connId: string,
): Promise<ConnectionSchemaRefresh> {
    try {
        // session get
        const user = await requireUser();

        // connection find
        const [conn] = await db
            .select()
            .from(connection)
            .where(eq(connection.id, connId))
            .limit(1);

        if (!conn) {
            throw new AppError("not_found:api", "Connection not found!");
        }
        
        const TEN_MINUTES = 10 * 60 * 1000; // ms
        
        const shouldRun =
        conn.updatedAt &&
        Date.now() - new Date(conn.updatedAt).getTime() > TEN_MINUTES;
        
        if (!shouldRun) {
            //Todo: only run when last fetching 10 min.
            // run your logic
            
        }
        const rowSchema = await fetchDBSchema(connId);

        if (!rowSchema) {
            throw new AppError("bad_request:database", "failed to fetch schema");
        };

        const [schema] = await db
            .select()
            .from(connectionSchema)
            .where(eq(connectionSchema.connectionId, conn.id));

        if (!schema) {
            await db
                .insert(connectionSchema)
                .values({
                    connectionId: conn.id,
                    structure: rowSchema.schema,
                    relationships: rowSchema.relations,
                })
                .returning();
        }

        // update schema
        await db
            .update(connectionSchema)
            .set({
                structure: rowSchema.schema,
                relationships: rowSchema.relations,
            })
            .where(eq(connectionSchema.connectionId, conn.id));

        // status updata
        await db
            .update(connection)
            .set({ status: "active" })
            .where(eq(connection.id, conn.id));

        return { success: true, data: schema };
    } catch (error) {
        return handleServerActionError(error);
    }
}