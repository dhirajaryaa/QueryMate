import z from "zod";

export const connectionSchema = z.object({
    name: z.string({ error: "connection name required" }),
    type: z.enum(["pg", "mysql", "sqlite", "mongodb"]),
    status: z.enum(["active", "pending", "error"]).default("pending").optional(), uri: z.string()
}).superRefine((data, ctx) => {
    const regexMap = {
        pg: /^postgres(ql)?:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
        mysql: /^mysql:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
        mongodb: /^mongodb(\+srv)?:\/\/[^:\s]+:[^@\s]+@[^\/\s]+\/[^\s]+$/,
        sqlite: /^(file:|sqlite:\/\/\/).+\.db$/,
    };
    if (!regexMap[data.type].test(data.uri)) {
        ctx.addIssue({
            code: "custom",
            message: "Invalid connection URI",
            path: ['uri']
        });
    }
})