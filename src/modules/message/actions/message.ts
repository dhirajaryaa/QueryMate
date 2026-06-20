"use server";

import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";
import { AppError } from "@/lib/errors";
import { GetAllMessages } from "@/modules/message/types/message.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { requireUser } from "@/modules/auth/utils/require-user";

export async function getAllMessages({
  chatId,
}: {
  chatId: string;
}): Promise<GetAllMessages> {
  try {
    // input check
    if (!chatId) {
      throw new AppError("bad_request:chat");
    }
    // session get
    const user = await requireUser();

    // check user chat
    const chatExists = await db
      .select()
      .from(chat)
      .where(and(eq(chat.id, chatId), eq(chat.userId, user.id)));

    if (!chatExists) {
      throw new AppError("not_found:chat");
    };

    const allMessages = await db
      .select()
      .from(message)
      .where(eq(message.chatId, chatId))
      .orderBy(asc(message.createdAt));

    return { success: true, data: allMessages };
  } catch (error) {
    return handleServerActionError(error);
  }
}
