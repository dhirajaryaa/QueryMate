import { handlePageError } from "@/utils/handle-errors";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar";
import ChatHistoryLink from "./chat-history-links";
import { getChatHistoryAction } from "@/actions/chat";

export async function ChatHistoryList() {
  const res = await getChatHistoryAction();
  if (!res.success) {
    handlePageError(res.error);
  }

  return (
    <SidebarGroup className="bg-sidebar px-2 z-1 overflow-y-auto">
      <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
      {res.data.length === 0 ? (
        <div className="px-2 py-1 my-5 text-sm text-muted-foreground">
          No chat history found.
        </div>
      ) : (
        <ChatHistoryLink links={res.data} />
      )}
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
