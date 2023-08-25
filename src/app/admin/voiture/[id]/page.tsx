'use client';

import { Carousel, MiniCarousel } from '@/components';
import { currentCarAtom } from '@/utils/context';
import { Category, Energy, Gearbox } from '@prisma/client';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from 'react-hot-toast';
import { deleteCar, fetchCarById, updateCar } from '@/utils/cars.actions';
import { useRouter } from 'next/navigation';

const Page = ({ params }: { params: { id: string } }) => {
  const [car, setCar] = useAtom(currentCarAtom);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCarById(params.id).then((car) => setCar(car));
  }, [setCar, params.id]);

  const handleUpdate = () => {
    setLoading(true);
    if (car !== null) {
      updateCar(Number(params.id), car)
        .then(() => {
          toast.success('Véhicule mis à jour avec succès !');
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Une erreur est survenue !');
          setLoading(false);
        });
    }
  };
  const handleDelete = () => {
    setLoading(true);
    if (car !== null) {
      deleteCar(car.id)
        .then(() => {
          toast.success('Véhicule supprimé avec succès !');
          setLoading(false);
          router.push('/admin');
        })
        .catch(() => {
          toast.error('Une erreur est survenue !');
          setLoading(false);
        });
    }
  };

  return (
    <div className='m-auto max-w-[1200px]'>
      <h1 className='text-4xl font-semibold mt-4 px-2 flex items-center'>
        <FiEdit className={`mr-4 inline-block text-slate-400`} />
        {car?.brand} {car?.model}
      </h1>
      <div className='px-2 mt-4'>
        {car && car.imgUrls && (
          <>
            <Carousel length={car.imgUrls.length} autoSlide isAdmin>
              {car.imgUrls.length > 0 &&
                car.imgUrls.map((url, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={index + car.model}
                    src={url || '/audi.jpeg'}
                    alt={car.model}
                    className='rounded-lg object-cover w-full'
                  />
                ))}
            </Carousel>
            <MiniCarousel car={car} isAdmin={true} />
          </>
        )}
      </div>

      <div className='mt-8 px-2'>
        <div className='flex justify-between text-2xl font-bold'>
          <div className='flex items-end gap-2'>
            <h2>
              {car?.brand} {car?.model}
            </h2>
            <h2 className='text-xl font-semibold italic text-slate-400'>
              - {car?.finition}
            </h2>
          </div>
          <span className='text-blue-800 flex items-center w-[150px]'>
            <Input
              type='number'
              placeholder='22000'
              value={car ? car?.price : 0}
              onChange={(e) =>
                car && setCar({ ...car, price: Number(e.target.value) })
              }
            />
            €
          </span>
        </div>

        <div className='relative overflow-x-auto mt-8 rounded-lg mb-4'>
          <table className='w-full text-left text-gray-500 dark:text-gray-400 text-lg'>
            <tbody>
              <Row title1='Modèle' title2='Motorisation' color='bg-slate-200' />
              <Row title1='énergie' title2='Année' color='bg-slate-100' />
              <Row
                title1='Kilométrage'
                title2='Garantie'
                color='bg-slate-200'
              />
              <Row
                title1='Catégorie'
                title2='Mise en circulation'
                color='bg-slate-100'
              />
              <Row title1='Finition' title2='Chevaux' color='bg-slate-200' />
              <Row
                title1='Boîte de vitesse'
                title2='Provenance'
                color='bg-slate-100'
              />
            </tbody>
          </table>
        </div>
        <div className='flex flex-wrap justify-end gap-4 mb-8'>
          {!loading ? (
            <>
              <button
                className='px-4 py-2 bg-green-600 text-white text-xl rounded-lg 
                flex justify-center items-center hover:bg-green-900 ease-in-out duration-300'
                onClick={handleUpdate}
              >
                Mettre à jour
              </button>
              <button
                className='px-4 py-2 bg-blue-600 text-white text-xl rounded-lg 
                flex justify-center items-center hover:bg-blue-900 ease-in-out duration-300'
                onClick={() => {
                  setLoading(true);
                  fetchCarById(params.id)
                    .then((car) => {
                      setCar(car);
                      setLoading(false);
                      toast.success('Changement en cours annulé !');
                    })
                    .catch(() => {
                      setLoading(false);
                      toast.error('Une erreur est survenue !');
                    });
                }}
              >
                Annuler
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
        </div>
      </div>
    </div>
  );
};

interface RowProps {
  title1: string;
  title2: string;
  color: string;
}

const Row = ({ title1, title2, color }: RowProps) => {
  return (
    <tr
      className={`border-b border-t dark:bg-gray-800 dark:border-gray-700 ${color}`}
    >
      <th
        scope='row'
        className='px-6 capitalize py-4 font-medium text-gray-900 
        whitespace-nowrap dark:text-white first-letter:capitalize items-center flex'
      >
        {title1}
      </th>
      <td className='px-4 first-letter:capitalize'>
        <ModifyRow title={title1} />
      </td>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:capitalize items-center flex'
      >
        {title2}
      </th>
      <td className='px-4 first-letter:capitalize'>
        <ModifyRow title={title2} />
      </td>
    </tr>
  );
};

const ModifyRow = ({ title }: { title: string }) => {
  const [car, setCar] = useAtom(currentCarAtom);

  const handleChange = (
    value: Energy | Category | Gearbox,
    name: 'energy' | 'category' | 'gearbox'
  ) => {
    if (car !== null) setCar({ ...car, [name]: value });
  };

  if (title === 'Catégorie')
    return (
      <div>
        <Select
          onValueChange={(value: Category) => handleChange(value, 'category')}
          value={car?.category}
        >
          <SelectTrigger className='col-span-12 sm:col-span-6 md:col-span-4 bg-white'>
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
    );
  else if (title === 'énergie')
    return (
      <div>
        <Select
          onValueChange={(value: Energy) => handleChange(value, 'energy')}
          value={car?.energy}
        >
          <SelectTrigger className='col-span-12 sm:col-span-6 md:col-span-4 bg-white'>
            <SelectValue placeholder='énergie' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='essence'>Essence</SelectItem>
            <SelectItem value='diesel'>Diesel</SelectItem>
            <SelectItem value='hybride'>Hybride</SelectItem>
            <SelectItem value='electrique'>Electrique</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  else if (title === 'Boîte de vitesse')
    return (
      <div>
        <Select
          onValueChange={(value: Gearbox) => handleChange(value, 'gearbox')}
          value={car?.gearbox}
        >
          <SelectTrigger className='col-span-12 sm:col-span-6 md:col-span-4 bg-white'>
            <SelectValue placeholder='Boîte de vitesse' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='manual'>Manuelle</SelectItem>
            <SelectItem value='automatic'>Automatique</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  else if (title === 'Modèle')
    return (
      <Input
        type='text'
        placeholder='RS3'
        value={car ? car?.model : 'N/A'}
        onChange={(e) => car && setCar({ ...car, model: e.target.value })}
      />
    );
  else if (title === 'Motorisation')
    return (
      <Input
        type='text'
        placeholder='22000'
        value={car ? car?.motorisation : 'N/A'}
        onChange={(e) =>
          car && setCar({ ...car, motorisation: e.target.value })
        }
      />
    );
  else if (title === 'Garantie')
    return (
      <Input
        type='text'
        placeholder='22000'
        value={car ? car?.warranty : 'N/A'}
        onChange={(e) => car && setCar({ ...car, warranty: e.target.value })}
      />
    );
  else if (title === 'Provenance')
    return (
      <Input
        type='text'
        placeholder='22000'
        value={car ? car?.provenance : 'N/A'}
        onChange={(e) => car && setCar({ ...car, provenance: e.target.value })}
      />
    );
  else if (title === 'Mise en circulation')
    return (
      <Input
        type='text'
        placeholder='22000'
        value={car ? car?.circulationDate : 'N/A'}
        onChange={(e) =>
          car && setCar({ ...car, circulationDate: e.target.value })
        }
      />
    );
  else if (title === 'Chevaux')
    return (
      <div className='min-w-[150px]'>
        <Input
          type='number'
          placeholder='22000'
          value={car ? car?.horsePower : 0}
          onChange={(e) =>
            car && setCar({ ...car, horsePower: Number(e.target.value) })
          }
        />
      </div>
    );
  else if (title === 'Finition')
    return (
      <div className='min-w-[150px]'>
        <Input
          type='text'
          placeholder='22000'
          value={car ? car?.finition : 'N/A'}
          onChange={(e) => car && setCar({ ...car, finition: e.target.value })}
        />
      </div>
    );
  else if (title === 'Kilométrage')
    return (
      <Input
        type='number'
        placeholder='22000'
        value={car ? car?.kilometers : 0}
        onChange={(e) =>
          car && setCar({ ...car, kilometers: Number(e.target.value) })
        }
      />
    );
  else if (title === 'Année')
    return (
      <div className='min-w-[150px]'>
        <Input
          type='number'
          placeholder='22000'
          value={car ? car?.year : 0}
          onChange={(e) =>
            car && setCar({ ...car, year: Number(e.target.value) })
          }
        />
      </div>
    );
};

export default Page;
