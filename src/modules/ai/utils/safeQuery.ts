export function isSafeQuery(sql: string) {
    const normalized = sql.trim().toUpperCase();

    if (!normalized.startsWith("SELECT") &&
        !normalized.startsWith("WITH")) {
        return false;
    }

    if (normalized.includes(";")) {
        return false;
    }

    return true;
}