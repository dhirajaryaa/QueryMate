import AppHeader from "@/components/common/app-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //? if not session exists, redirect to login
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="flex flex-col w-full h-svh bg-background">
            {/* <AppHeader /> */}
            <AppHeader />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
