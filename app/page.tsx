import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Read the web on your terms.
        </h1>
        <p className="max-w-2xl text-base text-slate-700 md:text-lg">
          ScribeShelf is a neurodivergent-friendly reading workspace for calmer,
          more focused deep work. Bring your articles and documents into a space
          that supports how your brain actually works.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <Link href="/app">Enter Library</Link>
        </Button>
        <span className="text-xs text-slate-500">
          Phase 0 · UI shell only · No auth yet
        </span>
      </div>
    </section>
  );
}
