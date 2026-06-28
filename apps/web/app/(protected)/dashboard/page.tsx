import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@repo/auth";

import { api } from "~/trpc/server";

import Link from "next/link";

import { LogoutButton } from "~/components/logout-button";


export default async function DashboardPage() {

  const session =
    await auth.api.getSession({
      headers: await headers(),
    });


  if (!session) {
    redirect("/login");
  }


  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Welcome {session.user.name}
        </h1>

        <LogoutButton />
      </div>



      <div className="border rounded-lg p-6">

        <h2 className="text-xl font-semibold">
          PRD Workflow
        </h2>


        <p className="text-muted-foreground">
          Your generated Product Requirement Documents
        </p>


        <Link
          href="/dashboard/projects"
          className="mt-4 inline-block"
        >
          View Projects
        </Link>


      </div>


    </div>
  );
}