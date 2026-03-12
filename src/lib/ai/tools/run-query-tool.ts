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
  execute: async <T>({
    connection_id,
    query,
  }: {
    connection_id: string;
    query: T;
  }): Promise<string> => {
    if (!connection_id) return "connection id missing";
    if (!query) return "query missing";
    console.log(`Run Query ${query} From ${connection_id} `);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return JSON.stringify([
      {
        id: "u_1",
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        email_verified: true,
        image: null,
        created_at: "2026-01-05T10:12:00Z",
        updated_at: "2026-01-05T10:12:00Z",
      },
      {
        id: "u_2",
        name: "Priya Sharma",
        email: "priya.sharma@example.com",
        email_verified: false,
        image: null,
        created_at: "2026-01-07T08:30:00Z",
        updated_at: "2026-01-07T08:30:00Z",
      },
      {
        id: "u_3",
        name: "Rahul Verma",
        email: "rahul.verma@example.com",
        email_verified: true,
        image: "https://i.pravatar.cc/150?img=3",
        created_at: "2026-01-10T12:45:00Z",
        updated_at: "2026-01-10T12:45:00Z",
      },
      {
        id: "u_4",
        name: "Sneha Patel",
        email: "sneha.patel@example.com",
        email_verified: true,
        image: null,
        created_at: "2026-01-11T15:20:00Z",
        updated_at: "2026-01-11T15:20:00Z",
      },
      {
        id: "u_5",
        name: "Arjun Singh",
        email: "arjun.singh@example.com",
        email_verified: false,
        image: "https://i.pravatar.cc/150?img=5",
        created_at: "2026-01-12T09:10:00Z",
        updated_at: "2026-01-12T09:10:00Z",
      },
      {
        id: "u_6",
        name: "Neha Gupta",
        email: "neha.gupta@example.com",
        email_verified: true,
        image: null,
        created_at: "2026-01-14T11:05:00Z",
        updated_at: "2026-01-14T11:05:00Z",
      },
      {
        id: "u_7",
        name: "Vikram Mehta",
        email: "vikram.mehta@example.com",
        email_verified: false,
        image: null,
        created_at: "2026-01-16T14:40:00Z",
        updated_at: "2026-01-16T14:40:00Z",
      },
      {
        id: "u_8",
        name: "Ananya Das",
        email: "ananya.das@example.com",
        email_verified: true,
        image: "https://i.pravatar.cc/150?img=8",
        created_at: "2026-01-18T07:55:00Z",
        updated_at: "2026-01-18T07:55:00Z",
      },
      {
        id: "u_9",
        name: "Rohit Jain",
        email: "rohit.jain@example.com",
        email_verified: true,
        image: null,
        created_at: "2026-01-20T13:25:00Z",
        updated_at: "2026-01-20T13:25:00Z",
      },
      {
        id: "u_10",
        name: "Kavya Nair",
        email: "kavya.nair@example.com",
        email_verified: false,
        image: "https://i.pravatar.cc/150?img=10",
        created_at: "2026-01-22T16:10:00Z",
        updated_at: "2026-01-22T16:10:00Z",
      },
    ]);
  },
};
