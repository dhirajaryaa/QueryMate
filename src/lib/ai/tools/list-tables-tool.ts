export const listTablesTool = {
  details: {
    name: "list_tables",
    description: "List all tables in the database",
    parameters: {
      type: "object",
      properties: {
        connection_id: {
          type: "string",
          description: "Connection ID of the database",
        },
      },
      required: ["connection_id"],
    },
  },
  execute: async (connId: string): Promise<string[] | string> => {
    if (!connId) return "connection id missing";
    //TODO: write code to get available table list form database
    console.log(`Get Database Tables From ${connId} `);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    return ["users", "orders", "products"];
  },
};
