import AppHeader from "@/components/common/app-header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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
