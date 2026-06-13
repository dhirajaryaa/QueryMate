import { db } from '@/db';
import { chat, connection } from '@/db/schema';
import { tool } from 'ai';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const dbInformationTool = tool({
    description: 'Get the database information',
    inputSchema: z.object({
        chatId: z.string().describe('The chatId to get the db information'),
    }),
    execute: async ({ chatId }) => {
        // Your db logic
        const [selectedChat] = await db.select().from(chat).where(eq(chat.id, chatId));

        if (selectedChat) {

            const [result] = await db.select({
                id: connection.id,
                dbType: connection.type,
                dbName: connection.name
            }).from(connection).where(eq(connection.userId, selectedChat.userId));

            return result;
        }

        return { error: "db not Found!" };
    },
});