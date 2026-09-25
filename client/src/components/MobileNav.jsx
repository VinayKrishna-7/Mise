import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Heart, PlusCircle } from 'lucide-react';
import { useSavedRecipes } from '../context/SavedRecipesContext';

const MobileNav = () => {
  const { savedIds } = useSavedRecipes();

  const items = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Recipes', to: '/recipes', icon: Compass },
    { name: 'Saved', to: '/recipes?saved=true', icon: Heart, badge: savedIds.length },
    { name: 'Add Recipe', to: '/add-recipe', icon: PlusCircle },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-2 transition-colors duration-200 shadow-lg"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-3 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? 'text-orange-600 dark:text-orange-400 font-bold scale-105'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <Icon size={20} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'} />
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="mt-1 tracking-tight text-[11px] font-medium">{item.name}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
