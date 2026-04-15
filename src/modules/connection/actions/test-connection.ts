"use server";

import { AppError } from "@/lib/errors";
import { handleServerActionError } from "@/utils/handle-errors";
import { testDatabaseConnection } from "@/modules/connection/lib/test-connection";
import { ConnectionInput, TestConnection } from "@/modules/connection/types/connection.types";

// test connection
export async function testConnection(
    payload: ConnectionInput,
): Promise<TestConnection> {
    try {
        const res = await testDatabaseConnection(payload);
        if (res.error) {
            return {
                success: false,
                error: new AppError("bad_request:api", res.error).toJson(),
            };
        }
        return { success: true, data: null };
    } catch (error) {
        return handleServerActionError(error);
    }
}