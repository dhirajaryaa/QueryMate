import { z } from "zod";

export const authSchema = z.object({
    email: z
        .email({ error: "invalid email address" }),
    password: z
        .string()
        .min(8, { error: "password must be 8 charters" }),
});