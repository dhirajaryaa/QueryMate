"use server";

import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { connection } from "@/db/schema";
import { handleServerActionError } from "@/utils/handle-errors";
import { requireUser } from "@/modules/auth/utils/require-user";
import { GetConnections } from "@/modules/connection/types/connection.types";

// get connection list
export async function getAllConnections(): Promise<GetConnections> {
    try {
        // session get
        const user = await requireUser();
        // get all connection
        // TODO: add pagination very important
        const allConn = await db
            .select({
                id:connection.id,
                name:connection.name,
                type: connection.type,
                updatedAt: connection.updatedAt,
                status: connection.status
            })
            .from(connection)
            .where(eq(connection.userId, user.id))
            .orderBy(desc(connection.createdAt));

        // stats list
        const stats = {
            total: allConn.length ?? 0,
            pending: 0,
            active: 0,
            issus: 0,
        };
        for (const conn of allConn) {
            if (conn.status === "active") stats.active++;
            if (conn.status === "issus") stats.issus++;
            if (conn.status === "pending") stats.pending++;
        };

        return { success: true, data: { connections: allConn, stats } };
    } catch (error) {
        return handleServerActionError(error);
    }
}