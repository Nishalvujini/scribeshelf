import Link from "next/link";
import { Upload } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LibraryPage() {
  return (
    <AppShell>
      <Container className="py-10 sm:py-14">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-medium text-muted-foreground">Your library</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            A quieter place to read.
          </h1>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Your books and documents will live here. Uploads arrive in Phase 0.5.
          </p>
        </div>

        <Card className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-muted">
            <Upload className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-lg font-semibold">No documents yet</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            We’re building the foundation first. Document uploads will be added after auth and data security are in place.
          </p>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-6")}
          >
            Back home
          </Link>
        </Card>
      </Container>
    </AppShell>
  );
}
