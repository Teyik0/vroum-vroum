'use client';

import { Login } from '@/components';
import { fetchSession } from '@/utils/users.actions';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { loadingAtom, sessionAtom } from '@/utils/context';

export default function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useAtom(sessionAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetchSession(session.authToken)
        .then((user) => {
          if (!user) setSession(null);
        })
        .catch((err) => {
          setSession(null);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Toaster />
      {session ? children : <Login />}
    </main>
  );
}
