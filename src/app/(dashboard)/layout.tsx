
import AppHeader from "@/components/common/app-header";
import { AppSidebar } from "@/components/common/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
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
            <SidebarProvider>
                <AppSidebar />
                <main className="flex-1 w-full h-svh">
                    <AppHeader />
                    {children}
                </main>
            </SidebarProvider>
        </>

    );
}