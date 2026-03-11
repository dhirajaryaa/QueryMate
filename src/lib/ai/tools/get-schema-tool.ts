export const getSchemaTool = {
  details: {
    name: "get_schema",
    description: "Get schema of a database",
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
  execute: async ({
    connection_id,
  }: {
    connection_id: string;
  }): Promise<string | string[]> => {
    if (!connection_id) return "connection id missing";
    //TODO: write code to get schema of a table
    console.log(`💵 Get Schema  From ${connection_id} `);

    await new Promise((resolve) => setTimeout(resolve, 4000));

    return JSON.stringify(`CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
)`);
  },
};
