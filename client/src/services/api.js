import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Helper for anonymous creator token storage
export const getCreatorTokens = () => {
  try {
    // Backward-compatible localStorage key migration
    const raw = localStorage.getItem('mise_creator_tokens') || localStorage.getItem('recipehub_creator_tokens');
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const saveCreatorToken = (recipeId, token) => {
  try {
    const tokens = getCreatorTokens();
    tokens[recipeId] = token;
    localStorage.setItem('mise_creator_tokens', JSON.stringify(tokens));
  } catch (e) {}
};

export const hasCreatorToken = (recipeId) => {
  const tokens = getCreatorTokens();
  return Boolean(tokens[recipeId]);
};

// Anonymous client identifier for rate-limiting and voting protection
const getClientId = () => {
  try {
    let id = localStorage.getItem('mise_client_id');
    if (!id) {
      id = 'client_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('mise_client_id', id);
    }
    return id;
  } catch (e) {
    return 'anonymous';
  }
};

// Request interceptor: attach creator token and client id
api.interceptors.request.use((config) => {
  config.headers['x-client-id'] = getClientId();
  const match = config.url?.match(/\/recipes\/([a-zA-Z0-9]+)/);
  if (match && match[1]) {
    const recipeId = match[1];
    const tokens = getCreatorTokens();
    if (tokens[recipeId]) {
      config.headers['x-creator-token'] = tokens[recipeId];
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// Recipes
export const getRecipeStats = () => api.get('/recipes/stats');
export const getSearchSuggestions = (q) => api.get('/recipes/suggestions', { params: { q } });
export const getRecipes = (params = {}) => api.get('/recipes', { params });
export const getRecipe = (id) => api.get(`/recipes/${id}`);
export const createRecipe = (formData) =>
  api.post('/recipes', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateRecipe = (id, formData) =>
  api.put(`/recipes/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteRecipe = (id) => api.delete(`/recipes/${id}`);

// Ratings
export const addRating = (recipeId, rating) =>
  api.post(`/recipes/${recipeId}/rating`, { rating });
export const getRating = (recipeId) => api.get(`/recipes/${recipeId}/rating`);

// Comments
export const getComments = (recipeId) => api.get(`/recipes/${recipeId}/comments`);
export const addComment = (recipeId, data) => api.post(`/recipes/${recipeId}/comments`, data);
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);

export default api;
