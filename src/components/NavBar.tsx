import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <header className='bg-blue-900 p-2'>
      <nav className='flex items-center gap-4'>
        <Image width={150} height={150} alt='logo' src='/volvo-logo.png' />
        <div className='text-white text-xl font-normal'>
          <Link href='/'>Toutes nos occasions</Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
