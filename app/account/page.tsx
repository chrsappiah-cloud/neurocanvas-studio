import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import AccountForm from './account-form';

export default async function AccountPage() {
  const supabase = createSupabaseServerClient();
  const supabase = getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <AccountForm user={user} />;
}
