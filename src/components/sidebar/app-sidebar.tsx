import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Logo from "../common/logo";
import SidebarNav from "./sidebar-nav";
import { ChatHistoryList } from "./chat-history";
import { getChatHistoryAction } from "@/actions/chat";
import { handlePageError } from "@/utils/handle-errors";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import NavUser from "./nav-user";
import { redirect } from "next/navigation";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const res = await getChatHistoryAction();
  if (!res.success) {
    handlePageError(res.error);
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
          <ChatHistoryList initialHistory={res.data} />
        </SidebarContent>
        <SidebarFooter>
          {/* <user dropdown /> */}
          <NavUser user={session.user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
