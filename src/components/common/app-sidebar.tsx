import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CircleQuestionMark } from "lucide-react"
import Logo from "./logo"
import NavLinks from "./nav-links"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader >
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    {/* Nav Links  */}
                    <NavLinks />
                </SidebarGroup>
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
}