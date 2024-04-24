'use client';

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className='flex w-full flex-col items-center justify-center'>
      <ExclamationTriangleIcon className='h-16 w-16 text-white' />
      <h2 className='text-center text-xl text-white'>Something went wrong!</h2>
      <button
        className='mt-4 rounded-md bg-white px-4 py-2 text-sm text-black transition-colors hover:opacity-90'
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
