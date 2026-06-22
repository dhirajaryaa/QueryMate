export async function normalizeResult(
    schemaRows: any[],
    relationRows: any[],
): Promise<{ schema: Record<string, string[]>; relations: any[] }> {
    const group = schemaRows.reduce<Record<string, Set<string>>>((acc, row: any) => {
        const tableName = row.table_name ?? row.TABLE_NAME;
        const columnName = row.column_name ?? row.COLUMN_NAME;

        if (tableName && columnName) {
            if (!acc[tableName]) acc[tableName] = new Set();
            acc[tableName].add(columnName);
        }
        return acc;
    }, {});

    const schema = Object.fromEntries(
        Object.entries(group).map(([table, cols]) => [table, [...cols]]),
    );

    const relations = relationRows.map((r: any) => ({
        table_name: r.table_name ?? r.TABLE_NAME,
        column_name: r.column_name ?? r.COLUMN_NAME,
        foreign_table:
            r.referenced_table_name ?? r.REFERENCED_TABLE_NAME ?? r.foreign_table ?? r.FOREIGN_TABLE,
        foreign_column:
            r.referenced_column_name ?? r.REFERENCED_COLUMN_NAME ?? r.foreign_column ?? r.FOREIGN_COLUMN,
    }));

    return { schema, relations };
}