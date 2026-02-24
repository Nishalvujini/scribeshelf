import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function LibraryPage() {
  return (
    <section className="space-y-6">
      <Card className="shadow-subtle">
        <CardHeader>
          <CardTitle>Your Library (Phase 0)</CardTitle>
          <CardDescription>
            This is a placeholder view while we build out the real library
            experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
            <p className="font-medium text-slate-700">Empty for now</p>
            <p className="mt-1 text-slate-600">
              When ScribeShelf is ready, this is where your saved articles,
              PDFs, and reading sessions will live.
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-slate-500">
            Documents and syncing are not implemented yet.
          </p>
          <Button disabled>Add Document</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
