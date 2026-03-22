export function extractDbNameFromUri(uri: string): string | null {
  try {
    const url = new URL(uri);
    const dbName = url.pathname?.replace("/", "");
    return dbName || null;
  } catch {
    return null;
  }
};

async function detectDatabase(client: MongoClient): Promise<string> {
  const admin = client.db().admin();
  const dbs = await admin.listDatabases();

  const validDb = dbs.databases.find(
    (db) => !["admin", "local", "config"].includes(db.name)
  );

  if (!validDb) throw new Error("No usable database found");

  return validDb.name;
}