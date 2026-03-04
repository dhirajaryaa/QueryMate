import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleQuestionMark } from "lucide-react"
import Logo from "../common/logo"
import { Suspense } from "react";
import SidebarNav from "./sidebar-nav";
import { ChatHistory, HistoryLoading } from "./chat-history";

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
            <SidebarFooter className="border-t shadow">
                <SidebarMenu >
                    <SidebarMenuItem >
                        <SidebarMenuButton
                            asChild
                            tooltip={"Support"}
                            // isActive={pathname.startsWith(link.url)}
                            className="data-[active=true]:bg-primary data-[active=true]:text-background mx-auto  w-[90%]"
                        >
                            <div className="py-5 flex gap-3 text-base sm:text-[15px] px-3 font-medium ">
                                <span>
                                    <CircleQuestionMark className="size-5 sm:size-6" />
                                </span>
                                <span>Support</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
};

