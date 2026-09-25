import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md font-semibold tracking-tight outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <BookOpen className="size-5" aria-hidden="true" />
            <span>ScribeShelf</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-2 text-sm">
            <Link
              href="/app"
              className="rounded-md px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Library
            </Link>
          </nav>
        </Container>
      </header>
      <main>{children}</main>
    </div>
  );
}
