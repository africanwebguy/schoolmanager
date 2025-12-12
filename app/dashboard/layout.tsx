import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardHeader from '@/app/components/DashboardHeader';
import DashboardSidebar from '@/app/components/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  const { data: profile } = await supabase
    .from('user_profiles')
    .select('full_name, user_type')
    .eq('user_id', user.id)
    .single();

  const userName = profile?.full_name || user.email || 'User';
  const userType = profile?.user_type || 'staff';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <DashboardHeader userName={userName} userType={userType} />
      <div className="flex">
        <DashboardSidebar userType={userType} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
