'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useState } from 'react';

const NewImageModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: any;
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);
  if (modalOpen) document.body.style.overflow = 'hidden';

  const handleUpdate = () => {};

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

        <CardContent>
          <div className='grid w-full max-w-sm items-center gap-1.5'>
            <Label htmlFor='picture'>Image</Label>
            <Input
              id='picture'
              type='file'
              className='cursor-pointer'
              onChange={(e) => setFile(e.target.files)}
            />
          </div>
        </CardContent>

        <CardFooter className='flex flex-wrap justify-end gap-4'>
          {!loading ? (
            <>
              <button
                className='px-4 py-2 bg-green-600 text-white text-xl rounded-lg 
                flex justify-center items-center hover:bg-green-900 ease-in-out duration-300'
                onClick={handleUpdate}
              >
                Ajouter
              </button>
            </>
          ) : (
            <div className='flex justify-center items-center'>
              <div
                className={`animate-spin rounded-full h-8 w-8 border-b-2 border-red-700`}
              />
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewImageModal;
