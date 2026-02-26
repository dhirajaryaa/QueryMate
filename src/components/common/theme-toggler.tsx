"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggler({ variant = 'outline' }: { variant?: "outline" | "ghost" }) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  const isDark = theme === "dark";

  if (!mounted) {
    return <Button variant={variant} className="opacity-0" />;
  }

  return (
    <Button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      variant={variant}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
}