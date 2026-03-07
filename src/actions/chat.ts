"use server";
import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { CreateChatProps, ChatResponse, GetChatHistory } from "@/types/chat.types";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function createNewChatAction({
  prompt,
  dbId,
}: CreateChatProps): Promise<ChatResponse> {
  try {
    // input check
    if (!prompt && !dbId) {
      return { success: false, error: "Bad Request" };
    }
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "UnAuthorized Request!" };
    }

    // create new chat
    const [newChat] = await db
      .insert(chat)
      .values({
        title: "New Chat",
        connectionId: dbId,
        userId: session?.user?.id,
      })
      .returning({
        chatId: chat.id,
        dbId: chat.connectionId,
        title: chat.title,
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
    return {
      success: false,
      error: "Something went wrong!",
    };
  }
}

export async function getChatHistoryAction(): Promise<GetChatHistory> {
  try {
    // session get
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return { success: false, error: "UnAuthorized Request!" };
    }

    const allChats = await db
      .select({ id: chat.id, title: chat.title })
      .from(chat)
      .where(eq(chat.userId, session.user.id));

    return {
      success: true,
      data: allChats,
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong!",
    };
  }
}
