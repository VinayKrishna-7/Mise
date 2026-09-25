export const FALLBACK_FOOD_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80';

export const handleImageError = (e) => {
  if (e && e.currentTarget) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_FOOD_IMAGE;
  }
};

export const formatTime = (mins) => {
  if (!mins && mins !== 0) return 'N/A';
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = (now - date) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export const truncateText = (text, maxLen = 100) => {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + '...';
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return FALLBACK_FOOD_IMAGE;
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}`;
};

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20';
    case 'Medium':
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20';
    case 'Hard':
      return 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20';
    default:
      return 'bg-neutral-500/10 text-neutral-700 dark:text-neutral-300 border-neutral-500/20';
  }
};

/**
 * Dynamically scale ingredient quantities based on servings multiplier
 */
export const scaleQuantity = (quantityStr, factor = 1) => {
  if (!quantityStr || factor === 1) return quantityStr;

  const match = quantityStr.trim().match(/^(\d+(?:\/\d+)?|\d*\.?\d+)\s*(.*)$/);
  if (!match) return quantityStr;

  const rawNum = match[1];
  const rest = match[2];

  let numValue;
  if (rawNum.includes('/')) {
    const [num, den] = rawNum.split('/');
    numValue = parseFloat(num) / parseFloat(den);
  } else {
    numValue = parseFloat(rawNum);
  }

  if (isNaN(numValue)) return quantityStr;

  const scaled = numValue * factor;
  let formatted;
  if (scaled % 1 === 0) {
    formatted = scaled.toString();
  } else if (Math.abs(scaled - 0.25) < 0.01) {
    formatted = '1/4';
  } else if (Math.abs(scaled - 0.33) < 0.02) {
    formatted = '1/3';
  } else if (Math.abs(scaled - 0.5) < 0.01) {
    formatted = '1/2';
  } else if (Math.abs(scaled - 0.75) < 0.01) {
    formatted = '3/4';
  } else {
    formatted = scaled.toFixed(1).replace(/\.0$/, '');
  }

  return rest ? `${formatted} ${rest}` : formatted;
};

export const buildQueryString = (params) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') qs.set(key, val);
  });
  return qs.toString();
};
