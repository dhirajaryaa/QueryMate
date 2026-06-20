"use server";

import { AuthRedirectPath } from "@/lib/constant";
import { auth } from "@/modules/auth/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const ensureAuth = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    };

    return session.user;
};

export const ensureGuest = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user) {
        redirect(AuthRedirectPath)
    };

    return session?.user;
};
