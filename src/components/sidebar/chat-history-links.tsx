"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ChatHistory } from "@/modules/chat/types/chat.types";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteChatById } from "@/modules/chat/actions/chat-delete";
import { handleClientError } from "@/utils/handle-errors";
import { AuthRedirectPath } from "@/lib/constant";

export default function ChatHistoryLink({
  initialHistory,
}: {
  initialHistory: ChatHistory[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  //! set on store
  const chatHistory = useChatStore((state) => state.chatHistory);
  const removeHistory = useChatStore((state) => state.removeHistory);
  const setChatHistory = useChatStore((state) => state.setChatHistory);

  useEffect(() => {
    if (initialHistory?.length) {
      setChatHistory(initialHistory ?? []);
    }
  }, [initialHistory, setChatHistory]);


  const history = chatHistory ?? initialHistory;

  const handleChatRemove = async (id: string) => {
    const res = await deleteChatById(id);
    if (!res.success) {
      handleClientError(res.error)
    };
    removeHistory(id);
    router.push(AuthRedirectPath);
  };


  // empty chat history 
  if (!history.length) {
    return (<div className="px-2 py-1 my-5 text-sm text-muted-foreground">
      No chat history found.
    </div>)
  }

  return (
    <SidebarGroup className="overflow-y-auto">
      <SidebarMenu>
        {history
          .slice()
          .reverse()
          .map((link) => (
            <SidebarMenuItem key={link.id}>
              <Link href={`/chat/${link.id}`}>
                <SidebarMenuButton
                  asChild
                  tooltip={link.title}
                  isActive={pathname === `/chat/${link.id}`}
                  className="h-8.5 data-[active=true]:bg-sidebar-active text-foreground truncate hover:bg-sidebar-active/70"
                >
                  <span>{link.title}</span>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuAction className="size-5 text-muted-foreground hover:text-foreground">
                      <MoreVertical size="20" />
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleChatRemove(link.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
