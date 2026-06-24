import { SignupForm } from "~/components/auth/signup-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            LoopShip
          </h1>

          <p className="mt-2 text-muted-foreground">
            From Request To Release.
          </p>
        </div>

        <SignupForm />
      </div>
    </main>
  );
}