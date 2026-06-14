import { db } from '@/db';
import { chat, connectionSchema } from '@/db/schema';
import { tool } from 'ai';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const dbSchemaTool = (chatId: string) => tool({
    description: 'Get the db tables and fields or schema.',
    inputSchema: z.object({}),
    execute: async () => {
        // Your db logic
        const [selectedChat] = await db.select().from(chat).where(eq(chat.id, chatId));

        if (selectedChat) {
            const [result] = await db.select({ tables: connectionSchema.structure, relation: connectionSchema.relationships }).from(connectionSchema).where(eq(connectionSchema.connectionId, selectedChat.connectionId));

            return result;
        }

        return { error: "DB schema not Found!" };
    },
});