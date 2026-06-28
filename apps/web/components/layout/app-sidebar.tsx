"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  FolderKanban,
  Inbox,
  CalendarDays,
  BarChart3,
  Settings,
  Rocket,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Inbox",
    href: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarDays,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" collapsible="icon">
<SidebarHeader className="border-b">
  <Link
    href="/dashboard"
    className="flex items-center gap-3 overflow-hidden py-1"
  >
    <div className="flex h-10 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
      <Rocket className="h-5 w-3" />
    </div>

    <div
      className="
        flex min-w-0 flex-col
        transition-all duration-200 ease-in-out
        group-data-[collapsible=icon]:w-0
        group-data-[collapsible=icon]:opacity-0
        group-data-[collapsible=icon]:overflow-hidden
      "
    >
      <span className="truncate font-semibold tracking-tight">
        LoopShip
      </span>

      <span className="truncate text-xs text-muted-foreground">
        AI Product OS
      </span>
    </div>
  </Link>
</SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/")
                }
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />

                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t py-3">
        <SidebarMenu>
          {secondaryNavigation.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.title}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />

                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}