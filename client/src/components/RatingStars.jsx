import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating = 0, count, interactive = false, onRate, size = 'md' }) => {
  const [hover, setHover] = useState(0);

  const starSize = size === 'sm' ? 13 : size === 'lg' ? 22 : 16;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (interactive ? hover || rating : rating) >= star;
          return (
            <button
              key={star}
              type={interactive ? 'button' : undefined}
              disabled={!interactive}
              onClick={() => interactive && onRate && onRate(star)}
              onMouseEnter={() => interactive && setHover(star)}
              onMouseLeave={() => interactive && setHover(0)}
              className={`${
                interactive
                  ? 'cursor-pointer transition-transform hover:scale-125 focus:outline-none p-0.5'
                  : 'cursor-default pointer-events-none'
              }`}
              title={interactive ? `Rate ${star} of 5 stars` : undefined}
              aria-label={interactive ? `Rate ${star} stars` : undefined}
            >
              <Star
                size={starSize}
                className={`transition-colors duration-200 ${
                  isFilled
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-border dark:text-border-dark'
                }`}
              />
            </button>
          );
        })}
      </div>

      {!interactive && (
        <span className="text-xs font-semibold font-mono text-ink dark:text-ink-dark ml-0.5">
          {Number(rating || 0).toFixed(1)}
          {count !== undefined && count !== null && (
            <span className="font-normal font-sans text-ink-muted dark:text-ink-dark-muted ml-1">
              ({count})
            </span>
          )}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
