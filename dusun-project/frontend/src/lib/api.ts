const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { token, headers, ...rest } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.detail || `Request failed: ${res.status}`);
  }

  // DELETE endpoints may return 200 with a small ack body; guard for empty bodies
  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

// Example usage:
// const news = await apiFetch<News[]>("/api/news");
// const created = await apiFetch<News>("/api/news", { method: "POST", body: JSON.stringify(payload), token });
