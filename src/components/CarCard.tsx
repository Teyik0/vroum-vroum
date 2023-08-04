'use client';

import { isModalClickedAtom } from '@/utils/context';
import { Car } from '@prisma/client';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillSetting } from 'react-icons/ai';
import Modal from './Modal';

export interface CarProps {
  car: Car;
  isAdmin?: boolean;
}

const CarCard = ({ car, isAdmin }: CarProps) => {
  const [modal, setModal] = useAtom(isModalClickedAtom);
  const itemStyle = `col-span-1 flex gap-2 border px-4 py-1 rounded-full items-center`;
  return (
    <>
      <div className='cursor-pointer relative'>
        {isAdmin && (
          <AiFillSetting
            className='absolute top-2 right-2 text-4xl text-orange-600 hover:scale-110 z-20'
            onClick={() =>
              car !== null &&
              setModal({
                isClicked: true,
                car: car,
              })
            }
          />
        )}
        <Link
          href={isAdmin ? `/admin/voiture/${car.id}` : `/voiture/${car.id}`}
        >
          <div className='relative h-[280px] sm:h-[250px] md:h-[220px] lg:h-[200px] rounded-lg overflow-hidden'>
            <Image
              fill
              alt='car'
              src={car.imgUrls[0] || '/audi.jpeg'}
              priority
            />
          </div>
          <div className='mt-2 flex flex-col font-bold'>
            <h2 className='text-2xl'>
              {car.brand} {car.model}
            </h2>
            <div className='flex justify-between'>
              <span className='text-blue-800 text-xl'>{car.price}€</span>
              <span className='italic text-slate-400 font-normal'>
                {car.year} - {car.finition}
              </span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 mt-4 text-sm'>
            <div className={itemStyle}>
              <Image
                src='/steering-wheel.svg'
                width={15}
                height={15}
                alt='steering wheel'
              />
              <p className='text-gray-400'>{car.gearbox}</p>
            </div>
            <div className={itemStyle}>
              <Image src='/gas.svg' width={15} height={15} alt='seat' />
              <p className='text-gray-400'>{car.energy}</p>
            </div>
            <div className={itemStyle}>
              <Image src='/tire.svg' width={15} height={15} alt='seat' />
              <p className='text-gray-400'>{car.horsePower} Ch</p>
            </div>
            <div className={itemStyle}>
              <Image src='/kmh.png' width={15} height={15} alt='kilometer' />
              <p className='text-gray-400'>{car.kilometers} Km</p>
            </div>
          </div>
        </Link>
      </div>

      {modal.isClicked && isAdmin && <Modal />}
    </>
  );
};

export default CarCard;
