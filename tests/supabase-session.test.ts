import assert from "node:assert/strict";
import { test, type TestContext } from "node:test";
import { NextRequest } from "next/server";
import { updateSession } from "../lib/supabase/session";

const cookieName = "sb-reader-test-auth-token";
const user = { id: "11111111-1111-4111-8111-111111111111", aud: "authenticated", role: "authenticated", email: "reader@example.test", app_metadata: {}, user_metadata: {}, created_at: "2026-01-01T00:00:00Z" };
const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
const token = (exp: number) => `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: user.id, aud: "authenticated", role: "authenticated", exp, iat: exp - 3600 })}.dGVzdA`;

function configure(t: TestContext) {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://reader-test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test_only";
  t.after(() => {
    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    else process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = originalKey;
  });
}

test("unconfigured and signed-out previews do not contact Supabase", async (t) => {
  configure(t);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => { throw new Error("Unexpected network request"); });
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  assert.equal((await updateSession(new NextRequest("https://app.example.test/app"))).status, 200);
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://reader-test.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test_only";
  const response = await updateSession(new NextRequest("https://app.example.test/app"));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("expired sessions refresh once and forward cookies without shared caching", async (t) => {
  configure(t);
  const now = Math.floor(Date.now() / 1000);
  const oldSession = { access_token: token(now - 3600), refresh_token: "old-refresh-test", expires_at: now - 3600, expires_in: 3600, token_type: "bearer", user };
  const newSession = { ...oldSession, access_token: token(now + 3600), refresh_token: "new-refresh-test", expires_at: now + 3600 };
  let refreshes = 0;
  t.mock.method(globalThis, "fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
    const address = String(input);
    if (address.includes("/auth/v1/token?grant_type=refresh_token")) {
      refreshes++;
      assert.match(String(init?.body), /old-refresh-test/);
      return Response.json(newSession);
    }
    if (address.endsWith("/auth/v1/user")) return Response.json(user);
    throw new Error(`Unexpected test endpoint: ${address}`);
  });
  const request = new NextRequest("https://app.example.test/app", { headers: { cookie: `${cookieName}=base64-${encode(oldSession)}` } });
  const response = await updateSession(request);
  assert.equal(refreshes, 1);
  const refreshedCookie = response.cookies.get(cookieName);
  assert.ok(refreshedCookie?.value);
  assert.equal(request.cookies.get(cookieName)?.value, refreshedCookie.value);
  assert.match(response.headers.get("x-middleware-request-cookie") ?? "", /sb-reader-test-auth-token=/);
  assert.equal(response.headers.get("Cache-Control"), "private, no-store");
  assert.equal(response.headers.get("Pragma"), "no-cache");
  assert.equal(response.headers.get("Expires"), "0");
  const decoded = JSON.parse(Buffer.from(refreshedCookie.value.slice("base64-".length), "base64url").toString());
  assert.equal(decoded.refresh_token, "new-refresh-test");
});
