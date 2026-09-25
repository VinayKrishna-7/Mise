import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 Not Found — MISE';
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center justify-center text-center max-w-lg animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-6 shadow-sm">
        <Compass size={32} />
      </div>

      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/60 dark:border-orange-800/40 mb-3">
        ERROR 404
      </span>

      <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
        Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-normal">
        The recipe or page you are looking for does not exist or may have been moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <Link to="/" className="btn-primary py-3 px-6 text-sm font-bold rounded-xl w-full sm:w-auto justify-center inline-flex items-center gap-2 shadow-md shadow-orange-500/20">
          <span>Return to Home</span>
          <ArrowRight size={16} />
        </Link>
        <Link to="/recipes" className="btn-secondary py-3 px-6 text-sm font-semibold rounded-xl w-full sm:w-auto justify-center">
          Explore Recipes
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
