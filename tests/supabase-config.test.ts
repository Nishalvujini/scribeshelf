import assert from "node:assert/strict";
import { test } from "node:test";
import { parseSupabaseConfig } from "../lib/supabase/config";

const url = "https://reader-test.supabase.co";
const key = "sb_publishable_test_only";

test("a design preview needs no backend, but partial configuration fails", () => {
  assert.equal(parseSupabaseConfig(undefined, undefined), null);
  assert.equal(parseSupabaseConfig(" ", " "), null);
  assert.throws(() => parseSupabaseConfig(url, undefined), /Set both/);
  assert.throws(() => parseSupabaseConfig(undefined, key), /Set both/);
});

test("public configuration rejects privileged keys without echoing their value", () => {
  for (const unsafeKey of ["sb_secret_never_expose", "eyJhbGciOiJIUzI1NiJ9.service_role.signature"]) {
    assert.throws(() => parseSupabaseConfig(url, unsafeKey), (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.match(error.message, /publishable key/);
      assert.ok(!error.message.includes(unsafeKey));
      return true;
    });
  }
});

test("URLs prohibit remote plaintext, credentials and query strings", () => {
  for (const invalid of ["not-a-url", "http://reader-test.supabase.co", "https://user:secret@example.com", "https://example.com?key=secret", "https://example.com/auth/v1", "file:///tmp/test"]) {
    assert.throws(() => parseSupabaseConfig(invalid, key), /project/);
  }
  assert.deepEqual(parseSupabaseConfig(` ${url}/ `, ` ${key} `), { url, publishableKey: key });
  assert.equal(parseSupabaseConfig("http://127.0.0.1:54321", key)?.url, "http://127.0.0.1:54321");
});
