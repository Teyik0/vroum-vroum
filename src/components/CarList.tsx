'use client';

import { carsAtom, loadingAtom, requestParamsAtom } from '@/utils/context';
import { useAtom } from 'jotai';
import CarCard from './CarCard';
import { useEffect } from 'react';
import { fetchCars } from '@/utils/cars.actions';
import { TbCrosshair } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { Skeleton } from './ui/skeleton';

interface CarListProps {
  isAdmin: boolean;
}

const CarList = ({ isAdmin }: CarListProps) => {
  const [cars, setCars] = useAtom(carsAtom);
  const [requestParams, setRequestParams] = useAtom(requestParamsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    setRequestParams({});
    fetchCars({})
      .then((cars) => setCars(cars))
      .finally(() => setLoading(false));
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
          onClick={() => {
            console.log('redirect');
            router.push('/admin/ajouter');
          }}
        >
          <TbCrosshair className='text-7xl text-slate-300' />
          <h4 className='absolute top-4 left-4 text-xl font-bold'>
            Ajouter une nouvelle voiture
          </h4>
        </div>
      )}
      {!loading ? (
        <>
          {cars?.map((car) => (
            <CarCard key={car.id} car={car} isAdmin={isAdmin} />
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 12 }, (_, index) => (
            <SkeletonCarCard key={index} />
          ))}
        </>
      )}
    </section>
  );
};

const SkeletonCarCard = () => (
  <div>
    <Skeleton className='h-[280px] sm:h-[250px] md:h-[220px] lg:h-[200px] rounded-lg' />
    <div className='grid grid-cols-2 gap-2 mt-4 text-sm'>
      <Skeleton className='col-span-1 h-8' />
      <Skeleton className='col-span-1 h-8' />
      <Skeleton className='col-span-1 h-8' />
      <Skeleton className='col-span-1 h-8' />
    </div>
  </div>
);

export default CarList;
