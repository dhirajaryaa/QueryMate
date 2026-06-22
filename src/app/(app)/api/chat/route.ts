import { db } from '@/db';
import { message } from '@/db/schema';
import { chatSystemPrompt } from '@/modules/ai/lib/prompts';
import { ChatModel } from '@/modules/ai/lib/provider';
import { dbInformationTool } from '@/modules/ai/lib/tools/db-info';
import { dbSchemaTool } from '@/modules/ai/lib/tools/db-schema';
import { runDBQuery } from '@/modules/ai/lib/tools/run-query';
import { generateAndSaveChatTitle } from '@/modules/chat/actions/chat-title';
import { convertMessageToTextContent } from '@/modules/message/utils/convert-message';
import { streamText, UIMessage, convertToModelMessages, stepCountIs, createIdGenerator } from 'ai';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
    const { messages, id: chatId }: { messages: UIMessage[], id: string } = await req.json();

    //? save user message and skip fist already add
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.role === "user") {
        await db.insert(message).values({
            id: lastMessage.id,
            chatId,
            role: "user",
            parts: lastMessage.parts,
        }).onConflictDoNothing();
    }

    //* title generation call */
    const content = convertMessageToTextContent(lastMessage);
    void generateAndSaveChatTitle({ chatId, message: content }).catch((err) =>
        console.error("Title generation failed:", err)
    );


    const result = streamText({
        model: ChatModel,
        system: chatSystemPrompt,
        stopWhen: stepCountIs(6),
        tools: {
            dbInfo: dbInformationTool(chatId),
            dbSchema: dbSchemaTool(chatId),
            runQuery: runDBQuery
        },
        messages: await convertToModelMessages(messages),
    });


    return result.toUIMessageStreamResponse({
        originalMessages: messages,
        generateMessageId: createIdGenerator({
            size: 16,
        }),


        //? Stream complete 
        onFinish: async ({ messages: allMessages }) => {
            const assistantMsg = allMessages[allMessages.length - 1];        

            await db.insert(message).values({
                id: assistantMsg.id,
                chatId,
                role: "assistant",
                parts: assistantMsg.parts,
            }).onConflictDoUpdate({
                target: message.id,
                set: { parts: assistantMsg.parts },
            });
        },

        //? error handle 
        onError: (error) => {
            console.error("Stream error:", error);
            return "Something went wrong while generating response.";
        },
    });
}