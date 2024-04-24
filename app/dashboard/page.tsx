import Form from '@/app/ui/create-form';
import { Button } from '@/app/ui/button';
import { PlusIcon, XMarkIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { fetchBooks } from '@/app/lib/data';

declare module 'react' {
  interface HTMLAttributes<T> {
    popover?: string;
  }
}

declare module 'react' {
  interface ButtonHTMLAttributes<T> {
    popovertarget?: string;
    popovertargetaction?: string;
  }
}

export const metadata: Metadata = {
  title: 'Dashboard page to store your books',
};

export default async function Page() {
  const books = await fetchBooks();

  return (
    <main className='flex w-full p-6'>
      {books ? (
        <div className='w-full'>
          <Button
            popovertarget='create-book-popover'
            className='ml-auto text-lg font-semibold'
          >
            Add a book
          </Button>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            second element
          </div>
        </div>
      ) : (
        <div className='flex w-full flex-col items-center justify-center gap-6 text-white'>
          <BookOpenIcon className='h-12 w-12' />
          <p className='text-xl'>You have no books saved</p>
          <Button
            popovertarget='create-book-popover'
            className='text-lg font-semibold'
          >
            Add a book
          </Button>
        </div>
      )}
      <div
        id='create-book-popover'
        popover='manual'
        className='create-book-popover w-11/12 rounded-lg bg-gray-100 p-2 text-[#091231FF] md:w-4/12'
      >
        <button
          popovertarget='create-book-popover'
          popovertargetaction='hide'
          className='ml-auto block rounded-lg p-2 hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-gray-400'
        >
          <XMarkIcon className='h-8 w-8 text-[#091231FF]' />
        </button>
        <Form />
      </div>
    </main>
  );
}
