# Phase 0.3: Supabase client foundation

This branch builds on the Phase 0.2 design system. It prepares configuration and cookie-based sessions for the upcoming authentication and private-library work. It does not create a Supabase project, tables, storage buckets, sign-in screens, or protected routes.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. From the intended Supabase project's Connect dialog, copy its URL into `NEXT_PUBLIC_SUPABASE_URL` and its **publishable** (`sb_publishable_…`) key into `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Run `npm ci` and `npm run dev` with Node 24.
4. Run `npm run check:supabase` to verify that the Auth endpoint accepts the configured public key. This read-only check loads `.env.local`, times out after 15 seconds, and does not print keys or response contents.

Both settings can remain blank for the public design preview. Partial or malformed settings fail with an explicit configuration error. Legacy JWT keys are intentionally unsupported; use a publishable key. Never place secret/service-role keys in `NEXT_PUBLIC_` variables, source code, or pull requests. Runtime validation is a guard against mistakes, not a way to make public variables secret.

For Vercel, add these public settings to the intended Preview environment before rebuilding. Next.js embeds public settings at build time. Configure Production separately when that deployment is approved.

## Integration

- Client Components import `createClient` from `lib/supabase/client`.
- Server Components and Server Actions await `createClient` from `lib/supabase/server`. This creates a new client for each request; do not cache it globally.
- `proxy.ts` refreshes sessions on `/app` and `/auth`, passing refreshed cookies to both downstream rendering and the browser. It preserves the SDK's cache protections and marks configured responses `private, no-store`.
- Session refresh is **not authorization**. Before adding private routes, require configuration, verify identity with `auth.getClaims()` (or `getUser()` where fresh account state is required), and enforce ownership in database/storage policies. Never authorize using `getSession()` or user-editable metadata.
- Add future authenticated route prefixes to the proxy matcher. Auth Route Handlers that return their own responses must also preserve cookies and cache-prevention headers.

## Next data-access milestone

The intended starting model is a private library per signed-in reader. Before enabling uploads, implement and verify document-owner RLS, a private storage bucket with owner-scoped paths, and cross-user denial tests. Reading progress and preferences must also be scoped to the reader. This model is preparation guidance; no schema or policy has been applied by this branch.

## Verification

Run `npm test`, `npm run lint -- --max-warnings=0`, `npm run typecheck`, and `npm run build`.

The session tests use the real Supabase SSR client against mocked Auth responses. They check that an expired session refreshes once, both cookie destinations receive the new session, and responses prevent shared caching. `npm run check:supabase` separately verifies live Auth connectivity. Neither check proves a completed sign-in flow or database/storage authorization; those require the later authentication UI and ownership policies.

References: [Supabase SSR clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client), [API keys](https://supabase.com/docs/guides/getting-started/api-keys).
