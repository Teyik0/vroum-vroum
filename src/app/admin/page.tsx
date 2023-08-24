import { SearchGroup, CarList } from '@/components';

export default function Home() {
  return (
    <section className='m-auto max-w-[1200px]'>
      <section className='px-2 sm:px-8 md:px-12 lg:px-24 py-12'>
        <h1 className='text-4xl font-semibold mb-4'>
          Cherchez le véhicule à modifier
        </h1>
        <SearchGroup />
      </section>
      <CarList isAdmin={true} />
    </section>
  );
}
