"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium text-muted-foreground">Something went wrong</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        ScribeShelf hit an unexpected error.
      </h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Your data has not been changed. Try loading this screen again.
      </p>
      <div className="mt-6">
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
