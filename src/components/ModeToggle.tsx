"use client";

import * as React from "react";
import { Sun, Moon, Sparkles, Cloud, Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => {
    if (!mounted) return <Palette className="h-[1.2rem] w-[1.2rem]" />;

    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />;
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem] text-sky-300" />;
      case "pink":
        return <Sparkles className="h-[1.2rem] w-[1.2rem] text-pink-400" />;
      default:
        return <Palette className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative transition-all duration-300 hover:scale-105 active:scale-95 border-border/80">
          {getThemeIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md border-border/60 min-w-[140px]">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer justify-center font-medium">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer justify-center font-medium">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer justify-center font-medium">
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("pink")} className="cursor-pointer justify-center font-medium">
          Pink
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}