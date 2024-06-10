'use client';

import { useState } from 'react';
import { Button } from './button';
import { StarRating } from './star-rating';
import { updateBook } from '@/app/lib/actions';
import {
  CheckBadgeIcon,
  BookmarkSquareIcon,
} from '@heroicons/react/24/outline';
import { genres } from '@/app/constants/genres';
import { IBookCardProps } from '@/app/lib/definitions';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({ stateMessage }: { stateMessage?: string }) {
  const { pending } = useFormStatus();

  return (
    <div className='flex justify-center gap-4'>
      <Button
        className='mt-6 flex justify-center bg-[#081a57] text-lg font-semibold text-gray-100'
        type='submit'
        disabled={pending}
      >
        Save changes
      </Button>
    </div>
  );
}

export default function EditBookForm({
  id,
  title,
  author,
  description,
  image,
  status,
  rating,
  genre,
}: IBookCardProps) {
  const initialState = { message: null, errors: {} };
  const updateBookWithId = updateBook.bind(null, id);
  const [state, dispatch] = useFormState(updateBookWithId, initialState);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewImage(file);
    setIsImageChanged(!!file);
  };

  return (
    <form className='p-1 md:p-6' action={dispatch} key={state?.resetKey}>
      <div className='flex-1 rounded-lg'>
        <h1 className='mb-2 text-center text-2xl font-semibold text-[#091231FF]'>
          Edit book
        </h1>
        <div className='max-h-[80vh] w-full'>
          <div>
            <label
              className='mb-2 mt-3 block text-xs font-medium'
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
                aria-describedby='title-error'
                defaultValue={title}
              />
            </div>
            <div id='title-error' aria-live='polite' aria-atomic='true'>
              {state?.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-3 block text-xs font-medium'
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
                aria-describedby='author-error'
                defaultValue={author}
              />
            </div>
            <div id='author-error' aria-live='polite' aria-atomic='true'>
              {state?.errors?.author &&
                state.errors.author.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-3 block text-xs font-medium'
              htmlFor='description'
            >
              Description
            </label>
            <div className='relative'>
              <textarea
                className='peer block h-[120px] w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm text-gray-700 outline-2 placeholder:text-gray-500 focus-visible:outline-gray-300'
                id='description'
                name='description'
                placeholder='Description'
                aria-describedby='description-error'
                defaultValue={description}
              />
            </div>
            <div id='description-error' aria-live='polite' aria-atomic='true'>
              {state?.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-3 block text-xs font-medium'
              htmlFor='image'
            >
              Book Cover
            </label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              onChange={onChangeImage}
              className='block w-full text-sm text-gray-900 file:mr-4 file:cursor-pointer file:rounded-full
                                      file:border-0 file:bg-violet-100 file:bg-violet-50 file:px-4
                                      file:py-2 file:font-semibold file:text-violet-700'
            />
            {!isImageChanged && image && (
              <img src={image} alt='Current book cover' className='mt-2 h-32' />
            )}
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-3 block text-xs font-medium'
              htmlFor='description'
            >
              Book status
            </label>
            <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
              <div className='flex gap-4'>
                <div className='flex items-center'>
                  <input
                    id='finished'
                    name='status'
                    type='radio'
                    value='finished'
                    className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600'
                    aria-describedby='status-error'
                    defaultChecked={status === 'finished'}
                  />
                  <label
                    htmlFor='finished'
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-300 px-3 py-1.5 text-xs font-medium'
                  >
                    Finished <CheckBadgeIcon className='h-4 w-4' />
                  </label>
                </div>
                <div className='flex items-center'>
                  <input
                    id='to read'
                    name='status'
                    type='radio'
                    value='to read'
                    className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100'
                    aria-describedby='status-error'
                    defaultChecked={status === 'to read'}
                  />
                  <label
                    htmlFor='to read'
                    className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-pink-300 px-3 py-1.5 text-xs font-medium'
                  >
                    To read <BookmarkSquareIcon className='h-4 w-4' />
                  </label>
                </div>
              </div>
            </div>
            <div id='description-error' aria-live='polite' aria-atomic='true'>
              {state?.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-2 mt-3 block text-xs font-medium'
              htmlFor='rating'
            >
              Rating
            </label>
            <div className='relative'>
              <StarRating score={rating} readOnly={false} />
            </div>
            <div id='customer-error' aria-live='polite' aria-atomic='true'>
              {state?.errors?.rating &&
                state.errors.rating.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <fieldset className='mt-3'>
            <legend className='mb-2 block text-xs font-medium'>Genre(s)</legend>
            <div className='h-[120px] overflow-y-scroll rounded-md border border-gray-200 bg-white p-2'>
              {genres.map((item) => (
                <div key={item} className='tag-checkbox'>
                  <input
                    id={item}
                    name='genre'
                    type='checkbox'
                    value={item}
                    aria-describedby='genre-error'
                    defaultChecked={genre?.includes(item)}
                  />
                  <label
                    htmlFor={item}
                    className='m-1 flex cursor-pointer cursor-pointer select-none items-center rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-300'
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
            <div id='genre-error' aria-live='polite' aria-atomic='true'>
              {state?.errors?.genre &&
                state.errors.genre.map((error: string) => (
                  <p className='mt-2 text-sm text-red-500' key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </fieldset>
        </div>
        <SubmitButton
          stateMessage={state?.messageType === 'success' && state.message}
        />
      </div>
    </form>
  );
}
