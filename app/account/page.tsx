import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import AccountForm from './account-form';


export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <AccountForm claims={user} />;
}
