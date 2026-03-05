import { db } from "@/db";
import { chat, message } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // session check
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) {
      return NextResponse.json(
        { message: "UnAuthorized Request" },
        { status: 401 },
      );
    }
    // prompt and dbId get
    const { prompt, dbId } = await req.json();
    if (!prompt && !dbId) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }
    // create new chat
    const [newChat] = await db
      .insert(chat)
      .values({
        title: "New Chat",
        connectionId: dbId,
        userId: session?.user?.id,
      })
      .returning();

    await db.insert(message).values({
      content: prompt,
      role: "user",
      chatId: newChat.id,
    });

    return NextResponse.json({ chatId: newChat.id, dbId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 },
    );
  }
}
