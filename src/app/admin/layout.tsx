'use client';

import { Login } from '@/components';
import { fetchSession } from '@/utils/users.actions';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { sessionAtom } from '@/utils/context';

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    if (session) {
      fetchSession(session.authToken)
        .then((user) => {
          if (!user) setSession(null);
        })
        .catch((err) => {
          setSession(null);
        });
    }
  }, [session, setSession]);

  return (
    <main>
      <Toaster />
      {session ? children : <Login />}
    </main>
  );
}
