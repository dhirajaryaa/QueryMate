import {z} from "zod";

export const connectionSchema = z.object({
    name: z.string({ error: "connection name required" }),
    type: z.enum(["pg", "mysql", "sqlite", "mongodb"]),
    uri: z.string().min(1, "Connection URI required"),
    ssl: z.boolean(),
}).superRefine((data, ctx) => {
    const regexMap = {
        pg: /^postgres(ql)?:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
        mysql: /^mysql:\/\/[^:\s]+:[^@\s]+@[^:\s]+(:\d+)?\/[^\s]+$/,
       mongodb: /^mongodb(\+srv)?:\/\/.+@.+\/?.*$/,
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