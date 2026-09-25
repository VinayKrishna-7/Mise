import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Star,
  ChefHat,
  BookOpen,
  ArrowUpRight,
  Sparkles,
  Flame,
  Utensils
} from 'lucide-react';
import { getRecipes, getRecipeStats } from '../services/api';
import { CATEGORY_DATA, CUISINE_TILES, EDITORIAL_ARTICLES } from '../utils/constants';
import { formatTime, getImageUrl, handleImageError } from '../utils/helpers';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import RecipeGrid from '../components/RecipeGrid';

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [quickRecipes, setQuickRecipes] = useState([]);
  const [spotlightRecipe, setSpotlightRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'MISE — The Kitchen Journal';
    const fetchData = async () => {
      try {
        const [statsRes, featuredRes, latestRes, quickRes] = await Promise.all([
          getRecipeStats().catch(() => null),
          getRecipes({ sort: 'rating', limit: 5 }),
          getRecipes({ sort: 'newest', limit: 8 }),
          getRecipes({ maxTime: 30, limit: 8 })
        ]);

        if (statsRes?.data?.success) {
          setStats(statsRes.data.data);
        }

        const featuredList = featuredRes?.data?.data || [];
        if (featuredList.length > 0) {
          setSpotlightRecipe(featuredList[0]);
          setFeatured(featuredList.slice(1, 5));
        }

        setLatest(latestRes?.data?.data || []);
        setQuickRecipes(quickRes?.data?.data || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/recipes?category=${encodeURIComponent(category)}`);
  };

  const handleCuisineClick = (cuisine) => {
    navigate(`/recipes?cuisine=${encodeURIComponent(cuisine)}`);
  };

  const trendingTags = ['Biryani', 'Ramen', 'Pasta', 'Tacos', 'Dumplings', 'Curry', 'Pad Thai', 'Pancakes'];

  const spotlightTotalTime = spotlightRecipe
    ? (Number(spotlightRecipe.prepTime) || 0) + (Number(spotlightRecipe.cookTime) || 0)
    : 0;

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* 1. MODERN HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left z-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100/80 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50 shadow-sm">
                <Sparkles size={14} className="text-orange-500" />
                <span>The Modern Kitchen Journal</span>
              </span>

              <h1 className="font-display text-4xl sm:text-6xl md:text-6xl lg:text-[68px] font-extrabold text-slate-900 dark:text-white leading-[1.08] tracking-tight">
                Recipes for the way{' '}
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  you actually cook.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
                Explore an open collection of kitchen-tested recipes, weeknight favorites, quick dinners, and seasonal dishes.
              </p>

              {/* Search with Live Suggestions */}
              <div className="max-w-xl pt-1">
                <SearchBar
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSubmit={handleSearchSubmit}
                  enableSuggestions={true}
                  size="lg"
                  placeholder="What do you want to cook? e.g. Pasta, Tacos, Cake..."
                />

                {/* Trending Search Tags */}
                <div className="flex items-center gap-1.5 mt-3 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-600 dark:text-slate-400 mr-1">Popular:</span>
                  {trendingTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => navigate(`/recipes?search=${encodeURIComponent(tag)}`)}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-slate-700 transition-colors border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Database Metrics */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-6 sm:gap-8 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div>
                  <span className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mr-1.5">
                    {stats ? stats.totalRecipes : '123'}
                  </span>
                  <span>Recipes</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div>
                  <span className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mr-1.5">
                    {stats ? Object.keys(stats.cuisineCounts).length : '10'}
                  </span>
                  <span>Cuisines</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <div>
                  <span className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mr-1.5">
                    100%
                  </span>
                  <span>Free & Open</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual (Hero Spotlight Card) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group">
                <img
                  src={spotlightRecipe ? getImageUrl(spotlightRecipe.image) : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85"}
                  alt={spotlightRecipe ? spotlightRecipe.title : "Recipe presentation"}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Chef's Pick Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500 text-white shadow-lg flex items-center gap-1.5">
                    <Flame size={14} className="fill-white" />
                    <span>Featured Today</span>
                  </span>
                </div>

                {/* Floating Dish Card */}
                {spotlightRecipe && (
                  <Link
                    to={`/recipes/${spotlightRecipe._id}`}
                    className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 transition-all hover:border-orange-500/60 shadow-xl group/card"
                  >
                    <div className="flex items-center justify-between text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-1.5">
                      <span>{spotlightRecipe.cuisine} · {spotlightRecipe.category}</span>
                      <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full text-amber-700 dark:text-amber-400 border border-amber-200/60">
                        <Star size={11} className="text-amber-500 fill-amber-500" />
                        {Number(spotlightRecipe.averageRating || 5).toFixed(1)}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover/card:text-orange-500 transition-colors line-clamp-1">
                      {spotlightRecipe.title}
                    </h4>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-orange-500" />
                        {formatTime(spotlightTotalTime || spotlightRecipe.cookTime)}
                      </span>
                      <span className="font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1 group-hover/card:translate-x-1 transition-transform">
                        Cook Recipe <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY CATEGORY */}
      <section id="categories" className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl scroll-mt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Browse Categories
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/recipes"
            className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1.5"
          >
            <span>View all recipes</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORY_DATA.map((cat) => {
            const realCount = stats?.categoryCounts[cat.name]
              ? `${stats.categoryCounts[cat.name]} recipes`
              : cat.count;

            return (
              <CategoryCard
                key={cat.name}
                category={cat.name}
                image={cat.image}
                count={realCount}
                tagline={cat.tagline}
                onClick={handleCategoryClick}
              />
            );
          })}
        </div>
      </section>

      {/* 3. ASYMMETRICAL FEATURED RECIPE SHOWCASE */}
      {spotlightRecipe && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[460px] relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={getImageUrl(spotlightRecipe.image)}
                  alt={spotlightRecipe.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-5 left-5">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 dark:bg-slate-900/90 text-slate-900 dark:text-white shadow-lg backdrop-blur-md">
                    Featured Creation
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
                    {spotlightRecipe.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    · {spotlightRecipe.cuisine} Tradition
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {spotlightRecipe.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {spotlightRecipe.description}
                </p>

                <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-700 font-medium">
                  <div>
                    <span className="text-slate-900 dark:text-white font-bold mr-1">
                      {formatTime(spotlightTotalTime || spotlightRecipe.cookTime)}
                    </span>
                    <span>Total</span>
                  </div>
                  <div>
                    <span className="text-slate-900 dark:text-white font-bold mr-1">
                      {spotlightRecipe.difficulty}
                    </span>
                    <span>Difficulty</span>
                  </div>
                  {spotlightRecipe.averageRating > 0 && (
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={13} className="fill-amber-500" />
                      <span>{Number(spotlightRecipe.averageRating).toFixed(1)}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Link
                    to={`/recipes/${spotlightRecipe._id}`}
                    className="btn-primary py-3 px-7 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
                  >
                    <span>Cook This Recipe</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. HIGHEST RATED CREATIONS (4-column modern card grid) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Community Favorites
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Highest Rated Dishes
            </h2>
          </div>
          <Link
            to="/recipes?sort=rating"
            className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1.5"
          >
            <span>See all rated</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* 5. EXPLORE BY CUISINE (Modern Photographic Tiles) */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            Regional Traditions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Explore by Cuisine
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Authentic culinary techniques and flavors from kitchens across the globe.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CUISINE_TILES.map((cuisine) => {
            const realCount = stats?.cuisineCounts[cuisine.name]
              ? `${stats.cuisineCounts[cuisine.name]} recipes`
              : cuisine.recipesCount;

            return (
              <button
                key={cuisine.name}
                type="button"
                onClick={() => handleCuisineClick(cuisine.name)}
                className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <img
                  src={cuisine.image}
                  alt={cuisine.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent group-hover:from-black/90 transition-colors" />

                <div className="relative h-full p-5 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-orange-300">
                    {realCount}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-orange-200 transition-colors">
                    {cuisine.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 line-clamp-1 font-normal">
                    {cuisine.descriptor}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 6. QUICK RECIPES (Modern Horizontal Rail) */}
      <section className="bg-slate-100/70 dark:bg-slate-900/60 py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Fast & Delicious
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                Under 30 Minutes
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {stats ? stats.quickMealsCount : 72} delicious recipes ready in 30 minutes or less
              </p>
            </div>
            <Link
              to="/recipes?maxTime=30"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1.5"
            >
              <span>View all quick meals</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Horizontal scroll rail */}
          <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
            {quickRecipes.map((recipe) => (
              <div key={recipe._id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0 snap-start">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KITCHEN NOTES / JOURNAL ARTICLES */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Cooking Fundamentals
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Kitchen Notes & Guides
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <BookOpen size={14} className="text-orange-500" />
            <span>Technique Guides</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {EDITORIAL_ARTICLES.map((article) => (
            <Link
              key={article.id}
              to={article.targetUrl || '/recipes'}
              className="group bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider text-[11px]">
                      {article.tag}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-orange-500 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-orange-500">
                  <span className="uppercase tracking-wider text-[11px]">Read Guide</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 8. LATEST ADDITIONS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Fresh from the Kitchen
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Latest Recipes
            </h2>
          </div>
          <Link
            to="/recipes?sort=newest"
            className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center gap-1.5"
          >
            <span>Browse all new</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <RecipeGrid recipes={latest} loading={loading} skeletonCount={8} />
      </section>

      {/* 9. CONTRIBUTE CTA BANNER */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-14 lg:p-16 text-center text-white bg-gradient-to-br from-orange-600 via-orange-500 to-amber-600 shadow-2xl shadow-orange-500/20">
          <div className="max-w-xl mx-auto space-y-5">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-md inline-block">
              Contribute to MISE
            </span>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              Have a favorite recipe to share?
            </h2>

            <p className="text-sm text-white/90 leading-relaxed font-normal">
              Add your trusted kitchen dishes to organize them and share with passionate home cooks. No account required.
            </p>

            <div className="pt-2">
              <Link
                to="/add-recipe"
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Add Your Recipe</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
