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
        };
        // session get
        const user = await requireUser();


        const result = await db.transaction(async (tx) => {
            // first save chat 
            const [newChat] = await tx
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

            // save first message 
            await tx.insert(message).values({
                content: prompt,
                role: "user",
                chatId: newChat.chatId,
            });

            return newChat
        });

        return { success: true, data: result };
    } catch (error) {
        return handleServerActionError(error);
    }
}