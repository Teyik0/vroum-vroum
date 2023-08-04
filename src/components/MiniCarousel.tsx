'use client';

import { currentSlideAtom } from '@/utils/context';
import { Car } from '@prisma/client';
import { useAtom } from 'jotai';
import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const MiniCarousel = ({ car }: { car: Car }) => {
  const [_, setCurrentSlide] = useAtom(currentSlideAtom);

  const scrollLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) slider.scrollLeft += 236;
  };

  const scrollRight = () => {
    const slider = document.getElementById('slider');
    if (slider) slider.scrollLeft -= 236;
  };
  return (
    <div className='flex items-center relative'>
      <div
        className='absolute left-0 z-50 hover:bg-gray-200 cursor-pointer rounded-full p-[2px]
        ease-in-out duration-300'
        onClick={() => scrollRight()}
      >
        <IoIosArrowBack size={25} />
      </div>
      <div
        id='slider'
        className='mx-8 overflow-x-scroll scrollbar-hide scroll-smooth snap-x'
      >
        <div
          className='flex flex-row gap-4 items-center justify-start 
            relative py-4'
        >
          {car.imgUrls.map((url, index) => (
            <div
              key={url}
              className='w-[220px] h-[150px] hover:scale-95 transition duration-300
                rounded-lg cursor-pointer flex-shrink-0'
              onClick={() => setCurrentSlide(index)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={url}
                src={url}
                alt={car.model}
                className='rounded-lg object-cover w-full h-full'
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className='absolute right-0 z-50 hover:bg-gray-200 cursor-pointer rounded-full p-[2px]
        ease-in-out duration-300'
        onClick={() => scrollLeft()}
      >
        <IoIosArrowForward size={25} />
      </div>
    </div>
  );
};

export default MiniCarousel;
