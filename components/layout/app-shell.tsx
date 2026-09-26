import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";

export function AppShell({
  children,
  currentPage,
}: {
  children: React.ReactNode;
  currentPage?: "library";
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold tracking-tight outline-none transition-colors motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <BookOpen className="size-5" aria-hidden="true" />
            <span>ScribeShelf</span>
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-2 text-sm">
            <Link
              href="/app"
              aria-current={currentPage === "library" ? "page" : undefined}
              className="inline-flex min-h-11 items-center rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-[current=page]:bg-muted aria-[current=page]:text-foreground"
            >
              Library
            </Link>
          </nav>
        </Container>
      </header>
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
    </div>
  );
}
