import { cookies } from "next/headers";

const API_BASE = "http://localhost:8000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Cookie"] = `token=${token}`;
  }

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
}
