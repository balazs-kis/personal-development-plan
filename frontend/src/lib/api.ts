// Thin wrappers over the backend API. Same origin in dev (Vite proxy) and prod, so the
// auth cookie is sent automatically.

export interface Me {
  authenticated: boolean;
  id: string | null;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
}

export interface LessonProgress {
  slug: string;
  firstViewedAt: string;
  lastViewedAt: string;
  viewCount: number;
  completedAt: string | null;
}

async function request(method: string, path: string, body?: unknown): Promise<Response> {
  const res = await fetch(path, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${method} ${path} failed with ${res.status}`);
  }
  return res;
}

export async function getMe(): Promise<Me> {
  return (await request('GET', '/api/me')).json();
}

export async function getProgress(): Promise<LessonProgress[]> {
  const res = await request('GET', '/api/progress');
  return (await res.json()).lessons;
}

export async function recordView(slug: string): Promise<void> {
  await request('POST', '/api/progress/views', { slug });
}

export async function setCompletion(slug: string, completed: boolean): Promise<void> {
  await request('PUT', '/api/progress/completion', { slug, completed });
}

export async function logout(): Promise<void> {
  await request('POST', '/auth/logout');
}

export function loginUrl(provider: 'google' | 'github', returnUrl: string): string {
  return `/auth/login/${provider}?returnUrl=${encodeURIComponent(returnUrl)}`;
}
