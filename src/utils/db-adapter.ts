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
      TABLE_NAME AS table_name,
      COLUMN_NAME AS column_name,
      REFERENCED_TABLE_NAME AS referenced_table_name,
      REFERENCED_COLUMN_NAME AS referenced_column_name
    FROM information_schema.KEY_COLUMN_USAGE
    WHERE REFERENCED_TABLE_NAME IS NOT NULL
      AND TABLE_SCHEMA = DATABASE()
  `;
  },
};

export function getAdapter(dbType: DBType): SchemaAdapter {
  if (dbType === "pg") {
    return pgAdapter;
  }
  return mysqlAdapter;
}
