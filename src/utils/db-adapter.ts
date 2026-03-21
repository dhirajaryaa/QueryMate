import { AppError } from "@/lib/errors";
import { DBType, SchemaAdapter } from "@/types/connection.types";

// pg adapter
const pgAdapter: SchemaAdapter = {
  getSchema() {
    return `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
    `;
  },

  getRelations() {
    return `
      SELECT
        tc.table_name,
        kcu.column_name,
        ccu.table_name AS foreign_table,
        ccu.column_name AS foreign_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
    `;
  },
};

// mysql adapter
const mysqlAdapter: SchemaAdapter = {
  getSchema() {
    return `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = DATABASE()
    `;
  },
  getRelations() {
    return `
      SELECT
        TABLE_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE REFERENCED_TABLE_NAME IS NOT NULL
    `;
  },
};

export function getAdapter(dbType: DBType): SchemaAdapter {
  switch (dbType) {
    case "pg":
      return pgAdapter;
    case "mysql":
      return mysqlAdapter;
    default:
      throw new AppError("forbidden:database",`Unsupported db type: ${dbType}`);
  }
}
