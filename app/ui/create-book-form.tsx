'use client';

import { useState } from 'react';
import { Button } from './button';
import { createBook } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Rating } from '@smastrom/react-rating';

export default function CreateBookForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createBook, initialState);

  const [rating, setRating] = useState(0);

  function onChange(newValue: number) {
    setRating(newValue);
  }

  const genres = [
    'memoir/autobiography',
    'nonfiction',
    'historical fiction',
    'fantasy',
    'science fiction',
    'dystopian',
    'action',
    'adventure',
    'mystery',
    'horror',
    'thriller',
    'romance',
    'poetry',
    'lgbtq+',
    'microrealism',
    'young adult',
    'new adult',
    'biography',
    'art',
    'history',
    'travel',
    'true crime',
    'children',
    'classics',
    'comics',
    'short',
  ];

  return (
    <form className='p-1 md:p-6' action={dispatch}>
      <div className='flex-1 rounded-lg'>
        <h1 className='mb-2 text-center text-2xl font-semibold text-[#091231FF]'>
          Create a new book
        </h1>
        <div className='w-full'>
          <div>
            <label
              className='mb-2 mt-5 block text-xs font-medium'
              htmlFor='title'
            >
              Title
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm text-gray-700 outline-2 placeholder:text-gray-500 focus-visible:outline-gray-300'
                id='title'
                name='title'
                placeholder='Title'
                required
              />
            </div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-5 block text-xs font-medium'
              htmlFor='author'
            >
              Author
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm text-gray-700 outline-2 placeholder:text-gray-500 focus-visible:outline-gray-300'
                id='author'
                name='author'
                placeholder='Author'
                required
              />
            </div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.author &&
                state.errors.author.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-5 block text-xs font-medium'
              htmlFor='description'
            >
              Description
            </label>
            <div className='relative'>
              <textarea
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm text-gray-700 outline-2 placeholder:text-gray-500 focus-visible:outline-gray-300'
                id='description'
                name='description'
                placeholder='Description'
                required
              />
            </div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-5 block text-xs font-medium'
              htmlFor='rating'
            >
              Rating
            </label>
            <div className='relative'></div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.rating &&
                state.errors.rating.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <fieldset className='mt-5'>
            <legend className='mb-2 block text-xs font-medium'>Genre(s)</legend>
            <div className='h-[120px] overflow-y-scroll rounded-md border border-gray-200 bg-white p-2'>
              {genres.map((genre) => (
                <div key={genre} className="tag-checkbox">
                      <input
                        id={genre}
                        name='genre'
                        type='checkbox'
                        value={genre}
                        aria-describedby='status-error'
                      />
                      <label
                        htmlFor={genre}
                        className='flex select-none cursor-pointer items-center rounded-full bg-gray-200 hover:bg-gray-300 px-2 py-1 m-1 text-xs font-medium text-gray-600 cursor-pointer'
                      >
                        {genre}
                      </label>
                    </div>
              ))}
            </div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state.errors?.genre &&
                state.errors.genre.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </div>
        <div className='flex justify-center gap-4'>
          <Button
            className='mt-6 flex w-36 justify-center text-lg font-semibold'
            type='submit'
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
