import React from 'react';
import { handleImageError } from '../utils/helpers';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category, onClick, image, count, tagline }) => {
  const defaultImages = {
    Breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    Lunch: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    Dinner: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    Dessert: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
    Snacks: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
    Drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    Appetizers: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&q=80',
    'Main Course': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  };

  const bgImage = image || defaultImages[category] || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80';

  return (
    <button
      onClick={() => onClick(category)}
      className="group relative w-full h-44 sm:h-52 md:h-60 rounded-2xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/50 dark:border-slate-800"
    >
      {/* Background Image */}
      <img
        src={bgImage}
        alt={category}
        loading="lazy"
        onError={handleImageError}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Dark gradient scrim overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-colors" />

      {/* Content */}
      <div className="relative h-full p-4 sm:p-5 flex flex-col justify-end text-white z-10">
        {tagline && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-orange-300 mb-1">
            {tagline}
          </span>
        )}
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-orange-200 transition-colors leading-tight">
            {category}
          </h3>
          <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5">
            <ArrowRight size={13} className="text-white" />
          </span>
        </div>
        {count && (
          <span className="text-[11px] text-slate-300 font-medium mt-1">
            {count}
          </span>
        )}
      </div>
    </button>
  );
};

export default CategoryCard;
