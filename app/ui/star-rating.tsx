import React, { ReactElement, useState } from 'react';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as FullStar } from '@heroicons/react/24/solid';

const COUNT_STARS = 5;
const MIN_VALUE = 0.2;
const MAX_VALUE = 0.7;

interface IStarProps {
  index: number;
  rating: number;
  onClick?: (index: number) => void;
  readOnly?: boolean;
}

function RatingStar({
  index,
  rating,
  onClick,
  readOnly,
}: IStarProps): ReactElement {
  const handleStarClick = () => {
    if (!readOnly && onClick) {
      onClick(index + 1);
    }
  };

  let starIcon = <StarOutline className='h-6 w-6 text-gray-300' />;
  if (rating > index + MAX_VALUE) {
    starIcon = <FullStar className='h-6 w-6 text-yellow-500' />;
  } else if (rating >= index + MIN_VALUE) {
    starIcon = <FullStar className='h-6 w-6 text-yellow-500' />;
  }

  return (
    <span
      onClick={handleStarClick}
      className={`${!readOnly && 'cursor-pointer'}`}
    >
      {starIcon}
    </span>
  );
}

interface IStarRatingProps {
  score?: number;
  readOnly?: boolean;
}

export function StarRating({
  score = 0,
  readOnly = true,
}: IStarRatingProps): ReactElement {
  const [rating, setRating] = useState(score);

  const handleRatingChange = (newRating: number) => {
    if (!readOnly) {
      setRating(newRating);
    }
  };

  return (
    <div className='flex'>
      {[...Array(COUNT_STARS)].map((_, i) => (
        <RatingStar
          rating={rating}
          index={i}
          key={`star-${i}`}
          onClick={handleRatingChange}
          readOnly={readOnly}
        />
      ))}
      <input type='hidden' name='rating' value={rating} />
    </div>
  );
}
