import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "../common/logo";
import SidebarNav from "./sidebar-nav";
import { ChatHistoryList, HistoryLoading } from "./chat-history";
import NavUser from "./nav-user";
import { Suspense } from "react";
import ReportBugOrFeature from "./report-bug-feature";
import { ensureAuth } from "@/modules/auth/utils/auth-utils";

export async function AppSidebar() {
 const user =  await ensureAuth();

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
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
