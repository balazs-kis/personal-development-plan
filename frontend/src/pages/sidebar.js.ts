import type { APIRoute } from 'astro';
import { sidebarScript } from '../lib/sidebarScript';

export const GET: APIRoute = async () => {
  const { script } = await sidebarScript();
  return new Response(script, { headers: { 'Content-Type': 'text/javascript; charset=utf-8' } });
};
