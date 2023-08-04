'use client';

import { Login, SearchGroup, CarList } from '@/components';
import { fetchSession } from '@/utils/fetch';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAtom } from 'jotai';
import { sessionAtom } from '@/utils/context';

export default function Home() {
  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    if (session) {
      fetchSession(session.authToken).then((user) => {
        if (user.error) setSession(null);
      });
    }
  }, [session, setSession]);

  return (
    <main className='m-auto max-w-[1200px]'>
      <Toaster />
      {session ? (
        <>
          <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
            <h1 className='text-4xl font-semibold mb-4'>
              Cherchez le véhicule à modifier
            </h1>
            <SearchGroup />
          </section>
          <CarList isAdmin={true} />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
