"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ReportBugOrFeature() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      <SidebarMenuItem className="px-1 py-0.5" title="Report Bug & Feature">
        <SidebarMenuButton
          asChild
          tooltip={"Report Bug & Feature"}
          isActive={pathname.startsWith("/reports")}
          className="h-9 data-[active=true]:bg-sidebar-active hover:bg-sidebar-active/70 text-neutral-900 dark:text-neutral-100"
        >
          <Link href={"/reports"}>
            <ArrowUpRight />
            <span>Report Bug & Feature</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default ReportBugOrFeature;
