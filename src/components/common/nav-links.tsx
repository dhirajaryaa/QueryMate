"use client";
import Link from "next/link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { History, LayoutGrid, MessageSquareMore, Settings, Unplug } from "lucide-react";

export default function NavLinks() {
    const pathname = usePathname();

    const links = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutGrid,
        },
        {
            title: "Connections",
            url: "/connections",
            icon: Unplug,
        },
        {
            title: "Query",
            url: "/query",
            icon: MessageSquareMore,
        },
        {
            title: "History",
            url: "/history",
            icon: History,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ];

    return (
        <SidebarMenu className={"mt-10"}>
            {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                    <Link href={link.url}>
                        <SidebarMenuButton
                            asChild
                            tooltip={link.title}
                            isActive={pathname.startsWith(link.url)}
                            className="data-[active=true]:bg-primary data-[active=true]:text-background
                            dark:data-[active=true]:text-white
                            mx-auto  w-[90%] mt-0.5"
                        >
                            <div className="py-6 flex gap-3 text-base sm:text-[15px] px-3 font-medium ">
                                <span>
                                    <link.icon className="size-5 sm:size-6" />
                                </span>
                                <span>{link.title}</span>
                            </div>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
};
