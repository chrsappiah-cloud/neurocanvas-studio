import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

// Session API route for SSR auth (placeholder)
export async function GET() {
  return new Response('Session route placeholder', { status: 200 });
}
