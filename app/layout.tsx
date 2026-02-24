import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ScribeShelf",
  description: "A neurodivergent-friendly web reader."
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
          <div className="container flex h-16 items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-slate-900"
            >
              ScribeShelf
            </Link>
            <nav className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <Link href="/" className="hover:text-slate-900">
                Home
              </Link>
              <Button asChild variant="ghost" size="sm">
                <Link href="/app">App</Link>
              </Button>
            </nav>
          </div>
        </header>
        <main className="page-main">
          <div className="container max-w-4xl">{children}</div>
        </main>
        <footer className="border-t bg-white/80 py-4 text-xs text-slate-500">
          <div className="container max-w-4xl flex justify-between">
            <span>ScribeShelf · Early prototype</span>
            <span>Auth: stubbed, coming later</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
