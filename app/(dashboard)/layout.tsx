import { redirect } from 'next/navigation';

import { SessionProvider } from '@/providers/session-provider';
import { validateRequest } from '@/auth';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await validateRequest();

  if (!session.user) {
    return redirect('/login');
  }

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        {children}
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
