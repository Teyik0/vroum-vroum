'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { carsAtom, getAllCars, isModalClickedAtom } from '@/utils/context';
import { useAtom } from 'jotai';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Category, Energy, Gearbox } from '@prisma/client';
import toast from 'react-hot-toast';
import { useState } from 'react';
import Link from 'next/link';

const Modal = () => {
  const [modal, setModal] = useAtom(isModalClickedAtom);
  const [cars, setCars] = useAtom(carsAtom);
  const [loading, setLoading] = useState(false);
  if (modal.isClicked) document.body.style.overflow = 'hidden';

  const handleChange = (
    value: Energy | Category | Gearbox,
    name: 'energy' | 'category' | 'gearbox'
  ) => {
    setModal({
      ...modal,
      car:
        modal.car !== null
          ? {
              ...modal.car,
              [name]: value,
            }
          : modal.car,
    });
  };

  const handleDelete = () => {};
  const handleUpdate = () => {};

  /* const handleDelete = () => {
    setLoading(true);
    if (modal.car !== null) {
      fetch(`/api/cars/${modal.car.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          toast.success('Véhicule supprimé avec succès !');
          setLoading(false);
          setModal({
            isClicked: false,
            car: null,
          });
          document.body.style.overflow = 'unset';
          getAllCars({}).then((cars) => setCars(cars));
        })
        .catch((error) => {
          toast.error('Une erreur est survenue !');
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };

  const handleUpdate = () => {
    setLoading(true);
    if (modal.car !== null) {
      fetch(`/api/cars/${modal.car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modal.car),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          toast.success('Véhicule mis à jour avec succès !');
          setLoading(false);
          setModal({
            isClicked: false,
            car: null,
          });
          document.body.style.overflow = 'unset';
          getAllCars({}).then((cars) => setCars(cars));
        })
        .catch((error) => {
          toast.error('Une erreur est survenue !');
          setLoading(false);
          console.error('Error:', error);
        });
    }
  }; */

  return (
    <div className='fixed flex justify-center items-center z-50 left-0 right-0 top-0 bottom-0 bg-[#5d5d5d1d]'>
      <Card className='sm:w-3/4 lg:w-[1000px]'>
        <CardHeader>
          <div className='flex justify-between'>
            <div>
              <CardTitle>
                {modal.car?.brand} {modal.car?.model}
              </CardTitle>
              <CardDescription>
                {modal.car?.year} - {modal.car?.finition}
              </CardDescription>
            </div>
            <AiFillCloseCircle
              className='text-3xl cursor-pointer text-red-600 hover:text-red-900 duration-300 ease-in-out'
              onClick={() => {
                setModal({
                  isClicked: false,
                  car: null,
                });
                document.body.style.overflow = 'unset';
              }}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className='grid grid-cols-12 gap-4'>
            <Select
              onValueChange={(value: Gearbox) => handleChange(value, 'gearbox')}
              defaultValue={modal.car?.gearbox}
            >
              <SelectTrigger className='col-span-12 sm:col-span-6 md:col-span-4'>
                <SelectValue placeholder='Boîte de vitesse' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='manual'>Manuelle</SelectItem>
                <SelectItem value='automatic'>Automatique</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value: Energy) => handleChange(value, 'energy')}
              defaultValue={modal.car?.energy}
            >
              <SelectTrigger className='col-span-12 sm:col-span-6 md:col-span-4'>
                <SelectValue placeholder='Carburant' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='essence'>Essence</SelectItem>
                <SelectItem value='diesel'>Diesel</SelectItem>
                <SelectItem value='electrique' className='capitalize'>
                  électrique
                </SelectItem>
                <SelectItem value='hybride'>Hybride</SelectItem>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value: Category) =>
                handleChange(value, 'category')
              }
              defaultValue={modal.car?.category}
            >
              <SelectTrigger className='col-span-12 sm:col-span-6 md:col-span-4'>
                <SelectValue placeholder='Catégorie' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='citadine'>Citadine</SelectItem>
                <SelectItem value='eco' className='capitalize'>
                  éco
                </SelectItem>
                <SelectItem value='compacte'>Compacte</SelectItem>
                <SelectItem value='suv'>SUV / Crossover</SelectItem>
                <SelectItem value='berline'>Berline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex gap-4 mt-8'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='brand name'>Nom de la marque</Label>
              <Input
                type='text'
                placeholder='Audi'
                value={modal.car?.brand}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: { ...modal.car, brand: event.target.value },
                  })
                }
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='model name'>Modèle du véhicule</Label>
              <Input
                type='text'
                placeholder='RS3'
                value={modal.car?.model}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: { ...modal.car, model: event.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className='flex gap-4 mt-8'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='vehicule year'>Année du véhicule</Label>
              <Input
                type='number'
                placeholder='2012'
                value={modal.car?.year}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: { ...modal.car, year: Number(event.target.value) },
                  })
                }
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='vehicule finition'>Finition du véhicule</Label>
              <Input
                type='text'
                placeholder='S-Line'
                value={modal.car?.finition}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: { ...modal.car, finition: event.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className='flex gap-4 mt-8'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='vehicule horsePower'>Nombre de chevaux</Label>
              <Input
                type='number'
                placeholder='190'
                value={modal.car?.horsePower}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: {
                      ...modal.car,
                      horsePower: Number(event.target.value),
                    },
                  })
                }
              />
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='vehicule kilometer'>Nombre de kilomètres</Label>
              <Input
                type='number'
                placeholder='120000'
                value={modal.car?.kilometers}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: {
                      ...modal.car,
                      kilometers: Number(event.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
          <div className='flex gap-4 mt-8'>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
              <Label htmlFor='vehicule price'>Prix du véhicule</Label>
              <Input
                type='text'
                placeholder='22000'
                value={modal.car?.price}
                onChange={(event) =>
                  modal.car &&
                  setModal({
                    ...modal,
                    car: { ...modal.car, price: Number(event.target.value) },
                  })
                }
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className='flex flex-wrap justify-end gap-4'>
          {!loading ? (
            <>
              <Link
                className='px-4 py-2 bg-green-600 text-white text-xl rounded-lg 
                flex justify-center items-center hover:bg-green-900 ease-in-out duration-300'
                onClick={() => (document.body.style.overflow = 'unset')}
                href={`/admin/voiture/${modal.car?.id}`}
              >
                Modification avancée
              </Link>
              <button
                className='px-4 py-2 bg-blue-600 text-white text-xl rounded-lg 
                flex justify-center items-center hover:bg-blue-900 ease-in-out duration-300'
                onClick={handleUpdate}
              >
                Mettre à jour
              </button>
              <button
                className='px-4 py-2 bg-red-600 text-white text-xl rounded-lg 
                flex justify-center items-center hover:bg-red-900 ease-in-out duration-300'
                onClick={handleDelete}
              >
                Supprimer
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

export default Modal;
