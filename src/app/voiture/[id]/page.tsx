import { CarCard, Carousel, MiniCarousel } from '@/components';
import { fetchCarById, fetchSimilarCar } from '@/utils/fetch';
import { Car } from '@prisma/client';
import { headers } from 'next/headers';

const Page = async () => {
  const headersList = headers();
  const activePath = headersList.get('x-invoke-path');

  const car = await fetchCarById(activePath?.split('/').pop() as string);
  const similarCars = await fetchSimilarCar({});

  return (
    <main className='m-auto max-w-[1200px]'>
      <h1 className='text-4xl font-semibold mt-4 px-2'>
        {car?.brand} {car?.model}
      </h1>
      <div className='px-2 mt-4'>
        {car && car.imgUrls && (
          <>
            <Carousel length={car.imgUrls.length} autoSlide>
              {car?.imgUrls.map((url: string, index: number) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index + car.model}
                  src={url || '/audi.jpeg'}
                  alt={car.model}
                  className='rounded-lg object-cover w-full'
                />
              ))}
            </Carousel>
            <MiniCarousel car={car} />
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
          <span className='text-blue-800'>{car?.price}€</span>
        </div>

        <div className='relative overflow-x-auto mt-8 rounded-lg'>
          <table className='w-full text-left text-gray-500 dark:text-gray-400 text-lg'>
            <tbody>
              <Row
                title1='Modele'
                value1={car?.model ? car?.model : 'N/A'}
                title2='Motorisation'
                value2={car?.motorisation ? car?.motorisation : 'N/A'}
                color='bg-slate-200'
              />
              <Row
                title1='énergie'
                value1={car?.energy}
                title2='Année'
                value2={String(car?.year)}
                color='bg-slate-100'
              />
              <Row
                title1='Kilométrage'
                value1={
                  String(car?.kilometers) ? String(car?.kilometers) : 'N/A'
                }
                title2='Garantie'
                value2={car?.warranty ? car?.warranty : 'N/A'}
                color='bg-slate-200'
              />
              <Row
                title1='Catégorie'
                value1={car?.category ? car?.category : 'N/A'}
                title2='Mise en circulation'
                value2={car?.circulationDate ? car?.circulationDate : 'N/A'}
                color='bg-slate-100'
              />
              <Row
                title1='Puissance fiscale'
                value1={
                  String(car?.horsePower) ? String(car?.horsePower) : 'N/A'
                }
                title2='Chevaux'
                value2={
                  String(car?.horsePower) ? String(car?.horsePower) : 'N/A'
                }
                color='bg-slate-200'
              />
              <Row
                title1='Boîte de vitesse'
                value1={String(car?.gearbox) ? String(car?.gearbox) : 'N/A'}
                title2='Provenance'
                value2={
                  String(car?.provenance) ? String(car?.provenance) : 'N/A'
                }
                color='bg-slate-100'
              />
            </tbody>
          </table>
        </div>

        <div className='my-8'>
          <h2 className='text-2xl font-bold'>Annonces similaires</h2>
          <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full gap-4 mt-8'>
            {similarCars &&
              similarCars.map((car: Car) => <CarCard key={car.id} car={car} />)}
          </section>
        </div>
      </div>
    </main>
  );
};

interface RowProps {
  title1: string;
  value1?: string;
  title2: string;
  value2?: string;
  color: string;
}

const Row = ({ title1, value1, title2, value2, color }: RowProps) => {
  return (
    <tr
      className={`border-b border-t dark:bg-gray-800 dark:border-gray-700 ${color}`}
    >
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:capitalize'
      >
        {title1}
      </th>
      <td className='px-4 first-letter:capitalize'>{value1}</td>
      <th
        scope='row'
        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:capitalize'
      >
        {title2}
      </th>
      <td className='px-4 first-letter:capitalize'>{value2}</td>
    </tr>
  );
};

export default Page;
