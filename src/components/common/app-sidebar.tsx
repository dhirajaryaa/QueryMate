import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import Logo from "./logo"

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader >
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupAction>
                        <Plus /> <span className="sr-only">Add Project</span>
                    </SidebarGroupAction>
                    <SidebarGroupContent>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus deserunt sed esse, rerum dolorem quam dolores laudantium, ex, facere inventore nesciunt cum natus? Consectetur esse, natus velit blanditiis optio porro voluptates tempore explicabo magnam, autem nisi consequatur ipsum dolorem debitis dolorum adipisci cumque rem dignissimos? Ex expedita, a dolor libero, optio vero tempore earum sunt culpa quidem tenetur quas obcaecati inventore ipsum. Deserunt tempora dolores officia omnis.</SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}