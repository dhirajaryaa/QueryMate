import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Github } from "lucide-react";
import { GithubLink } from "@/lib/constent";

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between p-2 sticky top-0">
      <SidebarTrigger />
      <Button size={"sm"} asChild>
        <a href={GithubLink} target="_blank">
          <Github />
          Github
        </a>
      </Button>
    </header>
  );
}
