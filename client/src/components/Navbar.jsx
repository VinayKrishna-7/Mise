import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Heart, Menu, X, Plus, Utensils } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const Navbar = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { savedIds } = useSavedRecipes();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleCategoriesClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/#categories');
  };

  const navLinks = [
    { name: 'Discover', to: '/' },
    { name: 'Recipes', to: '/recipes' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 dark:border-slate-800'
            : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/60'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-16 sm:h-20 flex items-center justify-between">
          {/* Modern Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="MISE Kitchen">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 text-white flex items-center justify-center shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform duration-200">
              <Utensils size={20} className="stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white leading-none">
                MISE<span className="text-orange-500">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-0.5 leading-none">
                The Kitchen Journal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={handleCategoriesClick}
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
            >
              Categories
            </button>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Inline search toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center animate-scale-in">
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Search recipes, tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      onBlur={() => {
                        if (!searchQuery) setIsSearchOpen(false);
                      }}
                      className="w-64 pl-9 pr-8 py-2 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 flex items-center justify-center transition-colors"
                  title="Search recipes"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              )}
            </div>

            {/* Saved Bookmarks Link */}
            <Link
              to="/recipes?saved=true"
              className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400 flex items-center justify-center transition-colors"
              title="Saved Recipes"
              aria-label="Saved Recipes"
            >
              <Heart size={16} />
              {savedIds.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 flex items-center justify-center transition-colors"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Add Recipe Button */}
            <Link
              to="/add-recipe"
              className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus size={15} className="stroke-[2.5]" />
              <span>Add Recipe</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/recipes?saved=true"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 relative"
              aria-label="Saved Recipes"
            >
              <Heart size={18} />
              {savedIds.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 dark:text-white"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-down shadow-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search recipes, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </form>

            <div className="space-y-1 pt-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                onClick={handleCategoriesClick}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Categories
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <Link
                to="/add-recipe"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full py-2.5 text-xs font-semibold justify-center flex items-center gap-2"
              >
                <Plus size={16} />
                <span>Add Recipe</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
