'use client';

import { CarCard, Carousel } from '@/components';
import { FilterCarParams } from '@/utils/interface';
import { Car } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const getCardById = async (id: string): Promise<Car | null> => {
  const res = await fetch(`/api/cars/${id}`);
  if (res.status === 200) {
    const data = await res.json();
    console.log(data);
    return data;
  } else {
    return null;
  }
};

const getNumberFromPath = (path: string) => {
  const parts = path.split('/');
  const number = parts[parts.length - 1];
  return number;
};

export const getSimilarCar = async (
  requestParams: FilterCarParams
): Promise<Car[]> => {
  if (requestParams) {
    const params = new URLSearchParams(
      requestParams as Record<string, string>
    ).toString();
    const res = await fetch(`/api/cars/similar?${params}`);
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

const Page = () => {
  const pathname = usePathname();
  const [car, setCar] = useState<Car | null>(null);
  useEffect(() => {
    getCardById(getNumberFromPath(pathname)).then((car) => setCar(car));
  }, [pathname]);

  const [cars, setCars] = useState<Car[] | null>(null);
  useEffect(() => {
    if (car) {
      const requestParams: FilterCarParams = {
        price: String(car.price),
        energy: car.energy,
        km: String(car.kilometers),
        gearbox: car.gearbox,
      };
      if (car.category) requestParams.category = car.category;
      getSimilarCar(requestParams).then((cars) => setCars(cars));
    }
  }, [car]);

  return (
    <div>
      <div className='px-2 mt-2'>
        {car && car.imgUrls && (
          <>
            <Carousel length={car.imgUrls.length} autoSlide>
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
            <div className='grid grid-cols-5'></div>
          </>
        )}
      </div>
      <div className='mt-8 px-2'>
        <div className='flex justify-between text-2xl font-bold'>
          <h2>
            {car?.brand} {car?.model}
          </h2>
          <span className='text-blue-800'>{car?.price}€</span>
        </div>

        <div className='relative overflow-x-auto mt-8 rounded-lg'>
          <table className='w-full text-left text-gray-500 dark:text-gray-400 text-lg'>
            <tbody>
              <Row
                title1='Modele'
                value1={car?.model ? car?.model : 'N/A'}
                title2='Motorisation'
                value2={car?.motorisation ? car?.motorisation : 'N/A'}
                color='bg-slate-200'
              />
              <Row
                title1='énergie'
                value1={car?.energy}
                title2='Année'
                value2={String(car?.year)}
                color='bg-slate-100'
              />
              <Row
                title1='Kilométrage'
                value1={
                  String(car?.kilometers) ? String(car?.kilometers) : 'N/A'
                }
                title2='Garantie'
                value2={car?.warranty ? car?.warranty : 'N/A'}
                color='bg-slate-200'
              />
              <Row
                title1='Catégorie'
                value1={car?.category ? car?.category : 'N/A'}
                title2='Mise en circulation'
                value2={car?.circulationDate ? car?.circulationDate : 'N/A'}
                color='bg-slate-100'
              />
              <Row
                title1='Puissance fiscale'
                value1={
                  String(car?.horsePower) ? String(car?.horsePower) : 'N/A'
                }
                title2='Chevaux'
                value2={
                  String(car?.horsePower) ? String(car?.horsePower) : 'N/A'
                }
                color='bg-slate-200'
              />
              <Row
                title1='Boîte de vitesse'
                value1={String(car?.gearbox) ? String(car?.gearbox) : 'N/A'}
                title2='Provenance'
                value2={
                  String(car?.provenance) ? String(car?.provenance) : 'N/A'
                }
                color='bg-slate-100'
              />
            </tbody>
          </table>
        </div>

        <div className='mt-8'>
          <h2 className='text-2xl font-bold'>Annonces similaires</h2>
          <section className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full gap-4 md:gap-8 mt-8'>
            {cars && cars.map((car: Car) => <CarCard key={car.id} car={car} />)}
          </section>
        </div>
      </div>
    </div>
  );
};

interface RowProps {
  title1: string;
  value1?: string;
  title2: string;
  value2?: string;
  color: string;
}

const Row = ({ title1, value1, title2, value2, color }: RowProps) => {
  return (
    <tr
      className={`border-b border-t dark:bg-gray-800 dark:border-gray-700 ${color}`}
    >
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:capitalize'
      >
        {title1}
      </th>
      <td className='px-4'>{value1}</td>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:capitalize'
      >
        {title2}
      </th>
      <td className='px-4'>{value2}</td>
    </tr>
  );
};

export default Page;
