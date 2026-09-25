import React from 'react';
import RecipeCard from './RecipeCard';
import SkeletonCard from './SkeletonCard';

const RecipeGrid = ({ recipes = [], loading = false, skeletonCount = 8, className = "" }) => {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 ${className}`}>
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 ${className}`}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;
