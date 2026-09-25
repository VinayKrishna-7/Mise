import React, { useState } from 'react';
import { CATEGORIES, CUISINES, DIFFICULTIES, SORT_OPTIONS, COOK_TIME_OPTIONS } from '../utils/constants';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';

const FilterPanel = ({ filters, onChange, onClear, totalCount }) => {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v && (k !== 'sort' || v !== 'newest')
  ).length;

  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const renderSelect = (name, label, options, arrayMode = false) => (
    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 transition-colors focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}:
      </span>
      <select
        name={name}
        value={filters[name] || ''}
        onChange={handleChange}
        className="bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
      >
        <option value="" className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">
          All
        </option>
        {arrayMode
          ? options.map((opt) => (
              <option
                key={opt}
                value={opt}
                className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {opt}
              </option>
            ))
          : options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {opt.label}
              </option>
            ))}
      </select>
    </div>
  );

  return (
    <>
      {/* Desktop Horizontal Filter Toolbar */}
      <div className="hidden lg:flex items-center justify-between gap-4 py-3.5 px-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-wider mr-1">
            <SlidersHorizontal size={14} />
            <span>Filters</span>
          </div>

          {renderSelect('category', 'Category', CATEGORIES, true)}
          {renderSelect('cuisine', 'Cuisine', CUISINES, true)}
          {renderSelect('difficulty', 'Difficulty', DIFFICULTIES, true)}
          {renderSelect('maxTime', 'Cook Time', COOK_TIME_OPTIONS, false)}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {renderSelect('sort', 'Sort', SORT_OPTIONS, false)}

          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 py-1.5 px-3 rounded-full hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Tablet & Mobile Filter Trigger Bar */}
      <div className="flex lg:hidden items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setIsMobileModalOpen(true)}
          className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm"
        >
          <SlidersHorizontal size={14} className="text-orange-500" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="w-4 h-4 bg-orange-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          {renderSelect('sort', 'Sort', SORT_OPTIONS, false)}
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full"
              title="Clear filters"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer / Bottom Sheet Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-800 animate-fade-up shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-orange-500" />
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  Filter Recipes
                </h3>
              </div>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category || ''}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Cuisine
                </label>
                <select
                  name="cuisine"
                  value={filters.cuisine || ''}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  <option value="">All Cuisines</option>
                  {CUISINES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={filters.difficulty || ''}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  <option value="">Any Difficulty</option>
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Max Cooking Time
                </label>
                <select
                  name="maxTime"
                  value={filters.maxTime || ''}
                  onChange={handleChange}
                  className="input-field text-xs py-2.5"
                >
                  {COOK_TIME_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    onClear();
                    setIsMobileModalOpen(false);
                  }}
                  className="btn-secondary flex-1 py-2.5 justify-center text-xs font-bold"
                >
                  Clear All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="btn-primary flex-1 py-2.5 justify-center text-xs font-bold"
              >
                <span>Show Results</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;
