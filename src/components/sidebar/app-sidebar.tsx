import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Github } from "lucide-react";
import Logo from "../common/logo";
import { Suspense } from "react";
import SidebarNav from "./sidebar-nav";
import { ChatHistoryList, HistoryLoading } from "./chat-history";
import { Button } from "../ui/button";
import { getChatHistoryAction } from "@/actions/chat";
import { handlePageError } from "@/utils/handle-errors";

export async function AppSidebar() {
  const res = await getChatHistoryAction();
  if (!res.success) {
    handlePageError(res.error);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        {/* logo  */}
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <div className="bg-sidebar mx-auto w-[90%]">
          {/* links  */}
          <SidebarNav />
          {/* history  */}
          <Suspense fallback={<HistoryLoading />}>
            <ChatHistoryList initialHistory={res?.data ?? []} />
          </Suspense>
        </div>
      </SidebarContent>
      <SidebarFooter>
        {/* give me start  */}
        <SidebarMenu>
          <SidebarMenuItem className="w-[90%] mx-auto">
            <Button className="w-full h-8" asChild>
              <a
                href="https://github.com/dhirajaryaa/querymate"
                target="_blank"
              >
                <Github />
                Star on Github
              </a>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
