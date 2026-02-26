import { NextResponse } from "next/server";
import type { SupabaseHealthStatus } from "@/lib/supabase/types";

export async function GET() {
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasAnonKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  let body: SupabaseHealthStatus;

  if (hasUrl && hasAnonKey) {
    body = { ok: true, provider: "supabase" };
  } else {
    body = {
      ok: false,
      provider: "supabase",
      error: "Missing env"
    };
  }

  return NextResponse.json(body, {
    status: 200
  });
}

