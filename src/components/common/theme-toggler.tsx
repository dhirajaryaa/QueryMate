"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export function ThemeToggler({
  variant = "outline",
  type = "icon",
}: {
  variant?: "outline" | "ghost";
  type?: "icon" | "menu";
}) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = theme === "dark";

 const handleToggleTheme = (e: React.MouseEvent) => {
  e.stopPropagation();
  setTheme(isDark ? "light" : "dark");
};

  if (!mounted) {
    return type === "icon" ?
    <Button variant={variant} className="opacity-0" />:
    <DropdownMenuItem  className="opacity-0"></DropdownMenuItem>
    
  }

  return type === "icon" ? (
    <Button
      onClick={handleToggleTheme}
      variant={variant}
    >
      {!isDark ? <Moon /> : <Sun />}
    </Button>
  ) : (
    <DropdownMenuItem onClick={handleToggleTheme} >
      {!isDark ? (
        <>
          <Moon /> Dark Mode
        </>
      ) : (
        <>
          <Sun />
          Light Mode
        </>
      )}
    </DropdownMenuItem>
  );
}
