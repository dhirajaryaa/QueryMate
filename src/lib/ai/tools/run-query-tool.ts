import { runDBQuery } from "@/lib/db/query-run";

export const runQueryTool = {
  details: {
    name: "run_query",
    description: `Execute a query on the database.
IMPORTANT:
This tool MUST only be used after calling get_schema.
Never guess table or column names.
`,
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
  execute: async ({
    connection_id,
    query,
  }: {
    connection_id: string;
    query: string;
  }): Promise<string> => {
    if (!connection_id) return "connection id missing";
    if (!query) return "query missing";
    console.log(`Run Query ${query} From ${connection_id} `);

    return await runDBQuery({ query, connId: connection_id });
  },
};
