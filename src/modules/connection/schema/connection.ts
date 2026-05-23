import { z } from "zod";
const connectionTypeEnum = z.enum(["pg", "mysql", "sqlite", "mongodb"]);

const regexMap = {
  pg: /^postgres(ql)?:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
  mysql: /^mysql:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
  mongodb: /^mongodb(\+srv)?:\/\/.+@.+\/?.*$/,
  sqlite: /^(file:|sqlite:\/\/\/).+\.db$/,
} as const;

const validateUriByType = (
  data: { type: "pg" | "mysql" | "sqlite" | "mongodb"; uri: string },
  ctx: z.RefinementCtx,
) => {
  if (!regexMap[data.type].test(data.uri)) {
    ctx.addIssue({
      code: "custom",
      message: "Invalid connection URI",
      path: ["uri"],
    });
  }
};

export const addConnectionSchema = z
  .object({
    name: z
      .string({ error: "connection name required" })
      .min(3, "connection name must be greater than 3 characters"),
    type: connectionTypeEnum,
    uri: z.string().min(1, "Connection URI required"),
    ssl: z.boolean(),
  })
  .superRefine(validateUriByType);

export const editConnectionSchema = z
  .object({
    name: z
      .string({ error: "connection name required" })
      .min(3, "connection name must be greater than 3 characters"),
    type: connectionTypeEnum,
    ssl: z.boolean().optional(),
    uri: z.string().min(1, "Connection URI required"),
  })
  .superRefine(validateUriByType);
