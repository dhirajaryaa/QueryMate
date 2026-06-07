"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ChatHistory } from "@/modules/chat/types/chat.types";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";

export default function ChatHistoryLink({
  history,
}: {
  history: ChatHistory[];
}) {
  const pathname = usePathname();
  //! set on store
  const chatHistory = useChatStore((state) => state.chatHistory);
  const setChatHistory = useChatStore((state) => state.setChatHistory);

  useEffect(() => {
    if (history?.length) {
      setChatHistory(history);
    }
  }, [history, setChatHistory]);

  const data = chatHistory.length ? chatHistory : history;

  return (
    <SidebarGroup className="overflow-y-auto">
      <SidebarMenu>
        {data
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
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
