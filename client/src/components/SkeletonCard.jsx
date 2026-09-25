import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden flex flex-col h-full shadow-sm">
      {/* Image Skeleton */}
      <div className="aspect-[4/3] w-full skeleton-box" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 skeleton-box rounded-full" />
            <div className="h-3 w-12 skeleton-box rounded-full" />
          </div>

          <div className="h-5 w-4/5 skeleton-box rounded-lg" />
          <div className="space-y-2 pt-1">
            <div className="h-3 w-full skeleton-box rounded" />
            <div className="h-3 w-3/4 skeleton-box rounded" />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="h-3 w-20 skeleton-box rounded-full" />
          <div className="h-3 w-16 skeleton-box rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
