'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useEffect } from 'react';
import '@uploadthing/react/styles.css';
import { UploadButton } from '@/utils/uploadthing';
import toast from 'react-hot-toast';
import { updateCar } from '@/utils/cars.actions';
import { useAtom } from 'jotai';
import { currentCarAtom } from '@/utils/context';

const NewImageModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: any;
}) => {
  const [car, setCar] = useAtom(currentCarAtom);
  if (modalOpen) document.body.style.overflow = 'hidden';

  return (
    <div className='fixed flex justify-center items-center z-50 left-0 right-0 top-0 bottom-0 bg-[#5d5d5d1d]'>
      <Card className='sm:w-3/4 lg:w-[1000px]'>
        <CardHeader>
          <div className='flex justify-between'>
            <div>
              <CardTitle>Ajouter une/des image(s)</CardTitle>
            </div>
            <AiFillCloseCircle
              className='text-3xl cursor-pointer text-red-600 hover:text-red-900 duration-300 ease-in-out'
              onClick={() => {
                setModalOpen(false);
                document.body.style.overflow = 'unset';
              }}
            />
          </div>
        </CardHeader>

        <CardContent className='mt-4'>
          <UploadButton
            endpoint='imageUploader'
            onClientUploadComplete={(res) => {
              if (res) {
                if (car === null)
                  return toast.error('Une erreur est survenue !');
                updateCar(car.id, {
                  ...car,
                  imgUrls: [
                    ...car.imgUrls,
                    ...res.map((image) => image.fileUrl),
                  ],
                })
                  .then((res) => {
                    if (res) {
                      setModalOpen(false);
                      document.body.style.overflow = 'unset';
                      setCar(res);
                      toast.success('Image(s) ajoutée(s) avec succès !');
                    }
                  })
                  .catch((err) => {
                    toast.error('Une erreur est survenue !');
                  });
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewImageModal;
