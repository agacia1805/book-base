'use client';

import { Button } from './button';

export default function LoginForm() {
  return (
    <form className='space-y-3'>
      <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
        <h1 className='mb-3 text-2xl'>Please log in to continue.</h1>
        <div className='w-full'>
          <div>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='title'
            >
              Title
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500'
                id='title'
                type='text'
                name='title'
                placeholder='Book title'
                required
              />
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='author'
            >
              Password
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500'
                id='author'
                type='text'
                name='author'
                placeholder='Author'
                required
              />
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='description'
            >
              Short description
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500'
                id='description'
                type='text'
                name='description'
                placeholder='Description'
                required
              />
            </div>
          </div>
        </div>
        <Button className='mt-4 flex w-full justify-center'>Save book</Button>{' '}
        <div
          className='flex h-8 items-end space-x-1'
          aria-live='polite'
          aria-atomic='true'
        >
          <>
            <p className='text-sm text-red-500'>error message</p>
          </>
        </div>
      </div>
    </form>
  );
}
