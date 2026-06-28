"use client";

import { useTheme } from "next-themes";

import {
  ChevronsUpDown,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import { Button } from "~/components/ui/button";

import {
  SidebarTrigger,
} from "~/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { LogoutButton } from "~/components/logout-button";

type AppNavbarProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export function AppNavbar({
  user,
}: AppNavbarProps) {
  const { resolvedTheme, setTheme } =
    useTheme();

  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setTheme(
              resolvedTheme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}

          <span className="sr-only">
            Toggle Theme
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-11 gap-3 px-2"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={user.image ?? ""}
                />

                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left md:block">
                <p className="text-sm font-medium leading-none">
                  {user.name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64"
          >
            <DropdownMenuLabel className="space-y-1">
              <p className="font-medium">
                {user.name}
              </p>

              <p className="text-xs font-normal text-muted-foreground">
                {user.email}
              </p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <LogoutButton
                variant="ghost"
                className="h-auto w-full justify-start px-2 font-normal text-destructive hover:text-destructive"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}