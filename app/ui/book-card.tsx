'use client';

import Image from 'next/image';
import { StarRating } from './star-rating';
import { BookDetails } from './book-details';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { IBookCardProps } from '@/app/lib/definitions';

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

  return (
    <>
      <button
        className='overflow-hidden rounded-lg bg-[#1d2231] text-left shadow-md hover:ring-1 hover:ring-gray-400 hover:ring-opacity-60 hover:transition'
        popovertarget='book-details-popover'
      >
        <div className='relative h-64'>
          <Image
            src={imageSrc}
            alt={`Book Cover: ${title}`}
            className='h-full w-full'
            width={256}
            height={334}
            style={{
              aspectRatio: '256/334',
              objectFit: 'cover',
            }}
          />
          <span
            className={`flex cursor-pointer items-center gap-1.5 rounded-full ${status === 'to read' ? 'bg-pink-300' : 'bg-blue-300'} absolute right-2 top-2 px-3 py-1.5 text-xs font-medium uppercase`}
          >
            {status}
          </span>
        </div>
        <div className='space-y-2 p-4'>
          <div>
            <h3 className='text-lg font-bold uppercase text-gray-50'>
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
          <div className='flex flex-wrap items-center gap-2'>
            {genresArray.map((genre) => {
              return (
                <div
                  key={genre}
                  className='rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 opacity-90'
                >
                  {genre}
                </div>
              );
            })}
          </div>
        </div>
      </button>
      <div
        id='book-details-popover'
        popover='manual'
        className='create-book-popover max-h-[90vh] w-11/12 rounded-lg bg-gray-100 p-2 text-[#091231FF] md:w-4/12'
      >
        <button
          popovertarget='book-details-popover'
          popovertargetaction='hide'
          className='ml-auto block rounded-lg p-2 hover:opacity-80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-gray-400'
        >
          <XMarkIcon className='h-8 w-8 text-[#091231FF]' />
        </button>
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
    </>
  );
}
