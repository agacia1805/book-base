import Form from '@/app/ui/create-form';
import { Button } from '@/app/ui/button';
import { BookCard } from '@/app/ui/book-card';
import { PlusIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { fetchBooks } from '@/app/lib/data';
import { Metadata } from 'next';

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
      {books?.length ? (
        <div className='flex w-full flex-col gap-6'>
          <Button
            popovertarget='create-book-popover'
            className='ml-auto bg-gray-100 text-lg font-semibold'
          >
            Add a book
          </Button>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {books.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  status={book.status}
                  rating={book.rating}
                  genre={book.genre}
                  image={book.image_url}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className='flex w-full flex-col items-center justify-center gap-6 text-white'>
          <BookOpenIcon className='h-12 w-12' />
          <p className='text-xl'>You have no books saved</p>
          <Button
            popovertarget='create-book-popover'
            className='bg-gray-100 text-lg font-semibold'
          >
            Add a book
          </Button>
        </div>
      )}
      <div
        id='create-book-popover'
        popover='auto'
        className='create-book-popover w-11/12 rounded-lg bg-gray-100 p-2 text-[#091231FF] md:w-4/12'
      >
        <Form />
      </div>
    </main>
  );
}
