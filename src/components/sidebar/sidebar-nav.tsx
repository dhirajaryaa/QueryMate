"use client";
import Link from "next/link";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { SquarePen, Unplug } from "lucide-react";

export default function SidebarNav() {
    const pathname = usePathname();

    const links = [
        {
            title: "New Chat",
            url: "/new",
            icon: SquarePen,
        },
        {
            title: "Connections",
            url: "/connections",
            icon: Unplug,
        }
    ];

    return (
        <SidebarMenu className="sticky z-1 top-0 bg-sidebar pb-2">
            {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                    <Link href={link.url}>
                        <SidebarMenuButton
                            asChild
                            tooltip={link.title}
                            isActive={pathname === link.url}
                            // isActive={pathname.startsWith(link.url)}
                            className="data-[active=true]:bg-primary data-[active=true]:text-background
                            dark:data-[active=true]:text-white
                             mt-0.5"
                        >
                            <div className="py-5 flex gap-3 text-base sm:text-[15px] px-3 font-medium ">
                                <span>
                                    <link.icon className="size-5" />
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