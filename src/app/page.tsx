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
        <h1 className='text-4xl font-semibold mb-4'>
          Recherchez votre véhicule d&apos;occasion
        </h1>
        <SearchGroup />
      </section>

      <section className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full gap-4 y-12 px-4'>
        {cars && cars.map((car: Car) => <CarCard key={car.id} car={car} />)}
      </section>
    </main>
  );
}
