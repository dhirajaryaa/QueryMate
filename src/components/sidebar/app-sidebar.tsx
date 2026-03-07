import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Github, LogOut } from "lucide-react";
import Logo from "../common/logo";
import { Suspense } from "react";
import SidebarNav from "./sidebar-nav";
import { ChatHistoryList, HistoryLoading } from "./chat-history";
import { Button } from "../ui/button";
import { getChatHistoryAction } from "@/actions/chat";

export async function AppSidebar() {
  const initialHistory = await getChatHistoryAction();
  if (!initialHistory.success) {
    console.error(initialHistory.error);
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
            <ChatHistoryList initialHistory={initialHistory?.data ?? []} />
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
