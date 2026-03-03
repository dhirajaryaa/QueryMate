"use client";
import Link from "next/link";
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { MoreHorizontal, PencilIcon, SquarePen, Trash2, Unplug } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";

type Props = {
    links: { name: string, id: string }[]
}

export default function ChatHistoryLink({ links }: Props) {
    const pathname = usePathname();
    const { isMobile } = useSidebar()
    return (
        <SidebarMenu >
            {links.map((link) => (
                <SidebarMenuItem key={link.id}>
                    <Link href={`/app/chat/${link.id}`}>
                        <SidebarMenuButton
                            asChild
                            tooltip={link.name}
                            isActive={pathname === `/app/chat/${link.id}`}
                            className="data-[active=true]:bg-primary data-[active=true]:text-background
                            dark:data-[active=true]:text-white"
                        >
                            <div className="py-4 flex gap-3 text-base sm:text-[15px] px-3 font-medium ">
                                <span>{link.name}</span>
                            </div>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction>
                                    <MoreHorizontal />
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                                className="min-w-56 rounded-lg"
                            >
                                <DropdownMenuItem>
                                    <PencilIcon />
                                    Rename</DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Trash2 />
                                    Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}