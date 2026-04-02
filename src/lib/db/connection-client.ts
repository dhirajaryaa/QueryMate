import { Pool, PoolConfig } from "pg";
import mysql, { Pool as SqlPool, PoolOptions } from "mysql2/promise";
import { Db, MongoClient, ObjectId } from "mongodb";
import { Relation } from "@/types/connection.types";

//? postgres client
export class PostgresClient {
  public pool: Pool;
  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  async close() {
    await this.pool.end();
  }
}

//? mysql client
export class MySQLClient {
  public pool: SqlPool;

  constructor(config: PoolOptions) {
    this.pool = mysql.createPool(config);
  }

  async close() {
    await this.pool.end();
  }
}

//? mongo client
export class MongoDBClient {
  public client: MongoClient;
  public db!: Db;
  private dbName: string | null;
  private connecting?: Promise<void>;

  constructor(uri: string) {
    this.client = new MongoClient(uri);
    this.dbName = this.extractDbNameFromUri(uri);
  }

  //? db name extract
  private extractDbNameFromUri(uri: string): string | null {
    try {
      const url = new URL(uri);
      return url.pathname.replace("/", "") || null;
    } catch {
      return null;
    }
  }

  //? detected db fallback
  private async detectDatabase(): Promise<string | null> {
    try {
      const admin = this.client.db().admin();
      const dbs = await admin.listDatabases();

      const validDb = dbs.databases
        .filter((db) => !["admin", "local", "config"].includes(db.name))
        .sort((a, b) => (b.sizeOnDisk || 0) - (a.sizeOnDisk || 0))[0];

      return validDb?.name || null;
    } catch {
      return null;
    }
  }

  //? safe connect
  async connect() {
    if (this.db) return;

    if (!this.connecting) {
      this.connecting = (async () => {
        await this.client.connect();

        if (!this.dbName) {
          this.dbName = await this.detectDatabase();
        }

        if (!this.dbName) {
          throw new Error("Database name not found");
        }

        this.db = this.client.db(this.dbName);
      })();
    }

    await this.connecting;
  }
  //? extract field
  private extractFields(obj: any, prefix = "", set = new Set<string>()) {
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      set.add(fullKey);

      const value = obj[key];

      // 🔥 STOP recursion for Mongo special types
      if (
        value instanceof ObjectId ||
        value instanceof Date ||
        Buffer.isBuffer(value)
      ) {
        continue;
      }

      // optional: handle arrays smartly
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          this.extractFields(value[0], fullKey, set);
        }
        continue;
      }

      if (typeof value === "object" && value !== null) {
        this.extractFields(value, fullKey, set);
      }
    }
  }

  // get schema
  async getSchema(): Promise<Record<string, string[]>> {
    await this.connect();

    const collections = await this.db.listCollections().toArray();
    const schema: Record<string, string[]> = {};

    await Promise.all(
      collections.map(async (col) => {
        const name = col.name;
        if (name.startsWith("system.")) return;

        const samples = await this.db
          .collection(name)
          .find({})
          .limit(5)
          .toArray();

        const fieldSet = new Set<string>();

        samples.forEach((doc) => {
          this.extractFields(doc, "", fieldSet);
        });

        schema[name] = Array.from(fieldSet);
      }),
    );

    return schema;
  }

  //? get relations
  async getRelations(): Promise<Relation[]> {
    await this.connect();

    const collections = await this.db.listCollections().toArray();
    const names = collections.map((c) => c.name);

    const relations: Relation[] = [];

    await Promise.all(
      names.map(async (name) => {
        if (name.startsWith("system.")) return;

        const sample = await this.db.collection(name).findOne({});
        if (!sample) return;

        for (const key of Object.keys(sample)) {
          if (key.endsWith("_id") || key.endsWith("Id")) {
            const possibleNames = [
              key.replace(/_id$/i, ""),
              key.replace(/Id$/i, ""),
            ];

            const target = names.find((n) =>
              possibleNames.some((p) =>
                n.toLowerCase().includes(p.toLowerCase()),
              ),
            );

            if (target) {
              relations.push({
                table_name: name,
                column_name: key,
                foreign_table: target,
                foreign_column: "_id",
              });
            }
          }
        }
      }),
    );

    return relations;
  }
  //? get db
  getDb(): Db {
    if (!this.db) {
      throw new Error("Database not connected");
    }
    return this.db;
  }
  //? close connection
  async close() {
    await this.client.close();
  }
}
