import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuSkeleton } from "../ui/sidebar";
import ChatHistoryLink from "./chat-history-links";

export async function ChatHistory() {
    await new Promise(resolve => setTimeout(resolve, 4000)) //todo remove from api call

    const links = [
        { name: "database schema planning", id: "id004" },
        { name: "mongodb connection error", id: "id005" },
        { name: "postgres ssl issue", id: "id006" }
    ];

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
            <ChatHistoryLink links={links} />
        </SidebarGroup>
    )
};


export function HistoryLoading({ count = 5 }: { count?: number }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Your Chats</SidebarGroupLabel>
            <SidebarMenu>
                {Array.from({ length: count }).map((_, index) => (
                    <SidebarMenuItem key={index}>
                        <SidebarMenuSkeleton />
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}