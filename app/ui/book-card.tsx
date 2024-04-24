interface BookCardProps {
  id: string;
  title: string;
  author: string;
  description: string;
  rating: string;
  genre: string;
}

export function BookCard({ id, title, author, description, rating, genre }: BookCardProps) {
  return (
    <div className='overflow-hidden rounded-lg bg-[#e3e7e8] shadow-md'>
      <div className='relative h-48'>
        <img
          alt='Book Cover'
          className='h-full w-full object-cover'
          height='192'
          src='/placeholder.svg'
          style={{
            aspectRatio: '256/192',
            objectFit: 'cover',
          }}
          width='256'
        />
      </div>
      <div className='space-y-2 p-4'>
        <h3 className='text-xl font-bold text-gray-900 dark:text-gray-50'>
          {title}
        </h3>
        <h3 className='text-gray-900 dark:text-gray-50'>
                  {author}
                </h3>
        <p className='line-clamp-2 text-gray-600 dark:text-gray-400'>
         {description}
        </p>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-600 dark:text-gray-400'>4.2</span>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900 dark:text-purple-400'>
            Fiction
          </div>
          <div className='rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900 dark:text-green-400'>
            Classics
          </div>
        </div>
      </div>
    </div>
  );
}
