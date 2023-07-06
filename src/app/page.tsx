'use client';

import { SearchGroup, CarCard } from '@/components';
import { requestParamsAtom } from '@/utils/context';
import { FilterCarParams } from '@/utils/interface';
import { Car } from '@prisma/client';
import { request } from 'http';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

export const getAllCars = async (
  requestParams: FilterCarParams
): Promise<Car[]> => {
  if (requestParams) {
    const params = new URLSearchParams(
      requestParams as Record<string, string>
    ).toString();
    const res = await fetch(`/api/cars?${params}`);
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`/api/cars`, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  }
};

export default function Home() {
  const [cars, setCars] = useState<Car[] | null>(null);
  const [requestParams] = useAtom(requestParamsAtom);

  useEffect(() => {
    getAllCars(requestParams).then((cars) => setCars(cars));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestParams]);

  return (
    <main className='m-auto max-w-[1200px]'>
      <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
        <h1 className='text-4xl font-semibold mb-4'>
          Recherchez votre véhicule d&apos;occasion
        </h1>
        <SearchGroup />
      </section>

      <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-4 py-12 px-4'>
        {cars && cars.map((car: Car) => <CarCard key={car.id} car={car} />)}
      </section>
    </main>
  );
}
