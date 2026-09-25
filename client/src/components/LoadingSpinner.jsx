import React from 'react';

const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-3 animate-fade-in">
    <div className="relative flex items-center justify-center">
      <div className="w-10 h-10 border-3 border-slate-200 dark:border-slate-800 border-t-orange-500 rounded-full animate-spin" />
    </div>
    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 tracking-wide">
      {text}
    </p>
  </div>
);

export default LoadingSpinner;
