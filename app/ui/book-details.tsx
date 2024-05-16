'use client';

import Image from 'next/image';
import { StarRating } from './star-rating';
import { IBookCardProps } from '@/app/lib/definitions';

export function BookDetails({
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
    <div>
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
      <div className='space-y-4 p-4 text-[#091231FF]'>
        <div>
          <h3 className='text-lg font-bold uppercase'>{title}</h3>
          <h3>{author}</h3>
        </div>
        <p className='description text-sm text-gray-600'>{description}</p>
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
    </div>
  );
}
