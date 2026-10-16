import { writable } from 'svelte/store';
import * as api from './api';

// Shared client-side state for the current page. Every island and script on a page imports
// this same module instance, so the user and progress are fetched once and shared.
// Plain svelte/store (not runes) so non-Svelte scripts like the sidebar can subscribe too.

/** null while loading, or when the backend is unreachable. */
export const me = writable<api.Me | null>(null);

/** Keyed by lesson slug (the Astro content id). Empty when signed out. */
export const progress = writable<Map<string, api.LessonProgress>>(new Map());

let ready: Promise<void> | undefined;

/** Loads the user and their progress once per page; safe to call from every island. */
export function initSession(): Promise<void> {
  ready ??= load();
  return ready;
}

async function load(): Promise<void> {
  try {
    const user = await api.getMe();
    me.set(user);
    // Read by DocLayout's inline script on the next page load to size the user menu placeholder.
    localStorage.setItem('auth-hint', user.authenticated ? 'in' : 'out');
    if (user.authenticated) {
      await refreshProgress();
    }
  } catch (err) {
    console.error('Could not load session; progress tracking is disabled.', err);
  }
}

async function refreshProgress(): Promise<void> {
  const lessons = await api.getProgress();
  progress.set(new Map(lessons.map((l) => [l.slug, l])));
}

export async function recordView(slug: string): Promise<void> {
  await api.recordView(slug);
  await refreshProgress();
}

export async function setCompletion(slug: string, completed: boolean): Promise<void> {
  await api.setCompletion(slug, completed);
  await refreshProgress();
}

export async function logout(): Promise<void> {
  await api.logout();
  location.reload();
}
