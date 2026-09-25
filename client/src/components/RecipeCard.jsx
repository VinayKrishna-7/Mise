import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Heart, ChefHat, Sparkles } from 'lucide-react';
import { getImageUrl, formatTime, handleImageError } from '../utils/helpers';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const RecipeCard = ({ recipe }) => {
  const { isSaved, toggleSave } = useSavedRecipes();
  const saved = isSaved(recipe._id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(recipe._id);
  };

  const cookOrPrep = recipe.cookTime || recipe.prepTime;

  return (
    <div className="bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
      {/* Image Container with Floating Pills */}
      <Link
        to={`/recipes/${recipe._id}`}
        className="block relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-900"
      >
        <img
          src={getImageUrl(recipe.image)}
          alt={recipe.title}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/90 text-orange-600 dark:text-orange-400 backdrop-blur-md shadow-sm border border-black/5 dark:border-white/10">
            {recipe.category}
          </span>
        </div>

        {/* Modern Bookmark Button */}
        <button
          onClick={handleHeartClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md active:scale-90 ${
            saved
              ? 'bg-rose-500 text-white shadow-rose-500/30'
              : 'bg-white/90 dark:bg-slate-900/90 text-slate-500 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-white'
          }`}
          title={saved ? 'Remove from saved' : 'Save recipe'}
          aria-label="Save recipe"
        >
          <Heart size={15} className={saved ? 'fill-white' : ''} />
        </button>
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating and Cuisine Row */}
          <div className="flex items-center justify-between gap-2 mb-2 text-xs">
            <span className="font-semibold text-slate-400 dark:text-slate-400 text-[11px] uppercase tracking-wider">
              {recipe.cuisine || 'Traditional'}
            </span>

            {recipe.averageRating > 0 && (
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-[11px] font-bold">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span>{Number(recipe.averageRating).toFixed(1)}</span>
                {recipe.ratingCount > 0 && (
                  <span className="font-normal text-amber-600/70 dark:text-amber-500/70">
                    ({recipe.ratingCount})
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <Link
            to={`/recipes/${recipe._id}`}
            className="block text-slate-900 dark:text-white group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors"
          >
            <h3 className="font-display text-base sm:text-lg font-bold line-clamp-2 leading-snug">
              {recipe.title}
            </h3>
          </Link>

          {/* Short Description */}
          {recipe.description && (
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
              {recipe.description}
            </p>
          )}
        </div>

        {/* Bottom Metadata Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-orange-500" />
            <span>{cookOrPrep > 0 ? formatTime(cookOrPrep) : '15 min'}</span>
          </div>

          <div className="flex items-center gap-1">
            <ChefHat size={13} className="text-slate-400" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
