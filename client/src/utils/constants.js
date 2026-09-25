export const CATEGORIES = [
  'Breakfast', 'Lunch', 'Dinner', 'Dessert',
  'Snacks', 'Drinks', 'Appetizers', 'Main Course'
];

export const CUISINES = [
  'Indian', 'Italian', 'Chinese', 'Mexican', 'American',
  'Thai', 'Japanese', 'Mediterranean', 'Korean', 'French'
];

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'rating_asc', label: 'Lowest Rated' },
  { value: 'fastest', label: 'Fastest Cooking' },
  { value: 'slowest', label: 'Longest Cooking' },
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
];

export const COOK_TIME_OPTIONS = [
  { value: '', label: 'Any Time' },
  { value: '15', label: 'Under 15 min' },
  { value: '30', label: 'Under 30 min' },
  { value: '60', label: 'Under 60 min' },
  { value: '120', label: 'Over 60 min' },
];

export const CATEGORY_DATA = [
  {
    name: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
    count: '12+ recipes',
    tagline: 'Morning meals'
  },
  {
    name: 'Lunch',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
    count: '14+ recipes',
    tagline: 'Midday meals'
  },
  {
    name: 'Dinner',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    count: '17+ recipes',
    tagline: 'Evening mains'
  },
  {
    name: 'Dessert',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80',
    count: '13+ recipes',
    tagline: 'Bakes & sweets'
  },
  {
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80',
    count: '14+ recipes',
    tagline: 'Quick bites'
  },
  {
    name: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    count: '13+ recipes',
    tagline: 'Hot & cold drinks'
  },
  {
    name: 'Appetizers',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=600&q=80',
    count: '13+ recipes',
    tagline: 'Starters & small plates'
  },
  {
    name: 'Main Course',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
    count: '15+ recipes',
    tagline: 'Mains & roasts'
  },
];

export const CUISINE_TILES = [
  {
    name: 'Italian',
    image: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=700&q=80',
    recipesCount: '12+ recipes',
    descriptor: 'Pasta, Olive Oil & Herbs'
  },
  {
    name: 'Indian',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&q=80',
    recipesCount: '12+ recipes',
    descriptor: 'Curries, Dal & Spiced Rice'
  },
  {
    name: 'Japanese',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&q=80',
    recipesCount: '10+ recipes',
    descriptor: 'Ramen, Dashi & Rice Bowls'
  },
  {
    name: 'Chinese',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=700&q=80',
    recipesCount: '10+ recipes',
    descriptor: 'Stir-Fries, Dumplings & Noodles'
  },
  {
    name: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&q=80',
    recipesCount: '11+ recipes',
    descriptor: 'Salsas, Chiles & Tacos'
  },
  {
    name: 'Thai',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=700&q=80',
    recipesCount: '10+ recipes',
    descriptor: 'Lemongrass, Coconut & Herbs'
  },
  {
    name: 'French',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&q=80',
    recipesCount: '10+ recipes',
    descriptor: 'Butter, Braises & Pastries'
  },
  {
    name: 'Mediterranean',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&q=80',
    recipesCount: '11+ recipes',
    descriptor: 'Olive Oil, Citrus & Grains'
  },
];

export const EDITORIAL_ARTICLES = [
  {
    id: 1,
    tag: 'Technique',
    title: 'Five Pantry Ingredients for Everyday Pasta',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=600&q=80',
    excerpt: 'Using starchy pasta water, cold butter, and freshly grated hard cheese to build a quick emulsified sauce.',
    targetUrl: '/recipes?search=Pasta'
  },
  {
    id: 2,
    tag: 'Baking',
    title: 'Bread Baking: Getting a Crisp Crust at Home',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    excerpt: 'How steam, hydration, and overnight cold fermentation produce a crisp, open-crumb loaf in a standard home oven.',
    targetUrl: '/recipes?category=Snacks'
  },
  {
    id: 3,
    tag: 'Technique',
    title: 'Balancing Heat, Sweetness, and Acid in Curries',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    excerpt: 'How finishing with lime, tamarind, yogurt, or fresh herbs balances rich, spiced gravies.',
    targetUrl: '/recipes?search=Curry'
  },
];
