"use client";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ArrowLeft, Globe, GlobeOff, Share2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { useNetworkStatus } from "@/hooks/use-network-status";

export default function AppHeader() {
  const router = useRouter();
  const isOnline = useNetworkStatus();
  return (
    <header className="flex items-center justify-between shrink-0 py-2 px-4 shadow-xs sticky top-0 bg-background/30 backdrop-blur-sm z-50">
      <div className="flex items-center gap-2">
        <SidebarTrigger variant={"secondary"} size={"icon-sm"} />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-6"
        />
        <Button
          size={"sm"}
          onClick={() => router.back()}
          title="Go back"
          variant={"outline"}
        >
          <ArrowLeft /> Back
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {/* online status */}
        <Badge
          variant={"secondary"}
          className={`${isOnline ? "bg-emerald-200 text-emerald-800" : "bg-red-200 text-red-800"} font-semibold text-sm space-x-2`}
        >
          {isOnline ? <Globe /> : <GlobeOff />}
          <span className="hidden sm:inline-block">{isOnline ? "Online":"Offline"}</span>
        </Badge>
        <Button
          size={"sm"}
          variant={"secondary"}
          title="Share"
          onClick={() => toast.info("upcoming feature.")}
        >
          <Share2 />
          <span className="hidden sm:inline-block">Share</span>
        </Button>
      </div>
    </header>
  );
}
