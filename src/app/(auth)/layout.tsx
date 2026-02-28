// Todo: layout for session check on both routes

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    //? session exists, redirect to dashboard
    if (session) { 
        redirect("/dashboard")
    };

    return (
        <>
            {children}
        </>

    );
}