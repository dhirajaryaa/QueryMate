"use client";
import Link from "next/link";
import {
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
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.id}>
          <Link href={`/chat/${link.id}`}>
            <SidebarMenuButton
              asChild
              tooltip={link.title}
              isActive={pathname === `/chat/${link.id}`}
              className="data-[active=true]:bg-primary data-[active=true]:text-background 
    dark:data-[active=true]:text-white"
            >
              <div className="py-4 flex gap-3 text-base sm:text-[15px] px-2 font-medium">
                <span>{link.title}</span>
              </div>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal
                    className={
                      pathname === `/chat/${link.id}`
                        ? "text-white hover:text-foreground"
                        : ""
                    }
                  />
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
                className="min-w-56 rounded-lg"
              >
                <DropdownMenuItem>
                  <PencilIcon className="text-primary" />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Trash2 className="text-destructive" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
