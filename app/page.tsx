import Link from "next/link";
import { ArrowRight, BookOpen, Focus, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Container } from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const principles = [
  {
    icon: BookOpen,
    title: "Comfort first",
    description: "Reading controls will adapt the page to the reader, not the other way around.",
  },
  {
    icon: Focus,
    title: "Low visual clutter",
    description: "The interface stays quiet so the document remains the center of attention.",
  },
  {
    icon: Sparkles,
    title: "Built to grow",
    description: "Reader, accessibility, and AI features will share one consistent foundation.",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <Container className="py-16 sm:py-24">
        <section className="max-w-3xl">
          <p className="text-sm font-medium tracking-wide text-muted-foreground">
            A neurodivergent-friendly reading workspace
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Reading that adapts to you.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            ScribeShelf is being built to reduce friction around long-form reading with
            adjustable comfort, focus, and accessibility tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/app" className={cn(buttonVariants({ size: "lg" }))}>
              Open library
              <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </Link>
            <a
              href="#principles"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See the approach
            </a>
          </div>
        </section>

        <section
          id="principles"
          aria-labelledby="principles-heading"
          className="mt-20 sm:mt-28"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-muted-foreground">Foundation</p>
            <h2 id="principles-heading" className="mt-2 text-2xl font-semibold tracking-tight">
              Designed around reading comfort.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </Card>
            ))}
          </div>
        </section>
      </Container>
    </AppShell>
  );
}
