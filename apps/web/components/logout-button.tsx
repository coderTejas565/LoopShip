"use client";

import { authClient } from "~/lib/auth-client";

import { Button } from "~/components/ui/button";

type LogoutButtonProps = {
  variant?:
    | "default"
    | "ghost"
    | "outline"
    | "secondary"
    | "destructive"
    | "link";

  className?: string;
};

export function LogoutButton({
  variant = "default",
  className,
}: LogoutButtonProps) {
  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/login";
  }

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}