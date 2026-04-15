"use server";

import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { requireUser } from "@/modules/auth/utils/require-user";
import { ChatResponse, CreateChatProps } from "@/modules/chat/types/chat.types";
import { handleServerActionError } from "@/utils/handle-errors";

export async function createNewChat({
    prompt,
    dbId,
}: CreateChatProps): Promise<ChatResponse> {
    try {
        // input check
        if (!prompt && !dbId) {
            throw new AppError(
                "bad_request:api",
                "Prompt or database id is required.",
            );
        }
        // session get
        const user = await requireUser()

        // create new chat
        const [newChat] = await db
            .insert(chat)
            .values({
                title: "New Chat",
                connectionId: dbId,
                userId: user?.id,
            })
            .returning({
                chatId: chat.id,
                dbId: chat.connectionId,
            });

        if (newChat) {
            await db.insert(message).values({
                content: prompt,
                role: "user",
                chatId: newChat.chatId,
            });
        }

        return { success: true, data: newChat };
    } catch (error) {
        return handleServerActionError(error);
    }
}