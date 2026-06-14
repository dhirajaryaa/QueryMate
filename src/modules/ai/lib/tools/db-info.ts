import { db } from '@/db';
import { chat, connection } from '@/db/schema';
import { tool } from 'ai';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

export const dbInformationTool = (chatId: string) => tool({
    description: 'Get the database information',
    inputSchema: z.object({}),
    execute: async () => {
        // Your db logic
        const [selectedChat] = await db.select().from(chat).where(eq(chat.id, chatId));

        if (selectedChat) {
            const [result] = await db.select({
                id: connection.id,
                dbType: connection.type,
                dbName: connection.name
            }).from(connection).where(and(eq(connection.id, selectedChat.connectionId), eq(connection.userId, selectedChat.userId)));

            return result;
        }

        return { error: "db not Found!" };
    },
});