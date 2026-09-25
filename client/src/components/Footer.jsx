import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Instagram, Youtube, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group" aria-label="MISE home">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
                <Utensils size={19} className="stroke-[2.2]" />
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white block leading-none">
                  MISE<span className="text-orange-500">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mt-1">
                  The Kitchen Journal
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              An open archive of kitchen-tested recipes, seasonal preparations, and technique notes built for food lovers.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/40 transition-all shadow-xs"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/40 transition-all shadow-xs"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/40 transition-all shadow-xs text-xs font-bold font-sans"
                aria-label="Pinterest"
              >
                P
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Explore */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Explore
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/recipes" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    All Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/recipes?sort=rating" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    Highest Rated
                  </Link>
                </li>
                <li>
                  <Link to="/recipes?maxTime=30" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    Quick Meals (≤ 30m)
                  </Link>
                </li>
                <li>
                  <Link to="/recipes?saved=true" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5">
                    <Heart size={13} className="text-rose-500 fill-rose-500" />
                    <span>Saved Recipes</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Categories
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/recipes?category=Dinner" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    Dinner Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/recipes?category=Breakfast" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    Breakfast & Brunch
                  </Link>
                </li>
                <li>
                  <Link to="/recipes?category=Dessert" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    Desserts & Baking
                  </Link>
                </li>
                <li>
                  <Link to="/recipes?cuisine=Italian" className="text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                    Italian Cuisine
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contribute Column */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Contribute
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Add your trusted kitchen dishes and techniques to the community archive.
              </p>
              <div className="pt-1">
                <Link
                  to="/add-recipe"
                  className="btn-primary py-2 px-4 text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 w-full justify-center shadow-md"
                >
                  <span>Submit Recipe</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500 font-sans">
          <p>© {new Date().getFullYear()} MISE — The Kitchen Journal. All rights reserved.</p>
          <p>An open collection for kitchen cooks.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
