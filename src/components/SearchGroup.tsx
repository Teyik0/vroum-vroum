'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RefreshCcw } from 'lucide-react';

const SearchGroup = () => {
  const handleChange = () => {};
  return (
    <div className='grid grid-cols-12 gap-4'>
      <Select onValueChange={handleChange} defaultValue='tous-prix'>
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

      <Select onValueChange={handleChange} defaultValue='tous-kilometre'>
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

      <Select onValueChange={handleChange} defaultValue='tous-carburant'>
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
          <SelectItem value='hybride-rechargeable'>
            Hybride rechargeable
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleChange} defaultValue='toutes-categorie'>
        <SelectTrigger className='col-span-6 md:col-span-5'>
          <SelectValue placeholder='Catégorie' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='toutes-categorie'>Toutes catégories</SelectItem>
          <SelectItem value='citadine'>Citadine</SelectItem>
          <SelectItem value='eco' className='capitalize'>
            éco
          </SelectItem>
          <SelectItem value='compacte'>Compacte</SelectItem>
          <SelectItem value='suv-crossover'>SUV / Crossover</SelectItem>
          <SelectItem value='berline'>Berline</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={handleChange} defaultValue='toutes-boites'>
        <SelectTrigger className='col-span-6 md:col-span-5'>
          <SelectValue placeholder='Boîte de vitesse' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='toutes-boites'>Toutes boîtes</SelectItem>
          <SelectItem value='manuelle'>Manuelle</SelectItem>
          <SelectItem value='automatique'>Automatique</SelectItem>
        </SelectContent>
      </Select>

      <button
        className='h-auto col-span-2 md:col-span-1 md:col-start-12 border rounded-lg flex justify-center items-center
      hover:bg-slate-100'
      >
        <RefreshCcw strokeWidth={2.5} />
      </button>

      <button
        className='h-auto md:h-12 col-span-4 md:col-span-6 md:col-start-7 bg-blue-600 text-white text-xl rounded-lg 
          flex justify-center items-center hover:bg-blue-900 ease-in-out duration-300'
      >
        Recherche
      </button>
    </div>
  );
};

export default SearchGroup;
