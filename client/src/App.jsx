import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileNav from './components/MobileNav';
import LoadingSpinner from './components/LoadingSpinner';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { SavedRecipesProvider } from './context/SavedRecipesContext';

const Home = lazy(() => import('./pages/Home'));
const Recipes = lazy(() => import('./pages/Recipes'));
const RecipeDetails = lazy(() => import('./pages/RecipeDetails'));
const AddRecipe = lazy(() => import('./pages/AddRecipe'));
const EditRecipe = lazy(() => import('./pages/EditRecipe'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => (
  <ThemeProvider>
    <SavedRecipesProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark transition-colors duration-200">
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">
            <Suspense fallback={<LoadingSpinner text="Preparing fresh recipes..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipes/:id" element={<RecipeDetails />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/edit-recipe/:id" element={<EditRecipe />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <MobileNav />
        </div>
      </ToastProvider>
    </SavedRecipesProvider>
  </ThemeProvider>
);

export default App;
