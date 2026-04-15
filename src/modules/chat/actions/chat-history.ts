"use server";

import { db } from "@/db";
import { chat } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireUser } from "@/modules/auth/utils/require-user";
import { GetChatHistory } from "@/modules/chat/types/chat.types";
import { handleServerActionError } from "@/utils/handle-errors";


export async function getChatHistory(): Promise<GetChatHistory> {
    try {
        // session get
        const user = await requireUser();

        const allChats = await db
            .select({ id: chat.id, title: chat.title })
            .from(chat)
            .where(eq(chat.userId, user?.id));

        return {
            success: true,
            data: allChats,
        };
    } catch (error) {
        return handleServerActionError(error);
    }
}