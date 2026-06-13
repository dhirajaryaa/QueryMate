"use server";

import { db } from "@/db";
import { chat } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { requireUser } from "@/modules/auth/utils/require-user";
import { AppResponse } from "@/types/app.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { and, eq } from "drizzle-orm";

export async function deleteChatById(chatId: string): Promise<AppResponse<{ id: string }>> {
    try {
        // input check
        if (!chatId) {
            throw new AppError(
                "bad_request:api",
                "Chat ID is required.",
            );
        };
        // session get
        const user = await requireUser();


        // delete chat 
        const [removeChat] = await db.delete(chat).where(and(
            eq(chat.id, chatId),
            eq(chat.userId, user.id)
        )).returning({ id: chat.id });


        return { success: true, data: removeChat };
    } catch (error) {
        return handleServerActionError(error);
    }
}