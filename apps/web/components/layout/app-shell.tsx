import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";
import { AppNavbar } from "./app-navbar";

type AppShellProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };

  children: ReactNode;
};

export function AppShell({
  user,
  children,
}: AppShellProps) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppNavbar user={user} />

        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-6 py-8">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}