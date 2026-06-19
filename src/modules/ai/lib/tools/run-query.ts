import { db } from '@/db';
import { connection, } from '@/db/schema';
import { MySQLClient, PostgresClient } from '@/modules/connection/lib/connection-client';
import { decrypt } from '@/modules/connection/utils/crypto';
import { tool } from 'ai';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const runDBQuery = tool({
    title: 'Run Database Query',
    description: 'Run Row DB Query to get required data.',
    inputSchema: z.object({
        rowQuery: z.string(),
        dbId: z.string().describe("selected Db Id"),
        intent: z.enum([
            "read",
            "write",
            "update",
            "delete",
        ])
    }),
    execute: async ({ rowQuery, intent, dbId }) => {

        if (intent !== "read") return "Intent Not support, for security perseus";

        
        if (!dbId || !rowQuery) {
            return "dbId and rowQuery are required";
        }
        
        const [dbInfo] = await db.select().from(connection).where(eq(connection.id, dbId));
        
        if (!dbInfo) return "Db Not Exist.";
        
        //Todo: validate query check or guardrails

        const decryptUri = decrypt(dbInfo.uri);

        switch (dbInfo.type) {
            case "pg": {
                const pgClient = new PostgresClient({
                    connectionString: decryptUri, ssl: dbInfo.ssl
                        ? { rejectUnauthorized: false }
                        : undefined,
                });

                try {
                    const result = await pgClient.pool.query(rowQuery);

                    return result.rows;
                } catch (error) {
                    return error;

                } finally {
                    await pgClient.close();
                }

            }

            case "mysql": {
                const mysqlClient = new MySQLClient({
                    uri: decryptUri,
                    ssl: dbInfo.ssl
                        ? { rejectUnauthorized: false }
                        : undefined,
                });

                try {
                    const [rows] = await mysqlClient.pool.query(rowQuery);

                    return rows;
                } catch (error) {
                    return error;

                } finally {
                    await mysqlClient.close();
                }

            }


            default:
                "Invalid Database Type"
        }






    },
});