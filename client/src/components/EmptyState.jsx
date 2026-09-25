import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const EmptyState = ({
  icon: Icon = UtensilsCrossed,
  title = "No recipes found",
  description = "Try another search keyword or remove applied filters.",
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/60 dark:border-orange-800/40 flex items-center justify-center text-orange-500 mb-5 shadow-sm">
        <Icon size={28} />
      </div>

      <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
        {description}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary py-2.5 px-6 text-sm font-semibold rounded-xl"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
