"use client";
import { DatabaseSearch, FlaskConical } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

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
            <div className="font-semibold text-[18px] mx-0 flex items-center gap-2">
              QueryMate
              <Badge
                title="Currently QueryMate running is Beta version"
                variant={"outline"}
                className="bg-violet-200 border-violet-600 text-violet-600 text-xs"
              >
                <FlaskConical
                  fill="currentColor"
                  className="text-violet-600 animate-pulse"
                />
                Beta
              </Badge>
            </div>
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
