'use client';

import { SearchGroup, CarCard } from '@/components';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  login,
  carsAtom,
  getAllCars,
  getSession,
  requestParamsAtom,
  sessionAtom,
} from '@/utils/context';
import { Car } from '@prisma/client';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TbCrosshair } from 'react-icons/tb';

export default function Home() {
  const [cars, setCars] = useAtom(carsAtom);
  const [requestParams] = useAtom(requestParamsAtom);
  const [session, setSession] = useAtom(sessionAtom);
  const [loginForm, setLoginForm] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });

  /* const handleClick = async () => {
    const { username, password } = loginForm;
    const userLog = await login(username, password);
    if (!userLog.error) {
      setSession(userLog);
      toast.success('Vous êtes connecté');
    } else toast.error(userLog.error);
  }; */

  useEffect(() => {
    /* if (session) {
      getSession(session.authToken).then((user) => {
        console.log(user);
        if (user.error) setSession(null);
      });
    } */
    getAllCars(requestParams).then((cars) => setCars(cars));
  }, [requestParams, session, setCars, setSession]);

  return (
    <main className='m-auto max-w-[1200px]'>
      <Toaster />
      <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
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
      </section>
      {/* {session ? (
        <>
          <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
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
              <h4
                className='absolute top-4 left-4 text-xl font-bold'
                onClick={() => {
                  toast.success('Vous êtes connecté');
                }}
              >
                Ajouter une nouvelle voiture
              </h4>
            </div>
            {cars &&
              cars.map((car: Car) => (
                <CarCard key={car.id} car={car} isAdmin={true} />
              ))}
          </section>
        </>
      ) : (
        <section className='flex flex-col justify-center items-center py-32 px-4'>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='username'>Username</Label>
            <Input
              type='text'
              placeholder='ex: admin'
              value={loginForm?.username}
              onChange={(e) =>
                setLoginForm({ ...loginForm, username: e.target.value })
              }
            />
          </div>
          <div className='grid w-full max-w-sm items-center gap-1.5 mt-4'>
            <Label htmlFor='password'>Password</Label>
            <Input
              type='password'
              placeholder=''
              value={loginForm?.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
          </div>
          <button
            className='h-12 bg-blue-600 text-white text-xl rounded-lg flex justify-center items-center
             hover:bg-blue-900 ease-in-out duration-300 mt-8 max-w-sm w-full'
            onClick={handleClick}
          >
            Log in
          </button>
        </section>
      )} */}
    </main>
  );
}
