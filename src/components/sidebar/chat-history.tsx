"use client";
import { ChatHistory } from "@/types/chat.types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar";
import ChatHistoryLink from "./chat-history-links";
import { useState } from "react";

type Props = {
  initialHistory: ChatHistory[];
};

export function ChatHistoryList({ initialHistory }: Props) {
  const [history, setHistory] = useState<ChatHistory[]>(initialHistory);

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
      <ChatHistoryLink links={history} />
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
