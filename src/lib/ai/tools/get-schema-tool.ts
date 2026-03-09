
export const getSchemaTool = {
    details: {
        name: "get_schema",
        description: "Get schema of a table",
        parameters: {
            type: "object",
            properties: {
                connection_id: {
                    type: "string",
                    description: "Connection ID of the database",
                },
                table_name: {
                    type: "array",
                    description: "list of table names",
                    items: {
                        type: "string",
                    },
                },
            },
            required: ["connection_id", "table_name"],
        },
    },
    execute: async (connId: string, tableName: string[]): Promise<string | string[]> => {
        if (!connId) return "connection id missing";
        if (!tableName) return "table name missing";
        //TODO: write code to get schema of a table
        console.log(`Get Schema of ${tableName} From ${connId} `);

        await new Promise((resolve) => setTimeout(resolve, 4000));
        return ["users(id, name, email)","orders(id, user_id, total)"
        ]
    },
};