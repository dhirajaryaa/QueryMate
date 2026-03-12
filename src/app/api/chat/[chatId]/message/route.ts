import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
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
      return NextResponse.json(
        { message: "UnAuthorized Request" },
        { status: 401 },
      );
    }
    // get chat id & prompt
    const { chatId } = await params;
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

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

    //! update chat title
    const [currentChat] = await db
      .select()
      .from(chat)
      .where(eq(chat.id, chatId))
      .limit(1);

    if(!currentChat){
      throw new Error("Chat not found!");
    };

    if (currentChat.title === "New Chat") {
      const newTitle = prompt.slice(0, 30);

      await db.update(chat).set({ title: newTitle }).where(eq(chat.id, chatId));
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
    let assistantMessage: string = "";
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const text of completions) {
            assistantMessage += text;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(text)}\n\n`),
            );
          }
          //? message save on db
          await db.insert(message).values({
            content: assistantMessage,
            role: "assistant",
            chatId,
          });

          controller.close();
        } catch (error) {
          console.error("llm stream error", error);
          controller.close();
        }
      },
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
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}
