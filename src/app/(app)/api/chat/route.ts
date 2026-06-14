import { db } from '@/db';
import { message } from '@/db/schema';
import { chatSystemPrompt } from '@/modules/ai/lib/prompts';
import { ChatModel } from '@/modules/ai/lib/provider';
import { dbInformationTool } from '@/modules/ai/lib/tools/db-info';
import { dbSchemaTool } from '@/modules/ai/lib/tools/db-schema';
import { generateAndSaveChatTitle } from '@/modules/chat/actions/chat-title';
import { convertMessageToTextContent } from '@/modules/message/utils/convert-message';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, id: chatId }: { messages: UIMessage[], id: string } = await req.json();

    //? save user message and skip fist already add
    const lastMessage = messages[messages.length - 1];
    const content = convertMessageToTextContent(lastMessage);

    await db.insert(message).values({
        chatId,
        role: "user",
        content,
    }).onConflictDoNothing();

    //* title generation call */
    void generateAndSaveChatTitle({ chatId, message: content });


    const result = streamText({
        model: ChatModel,
        system: chatSystemPrompt,
        tools: {
            dbInfo: dbInformationTool(chatId),
            dbSchema: dbSchemaTool(chatId)
        },
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
        originalMessages: messages,


        //? Stream complete 
        onFinish: async ({ messages: allMessages }) => {
            //? assistant message save it 
            const assistantMsg = allMessages[allMessages.length - 1];

            await db.insert(message).values({
                chatId,
                role: "assistant",
                content: convertMessageToTextContent(assistantMsg),
            });
        },
    });
}