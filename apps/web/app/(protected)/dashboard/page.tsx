import { redirect } from "next/navigation";
import { getSession } from "~/lib/session";
import { LogoutButton } from "~/components/logout-button";

export default async function DashboardPage() {
  const session = await getSession();

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