"use client";
import { EmptyState } from "@/components/empty-state";

export default function LibraryPage() {
  return (
    <section className="space-y-6">
      <EmptyState
        title="No documents yet"
        description="When ScribeShelf is ready, this is where your saved articles, PDFs, and reading sessions will live."
        primaryActionLabel="Paste text"
        secondaryActionLabel="Upload .txt"
        onPrimaryAction={() => {
          // stub: will open paste flow later
        }}
        onSecondaryAction={() => {
          // stub: will open upload flow later
        }}
      />
    </section>
  );
}
