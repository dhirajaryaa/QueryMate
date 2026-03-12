import z from "zod";

export const classifierSchema = z.object({
  tool_choice: z.boolean().describe("need database query."),
  type: z
    .enum(["db_related", "conversion", "non_relevant"])
    .describe("query which topic related"),
});
