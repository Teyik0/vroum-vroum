import { Car } from '@/utils/interface';
import Image from 'next/image';
import Link from 'next/link';

export interface CarProps {
  car: Car;
}

const CarCard = ({ car }: CarProps) => {
  const itemStyle = `flex gap-2 border px-4 py-1 rounded-full`;
  return (
    <div className='cursor-pointer'>
      <Link href={`/voiture/${car.id}`}>
        <div className='relative h-[200px] rounded-lg overflow-hidden'>
          <Image fill alt='car' src='/audi.jpeg' priority />
        </div>
        <div className='mt-2 flex flex-col font-bold'>
          <h2 className='text-2xl'>
            {car.brand} {car.model}
          </h2>
          <span className='text-blue-800 text-xl'>{car.price}€</span>
        </div>

        <div className='flex flex-wrap gap-2 mt-4'>
          <div className={itemStyle}>
            <Image
              src='/steering-wheel.svg'
              width={20}
              height={20}
              alt='steering wheel'
            />
            <p className='text-gray-400'>{car.gearbox}</p>
          </div>
          <div className={itemStyle}>
            <Image src='/gas.svg' width={20} height={20} alt='seat' />
            <p className='text-gray-400'>{car.fuel}</p>
          </div>
          <div className={itemStyle}>
            <Image src='/tire.svg' width={20} height={20} alt='seat' />
            <p className='text-gray-400'>{car.horsePower} Chevaux</p>
          </div>
          <div className={itemStyle}>
            <Image src='/kmh.png' width={20} height={20} alt='kilometer' />
            <p className='text-gray-400'>{car.kilometers} Km</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarCard;
