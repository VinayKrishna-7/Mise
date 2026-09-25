import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedRecipesContext = createContext();

export const SavedRecipesProvider = ({ children }) => {
  const [savedIds, setSavedIds] = useState(() => {
    try {
      // Backward-compatible localStorage key migration
      const stored = localStorage.getItem('mise_saved') || localStorage.getItem('recipehub_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('mise_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isSaved = (id) => savedIds.includes(id);

  return (
    <SavedRecipesContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

export const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
  }
  return context;
};
