'use client';

import Image from 'next/image';
import { StarRating } from './star-rating';
import { BookDetails } from './book-details';
import EditBookForm from './edit-form';
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { IBookCardProps } from '@/app/lib/definitions';
import { deleteBook } from '@/app/lib/actions';

export function BookCard({
  id,
  title,
  author,
  description,
  image,
  status,
  rating,
  genre,
}: IBookCardProps) {
  const genresArray = genre.split(',');
  const imageSrc = image || `/book-placeholder.png`;
  const popoverId = `${id}-popover`;
  const popoverUpdateId = `${id}-update-popover`;

  return (
    <>
      <div className='flex flex-col justify-between overflow-hidden rounded-lg bg-[#1d2231] shadow-md'>
        <button className='relative w-full text-left' popovertarget={popoverId}>
          <span
            className={`flex cursor-pointer items-center gap-1.5 rounded-full ${status === 'to read' ? 'bg-pink-300' : 'bg-blue-300'} absolute right-2 top-2 px-3 py-1.5 text-xs font-medium uppercase`}
          >
            {status}
          </span>
          <div className='h-64 overflow-hidden'>
            <Image
              src={imageSrc}
              alt={`Book Cover: ${title}`}
              className='h-full w-full'
              width={256}
              height={256}
              style={{
                aspectRatio: '16/9',
                objectFit: 'cover',
              }}
            />
          </div>
          <div className='space-y-2 px-4 pt-4'>
            <div>
              <h3 className='line-clamp-1 text-lg font-bold uppercase text-gray-50'>
                {title}
              </h3>
              <h3 className='text-gray-50'>{author}</h3>
            </div>
            <p className='line-clamp-4 text-sm text-gray-600 dark:text-gray-400'>
              {description}
            </p>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600 dark:text-gray-400'>
                <StarRating score={rating} readOnly={true} />
              </span>
            </div>
            <div className='flex items-center gap-2 overflow-x-scroll whitespace-nowrap'>
              {genresArray.map((genre) => {
                return (
                  <div
                    key={genre}
                    className='rounded-md border bg-transparent px-2 py-1 text-xs font-medium text-gray-50 opacity-90'
                  >
                    {genre}
                  </div>
                );
              })}
            </div>
          </div>
        </button>
        <div className='flex bg-gray-700 opacity-70'>
          <button
            className='align-center flex w-full border-r px-4 py-2'
            onClick={() => {
              deleteBook(id);
            }}
          >
            <TrashIcon className='m-auto h-6 w-6 text-white' />
          </button>
          <button
            className='align-center flex w-full px-4 py-2'
            popovertarget={popoverUpdateId}
          >
            <PencilSquareIcon className='m-auto h-6 w-6 text-white' />
          </button>
        </div>
      </div>
      <div
        id={popoverId}
        popover='auto'
        className='create-book-popover max-h-[90vh] w-11/12 rounded-lg bg-gray-100 p-0 text-[#091231FF] md:max-w-xl'
      >
        <BookDetails
          id={id}
          title={title}
          author={author}
          description={description}
          status={status}
          rating={rating}
          genre={genre}
          image={image}
        />
      </div>
      <div
        id={popoverUpdateId}
        popover='auto'
        className='create-book-popover max-h-[90vh] w-11/12 rounded-lg bg-gray-100 p-0 text-[#091231FF] md:max-w-xl'
      >
        <EditBookForm
          id={id}
          title={title}
          author={author}
          description={description}
          status={status}
          rating={rating}
          genre={genre}
          image={image}
        />
      </div>
    </>
  );
}
