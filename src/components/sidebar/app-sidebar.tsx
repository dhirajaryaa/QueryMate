import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { Github, LogOut } from "lucide-react"
import Logo from "../common/logo"
import { Suspense } from "react";
import SidebarNav from "./sidebar-nav";
import { ChatHistory, HistoryLoading } from "./chat-history";
import { Button } from "../ui/button";

export async function AppSidebar() {

    // await new Promise(resolve => setTimeout(resolve, 4000));

    return (
        <Sidebar>
            <SidebarHeader >
                {/* logo  */}
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <div className="bg-sidebar mx-auto w-[90%]">
                    {/* links  */}
                    <SidebarNav />
                    {/* history  */}
                    <Suspense fallback={<HistoryLoading />}>
                        <ChatHistory />
                    </Suspense>
                </div>
            </SidebarContent>
            <SidebarFooter>
                {/* give me start  */}
                <SidebarMenu>
                    <SidebarMenuItem className="w-[90%] mx-auto">
                        <Button className="w-full h-8" asChild>
                            <a href="https://github.com/dhirajaryaa/querymate" target="_blank">
                                <Github />
                                Star on Github
                            </a>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
};

