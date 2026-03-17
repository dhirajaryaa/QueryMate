import { ConnectionInput } from "@/types/connection.types";
import { Pool, PoolConfig } from "pg";
import mysql, { Pool as SqlPool, PoolOptions } from "mysql2/promise";
import { Db, MongoClient } from "mongodb";
import Database from "better-sqlite3";
import { AppError } from "../errors";

//? postgres client
export class PostgresClient {
  private pool: Pool;
  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  async close() {
    await this.pool.end();
  }
}

//? mysql client
export class MySQLClient {
  private pool: SqlPool;

  constructor(config: PoolOptions) {
    this.pool = mysql.createPool(config);
  }

  async close() {
    await this.pool.end();
  }
}

//? mongo client
export class MongoDBClient {
  private client: MongoClient;
  private db!: Db;
  dbName: string;

  constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri);
    this.dbName = dbName;
  }

  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    }
  }

  getDb(): Db {
    return this.db;
  }

  async close() {
    await this.client.close();
  }
}
