"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";

export default function TestPage() {
  const [organizationId, setOrganizationId] = useState("");

  const createProject = trpc.project.createProject.useMutation();

  return (
    <div className="p-10">
      <button
        onClick={() =>
          createProject.mutate({
            organizationId,

            name: "LoopShip Web",

            slug: "loopship-web",

            description: "Main product",
          })
        }
      >
        Create Project
      </button>
    </div>
  );
}
