import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { AppError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { streamChatResponse } from "@/lib/stream-response";
import { runAIAgent } from "@/services/ai-service";
import { AgentMessage } from "@/types/agent.types";
import { PromptMessage } from "@/types/message.types";
import { and, asc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    // session check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return new AppError("unauthorized:auth").toResponse();
    }

    // get chat id & prompt
    const { chatId } = await params;
    const { prompt } = await req.json();

    if (!prompt) {
      return new AppError("bad_request:api").toResponse();
    }

    //! update chat title
    const [currentChat] = await db
      .select()
      .from(chat)
      .where(eq(chat.id, chatId))
      .limit(1);

    if (!currentChat) {
      return new AppError("not_found:chat").toResponse();
    }

    if (currentChat.title === "New Chat") {
      const newTitle = prompt.slice(0, 30);
      await db.update(chat).set({ title: newTitle }).where(eq(chat.id, chatId));
    };

    // get all message form db
    const allMessages = await db
      .select({
        role: message.role,
        content: message.content,
      })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(and(eq(message.chatId, chatId), eq(chat.userId, session.user.id)))
      .orderBy(asc(message.createdAt));

    if (allMessages.length <= 0) {
      return new AppError("not_found:chat").toResponse();
    };

    let messages: PromptMessage[] = [...allMessages];

    //! save user message - prevent duplication
    const lastMessage = allMessages[allMessages.length - 1];
    if (
      !lastMessage ||
      lastMessage.role !== "user" ||
      lastMessage.content !== prompt
    ) {
      await db.insert(message).values({
        content: prompt,
        role: "user",
        chatId,
      });
    }

    //? new message add on history
    messages.push({
      role: "user",
      content: prompt,
    });

    //! llm calling
    const completions = runAIAgent(
      messages as AgentMessage[],
      currentChat.connectionId,
    );

    // stream response
    const { stream, done, getAssistantMessage } =
      streamChatResponse(completions);

    // Save assistant message after stream ends
    done
      .then(async () => {
        const content = getAssistantMessage();
        if (!content) return;
        await db.insert(message).values({
          chatId,
          role: "assistant",
          content,
        });
      })
      .catch((err) => {
        logger.error("Assistant message save failed", err);
      });

    // stream response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    if (error instanceof AppError) {
      return error.toResponse();
    }
    return new AppError("internal:api").toResponse();
  }
}
