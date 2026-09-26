export type SupabaseConfig = { url: string; publishableKey: string };

export function parseSupabaseConfig(
  rawUrl: string | undefined,
  rawKey: string | undefined,
): SupabaseConfig | null {
  const url = rawUrl?.trim();
  const publishableKey = rawKey?.trim();

  if (!url && !publishableKey) return null;
  if (!url || !publishableKey) {
    throw new Error("Set both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid project URL.");
  }

  const local = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname);
  if (
    (parsed.protocol !== "https:" && !(local && parsed.protocol === "http:")) ||
    parsed.username || parsed.password || parsed.search || parsed.hash ||
    parsed.pathname !== "/"
  ) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must be an HTTPS project origin (HTTP is allowed on localhost).");
  }

  if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(publishableKey)) {
    throw new Error("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY must be a publishable key, never a secret or service-role key.");
  }

  return { url: parsed.origin, publishableKey };
}

export function getSupabaseConfig() {
  // Keep direct accesses so Next.js can inline these public settings in the browser.
  return parseSupabaseConfig(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

export function requireSupabaseConfig(): SupabaseConfig {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Supabase is not configured. Set the two public project settings in .env.local.");
  return config;
}
