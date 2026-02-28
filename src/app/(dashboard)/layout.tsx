
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    //? if not session exists, redirect to login
    if (!session) {
        redirect("/login")
    };

    return (
        <>
            {children}
        </>

    );
}