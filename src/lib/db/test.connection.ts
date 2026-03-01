import { ConnectionInput } from "@/types/connection.types";
import { Client as PgClient } from "pg";
import mysql from 'mysql2/promise';
import { MongoClient } from 'mongodb';
import Database from 'better-sqlite3';

type Response = {
    success: boolean,
    error?: string
}

export async function testDatabaseConnection(data: ConnectionInput): Promise<Response> {
    try {
        switch (data.type) {
            //? postgresql db 
            case 'pg':
                const pgConn = new PgClient({
                    connectionString: data.uri,
                    ssl: data.ssl ? { rejectUnauthorized: false } : false
                });

                await pgConn.connect();
                await pgConn.query("SELECT 1");
                await pgConn.end();
                return { success: true }

            //? mysql db
            case "mysql":
                const sqlConn = await mysql.createConnection({
                    uri: data.uri,
                    ssl: data.ssl ? { rejectUnauthorized: false } : undefined
                });

                await sqlConn.query("SELECT 1");
                await sqlConn.end();
                return { success: true }

            //? mongodb db
            case 'mongodb':
                const mongoConn = new MongoClient(data.uri);

                await mongoConn.connect();
                await mongoConn.db().command({ ping: 1 });
                await mongoConn.close();
                return { success: true }

            //? sqlite db
            case 'sqlite':
                const dbPath = data.uri
                    .replace("file:", "")
                    .replace("sqlite:///", "");

                const sqliteConn = new Database(dbPath);
                sqliteConn.prepare("SELECT 1").get();

                sqliteConn.close();

                return { success: true };
            default:
                return {
                    success: false,
                    error: "Unsupported database"
                };
        }

    } catch (err: any) {
        return {
            success: false,
            error: err.message
        };
    }
}