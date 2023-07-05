'use client';

import { Carousel } from '@/components';
import { Car } from '@/utils/interface';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const getCardById = async (id: string) => {
  const res = await fetch(`/api/cars/${id}`);
  const data = await res.json();
  return data;
};

const getNumberFromPath = (path: string) => {
  const parts = path.split('/');
  const number = parts[parts.length - 1];

  return number;
};

const Page = () => {
  const pathname = usePathname();
  const [car, setCar] = useState<Car | null>(null);
  useEffect(() => {
    getCardById(getNumberFromPath(pathname)).then((car) => setCar(car));
  }, [pathname]);

  return (
    <div className='px-2 sm:px-12 md:px-24 py-12'>
      <h1 className='text-3xl font-semibold mb-4'>
        {car && car.brand + ' ' + car.model}
      </h1>
      <h2>{car && car.price}€</h2>
      {car && car.imgUrls && (
        <Carousel length={car.imgUrls.length}>
          {car.imgUrls.map((url, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={index + car.model}
              src={url || '/audi.jpeg'}
              alt={car.model}
              className='rounded-lg'
            />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Page;
