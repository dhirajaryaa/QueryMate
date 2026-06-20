import { handlePageError } from "@/utils/handle-errors";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import ChatHistoryLink from "./chat-history-links";
import { getChatHistory } from "@/modules/chat/actions/chat-history";

export async function ChatHistoryList() {
  const res = await getChatHistory();
  if (!res.success) {
    handlePageError(res.error);
  };

  return (
    <SidebarGroup className="bg-sidebar px-2 z-1 overflow-y-auto">
      <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
      <ChatHistoryLink initialHistory={res.data} />
    </SidebarGroup>
  );
}

export function HistoryLoading({ count = 5 }: { count?: number }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: count }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
