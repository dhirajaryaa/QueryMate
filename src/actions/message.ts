"use server";

import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { GetAllMessages } from "@/types/message.types";
import { and, asc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function getAllMessagesAction({
  chatId,
}: {
  chatId: string;
}): Promise<GetAllMessages> {
  try {
    // input check
    if (!chatId) {
      return { success: false, error: "Bad Request" };
    }
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "UnAuthorized Request!" };
    }

    // check user chat
    const chatExists = await db
      .select()
      .from(chat)
      .where(and(eq(chat.id, chatId), eq(chat.userId, session.user.id)));
    if (!chatExists) {
      return { success: false, error: "Bad Request" };
    }

    const allMessages = await db
      .select()
      .from(message)
      .where(eq(message.chatId, chatId))
      .orderBy(asc(message.createdAt));

    if (allMessages.length === 0) {
      return { success: false, error: "Chat not found!" };
    }

    return { success: true, data: allMessages };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong!",
    };
  }
}
