import { db } from '@/db';
import { message } from '@/db/schema';
import { model } from '@/modules/ai/lib/provider';
import { streamText, UIMessage, convertToModelMessages, createIdGenerator } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, id: chatId }: { messages: UIMessage[], id: string } = await req.json();

    // save user message and skip fist already add
    const lastMessage = messages[messages.length - 1];

    await db.insert(message).values({
        chatId,
        role: "user",
        content: lastMessage.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join(""),
    }).onConflictDoNothing();



    const result = streamText({
        model,
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        originalMessages: messages,

        // ✅ Stream complete — assistant message save karo
        onFinish: async ({ messages: allMessages }) => {
            const assistantMsg = allMessages[allMessages.length - 1];
            // console.log(assistantMsg);


            await db.insert(message).values({
                chatId,
                role: "assistant",
                content: assistantMsg.parts
                    .filter((p: any) => p.type === "text")
                    .map((p: any) => p.text)
                    .join(""),
            });
        },
    });
}