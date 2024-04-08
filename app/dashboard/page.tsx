import CreateBookForm from '@/app/ui/create-book-form';
import { Button } from '@/app/ui/button';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

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

export default function Page() {
  return (
    <main className='flex w-full p-6'>
      <Button
        popovertarget='create-book-popover'
        className='ml-auto text-lg font-semibold'
      >
        Add a book
      </Button>
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
        <CreateBookForm />
      </div>
    </main>
  );
}
