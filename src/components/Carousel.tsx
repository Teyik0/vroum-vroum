'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { currentCarAtom, currentSlideAtom } from '@/utils/context';
import { AiFillMinusCircle } from 'react-icons/ai';
import { deleteImgFromUT, updateCar } from '@/utils/cars.actions';
import toast from 'react-hot-toast';

const buttonStyle = `rounded-full bg-white/60 shadow-l hover:bg-white transition duration-300`;

interface CarouselProps {
  children: React.ReactNode;
  length: number;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  isAdmin?: boolean;
}

const Carousel = ({
  children: slides,
  length,
  autoSlide = false,
  autoSlideInterval = 6000,
  isAdmin,
}: CarouselProps) => {
  const [current, setCurrent] = useAtom(currentSlideAtom);
  const [car, setCar] = useAtom(currentCarAtom);

  const handleNext = () => {
    setCurrent((prev) => (current === length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (current === 0 ? length - 1 : prev - 1));
  };

  useEffect(() => {
    console.log('current', current);

    if (!autoSlide) return;
    const slideInterval = setInterval(handleNext, autoSlideInterval);
    return () => clearInterval(slideInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handleDeleteImg = () => {
    if (!car) return;
    if (car.imgUrls.length === 1) {
      toast.error('Vous devez au moins avoir une image');
      return;
    }
    const notif = toast.loading('Deleting image...');

    deleteImgFromUT(car.imgUrls[current]);
    let newArray: string[] = [];
    car.imgUrls.forEach((img, index) => {
      if (index !== current) newArray = [...newArray, img];
    });
    console.log('newArr', newArray);
    updateCar(car?.id, { ...car, imgUrls: newArray })
      .then((res) => {
        if (!res) return;
        setCar(res);
        toast.success('Image deleted', { id: notif });
      })
      .catch((err) => {
        toast.error(err.message, { id: notif });
      });
  };

  return (
    <div className='overflow-hidden relative w-full'>
      {isAdmin && car && car?.imgUrls?.length > 0 && (
        <AiFillMinusCircle
          className='absolute top-4 right-4 w-8 h-8 z-50 cursor-pointer text-red-600 hover:text-red-900 duration-300 ease-in-out'
          onClick={() => handleDeleteImg()}
        />
      )}
      <div
        className='flex transition-transform ease-out duration-500'
        style={{ transform: `translateX(-${current * 100}%` }}
      >
        {slides}
      </div>
      <div className='absolute inset-0 flex items-center justify-between px-2'>
        <button onClick={() => handlePrev()} className={buttonStyle}>
          <FiChevronLeft size={40} />
        </button>
        <button onClick={() => handleNext()} className={buttonStyle}>
          <FiChevronRight size={40} />
        </button>
      </div>
      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-4'>
          {Array.from({ length: length }).map((_, index) => (
            <div
              className={`transition-all rounded-full h-4 w-4 bg-slate-200 ${
                current === index ? 'p-2' : 'bg-opacity-50'
              } cursor-pointer hover:bg-opacity-100`}
              key={index}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
