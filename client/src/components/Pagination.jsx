import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2 py-10" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm hover:border-orange-300 dark:hover:border-slate-700"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all shadow-sm ${
              currentPage === page
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-300 dark:hover:border-slate-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm hover:border-orange-300 dark:hover:border-slate-700"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
};

export default Pagination;
