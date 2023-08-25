'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { carsAtom, loadingAtom, requestParamsAtom } from '@/utils/context';
import { fetchCars } from '@/utils/cars.actions';
import { useAtom } from 'jotai';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const SearchGroup = () => {
  const [requestParams, setRequestParams] = useAtom(requestParamsAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [, setCars] = useAtom(carsAtom);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: string, name: string) => {
    if (value === 'tous-prix') {
      const { price, ...updatedParams } = requestParams;
      setRequestParams(updatedParams);
    } else if (value === 'tous-kilometre') {
      const { km, ...updatedParams } = requestParams;
      setRequestParams(updatedParams);
    } else if (value === 'tous-carburant') {
      const { energy, ...updatedParams } = requestParams;
      setRequestParams(updatedParams);
    } else if (value === 'toutes-categorie') {
      const { category, ...updatedParams } = requestParams;
      setRequestParams(updatedParams);
    } else if (value === 'toutes-boites') {
      const { gearbox, ...updatedParams } = requestParams;
      setRequestParams(updatedParams);
    } else {
      setRequestParams({ ...requestParams, [name]: value });
    }
  };

  const handleClick = () => {
    if (loading) return;
    if (Object.keys(requestParams).length === 0) {
      toast.error('Veuillez sélectionner au moins un paramètre de recherche !');
      return;
    }
    setLoading(true);
    fetchCars(requestParams).then((cars) => {
      setCars(cars);
      toast.success('Recherche effectué !');
      setLoading(false);
    });
  };

  return (
    <div className='grid grid-cols-12 gap-4 z-50'>
      <Select
        onValueChange={(value: string) => handleChange(value, 'price')}
        defaultValue='tous-prix'
        value={requestParams.price || 'tous-prix'}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger className='col-span-6 md:col-span-4'>
          <SelectValue placeholder='Prix véhicule' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='tous-prix'>Tous les prix</SelectItem>
          <SelectItem value='10000'>10 000 €</SelectItem>
          <SelectItem value='12500'>12 500 €</SelectItem>
          <SelectItem value='15000'>15 000 €</SelectItem>
          <SelectItem value='17500'>17 500 €</SelectItem>
          <SelectItem value='20000'>20 000 €</SelectItem>
          <SelectItem value='22500'>22 500 €</SelectItem>
          <SelectItem value='25000'>25 000 €</SelectItem>
          <SelectItem value='27500'>27 500 €</SelectItem>
          <SelectItem value='30000'>30 000 €</SelectItem>
          <SelectItem value='40000'>40 000 €</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => handleChange(value, 'km')}
        defaultValue='tous-kilometre'
        value={requestParams.km || 'tous-kilometre'}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger className='col-span-6 md:col-span-4'>
          <SelectValue placeholder='Kilométrage' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='tous-kilometre'>Tous kilométrages</SelectItem>
          <SelectItem value='5000'>5 000 Km</SelectItem>
          <SelectItem value='10000'>10 000 Km</SelectItem>
          <SelectItem value='20000'>20 000 Km</SelectItem>
          <SelectItem value='30000'>30 000 Km</SelectItem>
          <SelectItem value='40000'>40 000 Km</SelectItem>
          <SelectItem value='50000'>50 000 Km</SelectItem>
          <SelectItem value='75000'>75 000 Km</SelectItem>
          <SelectItem value='100000'>100 000 Km</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => handleChange(value, 'energy')}
        defaultValue='tous-carburant'
        value={requestParams.energy || 'tous-carburant'}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger className='col-span-6 md:col-span-4'>
          <SelectValue placeholder='Carburant' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='tous-carburant'>Tous les carburants</SelectItem>
          <SelectItem value='essence'>Essence</SelectItem>
          <SelectItem value='diesel'>Diesel</SelectItem>
          <SelectItem value='electrique' className='capitalize'>
            électrique
          </SelectItem>
          <SelectItem value='hybride'>Hybride</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => handleChange(value, 'category')}
        defaultValue='toutes-categorie'
        value={requestParams.category || 'toutes-categorie'}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger className='col-span-6 md:col-span-5 capitalize'>
          <SelectValue placeholder='Catégorie' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='toutes-categorie'>Toutes catégories</SelectItem>
          <SelectItem value='citadine'>Citadine</SelectItem>
          <SelectItem value='eco' className='capitalize'>
            éco
          </SelectItem>
          <SelectItem value='compacte'>Compacte</SelectItem>
          <SelectItem value='suv'>SUV / Crossover</SelectItem>
          <SelectItem value='berline'>Berline</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value: string) => handleChange(value, 'gearbox')}
        defaultValue='toutes-boites'
        value={requestParams.gearbox || 'toutes-boites'}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <SelectTrigger className='col-span-6 md:col-span-5'>
          <SelectValue placeholder='Boîte de vitesse' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='toutes-boites'>Toutes boîtes</SelectItem>
          <SelectItem value='manual'>Manuelle</SelectItem>
          <SelectItem value='automatic'>Automatique</SelectItem>
        </SelectContent>
      </Select>

      <button
        className='h-auto col-span-2 md:col-span-1 md:col-start-12 border rounded-lg flex justify-center items-center
      hover:bg-slate-100'
        disabled={loading}
        onClick={() => {
          if (loading) return;
          setLoading(true);
          setRequestParams({});
          fetchCars({})
            .then((cars) => {
              setCars(cars);
              toast.success('Paramètre de recherche réinitialisé !');
            })
            .finally(() => setLoading(false));
        }}
      >
        <RefreshCcw strokeWidth={2.5} />
      </button>

      <button
        className='h-auto md:h-12 col-span-4 md:col-span-6 md:col-start-7 bg-blue-600 text-white text-xl rounded-lg 
          flex justify-center items-center hover:bg-blue-900 ease-in-out duration-300'
        onClick={handleClick}
        disabled={loading}
      >
        Recherche
      </button>

      {isOpen && (
        <div className='absolute h-[50vh] w-full bg-transparent z-30 translate-y-52'></div>
      )}
    </div>
  );
};

export default SearchGroup;
