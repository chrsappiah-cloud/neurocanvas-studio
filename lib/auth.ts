
// Auth utility functions for Supabase SSR
import { createServerClient } from '@supabase/ssr';
import { cookies as nextCookies } from 'next/headers';

async function getCookieMethods() {
  const cookieStore = await nextCookies();
  return {
    get: (name: string) => cookieStore.get(name)?.value,
    set: (name: string, value: string, options?: any) => {}, // No-op for SSR
    remove: (name: string, options?: any) => {} // No-op for SSR
  };
}

export async function getSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: await getCookieMethods() }
  );
}

export type AppRole = 'resident' | 'caregiver' | 'therapist' | 'admin';

export const protectedRoutes: Record<string, AppRole[]> = {
  '/caregiver': ['caregiver', 'therapist', 'admin'],
  '/api/sessions': ['caregiver', 'therapist', 'admin']
};

export function hasRouteAccess(pathname: string, role?: string | null) {
  const match = Object.entries(protectedRoutes).find(([route]) =>
    pathname.startsWith(route)
  );

  if (!match) return true;

  const allowedRoles = match[1];
  return !!role && allowedRoles.includes(role as AppRole);
}
