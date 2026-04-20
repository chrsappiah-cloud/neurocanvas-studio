import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createSupabaseServerClient();

  const { data: artwork, error } = await supabase
    .from('artworks')
    .select('id, image_url')
    .eq('id', params.id)
    .single();

  if (error || !artwork?.image_url) {
    return NextResponse.json(
      { ok: false, error: 'Artwork not found.' },
      { status: 404 }
    );
  }

  const { data, error: signedError } = await supabase.storage
    .from('artworks')
    .createSignedUrl(artwork.image_url, 60 * 10);

  if (signedError) {
    return NextResponse.json(
      { ok: false, error: signedError.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, signedUrl: data.signedUrl });
}
