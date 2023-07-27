'use client';

import { SearchGroup, CarCard } from '@/components';
import { carsAtom, getAllCars, requestParamsAtom } from '@/utils/context';
import { Car } from '@prisma/client';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [cars, setCars] = useAtom(carsAtom);
  const [requestParams] = useAtom(requestParamsAtom);

  useEffect(() => {
    getAllCars(requestParams).then((cars) => setCars(cars));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='m-auto max-w-[1200px]'>
      <Toaster />
      <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
        <h1 className='text-4xl font-semibold mb-4'>
          Recherchez votre véhicule d&apos;occasion
        </h1>
        <SearchGroup />
      </section>

      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-4 py-12 px-4'>
        {cars &&
          cars.map((car: Car) => (
            <CarCard key={car.id} car={car} isAdmin={false} />
          ))}
      </section>
    </main>
  );
}
