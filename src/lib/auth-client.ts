import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    baseURL: process.env.PUBLIC_URL
});