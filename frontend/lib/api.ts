export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

const NGROK_HEADER: Record<string, string> =
  API_BASE.includes("ngrok")
    ? { "ngrok-skip-browser-warning": "true" }
    : {};

function apiUrl(path: string) {
  const base = API_BASE.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export type AuthUser = {
  user_id: string;
  name: string;
  access_token: string;
};

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user_id");
}

export function getUserName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user_name");
}

export function getUserSkinType(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("user_skin_type");
}

export function setUserSkinType(skinType: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("user_skin_type", skinType);
}

export function saveAuth(data: {
  access_token: string;
  user_id: string;
  name: string;
  skin_type?: string;
}) {
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("user_id", data.user_id);
  localStorage.setItem("user_name", data.name);
  if (data.skin_type) {
    localStorage.setItem("user_skin_type", data.skin_type);
  }
}

export function clearAuth() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_skin_type");
}

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text || res.statusText);
  }
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  auth = true
) {
  const headers: Record<string, string> = {
    ...NGROK_HEADER,
    ...(options.headers as Record<string, string>),
  };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  let res: Response;
  try {
    res = await fetch(apiUrl(path), { ...options, headers });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE}. Start the backend (uvicorn) or set NEXT_PUBLIC_API_URL in .env.local.`
    );
  }
  const data = await parseJson(res);
  if (!res.ok) {
    throw new Error(data.detail || data.message || "Request failed");
  }
  return data;
}

export async function registerUser(body: {
  name: string;
  email: string;
  password: string;
  age?: number;
  gender?: string;
  skin_type?: string;
}) {
  return apiFetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...NGROK_HEADER },
    body: JSON.stringify(body),
  }, false);
}

export async function loginUser(email: string, password: string) {
  const form = new URLSearchParams();
  form.set("username", email);
  form.set("password", password);
  let res: Response;
  try {
    res = await fetch(apiUrl("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...NGROK_HEADER,
      },
      body: form.toString(),
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE}. Start the backend (uvicorn) or set NEXT_PUBLIC_API_URL in .env.local.`
    );
  }
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.detail || "Login failed");
  return data;
}

export async function analyzeImage(form: FormData) {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(apiUrl("/analyze"), {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...NGROK_HEADER,
      },
      body: form,
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_BASE}. Start the backend (uvicorn) or set NEXT_PUBLIC_API_URL in .env.local.`
    );
  }
  const data = await parseJson(res);
  if (!res.ok) throw new Error(data.detail || "Analysis failed");
  return data;
}

export async function getHistory(userId: string) {
  return apiFetch(`/history/${userId}`);
}

export async function healthCheck() {
  return apiFetch("/health", {}, false);
}

export function severityColor(severity: string): string {
  const s = severity?.toLowerCase();
  if (s === "severe") return "#EF4444";
  if (s === "moderate") return "#F59E0B";
  return "#22C55E";
}

export function vitalityFromConfidence(confidence: number): number {
  return Math.min(100, Math.round(confidence * 100 + 10));
}
