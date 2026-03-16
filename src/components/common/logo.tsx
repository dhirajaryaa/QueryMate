"use client";
import { DatabaseSearch } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export default function Logo() {
  const isMobile = useIsMobile();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex mx-2 items-center gap-2 p-2 cursor-pointer">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background">
            <DatabaseSearch className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold text-[18px] mx-0">
              QueryMate
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Chat with Database
            </span>
          </div>
          {isMobile && (
            <Button variant={"secondary"} size={"icon"} asChild>
              <SidebarTrigger />
            </Button>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
