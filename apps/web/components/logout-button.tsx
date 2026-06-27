"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "~/components/ui/button";

export function LogoutButton() {
  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/login";
  }

  return <Button onClick={handleLogout}>Logout</Button>;
}
