import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Coffee,
  HelpCircle,
  MoreHorizontal,
  Settings,
  Star,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggler } from "../common/theme-toggler";
import { auth } from "@/lib/auth";
import { BuyMeCoffeeLink, GithubLink } from "@/lib/constent";
import LogoutBtn from "../auth/logout";

type Session = typeof auth.$Infer.Session.user;

function NavUser({ user }: { user: Session }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="text-neutral-900 dark:text-neutral-100 hover:bg-sidebar-active/70"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="rounded-lg uppercase font-semibold">
                  {user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <MoreHorizontal className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-background min-w-56 rounded-lg mb-1"
            align="center"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* profile  */}
              <DropdownMenuItem asChild>
                <Link href={"#"}>
                  <UserIcon />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* dark mode */}
              <ThemeToggler type="menu" />
              {/* settings  */}
              <DropdownMenuItem asChild>
                <Link href={"#"}>
                  <Settings />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* help  */}
              <DropdownMenuItem asChild>
                <Link href={"#"}>
                  <HelpCircle />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={GithubLink} target="_blank">
                  <Star />
                  Star on GitHub
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={BuyMeCoffeeLink} target="_blank">
                  <Coffee />
                  Buy me a coffee
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* logout  */}
            <LogoutBtn />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default NavUser;
