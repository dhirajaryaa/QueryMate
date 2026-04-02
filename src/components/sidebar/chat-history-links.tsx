"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ChatHistory } from "@/types/chat.types";

export default function ChatHistoryLink({ links }: { links: ChatHistory[] }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="overflow-y-auto">
      <SidebarMenu>
        {links.map((link) => (
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
