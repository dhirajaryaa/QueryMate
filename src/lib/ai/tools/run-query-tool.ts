export const runQueryTool = {
    details: {
        name: "run_query",
        description: "Run a query on a database",
        parameters: {
            type: "object",
            properties: {
                connection_id: {
                    type: "string",
                    description: "Connection ID of the database",
                },
                query: {
                    type: "string",
                    description: "Query to run on the database",
                },
            },
            required: ["connection_id", "query"],
        },
    },
    execute: async <T>(connId: string, query: string): Promise<T> => {
        if (!connId) return "connection id missing" as unknown as T;
        if (!query) return "query missing" as unknown as T;
        console.log(`Run Query ${query} From ${connId} `);
        await new Promise((resolve) => setTimeout(resolve, 4000));
        return { user: { id: 1, name: "John", email: "john@example.com" }, order: { id: 1, user_id: 1, total: 100 } } as T;
    },
};
