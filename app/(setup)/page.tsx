import { redirect } from 'next/navigation';

import { validateRequest } from '@/auth';
import Link from 'next/link';

const SetupPage = async () => {
  const session = await validateRequest();

  if (session.user?.role === 'ADMIN') {
    return redirect('/admin');
  }

  if (session.user?.role === 'STUDENT') {
    return redirect('/student');
  }

  if (session.user?.role === 'LECTURER') {
    return redirect('/lecturer');
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
      <p className="text-muted-foreground">
        You need to login to access this app.
      </p>
      <Link href="/login" className="hover:underline">
        Login here.
      </Link>
    </div>
  );
};

export default SetupPage;
