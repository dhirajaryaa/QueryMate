"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { MoreHorizontal, PencilIcon, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { ChatHistory } from "@/types/chat.types";

export default function ChatHistoryLink({ links }: { links: ChatHistory[] }) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

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
              className="h-8.5 data-[active=true]:bg-sidebar-active text-foreground "
            >
              <span>{link.title}</span>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal
                    className={
                      pathname === `/chat/${link.id}`
                        ? "text-foreground hover:text-foreground"
                        : ""
                    }
                  />
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                className="min-w-36 rounded-lg"
              >
                <DropdownMenuItem variant="default">
                  <PencilIcon />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem variant="destructive">
                  <Trash2 />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
    </SidebarGroup>
  );
}
