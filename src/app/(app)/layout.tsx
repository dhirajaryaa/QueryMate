import AppHeader from "@/components/common/app-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ensureAuth } from "@/modules/auth/utils/auth-utils";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await ensureAuth();

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
