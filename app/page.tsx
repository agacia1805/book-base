import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='flex flex-col p-6'>
      <div className='mt-4 flex grow flex-col gap-4 md:flex-row'>
        <div className='flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-3/5'>
          <p className="text-xl text-gray-300 md:text-3xl md:leading-normal">
            <strong>Welcome to BookBase.</strong>
            <span className="block">Store your favourite books
            today. </span>
          </p>
          <div className="flex gap-4">
          <Link
            href='/login'
            className='flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base'
          >
            <span>Log in</span>
          </Link>
            <Link
                      href='/signup'
                      className='flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base'
                    >
                      <span>Sign up</span>
                    </Link>
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
