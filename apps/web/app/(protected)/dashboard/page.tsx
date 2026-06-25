import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@repo/auth";

import { LogoutButton } from "~/components/logout-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <LogoutButton />
    </div>
  );
}