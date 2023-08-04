import { SearchGroup, CarList } from '@/components';
import { Toaster } from 'react-hot-toast';

export default async function Home() {
  return (
    <main className='m-auto max-w-[1200px]'>
      <Toaster />
      <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
        <h1 className='text-4xl font-semibold mb-4'>
          Recherchez votre véhicule d&apos;occasion
        </h1>
        <SearchGroup />
      </section>

      <CarList />
    </main>
  );
}
