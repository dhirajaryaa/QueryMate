"use server";

import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { AppError } from "@/lib/errors";
import { GetAllMessages } from "@/types/message.types";
import { handleServerActionError } from "@/utils/handle-errors";
import { and, asc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getAllMessagesAction({
  chatId,
}: {
  chatId: string;
}): Promise<GetAllMessages> {
  try {
    // input check
    console.log("i am run");
    console.log(chatId);

    if (!chatId) {
      throw new AppError("bad_request:chat");
    }
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      throw new AppError("unauthorized:auth");
    }

    // check user chat
    const chatExists = await db
      .select()
      .from(chat)
      .where(and(eq(chat.id, chatId), eq(chat.userId, session.user.id)));

    if (!chatExists) {
      throw new AppError("not_found:chat");
    }

    const allMessages = await db
      .select()
      .from(message)
      .where(eq(message.chatId, chatId))
      .orderBy(asc(message.createdAt));

    if (allMessages.length <= 0) {
      throw new AppError("not_found:chat");
    }

    return { success: true, data: allMessages };
  } catch (error) {
    return handleServerActionError(error);
  }
}
