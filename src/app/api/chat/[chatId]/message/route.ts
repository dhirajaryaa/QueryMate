import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { generateChatResponse } from "@/services/ai-service";
import { and, asc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { chatId: string } },
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
    const { chatId } = await params;

    const chatExists = await db
      .select()
      .from(chat)
      .where(and(eq(chat.id, chatId), eq(chat.userId, session.user.id)));

    if (!chatExists) {
      return NextResponse.json({ message: "Chat not found!" }, { status: 404 });
    }

    const allMessages = await db
      .select()
      .from(message)
      .where(eq(message.chatId, chatId))
      .orderBy(asc(message.createdAt));

    return NextResponse.json({ data: allMessages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { chatId: string } },
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
    let messages: any[] = [];
    const allMessages = await db
      .select({
        role: message.role,
        content: message.content,
      })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(and(eq(message.id, chatId), eq(chat.userId, session.user.id)))
      .orderBy(asc(message.createdAt));

    if (allMessages.length > 1) {
      messages = [...messages, ...allMessages];
    }

    // save user message
    await db.insert(message).values({
      content: prompt,
      role: "user",
      chatId,
    });
    messages.push({ role: "user", content: prompt });

    const completions = await generateChatResponse(messages);

    // stream response
    let assistantMessage: string = "";
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completions) {
            const text = chunk.choices[0]?.delta.content || "";
            assistantMessage += text;
            controller.enqueue(encoder.encode(text));
          }
          // message save on db
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
        "Content-Type": "text/plain; charset=utf-8",
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
