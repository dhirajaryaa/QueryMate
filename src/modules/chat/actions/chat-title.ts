"use server";

import { db } from "@/db";
import { chat } from "@/db/schema";
import { AppError } from "@/lib/errors";
import { generateChatTitle } from "@/modules/ai/lib/ai";
import { requireUser } from "@/modules/auth/utils/require-user";
import { genChatTitle, } from "@/modules/chat/types/chat.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { eq } from "drizzle-orm";

export async function generateAndSaveChatTitle({
    chatId, message
}: { chatId: string, message: string }): Promise<genChatTitle> {
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

        const [selectedChat] = await db
            .select()
            .from(chat)
            .where(eq(chat.id, chatId));

        if (!selectedChat) {
            throw new AppError("not_found:chat");
        };

        // title have or not 
        if (selectedChat.title === "New Chat") {

            // gen chat title
            const title = await generateChatTitle(message);            

            // save it 
            await db.update(chat)
                .set({ title })
                .where(eq(chat.id, chatId));
                
            return { success: true, data: { id: selectedChat.id, title: title ?? selectedChat.title } };
        };


        return { success: true, data: { id: selectedChat.id, title: selectedChat.title } };
    } catch (error) {
        return handleServerActionError(error);
    }
}