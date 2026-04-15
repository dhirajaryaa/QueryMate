"use server";

import { db } from "@/db";
import { connection } from "@/db/schema";
import { requireUser } from "@/modules/auth/utils/require-user";
import { ConnectionsList } from "@/modules/connection/types/connection.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { eq } from "drizzle-orm";

export const connectionList = async (): Promise<ConnectionsList> => {
    try {
        // session check 
        const user = await requireUser();

        // get all connection 
        const allConn = await db
            .select({
                id: connection.id,
                name: connection.name,
                type: connection.type,
            })
            .from(connection)
            .where(eq(connection.userId, user.id));


        return { success: true, data: allConn }
    } catch (error) {
        return handleServerActionError(error)
    };
};