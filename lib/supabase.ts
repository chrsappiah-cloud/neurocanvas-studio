import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
	process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';

const supabaseAnonKey =
	process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
	'demo-publishable-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ArtworkRecord = {
	id: string;
	resident_id: string;
	title: string;
	medium: string;
	mood: string;
	music: string;
	image_url: string | null;
	created_at: string;
};

export type SessionRecord = {
	id: string;
	resident_id: string;
	caregiver_id: string | null;
	mode: 'painting' | 'drawing';
	mood: string | null;
	music_track: string | null;
	duration_seconds: number;
	notes: string | null;
	created_at: string;
};
