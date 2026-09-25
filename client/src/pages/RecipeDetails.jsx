import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  ChefHat,
  Users,
  Heart,
  Share2,
  Printer,
  Edit3,
  Trash2,
  Star,
  Check,
  Plus,
  Minus,
  ArrowDown,
  Timer,
  Sparkles,
  Flame
} from 'lucide-react';
import { getRecipe, deleteRecipe, addRating } from '../services/api';
import { getImageUrl, formatTime, getDifficultyColor, scaleQuantity, handleImageError } from '../utils/helpers';
import { useToastContext } from '../context/ToastContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';
import Breadcrumb from '../components/Breadcrumb';
import RatingStars from '../components/RatingStars';
import CommentSection from '../components/CommentSection';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToastContext();
  const { isSaved, toggleSave } = useSavedRecipes();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isCookingMode, setIsCookingMode] = useState(false);
  const [ratingLoading, setRatingLoading] = useState(false);
  
  // Dynamic servings scaling state
  const [servings, setServings] = useState(4);
  const [originalServings, setOriginalServings] = useState(4);

  // Persistent ingredient checklist state per recipe (backward-compatible)
  const [checkedIngredients, setCheckedIngredients] = useState(() => {
    try {
      const saved = localStorage.getItem(`mise_checklist_${id}`) || localStorage.getItem(`recipehub_checklist_${id}`);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Client-side rate-limit / vote guard (backward-compatible)
  const [hasRated, setHasRated] = useState(() => {
    try {
      const rated = JSON.parse(localStorage.getItem('mise_rated_recipes') || localStorage.getItem('recipehub_rated_recipes') || '[]');
      return rated.includes(id);
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await getRecipe(id);
      const data = res.data.data;
      setRecipe(data);
      if (data?.title) {
        document.title = `${data.title} — MISE`;
      }
      const initialServings = data.servings || 4;
      setServings(initialServings);
      setOriginalServings(initialServings);
    } catch (err) {
      addToast('Failed to load recipe details', 'error');
      navigate('/recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      addToast('Recipe deleted successfully');
      navigate('/recipes');
    } catch (err) {
      addToast(err.message || 'Failed to delete recipe', 'error');
      setDeleteModalOpen(false);
    }
  };

  const handleRate = async (ratingVal) => {
    if (hasRated) {
      addToast('You have already submitted a rating for this recipe.', 'info');
      return;
    }
    setRatingLoading(true);
    try {
      await addRating(id, ratingVal);
      addToast(`Thank you for rating ${ratingVal} stars!`);
      const rated = JSON.parse(localStorage.getItem('mise_rated_recipes') || localStorage.getItem('recipehub_rated_recipes') || '[]');
      if (!rated.includes(id)) {
        rated.push(id);
        localStorage.setItem('mise_rated_recipes', JSON.stringify(rated));
      }
      setHasRated(true);
      fetchRecipe();
    } catch (err) {
      addToast(err.message || 'Failed to submit rating', 'error');
    } finally {
      setRatingLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe?.title ? `${recipe.title} — MISE` : 'MISE — The Kitchen Journal',
          text: recipe?.description,
          url: window.location.href,
        });
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        addToast('Recipe link copied to clipboard!');
      } else {
        addToast('Link ready: ' + window.location.href);
      }
    } catch {
      addToast('Could not copy link', 'error');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      try {
        localStorage.setItem(`mise_checklist_${id}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const jumpToRecipe = () => {
    const el = document.getElementById('recipe-content');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scaleFactor = originalServings > 0 ? servings / originalServings : 1;

  if (loading) return <LoadingSpinner text="Loading recipe details..." />;
  if (!recipe) return null;

  const saved = isSaved(recipe._id);
  const totalTime = (Number(recipe.prepTime) || 0) + (Number(recipe.cookTime) || 0);

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Recipes', to: '/recipes' },
          { label: recipe.title }
        ]}
      />

      {/* 1. HEADER SECTION */}
      <header className="space-y-4 mb-8">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            {recipe.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {recipe.cuisine} Tradition
          </span>
          {recipe.isSystem && (
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              Foundation Recipe
            </span>
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
          {recipe.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed font-normal">
          {recipe.description}
        </p>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex-wrap no-print">
          {/* Rating Summary */}
          <div className="flex items-center gap-2">
            <RatingStars
              rating={recipe.averageRating || 0}
              count={recipe.ratingCount || 0}
              size="md"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Jump to Recipe */}
            <button
              type="button"
              onClick={jumpToRecipe}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowDown size={14} />
              <span>Jump to Recipe</span>
            </button>

            {/* Cooking Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsCookingMode(!isCookingMode)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                isCookingMode
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-orange-500'
              }`}
            >
              <ChefHat size={14} />
              <span>{isCookingMode ? 'Exit Cooking Mode' : 'Cooking Mode'}</span>
            </button>

            {/* Save */}
            <button
              type="button"
              onClick={() => toggleSave(recipe._id)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                saved
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-rose-400'
              }`}
            >
              <Heart size={14} className={saved ? 'fill-white' : ''} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-orange-500 transition-colors"
              title="Share recipe"
            >
              <Share2 size={14} />
              <span className="hidden sm:inline">Share</span>
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-orange-500 transition-colors"
              title="Print recipe"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Edit & Delete (Available for User-Contributed Recipes) */}
            {!recipe.isSystem && (
              <>
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-orange-600 transition-colors"
                  title="Edit recipe"
                >
                  <Edit3 size={14} />
                  <span className="hidden sm:inline">Edit</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(true)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  title="Delete recipe"
                  aria-label="Delete recipe"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. LARGE HERO IMAGE (Hidden during Cooking Mode for focus) */}
      {!isCookingMode && (
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mb-10 border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
          <img
            src={getImageUrl(recipe.image)}
            alt={recipe.title}
            onError={handleImageError}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md shadow-md">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      )}

      {/* 3. MODERN METADATA CARDS (Prep, Cook, Total Time, Servings, Difficulty) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
            <Clock size={14} className="text-blue-500" />
            <span>Prep Time</span>
          </div>
          <div className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {formatTime(recipe.prepTime)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
            <Clock size={14} className="text-orange-500" />
            <span>Cook Time</span>
          </div>
          <div className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {formatTime(recipe.cookTime)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-1">
            <Timer size={14} className="text-orange-500" />
            <span>Total Time</span>
          </div>
          <div className="font-display text-lg sm:text-xl font-extrabold text-orange-600 dark:text-orange-400">
            {formatTime(totalTime)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
            <Users size={14} className="text-purple-500" />
            <span>Yield</span>
          </div>
          <div className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {servings} {servings === 1 ? 'serving' : 'servings'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-sm text-center col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">
            <ChefHat size={14} className="text-amber-500" />
            <span>Level</span>
          </div>
          <div className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {recipe.difficulty}
          </div>
        </div>
      </div>

      {/* 4. INGREDIENTS & INSTRUCTIONS GRID */}
      <div id="recipe-content" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 items-start scroll-mt-24">
        {/* Left Column: Ingredients with Servings Scaler */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-sm sticky top-28">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 mb-5">
            <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              Ingredients
            </h2>

            {/* Servings Scaler */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/70 rounded-full p-1 border border-slate-200/80 dark:border-slate-600 no-print">
              <button
                type="button"
                onClick={() => setServings((prev) => Math.max(1, prev - 1))}
                className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-orange-500 shadow-sm transition-colors"
                title="Decrease servings"
                aria-label="Decrease servings"
              >
                <Minus size={12} />
              </button>
              <span className="text-xs font-bold text-slate-800 dark:text-white px-1 min-w-[20px] text-center font-mono">
                {servings}
              </span>
              <button
                type="button"
                onClick={() => setServings((prev) => prev + 1)}
                className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-orange-500 shadow-sm transition-colors"
                title="Increase servings"
                aria-label="Increase servings"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 -mt-2 mb-5 no-print">
            Click any item to cross off as you prep.
          </p>

          <ul className="space-y-2.5">
            {recipe.ingredients.map((ing, idx) => {
              const isChecked = !!checkedIngredients[idx];
              const scaledQty = scaleQuantity(ing.quantity, scaleFactor);

              return (
                <li
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500'
                      : 'hover:bg-orange-50/50 dark:hover:bg-slate-700/40 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked
                        ? 'bg-orange-500 border-orange-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                    }`}
                  >
                    {isChecked && <Check size={13} strokeWidth={3} />}
                  </div>

                  <span className={`text-sm leading-snug flex-1 ${isChecked ? 'line-through text-slate-400' : ''} ${isCookingMode ? 'text-base font-semibold' : ''}`}>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {scaledQty}
                    </span>{' '}
                    <span>{ing.name}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Column: Numbered Editorial Steps */}
        <div className="lg:col-span-7 space-y-6">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Step-by-Step
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Instructions
            </h2>
          </div>

          <div className="space-y-4">
            {recipe.instructions.map((inst, idx) => {
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-all hover:border-orange-300 dark:hover:border-slate-600 ${
                    isCookingMode ? 'p-8 sm:p-9 text-lg' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/20 mt-0.5">
                    {idx + 1}
                  </div>

                  <div className="flex-1">
                    <p className={`text-slate-800 dark:text-slate-200 leading-relaxed font-normal ${isCookingMode ? 'text-lg sm:text-xl font-medium' : 'text-sm sm:text-base'}`}>
                      {inst.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. TAGS */}
      {recipe.tags && recipe.tags.length > 0 && !isCookingMode && (
        <div className="py-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
            Tags:
          </span>
          {recipe.tags.map((tag) => (
            <Link
              key={tag}
              to={`/recipes?search=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-orange-600 text-xs font-semibold transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* 6. INTERACTIVE RATING SECTION */}
      {!isCookingMode && (
        <div className="bg-gradient-to-br from-orange-50/70 to-amber-50/70 dark:from-slate-850 dark:to-slate-800 border border-orange-200/60 dark:border-slate-700 rounded-3xl p-8 sm:p-12 text-center my-12 no-print shadow-sm">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-slate-700 text-orange-500 flex items-center justify-center mx-auto shadow-sm">
              <Star size={24} className="fill-orange-500 text-orange-500" />
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Rate This Recipe
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              {hasRated
                ? "Your rating has been recorded. Thank you!"
                : "Did you cook this dish? Share your rating to let other home cooks know."}
            </p>

            <div className="pt-2 flex justify-center">
              <div className="bg-white dark:bg-slate-800 py-3 px-6 rounded-full border border-slate-200 dark:border-slate-700 shadow-md">
                <RatingStars
                  rating={0}
                  interactive={!ratingLoading && !hasRated}
                  onRate={handleRate}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. COMMENTS SECTION */}
      {!isCookingMode && (
        <div className="no-print">
          <CommentSection recipeId={id} toast={addToast} />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Recipe?"
        message={`Are you sure you want to delete "${recipe.title}"? This action cannot be undone.`}
        confirmLabel="Delete Recipe"
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </article>
  );
};

export default RecipeDetails;
