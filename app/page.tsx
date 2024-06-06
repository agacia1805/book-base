import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/app/ui/button';

export default function Page() {
  return (
    <main className='mx-auto my-0 flex p-6'>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-3/5'>
          <p className='text-right text-xl text-gray-300 md:text-3xl md:leading-normal'>
            <strong className='title'>Welcome to BookBase.</strong>
            <span className='block'>Store your favourite books today. </span>
          </p>
          <div className='flex justify-end gap-4'>
            <Button className='bg-gray-100'>
              <Link href='/login'>Log in</Link>
            </Button>
            <Button className='bg-gray-100'>
              <Link href='/signup'>Sign up</Link>
            </Button>
          </div>
        </div>
        <Image
          src='/image.svg'
          width={700}
          height={760}
          className='z-10 hidden md:block'
          alt='Screenshots of the dashboard project showing desktop version'
        />
      </div>
    </main>
  );
}
