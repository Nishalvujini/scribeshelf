import { requireSupabaseConfig } from "../lib/supabase/config";

async function checkConnection() {
  const { url, publishableKey } = requireSupabaseConfig();
  // Read-only endpoint: validates project reachability and the public API key.
  // Do not print settings, credentials, or response bodies.
  const response = await fetch(`${url}/auth/v1/settings`, {
    headers: { apikey: publishableKey },
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    throw new Error(`Supabase Auth connection check failed (HTTP ${response.status}).`);
  }
  const settings: unknown = await response.json();
  if (!settings || typeof settings !== "object" || !("external" in settings)) {
    throw new Error("Supabase returned an unexpected Auth settings response.");
  }
  console.log("Supabase Auth is reachable and accepts the configured publishable key.");
}

checkConnection().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Supabase connection check failed.");
  process.exitCode = 1;
});
