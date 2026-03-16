"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { SquarePen, Unplug } from "lucide-react";

export default function SidebarNav() {
  const pathname = usePathname();

  const links = [
    {
      title: "New Chat",
      url: "/new",
      icon: SquarePen,
    },
    {
      title: "Connections",
      url: "/connections",
      icon: Unplug,
    },
  ];

  return (
    <SidebarGroup className="sticky top-0 bg-sidebar px-2 z-1">
      <SidebarMenu>
        {links.map((item) => (
          <SidebarMenuItem key={item.title} className="px-1 py-0.5">
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={pathname === item.url}
              className="h-9 data-[active=true]:bg-sidebar-active text-neutral-900 dark:text-neutral-100"
            >
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
