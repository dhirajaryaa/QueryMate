"use server";

import { headers } from "next/headers";
import { auth } from "@/modules/auth/lib/auth";
import { AppError } from "@/lib/errors";

export async function requireUser() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new AppError("unauthorized:auth");
    };

    return session.user;
};