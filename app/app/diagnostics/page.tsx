"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SupabaseHealthStatus } from "@/lib/supabase/types";

export default function DiagnosticsPage() {
  const [status, setStatus] = React.useState<SupabaseHealthStatus | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    async function fetchHealth() {
      try {
        const res = await fetch("/api/health/supabase");
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = (await res.json()) as SupabaseHealthStatus;
        if (isMounted) {
          setStatus(json);
          setError(null);
        }
      } catch (e) {
        if (isMounted) {
          setError(
            e instanceof Error ? e.message : "Unknown error while checking health"
          );
          setStatus(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchHealth();

    return () => {
      isMounted = false;
    };
  }, []);

  const statusLabel =
    status?.ok === true
      ? "Healthy"
      : status?.ok === false
      ? "Misconfigured"
      : "Unknown";

  const statusColor =
    status?.ok === true
      ? "text-emerald-600"
      : status?.ok === false
      ? "text-amber-600"
      : "text-slate-500";

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight text-slate-900">
        Diagnostics
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Supabase connectivity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-700">
          <p>
            Status:{" "}
            <span className={statusColor}>
              {isLoading ? "Checking…" : statusLabel}
            </span>
          </p>
          {status && (
            <p className="text-xs text-slate-500">
              Provider: {status.provider}
              {status.ok === false && status.error
                ? ` · ${status.error}`
                : null}
            </p>
          )}
          {error && (
            <p className="text-xs text-amber-600">
              Client error while calling health endpoint: {error}
            </p>
          )}
          {!isLoading && !status && !error && (
            <p className="text-xs text-slate-500">
              No status available. This should not normally happen.
            </p>
          )}
          <p className="text-xs text-slate-500">
            This page is safe to use even before Supabase is configured. Once
            you add env vars and restart the dev server, the status should move
            to{" "}
            <span className="font-medium text-emerald-600">
              Healthy
            </span>
            .
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

