"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggler({variant='outline'}: {variant?: "outline" | "ghost"}) {
  const { setTheme, theme } = useTheme();
  if (window === undefined) return null;

  return (
    <Button  onClick={() => setTheme(theme === "light" ? "dark" : "light")} variant={variant}>
      {
        theme === "light" ? <Moon /> : <Sun />
      }
    </Button>
  )
};
