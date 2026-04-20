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

export async function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: await getCookieMethods() }
  );
}
