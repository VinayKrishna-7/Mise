import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Utensils, Globe, Tag } from 'lucide-react';
import { getSearchSuggestions } from '../services/api';

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Search recipes, ingredients, or cuisines...",
  className = "",
  size = "lg",
  enableSuggestions = false
}) => {
  const isLarge = size === "lg";
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!enableSuggestions || !value || value.trim().length < 2) {
      setSuggestions(null);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await getSearchSuggestions(value.trim());
        if (res.data?.success) {
          const { recipes = [], cuisines = [], categories = [] } = res.data.data;
          if (recipes.length > 0 || cuisines.length > 0 || categories.length > 0) {
            setSuggestions({ recipes, cuisines, categories });
            setIsOpen(true);
          } else {
            setSuggestions(null);
            setIsOpen(false);
          }
        }
      } catch (e) {
        setSuggestions(null);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [value, enableSuggestions]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && onSubmit) {
      setIsOpen(false);
      onSubmit(e);
    }
  };

  const handleSelectRecipe = (id) => {
    setIsOpen(false);
    navigate(`/recipes/${id}`);
  };

  const handleSelectCuisine = (cuisine) => {
    setIsOpen(false);
    navigate(`/recipes?cuisine=${encodeURIComponent(cuisine)}`);
  };

  const handleSelectCategory = (category) => {
    setIsOpen(false);
    navigate(`/recipes?category=${encodeURIComponent(category)}`);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:ring-4 focus-within:ring-orange-500/15 rounded-full transition-all duration-300">
        <div className="absolute left-4 sm:left-5 text-slate-400 pointer-events-none transition-colors">
          <Search size={isLarge ? 20 : 18} />
        </div>

        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions) setIsOpen(true);
          }}
          placeholder={placeholder}
          aria-label="Search recipes"
          className={`w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-all ${
            isLarge
              ? 'py-3.5 sm:py-4 pl-12 sm:pl-14 pr-24 text-sm sm:text-base'
              : 'py-2.5 pl-11 pr-20 text-xs sm:text-sm'
          }`}
        />

        <div className="absolute right-2 sm:right-2.5 flex items-center gap-1.5">
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange({ target: { value: '' } });
                setSuggestions(null);
                setIsOpen(false);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full"
              title="Clear search"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}

          {onSubmit && (
            <button
              type="button"
              onClick={(e) => {
                setIsOpen(false);
                onSubmit(e);
              }}
              className={`rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold flex items-center justify-center shadow-md shadow-orange-500/25 active:scale-95 transition-all ${
                isLarge ? 'h-10 px-5 text-xs sm:text-sm' : 'h-8 px-3.5 text-xs'
              }`}
              title="Search"
              aria-label="Search submit"
            >
              <span>Search</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Suggestions Dropdown */}
      {isOpen && suggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-left animate-fade-in divide-y divide-slate-100 dark:divide-slate-700">
          {/* Matching Recipes */}
          {suggestions.recipes.length > 0 && (
            <div className="p-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Recipes
              </span>
              {suggestions.recipes.map((r) => (
                <button
                  key={r._id}
                  type="button"
                  onClick={() => handleSelectRecipe(r._id)}
                  className="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-orange-50/70 dark:hover:bg-slate-700/60 transition-colors text-sm group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                      <Utensils size={12} />
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 truncate">
                      {r.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 ml-2 font-medium">
                    {r.cuisine} · {r.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Matching Cuisines */}
          {suggestions.cuisines.length > 0 && (
            <div className="p-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Cuisines
              </span>
              <div className="flex flex-wrap gap-1.5 px-2.5 py-1">
                {suggestions.cuisines.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleSelectCuisine(c)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Globe size={12} />
                    <span>{c}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Categories */}
          {suggestions.categories.length > 0 && (
            <div className="p-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
                Categories
              </span>
              <div className="flex flex-wrap gap-1.5 px-2.5 py-1">
                {suggestions.categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <Tag size={12} />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
