import { z } from "zod";

const connectionTypeEnum = z.enum(["pg", "mysql", "mongodb"]);

const regexMap = {
  pg: /^postgres(ql)?:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
  mysql: /^mysql:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
  mongodb: /^mongodb(\+srv)?:\/\/.+@.+\/?.*$/,
} as const;

type ConnectionType = z.infer<typeof connectionTypeEnum>;

const validateUriByType = (
  data: {
    type: ConnectionType;
    uri?: string | null;
  },
  ctx: z.RefinementCtx,
) => {
  // skip validation if uri not provided
  if (!data.uri) return;

  const isValid = regexMap[data.type].test(data.uri);

  if (!isValid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid ${data.type} connection URI`,
      path: ["uri"],
    });
  }
};

export const addConnectionSchema = z
  .object({
    name: z
      .string({
        error: "Connection name required",
      })
      .min(3, "Connection name must be greater than 3 characters"),

    type: connectionTypeEnum,

    uri: z
      .string()
      .min(1, "Connection URI required"),

    ssl: z.boolean().default(false),
  })
  .superRefine(validateUriByType);

export const editConnectionSchema = z
  .object({
    name: z
      .string({
        error: "Connection name required",
      })
      .min(3, "Connection name must be greater than 3 characters")
      .optional(),

    type: connectionTypeEnum.optional(),

    uri: z
      .string()
      .min(1, "Connection URI required")
      .optional(),

    ssl: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // validate only if both exist
    if (data.type && data.uri) {
      validateUriByType(
        {
          type: data.type,
          uri: data.uri,
        },
        ctx,
      );
    }
  });