import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { appName, appTagline } from "@/lib/theme";

export const metadata: Metadata = {
  title: appName,
  description: appTagline
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="page-shell">
        <header className="border-b bg-white/80 backdrop-blur">
          <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
            >
              {appName}
            </Link>
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Link
                href="/"
                className="rounded-md px-2 py-1 hover:bg-slate-100 hover:text-slate-900"
              >
                Home
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="px-3 py-2"
              >
                <Link href="/app">App</Link>
              </Button>
            </nav>
          </Container>
        </header>
        <main className="page-main">
          <Container>{children}</Container>
        </main>
        <footer className="border-t bg-white/80 py-4 text-xs text-slate-500">
          <Container className="flex flex-col justify-between gap-2 sm:flex-row">
            <span>{appName} · Early prototype</span>
            <span>Auth: stubbed, coming later</span>
          </Container>
        </footer>
      </body>
    </html>
  );
}
