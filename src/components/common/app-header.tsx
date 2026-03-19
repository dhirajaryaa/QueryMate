"use client";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { ArrowLeft, Github, Share2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AppHeader() {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between py-2 px-4 shadow-xs sticky top-0 bg-background/30 backdrop-blur-sm ">
      <div className="flex items-center gap-2">
        <SidebarTrigger variant={"secondary"} size={"icon-sm"} />
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-6"
        />
        <Button size={"sm"} onClick={() => router.back()} variant={"outline"}>
          <ArrowLeft /> Back
        </Button>
      </div>
      <Button size={"sm"} variant={"secondary"} onClick={()=>toast.info("upcoming feature.")} >
        <Share2 />
        Share
      </Button>
    </header>
  );
}
