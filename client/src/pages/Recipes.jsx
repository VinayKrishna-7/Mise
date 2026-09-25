import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRecipes } from '../services/api';
import { UtensilsCrossed, Heart, X, RotateCcw } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import RecipeGrid from '../components/RecipeGrid';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import { CATEGORIES } from '../utils/constants';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { savedIds } = useSavedRecipes();
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [showSavedOnly, setShowSavedOnly] = useState(searchParams.get('saved') === 'true');

  const [searchText, setSearchText] = useState(searchParams.get('search') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    cuisine: searchParams.get('cuisine') || '',
    difficulty: searchParams.get('difficulty') || '',
    maxTime: searchParams.get('maxTime') || '',
    sort: searchParams.get('sort') || 'newest',
  });

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchText(searchParams.get('search') || '');
    setFilters({
      category: searchParams.get('category') || '',
      cuisine: searchParams.get('cuisine') || '',
      difficulty: searchParams.get('difficulty') || '',
      maxTime: searchParams.get('maxTime') || '',
      sort: searchParams.get('sort') || 'newest',
    });
    setPage(Number(searchParams.get('page')) || 1);
    if (searchParams.get('saved') === 'true') {
      setShowSavedOnly(true);
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = showSavedOnly ? 'Saved Recipes — MISE' : 'MISE — Recipes';
  }, [showSavedOnly]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const params = { ...filters, search: searchText, page, limit: 12 };
      Object.keys(params).forEach(key => !params[key] && delete params[key]);
      
      const res = await getRecipes(params);
      let fetched = res.data.data || [];
      let total = res.data.totalRecipes || fetched.length;

      // If viewing saved recipes only
      if (showSavedOnly) {
        fetched = fetched.filter(r => savedIds.includes(r._id));
        total = fetched.length;
      }

      setRecipes(fetched);
      setTotalPages(res.data.totalPages || 1);
      setTotalRecipes(total);
    } catch (err) {
      console.error('Failed to fetch recipes:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, searchText, page, showSavedOnly, savedIds]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecipes();
      
      // Update URL query params cleanly
      const params = new URLSearchParams();
      if (searchText) params.set('search', searchText);
      if (page > 1) params.set('page', page);
      if (showSavedOnly) params.set('saved', 'true');
      Object.entries(filters).forEach(([key, val]) => {
        if (val && (key !== 'sort' || val !== 'newest')) params.set(key, val);
      });
      setSearchParams(params, { replace: true });
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchRecipes, setSearchParams]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: '', cuisine: '', difficulty: '', maxTime: '', sort: 'newest' });
    setSearchText('');
    setShowSavedOnly(false);
    setPage(1);
  };

  const removeFilter = (name) => {
    handleFilterChange(name, '');
  };

  // Determine active filter items for chips
  const activeChips = [];
  if (filters.category) activeChips.push({ label: filters.category, clear: () => removeFilter('category') });
  if (filters.cuisine) activeChips.push({ label: `${filters.cuisine} Cuisine`, clear: () => removeFilter('cuisine') });
  if (filters.difficulty) activeChips.push({ label: `${filters.difficulty} Level`, clear: () => removeFilter('difficulty') });
  if (filters.maxTime) activeChips.push({ label: `≤ ${filters.maxTime} min`, clear: () => removeFilter('maxTime') });
  if (searchText) activeChips.push({ label: `"${searchText}"`, clear: () => setSearchText('') });
  if (showSavedOnly) activeChips.push({ label: 'Saved Only', clear: () => setShowSavedOnly(false) });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
      {/* Header section */}
      <div className="max-w-3xl mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-2">
          {showSavedOnly ? 'PERSONAL COLLECTION' : 'RECIPE ARCHIVE'}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {showSavedOnly ? 'Saved Recipes' : 'Recipes'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed font-normal">
          {showSavedOnly
            ? 'Your bookmarked kitchen preparations and personal collection.'
            : 'Browse documented recipes by culinary tradition, category, or cooking time.'}
        </p>
      </div>

      {/* Search & Controls */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1">
            <SearchBar
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setPage(1);
              }}
              enableSuggestions={true}
              placeholder="Search dishes, ingredients, techniques..."
              size="md"
            />
          </div>

          {/* Saved bookmarks toggle */}
          {savedIds.length > 0 && (
            <button
              onClick={() => {
                setShowSavedOnly(!showSavedOnly);
                setPage(1);
              }}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold border transition-all shrink-0 shadow-sm ${
                showSavedOnly
                  ? 'bg-rose-500 text-white border-rose-500 shadow-rose-500/30'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:text-rose-500'
              }`}
            >
              <Heart size={14} className={showSavedOnly ? 'fill-white' : 'text-rose-500'} />
              <span>Saved Recipes ({savedIds.length})</span>
            </button>
          )}
        </div>

        {/* Quick Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          <button
            onClick={() => handleFilterChange('category', '')}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold transition-all shadow-sm ${
              !filters.category
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-500/40 hover:text-orange-500'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange('category', filters.category === cat ? '' : cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-semibold transition-all shadow-sm ${
                filters.category.toLowerCase() === cat.toLowerCase()
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/25'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-orange-500/40 hover:text-orange-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Toolbar / Drawer */}
        <FilterPanel
          filters={filters}
          onChange={handleFilterChange}
          onClear={clearFilters}
          totalCount={totalRecipes}
        />
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mb-4 pt-1">
          <span className="text-xs font-bold text-ink-muted dark:text-ink-dark-muted uppercase tracking-wider text-[11px]">
            Active:
          </span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface dark:bg-surface-dark-card text-ink dark:text-ink-dark border border-border dark:border-border-dark shadow-xs"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.clear}
                className="hover:text-terracotta dark:hover:text-terracotta-night transition-colors"
                title="Remove filter"
                aria-label={`Remove ${chip.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-terracotta dark:text-terracotta-night hover:underline font-semibold ml-1 flex items-center gap-1 transition-colors uppercase tracking-wider text-[11px]"
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Results Count bar */}
      <div className="flex items-center justify-between py-3 mb-6 border-b border-border dark:border-border-dark text-xs text-ink-muted dark:text-ink-dark-muted font-medium">
        <div className="flex items-center gap-2">
          <span>Showing</span>
          <span className="bg-[#EFEAE2] dark:bg-[#2C2924] px-2.5 py-0.5 rounded-full font-bold text-ink dark:text-ink-dark text-xs">
            {totalRecipes}
          </span>
          <span>{totalRecipes === 1 ? 'recipe' : 'recipes'}</span>
        </div>
        {activeChips.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-terracotta dark:text-terracotta-night hover:underline font-semibold text-xs"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Recipe Grid or Empty State */}
      {!loading && recipes.length === 0 ? (
        <EmptyState
          icon={UtensilsCrossed}
          title={showSavedOnly ? "No saved recipes yet" : "No recipes found"}
          description={
            showSavedOnly
              ? "Bookmark recipes with the heart icon to view them together here."
              : "Try another search keyword or clear active filters."
          }
          action={{
            label: showSavedOnly ? 'Browse Recipes' : 'Clear Filters',
            onClick: clearFilters
          }}
        />
      ) : (
        <>
          <RecipeGrid recipes={recipes} loading={loading} skeletonCount={12} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 150, behavior: 'smooth' });
            }}
          />
        </>
      )}
    </div>
  );
};

export default Recipes;
