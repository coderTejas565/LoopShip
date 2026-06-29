"use client";

import { authClient } from "~/lib/auth-client";

import { Button } from "~/components/ui/button";

export function GithubButton() {
  async function handleGithubLogin() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleGithubLogin}
    >
      Continue with GitHub
    </Button>
  );
}