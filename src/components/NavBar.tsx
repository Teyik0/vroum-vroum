'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  let isAdmin = false;
  if (pathname.includes('admin')) isAdmin = true;
  return (
    <header className='bg-blue-900 p-2'>
      <nav className='flex items-center gap-4'>
        <Image
          width={150}
          height={150}
          alt='logo'
          src='/volvo-logo.png'
          className='hidden sm:flex'
        />
        <Image
          width={100}
          height={100}
          alt='logo'
          src='/volvo-logo.png'
          className='sm:hidden flex'
        />
        <div className='flex justify-between w-full items-center'>
          <div className='flex gap-8'>
            <div className='text-white font-normal'>
              <Link href='/' className='text-sm sm:text-lg md:text-xl'>
                Toutes nos occasions
              </Link>
            </div>
            <div className='text-white font-normal'>
              <Link
                href='https://www.europauto-calais.com/vehicules-neufs/'
                target='_blank'
                className='text-sm sm:text-lg md:text-xl'
              >
                Véhicules neuf
              </Link>
            </div>
          </div>
          {isAdmin && (
            <div className='hidden md:mr-8 sm:flex justify-center items-center border-2 border-red-600 py-2 px-4 rounded-lg'>
              <span className='text-red-600 font-bold text-sm sm:text-lg md:text-xl'>
                ADMIN MODE
              </span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
