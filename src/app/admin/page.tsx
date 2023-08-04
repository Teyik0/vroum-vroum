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
      {/* <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
        <h1 className='text-4xl font-semibold mb-4'>
          Cherchez le véhicule à modifier
        </h1>
        <SearchGroup />
      </section>
      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-4 py-12 px-4'>
        <div
          className='cursor-pointer relative border-2 border-dashed rounded-xl flex justify-center items-center min-h-[200px]
            overflow-hidden before:bg-[#888d8d] before:opacity-20 before:absolute before:h-full before:w-full 
            before:translate-y-[100%] before:transition-all 
            before:duration-500 before:ease-in-out hover:before:translate-y-0 hover:before:rounded-none'
        >
          <TbCrosshair className='text-7xl text-slate-300' />
          <h4 className='absolute top-4 left-4 text-xl font-bold'>
            Ajouter une nouvelle voiture
          </h4>
        </div>
        {cars &&
          cars.map((car: Car) => (
            <CarCard key={car.id} car={car} isAdmin={true} />
          ))}
      </section> */}
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
