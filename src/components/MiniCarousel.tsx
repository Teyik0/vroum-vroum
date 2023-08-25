'use client';

import { currentSlideAtom } from '@/utils/context';
import { Car } from '@prisma/client';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RiImageAddFill } from 'react-icons/ri';
import NewImageModal from './NewImageModal';

const MiniCarousel = ({
  car,
  isAdmin,
}: {
  car: Car | null;
  isAdmin?: boolean;
}) => {
  const [_, setCurrentSlide] = useAtom(currentSlideAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) slider.scrollLeft += 236;
  };

  const scrollRight = () => {
    const slider = document.getElementById('slider');
    if (slider) slider.scrollLeft -= 236;
  };
  return (
    <>
      {modalOpen && (
        <NewImageModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
      )}
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
            {isAdmin && (
              <button
                className='bg-gray-100 w-[220px] h-[150px] hover:scale-95 transition duration-300
                rounded-lg cursor-pointer flex-shrink-0 flex justify-center items-center'
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <RiImageAddFill className='text-gray-400 w-32 h-32 m-auto' />
              </button>
            )}
            {car?.imgUrls.map((url, index) => (
              <div
                key={url + index}
                className='w-[220px] h-[150px] hover:scale-95 transition duration-300
                rounded-lg cursor-pointer flex-shrink-0'
                onClick={() => setCurrentSlide(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
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
    </>
  );
};

export default MiniCarousel;
