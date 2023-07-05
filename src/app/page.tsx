'use client';

import { SearchGroup, CarCard } from '@/components';
import { Car } from '@/utils/interface';
import { useEffect, useState } from 'react';

const getAllCars = async (): Promise<Car[]> => {
  const res = await fetch(`/api/cars`, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data;
};

export default function Home() {
  const [cars, setCars] = useState<Car[] | null>(null);
  useEffect(() => {
    getAllCars().then((cars) => setCars(cars));
  }, []);
  return (
    <main>
      <section className='px-2 sm:px-12 md:px-24 py-12'>
        <h1 className='text-3xl font-semibold mb-4'>
          Recherchez votre véhicule d&apos;occasion
        </h1>
        <SearchGroup />
      </section>

      <section className='grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 sm:px-16 px-6 py-12'>
        {cars && cars.map((car: Car) => <CarCard key={car.id} car={car} />)}
      </section>
    </main>
  );
}
