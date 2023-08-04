'use client';

import { carsAtom, requestParamsAtom } from '@/utils/context';
import { useAtom } from 'jotai';
import CarCard from './CarCard';
import { useEffect } from 'react';
import { fetchCars } from '@/utils/fetch';
import { TbCrosshair } from 'react-icons/tb';
import toast from 'react-hot-toast';

interface CarListProps {
  isAdmin?: boolean;
}

const CarList = ({ isAdmin }: CarListProps) => {
  const [cars, setCars] = useAtom(carsAtom);
  const [requestParams] = useAtom(requestParamsAtom);

  useEffect(() => {
    fetchCars(requestParams).then((cars) => setCars(cars));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-4 py-12 px-4'>
      {isAdmin && (
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
              toast.success('Nouvelle voiture ajoutée !');
            }}
          >
            Ajouter une nouvelle voiture
          </h4>
        </div>
      )}
      {cars?.map((car) => (
        <CarCard key={car.id} car={car} isAdmin={isAdmin} />
      ))}
    </section>
  );
};

export default CarList;
