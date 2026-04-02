import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "../common/logo";
import SidebarNav from "./sidebar-nav";
import { ChatHistoryList, HistoryLoading } from "./chat-history";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavUser from "./nav-user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ReportBugOrFeature from "./report-bug-feature";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Sidebar defaultValue={"open"}>
        {/* Logo */}
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent className="relative overflow-hidden">
          {/* main nav  */}
          <SidebarNav />
          {/* chat history  */}
          <Suspense fallback={<HistoryLoading />}>
            <ChatHistoryList />
          </Suspense>
        </SidebarContent>
        <SidebarFooter>
          {/* report bug */}
          <ReportBugOrFeature />
          {/* <user dropdown /> */}
          <NavUser user={session.user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
