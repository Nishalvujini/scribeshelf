export type SupabaseHealthStatus =
  | { ok: true; provider: "supabase" }
  | { ok: false; provider: "supabase"; error: string };

// Placeholder domain types to be expanded in later iterations.
export interface ScribeShelfUser {
  id: string;
  email?: string | null;
}

