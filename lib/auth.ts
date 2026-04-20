
// Auth utility functions for Supabase SSR
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function getSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
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
