import { Suspense } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggler } from "./theme-toggler";
import UserProfile from "../profile/user-profile";
import { Skeleton } from "../ui/skeleton";

export default function AppHeader() {
    return (
        <header className="flex items-center justify-between w-full px-4 py-2 shadow border-b sticky top-0 z-50 bg-background">
            {/* sidebar trigger */}
            <SidebarTrigger className="" />
            {/* theme  */}
            <div className="gap-x-2 flex items-center">
                <ThemeToggler variant="ghost" />
                <div className="size-10 rounded-full overflow-hidden flex items-center justify-center">
                    <Suspense fallback={<Skeleton />}>
                        <UserProfile />
                    </Suspense>
                </div>
            </div>
        </header>
    );
}