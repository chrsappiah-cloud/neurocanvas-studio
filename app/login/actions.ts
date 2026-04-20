'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';


export async function login(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const { error } = await supabase.auth.signUp({
    ...data,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`
    }
  });

  if (error) {
    redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/', 'layout');
  redirect('/login?checkEmail=1');
}
