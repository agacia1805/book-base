'use client';

import Image from 'next/image';
import { StarRating } from './star-rating';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: number;
  genre: string;
}

export function BookCard({
  id,
  title,
  author,
  description,
  rating,
  genre,
}: BookCardProps) {
  const genresArray = genre.split(',');

  return (
    <div className='overflow-hidden rounded-lg bg-[#1d2231] shadow-md'>
      <div className='relative h-64'>
        <img
          alt='Book Cover'
          className='h-full w-full '
          src='/book-placeholder.png'
          style={{
            aspectRatio: '256/334',
            objectFit: 'cover',
          }}
        />
      </div>
      <div className='space-y-2 p-4'>
        <div>
          <h3 className='text-lg font-bold uppercase text-gray-50'>{title}</h3>
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
        <div className='flex items-center space-x-2'>
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
    </div>
  );
}
