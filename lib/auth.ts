import "server-only";
import { cookies } from "next/headers";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "techcell_admin";
const MAX_AGE = 60 * 60 * 8;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_SECRET inválido.");
  return value;
}

function signature(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL || "";
  const encoded = process.env.ADMIN_PASSWORD_HASH || "";
  const [algorithm, salt, stored] = encoded.split("$");
  if (algorithm !== "scrypt" || !salt || !stored) return false;
  const emailOk = safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase());
  const hash = scryptSync(password, salt, 64).toString("hex");
  return emailOk && safeEqual(hash, stored);
}

export async function createSession(email: string) {
  const payload = Buffer.from(JSON.stringify({
    email,
    exp: Math.floor(Date.now() / 1000) + MAX_AGE,
  })).toString("base64url");
  const token = `${payload}.${signature(payload)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
}

export async function isAuthenticated() {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return false;
    const [payload, sig] = token.split(".");
    if (!payload || !sig || !safeEqual(sig, signature(payload))) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as { exp: number };
    return data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function requireApiAuth() {
  if (!(await isAuthenticated())) {
    return new Response(JSON.stringify({ error: "Sessão expirada. Entre novamente." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}
