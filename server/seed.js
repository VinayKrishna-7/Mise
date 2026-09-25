const connectDB = require('./config/db');
require('dotenv').config();

const Recipe = require('./models/Recipe');
const Comment = require('./models/Comment');
const Rating = require('./models/Rating');

const recipes = [
  {
    "title": "Fluffy Buttermilk Pancakes",
    "description": "Golden, pillowy buttermilk pancakes stacked high and served with melted butter and pure Vermont maple syrup.",
    "image": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80",
    "ingredients": [
      {
        "name": "All-purpose flour",
        "quantity": "2 cups"
      },
      {
        "name": "Buttermilk",
        "quantity": "2 cups"
      },
      {
        "name": "Eggs",
        "quantity": "2 large"
      },
      {
        "name": "Unsalted butter melted",
        "quantity": "4 tbsp"
      },
      {
        "name": "Baking powder",
        "quantity": "2 tsp"
      },
      {
        "name": "Baking soda",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Sugar",
        "quantity": "2 tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Pure maple syrup",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk together flour, baking powder, baking soda, sugar, and salt in a large bowl."
      },
      {
        "step": 2,
        "description": "In another bowl, whisk buttermilk, eggs, and melted butter until smooth."
      },
      {
        "step": 3,
        "description": "Gently fold wet ingredients into dry ingredients until just combined (lumps are fine)."
      },
      {
        "step": 4,
        "description": "Heat a buttered griddle over medium heat and ladle 1/4 cup batter per pancake."
      },
      {
        "step": 5,
        "description": "Cook until surface bubbles burst (2-3 min), flip and cook until golden brown (1-2 min)."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Breakfast",
    "cuisine": "American",
    "tags": [
      "breakfast",
      "pancakes",
      "sweet",
      "brunch",
      "comfort food",
      "kids favorite"
    ],
    "averageRating": 4.8,
    "ratingCount": 38,
    "_id": "43af64be792745a491c6c1d0",
    "createdAt": "2026-09-20T11:41:33.414Z",
    "updatedAt": "2026-09-20T11:41:33.414Z",
    "isSystem": true
  },
  {
    "title": "Classic French Herb Omelette",
    "description": "Silky, tender rolled French omelette infused with fresh tarragon, chives, and creamy European butter.",
    "image": "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh eggs",
        "quantity": "3 large"
      },
      {
        "name": "Unsalted butter",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Fresh chives finely minced",
        "quantity": "1 tbsp"
      },
      {
        "name": "Fresh tarragon minced",
        "quantity": "1 tsp"
      },
      {
        "name": "Gruyere or goat cheese",
        "quantity": "2 tbsp optional"
      },
      {
        "name": "Sea salt and white pepper",
        "quantity": "to taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Vigorously beat eggs with a pinch of salt until completely uniform with no visible egg whites."
      },
      {
        "step": 2,
        "description": "Melt butter in an 8-inch non-stick skillet over medium-low heat until frothy."
      },
      {
        "step": 3,
        "description": "Pour eggs into pan and vigorously swirl the pan with one hand while stirring with a silicone spatula."
      },
      {
        "step": 4,
        "description": "When eggs are soft curdled but still glossy on top, sprinkle herbs and cheese across center."
      },
      {
        "step": 5,
        "description": "Gently tilt the pan and roll the omelette into a neat cylinder onto a warm plate. Rub top with butter."
      }
    ],
    "prepTime": 5,
    "cookTime": 5,
    "servings": 1,
    "difficulty": "Medium",
    "category": "Breakfast",
    "cuisine": "French",
    "tags": [
      "breakfast",
      "eggs",
      "french",
      "healthy",
      "quick",
      "protein",
      "brunch"
    ],
    "averageRating": 4.9,
    "ratingCount": 29,
    "_id": "4f80042140e5016832e9b406",
    "createdAt": "2026-09-20T12:41:33.578Z",
    "updatedAt": "2026-09-20T12:41:33.578Z",
    "isSystem": true
  },
  {
    "title": "Sourdough Avocado Toast with Poached Egg",
    "description": "Crusty toasted sourdough topped with seasoned crushed avocado, soft-poached farm egg, red pepper flakes, and microgreens.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Avocado_toast_at_Voyager_Espresso_%2833134505776%29.jpg/1280px-Avocado_toast_at_Voyager_Espresso_%2833134505776%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Artisan sourdough bread slices",
        "quantity": "2 thick slices"
      },
      {
        "name": "Ripe Haas avocados",
        "quantity": "2"
      },
      {
        "name": "Farm fresh eggs",
        "quantity": "2"
      },
      {
        "name": "Lemon juice",
        "quantity": "1 tbsp"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "1 tbsp"
      },
      {
        "name": "Red pepper flakes",
        "quantity": "1/4 tsp"
      },
      {
        "name": "Flaky sea salt",
        "quantity": "pinch"
      },
      {
        "name": "Microgreens",
        "quantity": "handful"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Toast sourdough slices until deeply golden and crisp."
      },
      {
        "step": 2,
        "description": "Mash avocados with lemon juice, sea salt, black pepper, and olive oil."
      },
      {
        "step": 3,
        "description": "Simmer water with a splash of vinegar, create a whirlpool and drop eggs in to poach for 3 minutes."
      },
      {
        "step": 4,
        "description": "Generously spread avocado mash over toasted sourdough."
      },
      {
        "step": 5,
        "description": "Top with drained poached egg, chili flakes, and microgreens."
      }
    ],
    "prepTime": 10,
    "cookTime": 6,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Breakfast",
    "cuisine": "American",
    "tags": [
      "breakfast",
      "avocado",
      "brunch",
      "healthy",
      "vegetarian",
      "easy"
    ],
    "averageRating": 4.7,
    "ratingCount": 44,
    "_id": "9c9a25d5f1e20bbfcd96e724",
    "createdAt": "2026-09-20T13:41:34.027Z",
    "updatedAt": "2026-09-20T13:41:34.027Z",
    "isSystem": true
  },
  {
    "title": "Crispy Belgian Waffles with Fresh Berries",
    "description": "Deep pocketed, light and crispy Belgian waffles topped with fresh strawberries, blueberries, and whipped cream.",
    "image": "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800&q=80",
    "ingredients": [
      {
        "name": "Flour",
        "quantity": "2 cups"
      },
      {
        "name": "Cornstarch",
        "quantity": "2 tbsp"
      },
      {
        "name": "Baking powder",
        "quantity": "1 tbsp"
      },
      {
        "name": "Eggs separated",
        "quantity": "2 large"
      },
      {
        "name": "Whole milk",
        "quantity": "1.75 cups"
      },
      {
        "name": "Melted butter",
        "quantity": "1/3 cup"
      },
      {
        "name": "Vanilla extract",
        "quantity": "1 tsp"
      },
      {
        "name": "Fresh strawberries & blueberries",
        "quantity": "1 cup"
      },
      {
        "name": "Whipped cream",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat Belgian waffle maker."
      },
      {
        "step": 2,
        "description": "Whisk dry ingredients in a bowl. Beat egg whites to stiff peaks in a separate bowl."
      },
      {
        "step": 3,
        "description": "Whisk egg yolks, milk, melted butter, and vanilla. Stir into dry mixture."
      },
      {
        "step": 4,
        "description": "Gently fold whipped egg whites into batter to create maximum airy texture."
      },
      {
        "step": 5,
        "description": "Pour into waffle iron and bake 4-5 minutes until golden and crisp. Serve with fresh berries."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Breakfast",
    "cuisine": "American",
    "tags": [
      "breakfast",
      "waffles",
      "sweet",
      "brunch",
      "baking"
    ],
    "averageRating": 4.8,
    "ratingCount": 31,
    "_id": "5b021228bafb54f7c5908d64",
    "createdAt": "2026-09-20T14:41:34.195Z",
    "updatedAt": "2026-09-20T14:41:34.195Z",
    "isSystem": true
  },
  {
    "title": "North African Shakshuka with Feta",
    "description": "Tender eggs gently poached in a simmering skillet of spiced tomatoes, bell peppers, onions, cumin, and crumbled feta cheese.",
    "image": "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    "ingredients": [
      {
        "name": "Olive oil",
        "quantity": "2 tbsp"
      },
      {
        "name": "Yellow onion chopped",
        "quantity": "1 medium"
      },
      {
        "name": "Red bell pepper diced",
        "quantity": "1 large"
      },
      {
        "name": "Garlic cloves minced",
        "quantity": "4"
      },
      {
        "name": "Ground cumin",
        "quantity": "1 tsp"
      },
      {
        "name": "Smoked paprika",
        "quantity": "1 tsp"
      },
      {
        "name": "Canned crushed tomatoes",
        "quantity": "28 oz"
      },
      {
        "name": "Eggs",
        "quantity": "5 large"
      },
      {
        "name": "Feta cheese crumbled",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh cilantro or parsley",
        "quantity": "chopped"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat olive oil in a cast iron skillet over medium heat. Sauté onion and red pepper for 6 minutes."
      },
      {
        "step": 2,
        "description": "Add minced garlic, cumin, paprika, and chili flakes; cook until fragrant for 1 minute."
      },
      {
        "step": 3,
        "description": "Pour in crushed tomatoes, season with salt and pepper, and simmer on low for 10 minutes until thick."
      },
      {
        "step": 4,
        "description": "Make 5 small wells in sauce with a spoon; crack an egg directly into each well."
      },
      {
        "step": 5,
        "description": "Cover skillet and simmer 6-8 minutes until egg whites are set and yolks remain runny. Top with feta."
      }
    ],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Breakfast",
    "cuisine": "Mediterranean",
    "tags": [
      "breakfast",
      "shakshuka",
      "eggs",
      "mediterranean",
      "vegetarian",
      "healthy",
      "brunch"
    ],
    "averageRating": 4.9,
    "ratingCount": 52,
    "_id": "30bb8aeeb006302e3c0eb10b",
    "createdAt": "2026-09-20T15:41:34.375Z",
    "updatedAt": "2026-09-20T15:41:34.375Z",
    "isSystem": true
  },
  {
    "title": "Vibrant Acai Superfood Smoothie Bowl",
    "description": "Thick, frosty organic acai blended with banana and almond milk, crowned with sliced kiwi, coconut flakes, chia seeds, and granola.",
    "image": "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    "ingredients": [
      {
        "name": "Frozen unsweetened acai packet",
        "quantity": "200g"
      },
      {
        "name": "Frozen bananas",
        "quantity": "2 medium"
      },
      {
        "name": "Frozen mixed berries",
        "quantity": "1 cup"
      },
      {
        "name": "Almond milk",
        "quantity": "1/3 cup"
      },
      {
        "name": "Artisan granola",
        "quantity": "1/2 cup"
      },
      {
        "name": "Chia seeds",
        "quantity": "1 tbsp"
      },
      {
        "name": "Toasted coconut flakes",
        "quantity": "2 tbsp"
      },
      {
        "name": "Fresh sliced kiwi and berries",
        "quantity": "handful"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Run acai packets under warm water for 5 seconds to soften slightly, then break into blender."
      },
      {
        "step": 2,
        "description": "Add frozen bananas, berries, and almond milk to a high-speed blender."
      },
      {
        "step": 3,
        "description": "Blend on low using the tamper to push down fruit until a thick soft-serve consistency forms."
      },
      {
        "step": 4,
        "description": "Spoon immediately into wide bowls."
      },
      {
        "step": 5,
        "description": "Artfully arrange granola, fresh fruit, chia seeds, and coconut flakes on top. Drizzle honey if desired."
      }
    ],
    "prepTime": 10,
    "cookTime": 0,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Breakfast",
    "cuisine": "American",
    "tags": [
      "breakfast",
      "smoothie bowl",
      "acai",
      "vegan",
      "healthy",
      "raw",
      "clean eating"
    ],
    "averageRating": 4.7,
    "ratingCount": 36,
    "_id": "327ebd400dda03d46d2c91c1",
    "createdAt": "2026-09-20T16:41:34.531Z",
    "updatedAt": "2026-09-20T16:41:34.531Z",
    "isSystem": true
  },
  {
    "title": "Classic Eggs Benedict with Citrus Hollandaise",
    "description": "Toasted English muffins layered with seared Canadian bacon, poached eggs, and silky lemon butter hollandaise sauce.",
    "image": "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
    "ingredients": [
      {
        "name": "English muffins split",
        "quantity": "2"
      },
      {
        "name": "Canadian bacon or ham",
        "quantity": "4 slices"
      },
      {
        "name": "Fresh eggs for poaching",
        "quantity": "4"
      },
      {
        "name": "Egg yolks for sauce",
        "quantity": "3"
      },
      {
        "name": "Melted warm butter",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh lemon juice",
        "quantity": "1 tbsp"
      },
      {
        "name": "Cayenne pepper",
        "quantity": "pinch"
      },
      {
        "name": "Fresh chives",
        "quantity": "1 tbsp minced"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Make hollandaise: blend egg yolks and lemon juice in blender; slowly stream in warm melted butter until thick."
      },
      {
        "step": 2,
        "description": "Poach 4 eggs in gentle simmering water for 3 minutes until whites set and yolks remain soft."
      },
      {
        "step": 3,
        "description": "Lightly sear Canadian bacon slices in a skillet until browned at edges."
      },
      {
        "step": 4,
        "description": "Toast English muffin halves and place 1 slice of bacon on each half."
      },
      {
        "step": 5,
        "description": "Top with poached egg, ladle warm hollandaise over top, and dust with cayenne and chives."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Breakfast",
    "cuisine": "American",
    "tags": [
      "breakfast",
      "eggs benedict",
      "brunch",
      "gourmet",
      "classic"
    ],
    "averageRating": 4.8,
    "ratingCount": 41,
    "_id": "2cf5d570fcb34a9887f7f49e",
    "createdAt": "2026-09-20T17:41:34.664Z",
    "updatedAt": "2026-09-20T17:41:34.664Z",
    "isSystem": true
  },
  {
    "title": "Crispy South Indian Masala Dosa",
    "description": "Paper-thin fermented rice and lentil crepe stuffed with spiced mustard-tempered potato masala, served with coconut chutney.",
    "image": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80",
    "ingredients": [
      {
        "name": "Dosa batter fermented",
        "quantity": "2 cups"
      },
      {
        "name": "Potatoes boiled and mashed",
        "quantity": "3 medium"
      },
      {
        "name": "Onions sliced",
        "quantity": "1 large"
      },
      {
        "name": "Mustard seeds",
        "quantity": "1 tsp"
      },
      {
        "name": "Curry leaves",
        "quantity": "10-12 leaves"
      },
      {
        "name": "Green chilies chopped",
        "quantity": "2"
      },
      {
        "name": "Turmeric powder",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Ghee or butter",
        "quantity": "3 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat oil in a pan; add mustard seeds, curry leaves, green chilies, and onions until translucent."
      },
      {
        "step": 2,
        "description": "Add turmeric, mashed potatoes, salt, and 1/4 cup water. Simmer 3 minutes until cohesive."
      },
      {
        "step": 3,
        "description": "Heat cast iron tawa to high, splash water, wipe dry, and pour a ladleful of batter in concentric circles."
      },
      {
        "step": 4,
        "description": "Drizzle ghee around the edges and cook on medium until crisp and golden brown underneath."
      },
      {
        "step": 5,
        "description": "Place potato masala in center, fold edges over, and serve hot with coconut chutney and sambar."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 3,
    "difficulty": "Hard",
    "category": "Breakfast",
    "cuisine": "Indian",
    "tags": [
      "breakfast",
      "dosa",
      "indian",
      "vegetarian",
      "gluten-free",
      "crispy"
    ],
    "averageRating": 4.9,
    "ratingCount": 50,
    "_id": "f2b3b206485e74bf0f9ae1f0",
    "createdAt": "2026-09-20T18:41:35.051Z",
    "updatedAt": "2026-09-20T18:41:35.051Z",
    "isSystem": true
  },
  {
    "title": "Warm Blueberry Pecan Baked Oatmeal",
    "description": "Comforting, cake-like baked oats loaded with juicy blueberries, crunchy pecans, cinnamon, and pure maple syrup.",
    "image": "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80",
    "ingredients": [
      {
        "name": "Old-fashioned rolled oats",
        "quantity": "2 cups"
      },
      {
        "name": "Fresh or frozen blueberries",
        "quantity": "1.5 cups"
      },
      {
        "name": "Toasted chopped pecans",
        "quantity": "1/2 cup"
      },
      {
        "name": "Almond milk or whole milk",
        "quantity": "1.5 cups"
      },
      {
        "name": "Pure maple syrup",
        "quantity": "1/3 cup"
      },
      {
        "name": "Egg",
        "quantity": "1 large"
      },
      {
        "name": "Melted coconut oil",
        "quantity": "2 tbsp"
      },
      {
        "name": "Ground cinnamon",
        "quantity": "1 tsp"
      },
      {
        "name": "Baking powder",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat oven to 375°F (190°C) and grease an 8x8 inch baking dish."
      },
      {
        "step": 2,
        "description": "Mix oats, pecans, cinnamon, baking powder, and a pinch of salt together."
      },
      {
        "step": 3,
        "description": "Whisk milk, maple syrup, egg, and melted coconut oil in a bowl."
      },
      {
        "step": 4,
        "description": "Layer half the blueberries in dish, top with oat mixture, pour wet ingredients evenly, then top with remaining berries."
      },
      {
        "step": 5,
        "description": "Bake for 35-40 minutes until golden and set. Serve warm with splash of cold milk."
      }
    ],
    "prepTime": 10,
    "cookTime": 35,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Breakfast",
    "cuisine": "American",
    "tags": [
      "breakfast",
      "oatmeal",
      "healthy",
      "baking",
      "blueberries",
      "meal prep"
    ],
    "averageRating": 4.6,
    "ratingCount": 27,
    "_id": "8e8bb7971cd2e79a5ca3dba1",
    "createdAt": "2026-09-20T19:41:35.251Z",
    "updatedAt": "2026-09-20T19:41:35.251Z",
    "isSystem": true
  },
  {
    "title": "California Sunrise Breakfast Burrito",
    "description": "Warm flour tortilla packed with fluffy scrambled eggs, crispy tater tots, smoked bacon, cheddar, and house salsa.",
    "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80",
    "ingredients": [
      {
        "name": "Large flour tortillas (12-inch)",
        "quantity": "2"
      },
      {
        "name": "Eggs scrambled with cream",
        "quantity": "4"
      },
      {
        "name": "Crispy bacon strips",
        "quantity": "4 slices"
      },
      {
        "name": "Crispy tater tots or hashbrowns",
        "quantity": "1 cup"
      },
      {
        "name": "Cheddar & Monterey Jack cheese",
        "quantity": "1 cup shredded"
      },
      {
        "name": "Fresh guacamole",
        "quantity": "1/4 cup"
      },
      {
        "name": "Pico de gallo salsa",
        "quantity": "1/4 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Bake or fry tater tots until deeply crispy. Fry bacon until crunchy."
      },
      {
        "step": 2,
        "description": "Scramble eggs gently over medium-low heat with butter until soft curds form."
      },
      {
        "step": 3,
        "description": "Warm tortillas on a dry skillet for 20 seconds per side so they become pliable."
      },
      {
        "step": 4,
        "description": "Layer cheese, hot scrambled eggs, crispy tots, bacon, guacamole, and pico de gallo in center."
      },
      {
        "step": 5,
        "description": "Tuck sides in, roll tightly into a burrito, and sear seam-side down on hot skillet until golden."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Breakfast",
    "cuisine": "Mexican",
    "tags": [
      "breakfast",
      "burrito",
      "eggs",
      "bacon",
      "brunch",
      "hearty"
    ],
    "averageRating": 4.8,
    "ratingCount": 46,
    "_id": "e390be8d54fcb84a6649497f",
    "createdAt": "2026-09-20T20:41:35.421Z",
    "updatedAt": "2026-09-20T20:41:35.421Z",
    "isSystem": true
  },
  {
    "title": "Grilled Chicken Caesar Salad",
    "description": "Crisp romaine hearts tossed with artisan garlic-herb croutons, shaved parmesan, grilled chicken breast, and creamy Caesar dressing.",
    "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    "ingredients": [
      {
        "name": "Romaine lettuce hearts chopped",
        "quantity": "2 large heads"
      },
      {
        "name": "Chicken breast grilled & sliced",
        "quantity": "300g"
      },
      {
        "name": "Parmigiano-Reggiano shaved",
        "quantity": "1/2 cup"
      },
      {
        "name": "Garlic sourdough croutons",
        "quantity": "1 cup"
      },
      {
        "name": "Caesar dressing",
        "quantity": "1/3 cup"
      },
      {
        "name": "Lemon wedges",
        "quantity": "2"
      },
      {
        "name": "Freshly cracked black pepper",
        "quantity": "to taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Season chicken with olive oil, salt, garlic powder, and grill for 6-7 min per side until cooked."
      },
      {
        "step": 2,
        "description": "Wash and dry romaine thoroughly so dressing adheres cleanly."
      },
      {
        "step": 3,
        "description": "In a chilled bowl, toss lettuce with Caesar dressing until evenly coated."
      },
      {
        "step": 4,
        "description": "Plate dressed greens, top with warm sliced grilled chicken, croutons, and shaved parmesan."
      },
      {
        "step": 5,
        "description": "Finish with fresh lemon juice and coarse black pepper."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "American",
    "tags": [
      "lunch",
      "salad",
      "chicken",
      "caesar",
      "healthy",
      "high protein"
    ],
    "averageRating": 4.7,
    "ratingCount": 39,
    "_id": "cb0b8ccd2d366e90911488af",
    "createdAt": "2026-09-20T21:41:35.591Z",
    "updatedAt": "2026-09-20T21:41:35.591Z",
    "isSystem": true
  },
  {
    "title": "Mediterranean Quinoa Power Bowl",
    "description": "Fluffy seasoned quinoa with crisp cucumbers, cherry tomatoes, kalamata olives, chickpeas, feta, and lemon-herb vinaigrette.",
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    "ingredients": [
      {
        "name": "Cooked white quinoa",
        "quantity": "2 cups"
      },
      {
        "name": "Persian cucumbers diced",
        "quantity": "2"
      },
      {
        "name": "Cherry tomatoes halved",
        "quantity": "1 cup"
      },
      {
        "name": "Kalamata olives pitted",
        "quantity": "1/2 cup"
      },
      {
        "name": "Cooked chickpeas rinsed",
        "quantity": "1 can (15 oz)"
      },
      {
        "name": "Feta cheese crumbled",
        "quantity": "1/2 cup"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh lemon juice & oregano",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Cook quinoa according to package directions and let cool to room temperature."
      },
      {
        "step": 2,
        "description": "Whisk olive oil, lemon juice, dried oregano, salt, and pepper in a small jar."
      },
      {
        "step": 3,
        "description": "Divide quinoa between bowls as the base."
      },
      {
        "step": 4,
        "description": "Section cucumbers, tomatoes, chickpeas, and olives neatly over the quinoa."
      },
      {
        "step": 5,
        "description": "Drizzle vinaigrette over the bowl and garnish with crumbled feta and fresh mint."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Mediterranean",
    "tags": [
      "lunch",
      "healthy",
      "quinoa",
      "salad",
      "vegetarian",
      "meal prep"
    ],
    "averageRating": 4.8,
    "ratingCount": 33,
    "_id": "8abab530f58aace485a79510",
    "createdAt": "2026-09-20T22:41:35.738Z",
    "updatedAt": "2026-09-20T22:41:35.738Z",
    "isSystem": true
  },
  {
    "title": "Prosciutto Caprese Panini with Pesto",
    "description": "Pressed Italian ciabatta layered with genovese basil pesto, prosciutto di Parma, ripe beefsteak tomatoes, and fresh buffalo mozzarella.",
    "image": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    "ingredients": [
      {
        "name": "Ciabatta bread loaves halved",
        "quantity": "2"
      },
      {
        "name": "Fresh buffalo mozzarella sliced",
        "quantity": "200g"
      },
      {
        "name": "Ripe tomatoes sliced",
        "quantity": "2 medium"
      },
      {
        "name": "Prosciutto di Parma",
        "quantity": "6 thin slices"
      },
      {
        "name": "Basil pesto",
        "quantity": "3 tbsp"
      },
      {
        "name": "Balsamic glaze",
        "quantity": "1 tbsp"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Slice ciabatta loaves horizontally and spread basil pesto generously on both cut sides."
      },
      {
        "step": 2,
        "description": "Layer sliced mozzarella, prosciutto, and tomatoes inside."
      },
      {
        "step": 3,
        "description": "Drizzle with balsamic glaze and light crack of black pepper."
      },
      {
        "step": 4,
        "description": "Brush exterior bread lightly with olive oil."
      },
      {
        "step": 5,
        "description": "Grill in a panini press or heavy skillet with a weight on top for 5-6 min until bread is crisp and cheese melts."
      }
    ],
    "prepTime": 10,
    "cookTime": 6,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "lunch",
      "panini",
      "sandwich",
      "italian",
      "cheese",
      "quick"
    ],
    "averageRating": 4.9,
    "ratingCount": 47,
    "_id": "cead65f76bb0ab1d642c4670",
    "createdAt": "2026-09-20T23:41:35.925Z",
    "updatedAt": "2026-09-20T23:41:35.925Z",
    "isSystem": true
  },
  {
    "title": "Japanese Teriyaki Chicken Donburi",
    "description": "Succulent pan-glazed chicken thigh in sweet soy teriyaki over steamed short-grain rice with steamed broccoli and sesame seeds.",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    "ingredients": [
      {
        "name": "Boneless chicken thighs",
        "quantity": "400g"
      },
      {
        "name": "Steamed Japanese rice",
        "quantity": "3 cups"
      },
      {
        "name": "Soy sauce",
        "quantity": "3 tbsp"
      },
      {
        "name": "Mirin",
        "quantity": "3 tbsp"
      },
      {
        "name": "Sake",
        "quantity": "2 tbsp"
      },
      {
        "name": "Brown sugar",
        "quantity": "1 tbsp"
      },
      {
        "name": "Grated fresh ginger",
        "quantity": "1 tsp"
      },
      {
        "name": "Steamed broccoli florets",
        "quantity": "1 cup"
      },
      {
        "name": "Toasted white sesame seeds",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk soy sauce, mirin, sake, sugar, and grated ginger in a small bowl."
      },
      {
        "step": 2,
        "description": "Sear chicken thighs skin-side down in a hot skillet for 6 minutes until crisp, then flip."
      },
      {
        "step": 3,
        "description": "Wipe excess oil from pan, pour in teriyaki sauce, and simmer until sauce thickens to a glossy glaze."
      },
      {
        "step": 4,
        "description": "Slice chicken into thick diagonal strips."
      },
      {
        "step": 5,
        "description": "Fill bowls with hot rice, arrange glazed chicken and broccoli on top, spoon over remaining sauce, and garnish with sesame."
      }
    ],
    "prepTime": 10,
    "cookTime": 15,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Lunch",
    "cuisine": "Japanese",
    "tags": [
      "lunch",
      "donburi",
      "chicken",
      "teriyaki",
      "japanese",
      "rice bowl"
    ],
    "averageRating": 4.8,
    "ratingCount": 35,
    "_id": "5e91d5cf0b08e87d21290490",
    "createdAt": "2026-09-21T00:41:36.110Z",
    "updatedAt": "2026-09-21T00:41:36.110Z",
    "isSystem": true
  },
  {
    "title": "Crispy Pork Belly Vietnamese Banh Mi",
    "description": "Crispy French baguette stuffed with tender roasted pork belly, chicken liver pâté, pickled daikon and carrot, fresh jalapeño, and cilantro.",
    "image": "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&q=80",
    "ingredients": [
      {
        "name": "Vietnamese or French baguettes",
        "quantity": "2 individual"
      },
      {
        "name": "Crispy roasted pork belly sliced",
        "quantity": "250g"
      },
      {
        "name": "Chicken liver pâté or mayo",
        "quantity": "3 tbsp"
      },
      {
        "name": "Pickled daikon and carrots (Do Chua)",
        "quantity": "1/2 cup"
      },
      {
        "name": "English cucumber sliced into ribbons",
        "quantity": "1/2"
      },
      {
        "name": "Jalapeño pepper sliced",
        "quantity": "1"
      },
      {
        "name": "Fresh cilantro sprigs",
        "quantity": "handful"
      },
      {
        "name": "Maggi seasoning sauce",
        "quantity": "few dashes"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Warm baguette in a hot oven for 3 minutes until the crust is shatteringly crisp."
      },
      {
        "step": 2,
        "description": "Slice baguette lengthwise and spread pâté and mayonnaise generously inside."
      },
      {
        "step": 3,
        "description": "Layer warm crispy pork belly slices."
      },
      {
        "step": 4,
        "description": "Stuff with pickled carrots & daikon, cucumber ribbons, and jalapeño slices."
      },
      {
        "step": 5,
        "description": "Finish with fresh cilantro sprigs and a dash of Maggi sauce."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Lunch",
    "cuisine": "Vietnamese",
    "tags": [
      "lunch",
      "sandwich",
      "banh mi",
      "vietnamese",
      "crispy",
      "street food"
    ],
    "averageRating": 4.9,
    "ratingCount": 43,
    "_id": "d667aeee24c8e91fe3b7c877",
    "createdAt": "2026-09-21T01:41:36.490Z",
    "updatedAt": "2026-09-21T01:41:36.490Z",
    "isSystem": true
  },
  {
    "title": "Classic Greek Village Salad (Horiatiki)",
    "description": "Authentic rustic Greek salad of ripe vine tomatoes, crisp cucumbers, red onions, Greek kalamata olives, and a block of creamy sheep's milk feta.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Greece_Food_Horiatiki.JPG/1280px-Greece_Food_Horiatiki.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Vine-ripened tomatoes wedged",
        "quantity": "4 medium"
      },
      {
        "name": "Cucumbers peeled & sliced thick",
        "quantity": "2"
      },
      {
        "name": "Red onion thinly sliced",
        "quantity": "1/2 small"
      },
      {
        "name": "Green bell pepper sliced into rings",
        "quantity": "1"
      },
      {
        "name": "Kalamata olives with pits",
        "quantity": "1/2 cup"
      },
      {
        "name": "Block of Greek feta cheese",
        "quantity": "200g"
      },
      {
        "name": "Extra virgin Greek olive oil",
        "quantity": "1/4 cup"
      },
      {
        "name": "Red wine vinegar & dried oregano",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a wide shallow bowl, combine tomatoes, cucumbers, bell pepper, and red onions."
      },
      {
        "step": 2,
        "description": "Scatter kalamata olives over the vegetables."
      },
      {
        "step": 3,
        "description": "Whisk Greek olive oil, red wine vinegar, and sea salt; drizzle over salad."
      },
      {
        "step": 4,
        "description": "Place the intact block of feta directly on top."
      },
      {
        "step": 5,
        "description": "Generously sprinkle dried wild Greek oregano and extra olive oil over the feta cheese."
      }
    ],
    "prepTime": 10,
    "cookTime": 0,
    "servings": 3,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Mediterranean",
    "tags": [
      "lunch",
      "greek",
      "salad",
      "feta",
      "vegetarian",
      "healthy",
      "no-cook"
    ],
    "averageRating": 4.7,
    "ratingCount": 31,
    "_id": "08fc28017733c136abcf7b97",
    "createdAt": "2026-09-21T02:41:36.638Z",
    "updatedAt": "2026-09-21T02:41:36.638Z",
    "isSystem": true
  },
  {
    "title": "Spicy Thai Green Papaya Salad (Som Tum)",
    "description": "Pounded shredded green papaya with bird's eye chilies, garlic, green beans, crushed peanuts, lime juice, and sweet palm sugar.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/2013_Tam_Lao.jpg/1280px-2013_Tam_Lao.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Shredded green papaya",
        "quantity": "3 cups"
      },
      {
        "name": "Thai bird's eye chilies",
        "quantity": "2-3"
      },
      {
        "name": "Garlic cloves",
        "quantity": "3"
      },
      {
        "name": "Yardlong green beans cut in 1-inch lengths",
        "quantity": "4"
      },
      {
        "name": "Cherry tomatoes halved",
        "quantity": "6"
      },
      {
        "name": "Roasted peanuts",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fish sauce",
        "quantity": "2 tbsp"
      },
      {
        "name": "Palm sugar or brown sugar",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Fresh lime juice",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a clay mortar, pound garlic and chilies together with a pestle until crushed."
      },
      {
        "step": 2,
        "description": "Add palm sugar, fish sauce, and lime juice; stir to dissolve sugar."
      },
      {
        "step": 3,
        "description": "Toss in green beans and cherry tomatoes; bruise gently with pestle."
      },
      {
        "step": 4,
        "description": "Add shredded papaya and pound lightly while tossing with a spoon to infuse the dressing."
      },
      {
        "step": 5,
        "description": "Transfer to a plate and shower with crushed roasted peanuts."
      }
    ],
    "prepTime": 15,
    "cookTime": 0,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Lunch",
    "cuisine": "Thai",
    "tags": [
      "lunch",
      "thai",
      "salad",
      "spicy",
      "healthy",
      "refreshing"
    ],
    "averageRating": 4.8,
    "ratingCount": 28,
    "_id": "f15208591e4c001ae6bacf71",
    "createdAt": "2026-09-21T03:41:36.945Z",
    "updatedAt": "2026-09-21T03:41:36.945Z",
    "isSystem": true
  },
  {
    "title": "Hearty Tuscan White Bean & Kale Soup",
    "description": "Comforting Italian ribollita soup with cannellini beans, tender lacinato kale, mirepoix vegetables, and parmesan broth.",
    "image": "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    "ingredients": [
      {
        "name": "Cannellini beans rinsed & drained",
        "quantity": "2 cans (15 oz)"
      },
      {
        "name": "Lacinato Tuscan kale chopped",
        "quantity": "1 bunch"
      },
      {
        "name": "Carrots diced",
        "quantity": "2 medium"
      },
      {
        "name": "Celery stalks diced",
        "quantity": "2"
      },
      {
        "name": "Yellow onion diced",
        "quantity": "1"
      },
      {
        "name": "Garlic minced",
        "quantity": "4 cloves"
      },
      {
        "name": "Vegetable or chicken broth",
        "quantity": "4 cups"
      },
      {
        "name": "Parmesan rind",
        "quantity": "1 piece"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat olive oil in a Dutch oven over medium heat; sauté onion, carrots, and celery for 8 minutes."
      },
      {
        "step": 2,
        "description": "Stir in minced garlic and cook 1 minute until fragrant."
      },
      {
        "step": 3,
        "description": "Add broth, one can of whole beans, and mash the other can of beans with a fork before adding (to thicken soup)."
      },
      {
        "step": 4,
        "description": "Drop in the parmesan rind, season with salt and pepper, and simmer for 20 minutes."
      },
      {
        "step": 5,
        "description": "Stir in chopped kale and cook 5 minutes until tender. Discard rind and serve with crusty bread."
      }
    ],
    "prepTime": 15,
    "cookTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "lunch",
      "soup",
      "italian",
      "beans",
      "kale",
      "comfort food",
      "healthy"
    ],
    "averageRating": 4.7,
    "ratingCount": 34,
    "_id": "e79d9f50918bf973f5b75d97",
    "createdAt": "2026-09-21T04:41:37.110Z",
    "updatedAt": "2026-09-21T04:41:37.110Z",
    "isSystem": true
  },
  {
    "title": "Smoked Salmon & Dill Cream Cheese Bagel",
    "description": "New York style toasted everything bagel slathered with lemon-dill cream cheese, cold-smoked Atlantic salmon, red onion, and capers.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/NCI_cream_cheese_bagel.jpg/1280px-NCI_cream_cheese_bagel.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Everything bagels toasted",
        "quantity": "2"
      },
      {
        "name": "Cold-smoked salmon (lox)",
        "quantity": "150g"
      },
      {
        "name": "Cream cheese softened",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh dill chopped",
        "quantity": "1 tbsp"
      },
      {
        "name": "Lemon zest",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Red onion thinly sliced",
        "quantity": "1/4 cup"
      },
      {
        "name": "Capers drained",
        "quantity": "1 tbsp"
      },
      {
        "name": "Ripe tomato sliced",
        "quantity": "1"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Mix softened cream cheese with fresh dill, lemon zest, and a pinch of black pepper."
      },
      {
        "step": 2,
        "description": "Split and toast everything bagels until golden and crispy."
      },
      {
        "step": 3,
        "description": "Slather both bagel halves generously with the lemon-dill cream cheese."
      },
      {
        "step": 4,
        "description": "Layer slices of ripe tomato and ribbons of cold-smoked salmon on bottom halves."
      },
      {
        "step": 5,
        "description": "Top with red onion rings, briny capers, and a sprig of fresh dill."
      }
    ],
    "prepTime": 10,
    "cookTime": 2,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "American",
    "tags": [
      "lunch",
      "bagel",
      "salmon",
      "seafood",
      "quick",
      "brunch"
    ],
    "averageRating": 4.9,
    "ratingCount": 45,
    "_id": "a221b946ba7a1e8260cd23a4",
    "createdAt": "2026-09-21T05:41:37.256Z",
    "updatedAt": "2026-09-21T05:41:37.256Z",
    "isSystem": true
  },
  {
    "title": "Fiesta Black Bean & Rice Burrito Bowl",
    "description": "Zesty cilantro-lime brown rice topped with seasoned black beans, sweet charred corn, fresh salsa, avocado, and chipotle crema.",
    "image": "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80",
    "ingredients": [
      {
        "name": "Cooked brown rice",
        "quantity": "2 cups"
      },
      {
        "name": "Black beans simmered with cumin",
        "quantity": "1 can (15 oz)"
      },
      {
        "name": "Charred sweet corn kernels",
        "quantity": "1 cup"
      },
      {
        "name": "Ripe avocado diced",
        "quantity": "1 large"
      },
      {
        "name": "Fresh pico de gallo",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh cilantro chopped",
        "quantity": "1/4 cup"
      },
      {
        "name": "Lime juice",
        "quantity": "2 tbsp"
      },
      {
        "name": "Sour cream or Greek yogurt",
        "quantity": "1/4 cup"
      },
      {
        "name": "Chipotle hot sauce",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Toss warm brown rice with chopped cilantro, lime juice, and salt."
      },
      {
        "step": 2,
        "description": "Heat black beans with a pinch of cumin, garlic powder, and oregano."
      },
      {
        "step": 3,
        "description": "Whisk sour cream and chipotle hot sauce with a splash of water for the crema."
      },
      {
        "step": 4,
        "description": "Divide rice into bowls, arrange beans, corn, diced avocado, and pico de gallo in sections."
      },
      {
        "step": 5,
        "description": "Drizzle with chipotle crema and serve with lime wedges."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Mexican",
    "tags": [
      "lunch",
      "mexican",
      "burrito bowl",
      "vegetarian",
      "healthy",
      "meal prep"
    ],
    "averageRating": 4.8,
    "ratingCount": 37,
    "_id": "b5d5992899a88258a5eb8287",
    "createdAt": "2026-09-21T06:41:37.644Z",
    "updatedAt": "2026-09-21T06:41:37.644Z",
    "isSystem": true
  },
  {
    "title": "Royal Chicken Dum Biryani",
    "description": "A fragrant and flavorful Indian rice dish made with aromatic basmati rice, tender marinated chicken, saffron milk, and fried onions.",
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80",
    "ingredients": [
      {
        "name": "Basmati rice aged",
        "quantity": "2 cups"
      },
      {
        "name": "Chicken thighs or bone-in",
        "quantity": "600g"
      },
      {
        "name": "Greek yogurt",
        "quantity": "1 cup"
      },
      {
        "name": "Onions sliced & fried crisp (Birista)",
        "quantity": "3 large"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2 tbsp"
      },
      {
        "name": "Biryani masala & garam masala",
        "quantity": "2 tbsp"
      },
      {
        "name": "Saffron strands bloomed in warm milk",
        "quantity": "pinch"
      },
      {
        "name": "Pure ghee",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh mint and cilantro",
        "quantity": "1/2 cup chopped"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Marinate chicken with yogurt, ginger-garlic paste, spices, and half the fried onions for at least 2 hours."
      },
      {
        "step": 2,
        "description": "Boil basmati rice with whole spices (cinnamon, cloves, cardamom) until 70% cooked; drain."
      },
      {
        "step": 3,
        "description": "In a heavy-bottomed pot, sear the marinated chicken until partially cooked."
      },
      {
        "step": 4,
        "description": "Layer par-cooked rice over chicken, sprinkle saffron milk, fried onions, mint, cilantro, and ghee."
      },
      {
        "step": 5,
        "description": "Seal pot tightly with foil/dough and lid; cook on very low dum heat for 25 minutes. Rest 10 min before opening."
      }
    ],
    "prepTime": 40,
    "cookTime": 45,
    "servings": 4,
    "difficulty": "Hard",
    "category": "Dinner",
    "cuisine": "Indian",
    "tags": [
      "dinner",
      "biryani",
      "main course",
      "chicken",
      "indian",
      "rice",
      "curry"
    ],
    "averageRating": 4,
    "ratingCount": 1,
    "_id": "c647ebba5bacef25b63022c0",
    "createdAt": "2026-09-21T07:41:37.818Z",
    "updatedAt": "2026-09-23T20:41:36.561Z",
    "isSystem": true
  },
  {
    "title": "Slow-Braised Red Wine Beef Short Ribs",
    "description": "Melt-in-your-mouth beef short ribs slowly braised in rich Cabernet Sauvignon, aromatics, and rich beef demi-glace over silky mashed potatoes.",
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    "ingredients": [
      {
        "name": "Bone-in beef short ribs",
        "quantity": "1.5 kg"
      },
      {
        "name": "Dry red wine (Cabernet)",
        "quantity": "750 ml"
      },
      {
        "name": "Beef bone broth",
        "quantity": "3 cups"
      },
      {
        "name": "Tomato paste",
        "quantity": "2 tbsp"
      },
      {
        "name": "Mirepoix (onion, carrot, celery)",
        "quantity": "2 cups chopped"
      },
      {
        "name": "Fresh thyme and rosemary",
        "quantity": "4 sprigs"
      },
      {
        "name": "Garlic head halved",
        "quantity": "1"
      },
      {
        "name": "Olive oil and butter",
        "quantity": "2 tbsp each"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Generously season short ribs with salt and pepper. Sear in a hot Dutch oven until deep mahogany crust forms on all sides."
      },
      {
        "step": 2,
        "description": "Remove ribs; sauté mirepoix and garlic in same pot until caramelized."
      },
      {
        "step": 3,
        "description": "Stir in tomato paste and cook 2 minutes. Pour in red wine to deglaze, scraping up fond."
      },
      {
        "step": 4,
        "description": "Simmer wine until reduced by half. Return ribs to pot, pour in beef broth and fresh herbs."
      },
      {
        "step": 5,
        "description": "Cover and braise in a 325°F (165°C) oven for 3 hours until ribs are completely tender. Skim and reduce braising jus."
      }
    ],
    "prepTime": 25,
    "cookTime": 180,
    "servings": 4,
    "difficulty": "Hard",
    "category": "Dinner",
    "cuisine": "French",
    "tags": [
      "dinner",
      "beef",
      "comfort food",
      "gourmet",
      "french",
      "slow cook"
    ],
    "averageRating": 5,
    "ratingCount": 49,
    "_id": "44befd1e4df41c11dd97a3d8",
    "createdAt": "2026-09-21T08:41:37.956Z",
    "updatedAt": "2026-09-21T08:41:37.956Z",
    "isSystem": true
  },
  {
    "title": "Pan-Seared Salmon with Herb Butter",
    "description": "Crispy skin Atlantic salmon fillets basted with fresh dill, garlic, lemon zest, and European butter, accompanied by roasted asparagus.",
    "image": "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh skin-on salmon fillets",
        "quantity": "4 (6 oz each)"
      },
      {
        "name": "Unsalted butter",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh dill chopped",
        "quantity": "2 tbsp"
      },
      {
        "name": "Garlic cloves crushed",
        "quantity": "3"
      },
      {
        "name": "Fresh lemon juice",
        "quantity": "2 tbsp"
      },
      {
        "name": "Olive oil",
        "quantity": "1 tbsp"
      },
      {
        "name": "Sea salt and cracked pepper",
        "quantity": "to taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pat salmon skin completely dry with paper towels to ensure crispy skin. Score skin lightly."
      },
      {
        "step": 2,
        "description": "Heat olive oil in a stainless steel skillet over medium-high heat until shimmering."
      },
      {
        "step": 3,
        "description": "Place salmon skin-side down; press gently with fish spatula for 20 seconds so skin stays flat."
      },
      {
        "step": 4,
        "description": "Cook undisturbed for 5 minutes until skin is golden and crispy, then flip."
      },
      {
        "step": 5,
        "description": "Add butter, crushed garlic, and dill; spoon foaming herb butter over salmon for 2 minutes. Drizzle lemon juice."
      }
    ],
    "prepTime": 10,
    "cookTime": 8,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "American",
    "tags": [
      "dinner",
      "salmon",
      "seafood",
      "healthy",
      "keto",
      "quick",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 54,
    "_id": "f9253042fa01cf37988b7ce6",
    "createdAt": "2026-09-21T09:41:38.130Z",
    "updatedAt": "2026-09-21T09:41:38.130Z",
    "isSystem": true
  },
  {
    "title": "Creamy Butter Chicken (Murgh Makhani)",
    "description": "Tandoori-spiced chargrilled chicken simmered in a silky tomato, cashew cream, butter, and fragrant fenugreek gravy.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/1280px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Boneless chicken thighs cut into chunks",
        "quantity": "600g"
      },
      {
        "name": "Tomato puree / passata",
        "quantity": "2 cups"
      },
      {
        "name": "Butter",
        "quantity": "4 tbsp"
      },
      {
        "name": "Heavy whipping cream",
        "quantity": "1/2 cup"
      },
      {
        "name": "Cashews soaked in warm water",
        "quantity": "15"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "2 tbsp"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Garam masala",
        "quantity": "1 tsp"
      },
      {
        "name": "Kasuri methi (fenugreek leaves)",
        "quantity": "1 tbsp crushed"
      },
      {
        "name": "Honey or sugar",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Marinate chicken in yogurt, lemon juice, chili powder, and ginger-garlic for 1 hour."
      },
      {
        "step": 2,
        "description": "Broil or pan-sear chicken on high heat until charred at edges; set aside."
      },
      {
        "step": 3,
        "description": "Blend soaked cashews with 1/4 cup water into an ultra-smooth paste."
      },
      {
        "step": 4,
        "description": "Melt butter in pan, add tomato puree, chili powder, garam masala, and cook 10 minutes until oil separates."
      },
      {
        "step": 5,
        "description": "Stir in cashew paste, cream, honey, cooked chicken, and crushed kasuri methi. Simmer 5 min."
      }
    ],
    "prepTime": 20,
    "cookTime": 25,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Indian",
    "tags": [
      "dinner",
      "butter chicken",
      "indian",
      "curry",
      "creamy",
      "main course"
    ],
    "averageRating": 4.9,
    "ratingCount": 62,
    "_id": "a77ae6a8d9cedb7f4e22752c",
    "createdAt": "2026-09-21T10:41:38.300Z",
    "updatedAt": "2026-09-21T10:41:38.300Z",
    "isSystem": true
  },
  {
    "title": "Kashmiri Lamb Rogan Josh",
    "description": "Tender chunks of slow-cooked lamb shoulder infused with Kashmiri red chilies, fennel powder, dry ginger, and yogurt.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Rogan_Josh_Kashmiri.jpg/1280px-Rogan_Josh_Kashmiri.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Lamb shoulder cut into cubes",
        "quantity": "700g"
      },
      {
        "name": "Mustard oil or ghee",
        "quantity": "4 tbsp"
      },
      {
        "name": "Plain yogurt whisked",
        "quantity": "1 cup"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "2 tbsp"
      },
      {
        "name": "Fennel powder (saunf)",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Dry ginger powder (sonth)",
        "quantity": "1 tsp"
      },
      {
        "name": "Whole spices (black cardamom, cinnamon, cloves)",
        "quantity": "1 set"
      },
      {
        "name": "Asafoetida (hing)",
        "quantity": "pinch"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat mustard oil in a heavy Dutch oven until smoking, let cool slightly, then add whole spices and hing."
      },
      {
        "step": 2,
        "description": "Add lamb cubes in batches and sear over high heat until browned."
      },
      {
        "step": 3,
        "description": "Lower heat and stir in whisked yogurt continuously to prevent curdling."
      },
      {
        "step": 4,
        "description": "Mix Kashmiri chili powder with a little water into paste; add to pot along with fennel and dry ginger powder."
      },
      {
        "step": 5,
        "description": "Add 1 cup warm water, cover tightly, and simmer on low for 1.5 hours until lamb is fork-tender."
      }
    ],
    "prepTime": 20,
    "cookTime": 90,
    "servings": 4,
    "difficulty": "Hard",
    "category": "Dinner",
    "cuisine": "Indian",
    "tags": [
      "dinner",
      "lamb",
      "rogan josh",
      "indian",
      "curry",
      "spicy",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 38,
    "_id": "510e98c103d54b063f9b26a9",
    "createdAt": "2026-09-21T11:41:38.865Z",
    "updatedAt": "2026-09-21T11:41:38.865Z",
    "isSystem": true
  },
  {
    "title": "Classic Beef Bolognese with Tagliatelle",
    "description": "Slow-simmered ragù of ground chuck and pancetta with finely diced soffritto, white wine, milk, and San Marzano tomatoes.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Tagliatelle_al_rag%C3%B9_%28image_modified%29.jpg/1280px-Tagliatelle_al_rag%C3%B9_%28image_modified%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Fresh egg tagliatelle pasta",
        "quantity": "400g"
      },
      {
        "name": "Ground beef chuck",
        "quantity": "400g"
      },
      {
        "name": "Pancetta finely diced",
        "quantity": "100g"
      },
      {
        "name": "Soffritto (onion, carrot, celery)",
        "quantity": "1.5 cups minced"
      },
      {
        "name": "Dry white wine",
        "quantity": "1 cup"
      },
      {
        "name": "Whole milk",
        "quantity": "1 cup"
      },
      {
        "name": "San Marzano canned tomatoes crushed",
        "quantity": "28 oz"
      },
      {
        "name": "Freshly grated Parmigiano-Reggiano",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Render diced pancetta in a heavy pot over medium heat, then sauté soffritto for 10 minutes until soft."
      },
      {
        "step": 2,
        "description": "Add ground beef and brown well, breaking into fine bits."
      },
      {
        "step": 3,
        "description": "Pour in white wine and simmer until alcohol evaporates completely."
      },
      {
        "step": 4,
        "description": "Stir in milk and simmer gently until absorbed, then add crushed tomatoes."
      },
      {
        "step": 5,
        "description": "Cover partially and simmer on the lowest heat for 2.5 hours. Toss with al dente tagliatelle."
      }
    ],
    "prepTime": 20,
    "cookTime": 150,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Italian",
    "tags": [
      "dinner",
      "pasta",
      "bolognese",
      "italian",
      "beef",
      "comfort food"
    ],
    "averageRating": 4.9,
    "ratingCount": 57,
    "_id": "194f0529ae07b29769aa3cd8",
    "createdAt": "2026-09-21T12:41:39.774Z",
    "updatedAt": "2026-09-21T12:41:39.774Z",
    "isSystem": true
  },
  {
    "title": "Authentic Thai Coconut Red Curry with Chicken",
    "description": "Vibrant red curry paste fried in coconut cream with tender chicken breast, bamboo shoots, Thai basil, and makrut lime leaves.",
    "image": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80",
    "ingredients": [
      {
        "name": "Chicken breast sliced thin",
        "quantity": "450g"
      },
      {
        "name": "Thai red curry paste",
        "quantity": "3 tbsp"
      },
      {
        "name": "Full-fat coconut milk",
        "quantity": "2 cans (13.5 oz each)"
      },
      {
        "name": "Bamboo shoots sliced",
        "quantity": "1 cup"
      },
      {
        "name": "Red bell pepper sliced",
        "quantity": "1"
      },
      {
        "name": "Fresh Thai holy basil leaves",
        "quantity": "1 cup packed"
      },
      {
        "name": "Makrut lime leaves torn",
        "quantity": "4 leaves"
      },
      {
        "name": "Fish sauce",
        "quantity": "2 tbsp"
      },
      {
        "name": "Palm sugar",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Spoon the thick coconut cream from top of can into a wok over medium heat until oil separates (cracks)."
      },
      {
        "step": 2,
        "description": "Add red curry paste and fry for 2-3 minutes until intensely aromatic."
      },
      {
        "step": 3,
        "description": "Add sliced chicken and cook until no longer pink outside."
      },
      {
        "step": 4,
        "description": "Pour in remaining coconut milk, bamboo shoots, bell pepper, lime leaves, fish sauce, and palm sugar. Simmer 10 minutes."
      },
      {
        "step": 5,
        "description": "Turn off heat, stir in fresh Thai basil leaves, and serve with jasmine rice."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Dinner",
    "cuisine": "Thai",
    "tags": [
      "dinner",
      "thai",
      "curry",
      "chicken",
      "spicy",
      "coconut milk"
    ],
    "averageRating": 4.8,
    "ratingCount": 42,
    "_id": "0f6acbc53f2e785b42e396a4",
    "createdAt": "2026-09-21T13:41:39.955Z",
    "updatedAt": "2026-09-21T13:41:39.955Z",
    "isSystem": true
  },
  {
    "title": "Cast-Iron Seared Ribeye with Garlic Herb Butter",
    "description": "Prime bone-in ribeye steak seared in screaming-hot cast iron to a caramelized crust, basted with garlic, rosemary, and thyme butter.",
    "image": "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
    "ingredients": [
      {
        "name": "Thick-cut prime ribeye steak (1.5 inch)",
        "quantity": "1 (approx 500g)"
      },
      {
        "name": "Coarse kosher salt",
        "quantity": "1.5 tsp"
      },
      {
        "name": "Freshly ground black pepper",
        "quantity": "1 tsp"
      },
      {
        "name": "High-smoke point oil (avocado)",
        "quantity": "1 tbsp"
      },
      {
        "name": "Unsalted butter",
        "quantity": "3 tbsp"
      },
      {
        "name": "Garlic cloves smashed",
        "quantity": "4"
      },
      {
        "name": "Fresh rosemary and thyme sprigs",
        "quantity": "3 each"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Bring ribeye to room temperature for 45 minutes; pat dry and season aggressively with salt and pepper."
      },
      {
        "step": 2,
        "description": "Heat cast-iron skillet over high heat until smoking; add avocado oil."
      },
      {
        "step": 3,
        "description": "Place steak in pan and sear undisturbed for 2.5 minutes until a deep brown crust develops; flip."
      },
      {
        "step": 4,
        "description": "Add butter, garlic, rosemary, and thyme. Tilt skillet and continuously baste foaming butter over steak for 2 minutes."
      },
      {
        "step": 5,
        "description": "Remove steak to a cutting board when internal temp hits 130°F (medium-rare). Rest 8 minutes before slicing."
      }
    ],
    "prepTime": 10,
    "cookTime": 8,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "American",
    "tags": [
      "dinner",
      "steak",
      "ribeye",
      "beef",
      "keto",
      "cast iron",
      "gourmet"
    ],
    "averageRating": 5,
    "ratingCount": 65,
    "_id": "b6f6d512e5b2f5c2cff310ee",
    "createdAt": "2026-09-21T14:41:40.090Z",
    "updatedAt": "2026-09-21T14:41:40.090Z",
    "isSystem": true
  },
  {
    "title": "Moroccan Lamb Tagine with Dried Apricots",
    "description": "Slow-simmered lamb scented with ras el hanout, saffron, sweet dried apricots, toasted almonds, and fresh cilantro.",
    "image": "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80",
    "ingredients": [
      {
        "name": "Boneless lamb shoulder cubed",
        "quantity": "750g"
      },
      {
        "name": "Ras el hanout spice blend",
        "quantity": "2 tbsp"
      },
      {
        "name": "Dried Turkish apricots halved",
        "quantity": "1 cup"
      },
      {
        "name": "Toasted slivered almonds",
        "quantity": "1/3 cup"
      },
      {
        "name": "Onions finely chopped",
        "quantity": "2 large"
      },
      {
        "name": "Saffron steeped in 1/2 cup warm water",
        "quantity": "pinch"
      },
      {
        "name": "Honey",
        "quantity": "2 tbsp"
      },
      {
        "name": "Cinnamon stick",
        "quantity": "1"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Toss lamb cubes with ras el hanout, salt, and pepper."
      },
      {
        "step": 2,
        "description": "Brown lamb in olive oil inside a tagine or Dutch oven; remove and set aside."
      },
      {
        "step": 3,
        "description": "Sauté onions until golden, add garlic and cinnamon stick."
      },
      {
        "step": 4,
        "description": "Return lamb, add saffron water and 1 cup broth. Cover tightly and simmer on low for 1.5 hours."
      },
      {
        "step": 5,
        "description": "Stir in apricots and honey; simmer 15 min until apricots plump up and sauce thickens. Top with almonds."
      }
    ],
    "prepTime": 20,
    "cookTime": 110,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Mediterranean",
    "tags": [
      "dinner",
      "lamb",
      "moroccan",
      "tagine",
      "exotic",
      "stew"
    ],
    "averageRating": 4.8,
    "ratingCount": 33,
    "_id": "7a812c3a60557fdfce662a9f",
    "createdAt": "2026-09-21T15:41:40.340Z",
    "updatedAt": "2026-09-21T15:41:40.340Z",
    "isSystem": true
  },
  {
    "title": "Spanish Seafood Paella Valenciana",
    "description": "Saffron-infused bomba rice cooked with tiger prawns, blue mussels, calamari rings, sweet peas, and a caramelized socarrat crust.",
    "image": "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800&q=80",
    "ingredients": [
      {
        "name": "Spanish Bomba rice",
        "quantity": "2 cups"
      },
      {
        "name": "Jumbo tiger prawns",
        "quantity": "8"
      },
      {
        "name": "Fresh mussels cleaned",
        "quantity": "12"
      },
      {
        "name": "Calamari rings",
        "quantity": "200g"
      },
      {
        "name": "Fish or seafood stock warm",
        "quantity": "5 cups"
      },
      {
        "name": "Saffron threads crushed",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Smoked sweet Spanish paprika",
        "quantity": "1 tbsp"
      },
      {
        "name": "Grated fresh tomato",
        "quantity": "1/2 cup"
      },
      {
        "name": "Sweet green peas",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat olive oil in a 15-inch paella pan; sear prawns and calamari for 2 minutes, then remove."
      },
      {
        "step": 2,
        "description": "In same pan, fry grated tomato, paprika, and garlic into a fragrant sofrito."
      },
      {
        "step": 3,
        "description": "Add Bomba rice and stir 2 minutes to toast grains evenly."
      },
      {
        "step": 4,
        "description": "Pour in hot saffron stock and peas. Simmer on medium-low for 10 minutes without stirring."
      },
      {
        "step": 5,
        "description": "Nestle seafood on top, cook 8 min until mussels open. Crank heat for 1 min to form crispy bottom socarrat."
      }
    ],
    "prepTime": 25,
    "cookTime": 30,
    "servings": 4,
    "difficulty": "Hard",
    "category": "Dinner",
    "cuisine": "Mediterranean",
    "tags": [
      "dinner",
      "paella",
      "seafood",
      "spanish",
      "rice",
      "saffron",
      "showstopper"
    ],
    "averageRating": 4.9,
    "ratingCount": 46,
    "_id": "ee038f4c2d78c631a261562e",
    "createdAt": "2026-09-21T16:41:40.595Z",
    "updatedAt": "2026-09-21T16:41:40.595Z",
    "isSystem": true
  },
  {
    "title": "Classic New York Style Cheesecake",
    "description": "Ultra-dense, velvety smooth cream cheese filling baked over a buttery graham cracker crust, crowned with glazed strawberries.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Baked_cheesecake_with_raspberries_and_blueberries.jpg/1280px-Baked_cheesecake_with_raspberries_and_blueberries.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Graham cracker crumbs",
        "quantity": "2 cups"
      },
      {
        "name": "Unsalted butter melted",
        "quantity": "6 tbsp"
      },
      {
        "name": "Cream cheese room temperature",
        "quantity": "32 oz (4 blocks)"
      },
      {
        "name": "Granulated sugar",
        "quantity": "1.25 cups"
      },
      {
        "name": "Sour cream",
        "quantity": "1 cup"
      },
      {
        "name": "Eggs at room temperature",
        "quantity": "4 large"
      },
      {
        "name": "Vanilla bean paste",
        "quantity": "1 tbsp"
      },
      {
        "name": "Fresh lemon juice",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Mix graham crumbs with melted butter and press firmly into bottom of a 9-inch springform pan; bake 10 min at 350°F."
      },
      {
        "step": 2,
        "description": "Beat cream cheese and sugar on low speed until perfectly smooth with zero lumps."
      },
      {
        "step": 3,
        "description": "Mix in sour cream, vanilla, and lemon juice. Add eggs one at a time, mixing just until incorporated."
      },
      {
        "step": 4,
        "description": "Pour batter over crust. Wrap pan in foil and bake in a water bath at 325°F (160°C) for 75 minutes."
      },
      {
        "step": 5,
        "description": "Turn off oven, prop door ajar, and let cool 1 hour inside oven, then chill in refrigerator for 6 hours."
      }
    ],
    "prepTime": 25,
    "cookTime": 75,
    "servings": 12,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "American",
    "tags": [
      "dessert",
      "cheesecake",
      "baking",
      "sweet",
      "classic"
    ],
    "averageRating": 4.9,
    "ratingCount": 60,
    "_id": "dfc4989a938e74ffdc4d912d",
    "createdAt": "2026-09-21T17:41:41.485Z",
    "updatedAt": "2026-09-21T17:41:41.485Z",
    "isSystem": true
  },
  {
    "title": "Molten Chocolate Lava Cake",
    "description": "Rich individual chocolate cakes with cakey edges and a decadent warm flowing ganache center, dusted with powdered sugar.",
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    "ingredients": [
      {
        "name": "Bittersweet chocolate (60-70%) chopped",
        "quantity": "170g"
      },
      {
        "name": "Unsalted butter",
        "quantity": "1/2 cup (1 stick)"
      },
      {
        "name": "Powdered sugar",
        "quantity": "1/2 cup"
      },
      {
        "name": "Eggs plus egg yolks",
        "quantity": "2 whole eggs + 2 yolks"
      },
      {
        "name": "All-purpose flour",
        "quantity": "6 tbsp"
      },
      {
        "name": "Espresso powder",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Vanilla ice cream",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat oven to 425°F (220°C). Butter four 6-oz ramekins and dust with cocoa powder."
      },
      {
        "step": 2,
        "description": "Melt chopped chocolate and butter together in a heatproof bowl set over simmering water."
      },
      {
        "step": 3,
        "description": "Whisk powdered sugar, whole eggs, yolks, and espresso powder until pale."
      },
      {
        "step": 4,
        "description": "Fold melted chocolate and flour into egg mixture until glossy."
      },
      {
        "step": 5,
        "description": "Divide into ramekins and bake for 12-14 minutes until sides are firm but center jiggles. Invert onto plates."
      }
    ],
    "prepTime": 15,
    "cookTime": 12,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "French",
    "tags": [
      "dessert",
      "chocolate",
      "lava cake",
      "french",
      "indulgent"
    ],
    "averageRating": 5,
    "ratingCount": 71,
    "_id": "a6807a899b035cf80eda84d9",
    "createdAt": "2026-09-21T18:41:41.790Z",
    "updatedAt": "2026-09-21T18:41:41.790Z",
    "isSystem": true
  },
  {
    "title": "Traditional Italian Tiramisu",
    "description": "Espresso-dipped Savoiardi ladyfingers layered with airy mascarpone cream, egg yolks, Marsala wine, and French cocoa powder.",
    "image": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    "ingredients": [
      {
        "name": "Italian Savoiardi ladyfingers",
        "quantity": "24 cookies"
      },
      {
        "name": "Mascarpone cheese chilled",
        "quantity": "500g"
      },
      {
        "name": "Egg yolks",
        "quantity": "4 large"
      },
      {
        "name": "Granulated sugar",
        "quantity": "1/2 cup"
      },
      {
        "name": "Freshly brewed strong espresso cooled",
        "quantity": "1.5 cups"
      },
      {
        "name": "Marsala wine or Kahlua",
        "quantity": "2 tbsp"
      },
      {
        "name": "Heavy whipping cream",
        "quantity": "1 cup"
      },
      {
        "name": "Unsweetened cocoa powder",
        "quantity": "3 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk egg yolks and sugar over a double boiler for 6-8 minutes until thick and pale; cool."
      },
      {
        "step": 2,
        "description": "Beat mascarpone into egg mixture. In a separate bowl, whip heavy cream to medium peaks and fold in."
      },
      {
        "step": 3,
        "description": "Combine cooled espresso and Marsala wine in a shallow dish."
      },
      {
        "step": 4,
        "description": "Dip ladyfingers for 1-2 seconds per side and arrange a single layer in an 8x8 glass dish."
      },
      {
        "step": 5,
        "description": "Spread half the mascarpone cream; repeat with second layer of dipped cookies and cream. Dust with cocoa and chill 6 hours."
      }
    ],
    "prepTime": 30,
    "cookTime": 0,
    "servings": 8,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "Italian",
    "tags": [
      "dessert",
      "tiramisu",
      "italian",
      "coffee",
      "no-bake",
      "classic"
    ],
    "averageRating": 4.9,
    "ratingCount": 64,
    "_id": "a70d32d1e9292d650e6200e3",
    "createdAt": "2026-09-21T19:41:41.949Z",
    "updatedAt": "2026-09-21T19:41:41.949Z",
    "isSystem": true
  },
  {
    "title": "French Vanilla Bean Crème Brûlée",
    "description": "Silky rich egg yolk custard infused with real Madagascar vanilla bean, crowned with a glass-like caramelized sugar crust.",
    "image": "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
    "ingredients": [
      {
        "name": "Heavy whipping cream",
        "quantity": "2 cups"
      },
      {
        "name": "Madagascar vanilla bean split & scraped",
        "quantity": "1"
      },
      {
        "name": "Egg yolks",
        "quantity": "5 large"
      },
      {
        "name": "Granulated sugar for custard",
        "quantity": "1/3 cup"
      },
      {
        "name": "Superfine sugar for brûlée crust",
        "quantity": "4 tbsp"
      },
      {
        "name": "Pinch of fine salt",
        "quantity": "pinch"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat cream with vanilla bean seeds and pod in a saucepan until steaming; steep for 15 minutes."
      },
      {
        "step": 2,
        "description": "Whisk egg yolks, sugar, and salt until smooth. Slowly temper in warm cream while whisking."
      },
      {
        "step": 3,
        "description": "Strain custard through a fine-mesh sieve and pour into four 6-oz shallow ramekins."
      },
      {
        "step": 4,
        "description": "Bake in a water bath at 300°F (150°C) for 35-40 minutes until set with slight wobble. Chill completely."
      },
      {
        "step": 5,
        "description": "Sprinkle an even layer of superfine sugar on top and caramelize with a kitchen torch until golden amber."
      }
    ],
    "prepTime": 20,
    "cookTime": 40,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "French",
    "tags": [
      "dessert",
      "creme brulee",
      "french",
      "custard",
      "gourmet",
      "gluten-free"
    ],
    "averageRating": 4.8,
    "ratingCount": 42,
    "_id": "cd4c0318568acdbcbd521c8d",
    "createdAt": "2026-09-21T20:41:42.111Z",
    "updatedAt": "2026-09-21T20:41:42.111Z",
    "isSystem": true
  },
  {
    "title": "Old-Fashioned Warm Cinnamon Apple Pie",
    "description": "Flaky double butter crust packed with tender Granny Smith and Honeycrisp apples tossed in cinnamon, nutmeg, and brown sugar.",
    "image": "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80",
    "ingredients": [
      {
        "name": "Homemade pie crusts (double crust)",
        "quantity": "2 discs"
      },
      {
        "name": "Apples peeled and sliced thin",
        "quantity": "6 large"
      },
      {
        "name": "Brown sugar packed",
        "quantity": "1/2 cup"
      },
      {
        "name": "Granulated sugar",
        "quantity": "1/4 cup"
      },
      {
        "name": "Ground cinnamon",
        "quantity": "1.5 tsp"
      },
      {
        "name": "Ground nutmeg & allspice",
        "quantity": "1/4 tsp each"
      },
      {
        "name": "Flour or cornstarch",
        "quantity": "2 tbsp"
      },
      {
        "name": "Butter cubed",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Toss sliced apples with sugars, cinnamon, spices, flour, and lemon juice; let macerate 15 minutes."
      },
      {
        "step": 2,
        "description": "Roll out bottom crust and fit into a 9-inch deep pie dish."
      },
      {
        "step": 3,
        "description": "Mound apple filling tightly into crust and dot with butter cubes."
      },
      {
        "step": 4,
        "description": "Roll out top crust, create a lattice or solid top with vents; crimp edges and brush with egg wash."
      },
      {
        "step": 5,
        "description": "Bake at 400°F for 20 minutes, reduce heat to 375°F and bake 40 more minutes until filling bubbles thickly."
      }
    ],
    "prepTime": 30,
    "cookTime": 60,
    "servings": 8,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "American",
    "tags": [
      "dessert",
      "apple pie",
      "pie",
      "baking",
      "comfort food",
      "autumn"
    ],
    "averageRating": 4.8,
    "ratingCount": 39,
    "_id": "8473759a7eb6314a9141f615",
    "createdAt": "2026-09-21T21:41:42.276Z",
    "updatedAt": "2026-09-21T21:41:42.276Z",
    "isSystem": true
  },
  {
    "title": "Golden Churros with Warm Dulce de Leche",
    "description": "Crispy Spanish piped dough fried until golden brown, rolled in cinnamon sugar, and served with velvety warm caramel sauce.",
    "image": "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=800&q=80",
    "ingredients": [
      {
        "name": "Water",
        "quantity": "1 cup"
      },
      {
        "name": "Unsalted butter",
        "quantity": "1/2 cup"
      },
      {
        "name": "Granulated sugar",
        "quantity": "2 tbsp"
      },
      {
        "name": "Salt",
        "quantity": "1/4 tsp"
      },
      {
        "name": "All-purpose flour",
        "quantity": "1 cup"
      },
      {
        "name": "Eggs",
        "quantity": "2 large"
      },
      {
        "name": "Cinnamon sugar for coating",
        "quantity": "1/2 cup sugar + 1 tbsp cinnamon"
      },
      {
        "name": "Dulce de leche or chocolate ganache",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Boil water, butter, sugar, and salt in a saucepan. Stir in flour vigorously until a dough ball forms."
      },
      {
        "step": 2,
        "description": "Cool dough 5 minutes, then beat in eggs one at a time until smooth and glossy."
      },
      {
        "step": 3,
        "description": "Transfer dough to a piping bag fitted with a large closed star tip."
      },
      {
        "step": 4,
        "description": "Pipe 5-inch strips into 375°F (190°C) vegetable oil, snipping ends with scissors. Fry 2-3 min per side until golden."
      },
      {
        "step": 5,
        "description": "Drain on paper towels for 15 seconds, immediately toss in cinnamon sugar, and dip in warm dulce de leche."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "Mexican",
    "tags": [
      "dessert",
      "churros",
      "spanish",
      "mexican",
      "fried",
      "cinnamon"
    ],
    "averageRating": 4.9,
    "ratingCount": 48,
    "_id": "a329f964593f121cb7e74c32",
    "createdAt": "2026-09-21T22:41:42.435Z",
    "updatedAt": "2026-09-21T22:41:42.435Z",
    "isSystem": true
  },
  {
    "title": "Belgian Dark Chocolate Mousse",
    "description": "Airy, cloud-like mousse made with 72% Belgian dark chocolate, whipped egg whites, and chantilly cream.",
    "image": "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    "ingredients": [
      {
        "name": "70% dark Belgian chocolate finely chopped",
        "quantity": "200g"
      },
      {
        "name": "Unsalted butter",
        "quantity": "2 tbsp"
      },
      {
        "name": "Egg yolks",
        "quantity": "4"
      },
      {
        "name": "Egg whites whipped to stiff peaks",
        "quantity": "4"
      },
      {
        "name": "Sugar",
        "quantity": "2 tbsp"
      },
      {
        "name": "Heavy whipping cream",
        "quantity": "1/2 cup"
      },
      {
        "name": "Shaved chocolate for garnish",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Melt dark chocolate and butter gently in a bowl set over barely simmering water; let cool slightly."
      },
      {
        "step": 2,
        "description": "Whisk egg yolks into the melted chocolate one by one."
      },
      {
        "step": 3,
        "description": "Whip heavy cream to soft peaks and gently fold into the chocolate mixture."
      },
      {
        "step": 4,
        "description": "Beat egg whites with sugar to glossy stiff peaks; fold 1/3 into chocolate to lighten, then fold remaining gently."
      },
      {
        "step": 5,
        "description": "Spoon into crystal glasses and chill in refrigerator for at least 4 hours before serving."
      }
    ],
    "prepTime": 25,
    "cookTime": 0,
    "servings": 6,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "French",
    "tags": [
      "dessert",
      "chocolate",
      "mousse",
      "french",
      "no-bake"
    ],
    "averageRating": 4.8,
    "ratingCount": 35,
    "_id": "64e813504bacfa2553a53025",
    "createdAt": "2026-09-21T23:41:42.593Z",
    "updatedAt": "2026-09-21T23:41:42.593Z",
    "isSystem": true
  },
  {
    "title": "Matcha Green Tea Panna Cotta",
    "description": "Silky, delicate chilled cream infused with ceremonial Uji matcha, served with sweet red bean paste or fresh raspberries.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/80/Panna_Cotta_with_cream_and_garnish.jpg/1280px-Panna_Cotta_with_cream_and_garnish.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Heavy cream",
        "quantity": "1.5 cups"
      },
      {
        "name": "Whole milk",
        "quantity": "1 cup"
      },
      {
        "name": "Ceremonial matcha powder",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Granulated sugar",
        "quantity": "1/3 cup"
      },
      {
        "name": "Powdered gelatin",
        "quantity": "2.25 tsp (1 packet)"
      },
      {
        "name": "Cold water",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh raspberries",
        "quantity": "for topping"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sprinkle gelatin over cold water and let bloom for 5 minutes."
      },
      {
        "step": 2,
        "description": "Sift matcha into a small bowl and whisk with 3 tbsp warm milk until frothy and lump-free."
      },
      {
        "step": 3,
        "description": "Heat cream, remaining milk, and sugar in a saucepan until sugar dissolves and liquid is hot."
      },
      {
        "step": 4,
        "description": "Remove from heat, whisk in bloomed gelatin and matcha mixture until completely incorporated."
      },
      {
        "step": 5,
        "description": "Pour through a fine sieve into glass cups and chill for at least 4 hours until gently set."
      }
    ],
    "prepTime": 15,
    "cookTime": 5,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Dessert",
    "cuisine": "Japanese",
    "tags": [
      "dessert",
      "matcha",
      "panna cotta",
      "japanese",
      "tea",
      "refined"
    ],
    "averageRating": 4.7,
    "ratingCount": 29,
    "_id": "33c3efad866aedb0a8c3efac",
    "createdAt": "2026-09-22T00:41:42.730Z",
    "updatedAt": "2026-09-22T00:41:42.730Z",
    "isSystem": true
  },
  {
    "title": "Fresh Berry Custard Tart",
    "description": "Crispy sweet pastry crust filled with velvety vanilla pastry cream and decorated with fresh glazed blackberries, raspberries, and strawberries.",
    "image": "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80",
    "ingredients": [
      {
        "name": "Pre-baked sweet shortcrust tart shell (9-inch)",
        "quantity": "1"
      },
      {
        "name": "Whole milk",
        "quantity": "2 cups"
      },
      {
        "name": "Egg yolks",
        "quantity": "4 large"
      },
      {
        "name": "Sugar",
        "quantity": "1/2 cup"
      },
      {
        "name": "Cornstarch",
        "quantity": "1/4 cup"
      },
      {
        "name": "Vanilla bean paste",
        "quantity": "1 tsp"
      },
      {
        "name": "Butter",
        "quantity": "2 tbsp"
      },
      {
        "name": "Assorted fresh berries",
        "quantity": "2 cups"
      },
      {
        "name": "Apricot jam warmed for glaze",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk egg yolks, sugar, and cornstarch together in a bowl."
      },
      {
        "step": 2,
        "description": "Heat milk until steaming, then slowly pour into yolk mixture while whisking to temper."
      },
      {
        "step": 3,
        "description": "Return mixture to saucepan and cook over medium heat, whisking constantly until thick custard forms."
      },
      {
        "step": 4,
        "description": "Remove from heat, stir in butter and vanilla. Press plastic wrap against surface and chill completely."
      },
      {
        "step": 5,
        "description": "Spread chilled pastry cream into tart shell, arrange fresh berries on top, and brush with warm apricot glaze."
      }
    ],
    "prepTime": 30,
    "cookTime": 10,
    "servings": 8,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "French",
    "tags": [
      "dessert",
      "tart",
      "berries",
      "pastry",
      "french",
      "summer"
    ],
    "averageRating": 4.8,
    "ratingCount": 37,
    "_id": "f6fba3d21a1263f528c2015c",
    "createdAt": "2026-09-22T01:41:42.864Z",
    "updatedAt": "2026-09-22T01:41:42.864Z",
    "isSystem": true
  },
  {
    "title": "Royal Saffron Gulab Jamun",
    "description": "Golden milk-solid dumplings gently fried in ghee and soaked in warm, fragrant rose-water and saffron cardamom syrup.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Gulab-jamun-wallpaper-1.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "ingredients": [
      {
        "name": "Milk powder",
        "quantity": "1 cup"
      },
      {
        "name": "All-purpose flour (maida)",
        "quantity": "1/4 cup"
      },
      {
        "name": "Baking soda",
        "quantity": "1/4 tsp"
      },
      {
        "name": "Ghee",
        "quantity": "2 tbsp"
      },
      {
        "name": "Milk",
        "quantity": "3-4 tbsp"
      },
      {
        "name": "Sugar for syrup",
        "quantity": "1.5 cups"
      },
      {
        "name": "Water",
        "quantity": "1.5 cups"
      },
      {
        "name": "Cardamom pods crushed",
        "quantity": "4"
      },
      {
        "name": "Saffron threads & rose water",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Boil sugar, water, cardamom, saffron, and rose water for 6-8 minutes until slightly sticky syrup forms; keep warm."
      },
      {
        "step": 2,
        "description": "Mix milk powder, flour, and baking soda. Rub in ghee, then add milk gradually to form a soft, smooth dough."
      },
      {
        "step": 3,
        "description": "Roll into smooth, crack-free small bite-sized balls."
      },
      {
        "step": 4,
        "description": "Heat ghee/oil over low-medium heat; gently fry balls, stirring continuously so they swell and brown evenly."
      },
      {
        "step": 5,
        "description": "Drop hot fried jamuns directly into warm syrup and let soak for at least 2 hours before serving."
      }
    ],
    "prepTime": 20,
    "cookTime": 20,
    "servings": 6,
    "difficulty": "Hard",
    "category": "Dessert",
    "cuisine": "Indian",
    "tags": [
      "dessert",
      "indian",
      "gulab jamun",
      "sweet",
      "festive"
    ],
    "averageRating": 4.9,
    "ratingCount": 55,
    "_id": "143f6ccb0ae8574e68fd6b9e",
    "createdAt": "2026-09-22T02:41:43.125Z",
    "updatedAt": "2026-09-22T02:41:43.125Z",
    "isSystem": true
  },
  {
    "title": "Crispy Punjabi Vegetable Samosas",
    "description": "Flaky ajwain-scented pastry cones packed with a spiced potato and green pea filling, served with mint-coriander chutney.",
    "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80",
    "ingredients": [
      {
        "name": "All-purpose flour",
        "quantity": "2 cups"
      },
      {
        "name": "Carom seeds (ajwain)",
        "quantity": "1 tsp"
      },
      {
        "name": "Ghee or oil for shortening",
        "quantity": "4 tbsp"
      },
      {
        "name": "Potatoes boiled & diced",
        "quantity": "4 medium"
      },
      {
        "name": "Green peas",
        "quantity": "1/2 cup"
      },
      {
        "name": "Garam masala & chaat masala",
        "quantity": "1 tbsp"
      },
      {
        "name": "Ginger & green chili chopped",
        "quantity": "1 tbsp"
      },
      {
        "name": "Oil for deep frying",
        "quantity": "as needed"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Knead flour, ajwain, salt, and ghee with water into a firm dough; rest 30 minutes."
      },
      {
        "step": 2,
        "description": "Sauté ginger, green chilies, whole spices, green peas, and diced potatoes with spices; cool."
      },
      {
        "step": 3,
        "description": "Roll dough into an oval, cut in half, form a cone, and stuff with potato filling."
      },
      {
        "step": 4,
        "description": "Seal edges with a dab of water and create a pleat."
      },
      {
        "step": 5,
        "description": "Deep fry on low heat for 12-15 minutes until shatteringly crisp and golden brown."
      }
    ],
    "prepTime": 30,
    "cookTime": 20,
    "servings": 6,
    "difficulty": "Hard",
    "category": "Snacks",
    "cuisine": "Indian",
    "tags": [
      "snacks",
      "samosa",
      "indian",
      "vegetarian",
      "street food",
      "appetizers"
    ],
    "averageRating": 4.9,
    "ratingCount": 58,
    "_id": "128654fb374b3229d0077b61",
    "createdAt": "2026-09-22T03:41:43.299Z",
    "updatedAt": "2026-09-22T03:41:43.299Z",
    "isSystem": true
  },
  {
    "title": "Loaded Beef & Queso Nachos",
    "description": "Crispy restaurant-style tortilla chips piled high with seasoned beef, warm queso blanco, black beans, jalapeños, and guacamole.",
    "image": "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=80",
    "ingredients": [
      {
        "name": "Thick corn tortilla chips",
        "quantity": "1 large bag"
      },
      {
        "name": "Ground beef cooked with taco seasoning",
        "quantity": "300g"
      },
      {
        "name": "Warm queso cheese sauce",
        "quantity": "1 cup"
      },
      {
        "name": "Shredded Monterey Jack cheese",
        "quantity": "1.5 cups"
      },
      {
        "name": "Black beans rinsed",
        "quantity": "1/2 cup"
      },
      {
        "name": "Pickled jalapeño slices",
        "quantity": "1/4 cup"
      },
      {
        "name": "Pico de gallo & sour cream",
        "quantity": "1/2 cup each"
      },
      {
        "name": "Fresh guacamole",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Spread half the tortilla chips onto a wide baking sheet."
      },
      {
        "step": 2,
        "description": "Layer with seasoned beef, black beans, warm queso, and shredded Monterey Jack."
      },
      {
        "step": 3,
        "description": "Add remaining chips and another layer of cheese and beef."
      },
      {
        "step": 4,
        "description": "Bake at 400°F (200°C) for 8-10 minutes until cheese is completely melted and bubbly."
      },
      {
        "step": 5,
        "description": "Top with pickled jalapeños, dollops of guacamole, sour cream, and pico de gallo."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "Mexican",
    "tags": [
      "snacks",
      "nachos",
      "game day",
      "cheese",
      "mexican",
      "sharing"
    ],
    "averageRating": 4.8,
    "ratingCount": 44,
    "_id": "c6144f3fc673278d910d098d",
    "createdAt": "2026-09-22T04:41:43.546Z",
    "updatedAt": "2026-09-22T04:41:43.546Z",
    "isSystem": true
  },
  {
    "title": "Creamy Roasted Garlic Hummus with Warm Pita",
    "description": "Ultra-velvety Middle Eastern hummus blended with roasted garlic heads, nutty tahini, lemon juice, olive oil, and warm za'atar pita.",
    "image": "https://images.unsplash.com/photo-1577906096429-f73c2c312435?w=800&q=80",
    "ingredients": [
      {
        "name": "Cooked chickpeas (skins slipped off)",
        "quantity": "2 cans (15 oz)"
      },
      {
        "name": "Roasted garlic head (cloves squeezed out)",
        "quantity": "1 whole head"
      },
      {
        "name": "Quality sesame tahini",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh lemon juice",
        "quantity": "1/3 cup"
      },
      {
        "name": "Ice water",
        "quantity": "3-4 tbsp"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "3 tbsp"
      },
      {
        "name": "Ground cumin and paprika",
        "quantity": "1/2 tsp each"
      },
      {
        "name": "Warm pita bread triangles",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Blend tahini and fresh lemon juice in a food processor for 1 minute until whipped and pale."
      },
      {
        "step": 2,
        "description": "Add roasted garlic cloves, cumin, salt, and 2 tbsp olive oil; process until smooth."
      },
      {
        "step": 3,
        "description": "Add peeled chickpeas in two batches, processing for 3 minutes until smooth."
      },
      {
        "step": 4,
        "description": "Drizzle in ice water while running processor to achieve signature silky, fluffy texture."
      },
      {
        "step": 5,
        "description": "Swirl onto a plate, create a well for extra virgin olive oil, dust with paprika and za'atar, and serve with pita."
      }
    ],
    "prepTime": 15,
    "cookTime": 0,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "Mediterranean",
    "tags": [
      "snacks",
      "hummus",
      "mediterranean",
      "vegan",
      "healthy",
      "dip"
    ],
    "averageRating": 4.9,
    "ratingCount": 36,
    "_id": "50c63dafdc683a929889cca9",
    "createdAt": "2026-09-22T05:41:43.720Z",
    "updatedAt": "2026-09-22T05:41:43.720Z",
    "isSystem": true
  },
  {
    "title": "Crispy Sweet Potato Fries with Chipotle Aioli",
    "description": "Hand-cut sweet potato wedges tossed in cornstarch, smoked paprika, and sea salt, baked until crisp with smoky garlic aioli.",
    "image": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
    "ingredients": [
      {
        "name": "Sweet potatoes cut into 1/4 inch matchsticks",
        "quantity": "3 large"
      },
      {
        "name": "Cornstarch",
        "quantity": "2 tbsp"
      },
      {
        "name": "Olive oil",
        "quantity": "3 tbsp"
      },
      {
        "name": "Smoked paprika and garlic powder",
        "quantity": "1 tsp each"
      },
      {
        "name": "Flaky sea salt",
        "quantity": "1 tsp"
      },
      {
        "name": "Mayonnaise",
        "quantity": "1/2 cup"
      },
      {
        "name": "Chipotle pepper in adobo minced",
        "quantity": "1 tbsp"
      },
      {
        "name": "Lime juice",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Soak cut sweet potatoes in cold water for 30 minutes to remove excess starch; dry thoroughly."
      },
      {
        "step": 2,
        "description": "Toss dried fries in cornstarch until lightly coated, then toss with olive oil, paprika, and garlic powder."
      },
      {
        "step": 3,
        "description": "Spread in a single layer on preheated baking sheets with space between fries."
      },
      {
        "step": 4,
        "description": "Bake at 425°F (220°C) for 15 minutes, flip, and bake 10-15 more minutes until edges are blistered and crisp."
      },
      {
        "step": 5,
        "description": "Mix mayo, chipotle in adobo, and lime juice. Serve fries piping hot with aioli."
      }
    ],
    "prepTime": 40,
    "cookTime": 25,
    "servings": 3,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "American",
    "tags": [
      "snacks",
      "sweet potato",
      "fries",
      "healthy",
      "vegan",
      "crispy"
    ],
    "averageRating": 4.7,
    "ratingCount": 31,
    "_id": "09f02ed2600c892daf11f0f5",
    "createdAt": "2026-09-22T06:41:44.220Z",
    "updatedAt": "2026-09-22T06:41:44.220Z",
    "isSystem": true
  },
  {
    "title": "Fresh Chunky Guacamole with Corn Tortilla Chips",
    "description": "Hand-mashed Hass avocados with diced red onion, seeded jalapeño, roma tomatoes, cilantro, and fresh lime juice.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/64/Guacamole_IMGP1271.jpg/1280px-Guacamole_IMGP1271.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Ripe Hass avocados",
        "quantity": "3"
      },
      {
        "name": "Fresh lime juice",
        "quantity": "2 tbsp"
      },
      {
        "name": "Red onion finely minced",
        "quantity": "1/4 cup"
      },
      {
        "name": "Jalapeño seeded & minced",
        "quantity": "1"
      },
      {
        "name": "Roma tomatoes diced",
        "quantity": "2"
      },
      {
        "name": "Fresh cilantro leaves chopped",
        "quantity": "1/4 cup"
      },
      {
        "name": "Coarse sea salt & cumin",
        "quantity": "1/2 tsp each"
      },
      {
        "name": "Tortilla chips",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a molcajete or large bowl, mash minced onion, jalapeño, salt, and cilantro into a coarse paste."
      },
      {
        "step": 2,
        "description": "Halve avocados, remove pits, and scoop flesh into the bowl."
      },
      {
        "step": 3,
        "description": "Coarsely mash with a fork, leaving plenty of chunky texture."
      },
      {
        "step": 4,
        "description": "Gently fold in diced tomatoes and fresh lime juice."
      },
      {
        "step": 5,
        "description": "Taste and adjust salt or lime juice. Serve immediately with warm tortilla chips."
      }
    ],
    "prepTime": 10,
    "cookTime": 0,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "Mexican",
    "tags": [
      "snacks",
      "guacamole",
      "mexican",
      "dip",
      "avocado",
      "vegan"
    ],
    "averageRating": 4.9,
    "ratingCount": 47,
    "_id": "9dac1b9b1fbcceab3cfd73e7",
    "createdAt": "2026-09-22T07:41:44.385Z",
    "updatedAt": "2026-09-22T07:41:44.385Z",
    "isSystem": true
  },
  {
    "title": "Korean Sweet & Sticky Gochujang Chicken Bites",
    "description": "Double-fried crunchy bite-sized chicken tossed in a fiery sweet glaze of Korean gochujang chili paste, honey, garlic, and sesame seeds.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Iksan_City_48_Korean_Style_Fried_chicken.jpg/1280px-Iksan_City_48_Korean_Style_Fried_chicken.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Boneless chicken thighs cut in bite-size pieces",
        "quantity": "500g"
      },
      {
        "name": "Potato starch or cornstarch",
        "quantity": "1/2 cup"
      },
      {
        "name": "Gochujang (Korean chili paste)",
        "quantity": "3 tbsp"
      },
      {
        "name": "Honey or brown sugar",
        "quantity": "2 tbsp"
      },
      {
        "name": "Soy sauce & rice vinegar",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Minced garlic & ginger",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Sesame oil & toasted sesame seeds",
        "quantity": "1 tbsp each"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Season chicken with ginger, salt, and pepper. Dredge thoroughly in potato starch."
      },
      {
        "step": 2,
        "description": "Fry chicken in 350°F (175°C) oil for 4 minutes; remove and drain on a wire rack."
      },
      {
        "step": 3,
        "description": "Increase oil heat to 375°F (190°C) and fry chicken a second time for 2 minutes until extra crispy."
      },
      {
        "step": 4,
        "description": "In a wok, simmer gochujang, honey, soy sauce, garlic, and vinegar for 2 minutes into a sticky glaze."
      },
      {
        "step": 5,
        "description": "Toss hot crispy chicken bites immediately in the sauce and garnish with toasted sesame seeds."
      }
    ],
    "prepTime": 15,
    "cookTime": 12,
    "servings": 3,
    "difficulty": "Medium",
    "category": "Snacks",
    "cuisine": "Korean",
    "tags": [
      "snacks",
      "korean",
      "chicken",
      "spicy",
      "crispy",
      "finger food"
    ],
    "averageRating": 5,
    "ratingCount": 52,
    "_id": "02d7d564b1050d94d65cad50",
    "createdAt": "2026-09-22T08:41:44.554Z",
    "updatedAt": "2026-09-22T08:41:44.554Z",
    "isSystem": true
  },
  {
    "title": "Soft Bavarian Baked Pretzels with Beer Cheese",
    "description": "Chewy, golden-brown German pretzels sprinkled with coarse salt, served alongside a warm, creamy cheddar beer cheese dip.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/BrezelnSalz02_%28cropped%29.JPG/1280px-BrezelnSalz02_%28cropped%29.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Warm water",
        "quantity": "1.5 cups"
      },
      {
        "name": "Active dry yeast",
        "quantity": "1 packet"
      },
      {
        "name": "All-purpose flour",
        "quantity": "4.5 cups"
      },
      {
        "name": "Melted butter",
        "quantity": "4 tbsp"
      },
      {
        "name": "Baking soda (for water bath)",
        "quantity": "2/3 cup"
      },
      {
        "name": "Coarse pretzel salt",
        "quantity": "2 tbsp"
      },
      {
        "name": "Sharp cheddar shredded",
        "quantity": "2 cups"
      },
      {
        "name": "Wheat beer or lager",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Mix warm water, yeast, and sugar; let foam 5 minutes. Knead with flour and butter into smooth dough; rise 1 hour."
      },
      {
        "step": 2,
        "description": "Divide dough into 8 pieces and roll each into a 24-inch rope; twist into classic pretzel shape."
      },
      {
        "step": 3,
        "description": "Dip each pretzel into a boiling water and baking soda bath for 30 seconds; transfer to baking sheet."
      },
      {
        "step": 4,
        "description": "Sprinkle with coarse salt and bake at 450°F (230°C) for 12-14 minutes until deep dark golden brown."
      },
      {
        "step": 5,
        "description": "Make dip: melt butter, whisk flour, beer, and milk, then fold in sharp cheddar until smooth. Serve hot."
      }
    ],
    "prepTime": 30,
    "cookTime": 15,
    "servings": 8,
    "difficulty": "Medium",
    "category": "Snacks",
    "cuisine": "German",
    "tags": [
      "snacks",
      "pretzels",
      "baking",
      "cheese",
      "german",
      "party food"
    ],
    "averageRating": 4.8,
    "ratingCount": 39,
    "_id": "9fd38585c4abee87c6d514bd",
    "createdAt": "2026-09-22T09:41:44.694Z",
    "updatedAt": "2026-09-22T09:41:44.694Z",
    "isSystem": true
  },
  {
    "title": "Golden Zucchini Fritters with Garlic Herb Dip",
    "description": "Crisp-edged shredded zucchini fritters bound with feta, fresh dill, and scallions, paired with cool Greek tzatziki dip.",
    "image": "https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&q=80",
    "ingredients": [
      {
        "name": "Medium zucchinis grated",
        "quantity": "3"
      },
      {
        "name": "Feta cheese crumbled",
        "quantity": "1/2 cup"
      },
      {
        "name": "Scallions thinly sliced",
        "quantity": "3"
      },
      {
        "name": "Fresh dill chopped",
        "quantity": "2 tbsp"
      },
      {
        "name": "Eggs beaten",
        "quantity": "2 large"
      },
      {
        "name": "All-purpose flour",
        "quantity": "1/2 cup"
      },
      {
        "name": "Greek yogurt & garlic dip (tzatziki)",
        "quantity": "1/2 cup"
      },
      {
        "name": "Olive oil for frying",
        "quantity": "3 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Toss grated zucchini with salt and let sit in a colander for 15 minutes; squeeze out every drop of liquid in a towel."
      },
      {
        "step": 2,
        "description": "In a bowl, mix dried zucchini, crumbled feta, scallions, fresh dill, and black pepper."
      },
      {
        "step": 3,
        "description": "Stir in beaten eggs and flour until a thick batter forms."
      },
      {
        "step": 4,
        "description": "Heat olive oil in a skillet over medium heat; drop 2 tbsp mounds of batter, flattening slightly with a spatula."
      },
      {
        "step": 5,
        "description": "Pan-fry for 3-4 minutes per side until golden brown and crispy. Serve warm with tzatziki."
      }
    ],
    "prepTime": 25,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "Mediterranean",
    "tags": [
      "snacks",
      "zucchini",
      "fritters",
      "mediterranean",
      "vegetarian",
      "crispy"
    ],
    "averageRating": 4.7,
    "ratingCount": 30,
    "_id": "0336b1706287e4be2d5972cb",
    "createdAt": "2026-09-22T10:41:44.856Z",
    "updatedAt": "2026-09-22T10:41:44.856Z",
    "isSystem": true
  },
  {
    "title": "Crispy Asian Vegetable Spring Rolls",
    "description": "Golden shatteringly-crisp wrappers filled with cabbage, carrots, shiitake mushrooms, and glass noodles, with sweet chili dip.",
    "image": "https://images.unsplash.com/photo-1548946526-f69e2424cf45?w=800&q=80",
    "ingredients": [
      {
        "name": "Spring roll pastry sheets",
        "quantity": "12 sheets"
      },
      {
        "name": "Shredded green cabbage",
        "quantity": "2 cups"
      },
      {
        "name": "Carrots julienned",
        "quantity": "1 cup"
      },
      {
        "name": "Shiitake mushrooms sliced",
        "quantity": "1/2 cup"
      },
      {
        "name": "Glass noodles soaked & cut",
        "quantity": "50g"
      },
      {
        "name": "Soy sauce & sesame oil",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Cornstarch slurry (for sealing)",
        "quantity": "1 tbsp"
      },
      {
        "name": "Sweet chili dipping sauce",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Stir-fry garlic, cabbage, carrots, mushrooms, and noodles with soy sauce and sesame oil for 3 minutes; cool completely."
      },
      {
        "step": 2,
        "description": "Place a spring roll wrapper diamond-style; spoon 2 tbsp of filling near the bottom corner."
      },
      {
        "step": 3,
        "description": "Roll corner over filling, fold in both sides tightly like an envelope."
      },
      {
        "step": 4,
        "description": "Roll forward and dab top corner with cornstarch slurry to firmly seal."
      },
      {
        "step": 5,
        "description": "Deep fry in 365°F (185°C) oil for 4-5 minutes until blistered and golden. Serve with sweet chili sauce."
      }
    ],
    "prepTime": 25,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Snacks",
    "cuisine": "Chinese",
    "tags": [
      "snacks",
      "spring rolls",
      "asian",
      "crispy",
      "vegetarian",
      "appetizers"
    ],
    "averageRating": 4.8,
    "ratingCount": 38,
    "_id": "325583fffd93825bfee97f45",
    "createdAt": "2026-09-22T11:41:45.110Z",
    "updatedAt": "2026-09-22T11:41:45.110Z",
    "isSystem": true
  },
  {
    "title": "Spiced Roasted Masala Makhana (Fox Nuts)",
    "description": "Crunchy puffed lotus seeds roasted in fragrant ghee, turmeric, chaat masala, roasted cumin, and black salt.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/25/Junicho-Gata_lagoon_Euryale_feroxe_habitat_07.jpg/1280px-Junicho-Gata_lagoon_Euryale_feroxe_habitat_07.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Phool makhana (fox nuts / lotus seeds)",
        "quantity": "4 cups"
      },
      {
        "name": "Desi ghee",
        "quantity": "2 tbsp"
      },
      {
        "name": "Turmeric powder",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Chaat masala",
        "quantity": "1 tsp"
      },
      {
        "name": "Kashmiri red chili powder",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Black salt (kala namak)",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Roasted cumin powder",
        "quantity": "1/2 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat ghee in a wide heavy-bottomed kadai or pan over low-medium heat."
      },
      {
        "step": 2,
        "description": "Add fox nuts and roast slowly for 8-10 minutes, stirring constantly until completely crisp."
      },
      {
        "step": 3,
        "description": "Test crispness by pressing one nut; it should crush with a distinct snap."
      },
      {
        "step": 4,
        "description": "Turn off heat, sprinkle turmeric, chaat masala, chili powder, black salt, and cumin."
      },
      {
        "step": 5,
        "description": "Toss vigorously while still warm so the spices coat every piece. Let cool to reach maximum crunch."
      }
    ],
    "prepTime": 5,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "Indian",
    "tags": [
      "snacks",
      "makhana",
      "healthy",
      "gluten-free",
      "indian",
      "crunchy",
      "guilt-free"
    ],
    "averageRating": 4.6,
    "ratingCount": 25,
    "_id": "59dfad281bbcda6e5823aed0",
    "createdAt": "2026-09-22T12:41:45.240Z",
    "updatedAt": "2026-09-22T12:41:45.240Z",
    "isSystem": true
  },
  {
    "title": "Authentic Alphonso Mango Lassi",
    "description": "Thick, creamy yogurt beverage blended with sweet Alphonso mango pulp, a touch of cardamom, and crushed pistachios.",
    "image": "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80",
    "ingredients": [
      {
        "name": "Alphonso mango pulp or ripe fresh mango",
        "quantity": "1.5 cups"
      },
      {
        "name": "Thick plain Greek yogurt",
        "quantity": "1.5 cups"
      },
      {
        "name": "Cold whole milk",
        "quantity": "1/2 cup"
      },
      {
        "name": "Sugar or honey",
        "quantity": "2 tbsp"
      },
      {
        "name": "Ground green cardamom",
        "quantity": "1/4 tsp"
      },
      {
        "name": "Crushed ice cubes",
        "quantity": "1 cup"
      },
      {
        "name": "Chopped pistachios & saffron",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Add mango pulp, cold yogurt, milk, sugar, cardamom, and ice into a blender."
      },
      {
        "step": 2,
        "description": "Blend on high speed for 60 seconds until frothy and velvety smooth."
      },
      {
        "step": 3,
        "description": "Taste and adjust sweetness or add more milk if thinner consistency is desired."
      },
      {
        "step": 4,
        "description": "Pour into tall chilled glasses."
      },
      {
        "step": 5,
        "description": "Garnish with slivered pistachios and a strand of saffron."
      }
    ],
    "prepTime": 5,
    "cookTime": 0,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Indian",
    "tags": [
      "drinks",
      "mango lassi",
      "beverage",
      "indian",
      "refreshing",
      "summer"
    ],
    "averageRating": 4.9,
    "ratingCount": 56,
    "_id": "6cbf1a33dcc62a335bf07c49",
    "createdAt": "2026-09-22T13:41:45.411Z",
    "updatedAt": "2026-09-22T13:41:45.411Z",
    "isSystem": true
  },
  {
    "title": "Sparkling Mint & Lime Virgin Mojito",
    "description": "Muddled garden mint leaves and juicy Persian limes topped with crushed ice, pure cane syrup, and effervescent sparkling soda.",
    "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh spearmint leaves",
        "quantity": "15-20 leaves"
      },
      {
        "name": "Fresh lime wedges",
        "quantity": "1 whole lime cut in 6"
      },
      {
        "name": "Pure cane simple syrup",
        "quantity": "2 tbsp"
      },
      {
        "name": "Crushed ice",
        "quantity": "2 cups"
      },
      {
        "name": "Club soda or sparkling water",
        "quantity": "1 cup"
      },
      {
        "name": "Angostura bitters (optional)",
        "quantity": "1 dash"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Place lime wedges, fresh mint leaves, and simple syrup in a sturdy highball glass."
      },
      {
        "step": 2,
        "description": "Gently muddle with a wooden muddler to release lime juices and aromatic mint oils (don't shred the leaves)."
      },
      {
        "step": 3,
        "description": "Pack the glass to the brim with crushed ice."
      },
      {
        "step": 4,
        "description": "Top with sparkling soda water and stir gently from the bottom with a bar spoon."
      },
      {
        "step": 5,
        "description": "Clap a fresh mint sprig between your palms to release aroma and garnish atop the glass with a lime wheel."
      }
    ],
    "prepTime": 5,
    "cookTime": 0,
    "servings": 1,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Mexican",
    "tags": [
      "drinks",
      "mojito",
      "mocktail",
      "mint",
      "lime",
      "refreshing"
    ],
    "averageRating": 4.8,
    "ratingCount": 42,
    "_id": "414ae74eed4d59329acb88b0",
    "createdAt": "2026-09-22T14:41:45.550Z",
    "updatedAt": "2026-09-22T14:41:45.550Z",
    "isSystem": true
  },
  {
    "title": "Iced Ceremonial Matcha Oat Latte",
    "description": "Vibrant emerald green ceremonial Japanese matcha hand-whisked to a microfoam and layered over chilled creamy oat milk and ice.",
    "image": "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&q=80",
    "ingredients": [
      {
        "name": "Ceremonial grade Japanese matcha powder",
        "quantity": "1.5 tsp"
      },
      {
        "name": "Warm water (80°C / 175°F)",
        "quantity": "1/4 cup"
      },
      {
        "name": "Barista quality oat milk",
        "quantity": "3/4 cup"
      },
      {
        "name": "Vanilla syrup or pure maple syrup",
        "quantity": "1 tbsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "1 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sift matcha powder through a fine strainer into a chawan or small bowl to remove lumps."
      },
      {
        "step": 2,
        "description": "Add warm water and whisk vigorously in a 'W' motion with a bamboo chasen until a rich emerald foam appears."
      },
      {
        "step": 3,
        "description": "Fill a tall glass with ice cubes."
      },
      {
        "step": 4,
        "description": "Pour in oat milk and vanilla syrup, stirring to blend."
      },
      {
        "step": 5,
        "description": "Slowly pour the whisked matcha over top to create an elegant two-tone ombre layer."
      }
    ],
    "prepTime": 5,
    "cookTime": 0,
    "servings": 1,
    "difficulty": "Medium",
    "category": "Drinks",
    "cuisine": "Japanese",
    "tags": [
      "drinks",
      "matcha",
      "latte",
      "oat milk",
      "japanese",
      "energy"
    ],
    "averageRating": 4.8,
    "ratingCount": 39,
    "_id": "33ba62200e93023d6bda78d3",
    "createdAt": "2026-09-22T15:41:45.682Z",
    "updatedAt": "2026-09-22T15:41:45.682Z",
    "isSystem": true
  },
  {
    "title": "Wild Hibiscus Berry Herbal Iced Tea",
    "description": "Deep ruby infusion of tart Egyptian hibiscus blossoms, blackberries, sweet orange peel, and fresh garden rosemary.",
    "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    "ingredients": [
      {
        "name": "Dried hibiscus flowers (Flor de Jamaica)",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh blackberries muddled",
        "quantity": "1/2 cup"
      },
      {
        "name": "Boiling water",
        "quantity": "4 cups"
      },
      {
        "name": "Honey or agave nectar",
        "quantity": "1/4 cup"
      },
      {
        "name": "Orange slices",
        "quantity": "1 orange"
      },
      {
        "name": "Fresh rosemary sprigs",
        "quantity": "2"
      },
      {
        "name": "Ice",
        "quantity": "as needed"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Steep dried hibiscus flowers in boiling water for 15 minutes until liquid is a deep glowing ruby."
      },
      {
        "step": 2,
        "description": "Strain hibiscus liquid into a heatproof pitcher and stir in honey while warm until dissolved."
      },
      {
        "step": 3,
        "description": "Add muddled blackberries, orange slices, and rosemary sprigs; chill in the refrigerator for 2 hours."
      },
      {
        "step": 4,
        "description": "Fill tall glasses with ice cubes and pour chilled hibiscus tea through a strainer."
      },
      {
        "step": 5,
        "description": "Garnish with fresh blackberries and an orange wheel."
      }
    ],
    "prepTime": 10,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Mediterranean",
    "tags": [
      "drinks",
      "iced tea",
      "hibiscus",
      "antioxidant",
      "refreshing",
      "summer"
    ],
    "averageRating": 4.7,
    "ratingCount": 28,
    "_id": "ebd5c27179bdfade45657129",
    "createdAt": "2026-09-22T16:41:45.834Z",
    "updatedAt": "2026-09-22T16:41:45.834Z",
    "isSystem": true
  },
  {
    "title": "Slow-Dripped Cold Brew with Vanilla Cream",
    "description": "Silky 16-hour steeped dark roast cold brew coffee poured over ice and topped with a floating layer of sweet vanilla cream.",
    "image": "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80",
    "ingredients": [
      {
        "name": "Coarsely ground dark roast coffee",
        "quantity": "1 cup"
      },
      {
        "name": "Filtered cold water",
        "quantity": "4 cups"
      },
      {
        "name": "Heavy whipping cream",
        "quantity": "1/4 cup"
      },
      {
        "name": "Whole milk",
        "quantity": "2 tbsp"
      },
      {
        "name": "Vanilla bean syrup",
        "quantity": "2 tbsp"
      },
      {
        "name": "Ice cubes",
        "quantity": "as needed"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Combine coarse coffee grounds with cold filtered water in a mason jar. Stir and steep at room temp for 16 hours."
      },
      {
        "step": 2,
        "description": "Strain cold brew through a paper coffee filter into a clean carafe; store cold."
      },
      {
        "step": 3,
        "description": "Make sweet cream: whisk heavy cream, milk, and vanilla syrup with a handheld frother until slightly thickened but pourable."
      },
      {
        "step": 4,
        "description": "Fill a glass with ice and pour cold brew until 3/4 full."
      },
      {
        "step": 5,
        "description": "Gently pour the vanilla sweet cream over the back of a spoon so it cascades through the dark coffee."
      }
    ],
    "prepTime": 10,
    "cookTime": 0,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "American",
    "tags": [
      "drinks",
      "coffee",
      "cold brew",
      "vanilla cream",
      "cafe"
    ],
    "averageRating": 4.9,
    "ratingCount": 47,
    "_id": "d18f7cf04b5a64c8c8591d2e",
    "createdAt": "2026-09-22T17:41:46.026Z",
    "updatedAt": "2026-09-22T17:41:46.026Z",
    "isSystem": true
  },
  {
    "title": "Sparkling Citrus & Pomegranate Virgin Sangria",
    "description": "Festive non-alcoholic pitcher cocktail of tart pomegranate, fresh blood oranges, crisp apples, and sparkling mineral water.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Red_Wine_Sangria_with_lemon%2C_lime%2C_apple%2C_and_orange_served_in_a_glass_-_Evan_Swigart.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "ingredients": [
      {
        "name": "100% Pomegranate juice chilled",
        "quantity": "2 cups"
      },
      {
        "name": "Fresh orange juice",
        "quantity": "1 cup"
      },
      {
        "name": "Grape juice or tart cherry juice",
        "quantity": "1 cup"
      },
      {
        "name": "Green apple diced",
        "quantity": "1"
      },
      {
        "name": "Blood orange or navel orange sliced",
        "quantity": "1"
      },
      {
        "name": "Fresh lime sliced",
        "quantity": "1"
      },
      {
        "name": "Cinnamon stick",
        "quantity": "1"
      },
      {
        "name": "Chilled sparkling mineral water",
        "quantity": "2 cups"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a large glass pitcher, combine diced apples, sliced oranges, limes, and cinnamon stick."
      },
      {
        "step": 2,
        "description": "Pour in pomegranate juice, orange juice, and grape juice."
      },
      {
        "step": 3,
        "description": "Refrigerate for at least 2 hours so fruit flavors infuse the juices."
      },
      {
        "step": 4,
        "description": "Just before serving, pour in chilled sparkling mineral water and stir gently."
      },
      {
        "step": 5,
        "description": "Ladle fruit into wine glasses filled with ice and pour sparkling sangria over top."
      }
    ],
    "prepTime": 15,
    "cookTime": 0,
    "servings": 6,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Spanish",
    "tags": [
      "drinks",
      "sangria",
      "mocktail",
      "party",
      "citrus",
      "fruity"
    ],
    "averageRating": 4.8,
    "ratingCount": 33,
    "_id": "5340f6665addfb1227abafaa",
    "createdAt": "2026-09-22T18:41:46.167Z",
    "updatedAt": "2026-09-22T18:41:46.167Z",
    "isSystem": true
  },
  {
    "title": "Traditional Spiced Indian Masala Chai",
    "description": "Robust Assam CTC black tea simmered with whole milk, crushed ginger root, green cardamom, cinnamon, and cloves.",
    "image": "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80",
    "ingredients": [
      {
        "name": "Assam black tea leaves (CTC)",
        "quantity": "2 tbsp"
      },
      {
        "name": "Whole milk",
        "quantity": "1.5 cups"
      },
      {
        "name": "Water",
        "quantity": "1.5 cups"
      },
      {
        "name": "Fresh ginger crushed",
        "quantity": "1-inch piece"
      },
      {
        "name": "Green cardamom pods crushed",
        "quantity": "4"
      },
      {
        "name": "Cinnamon bark piece",
        "quantity": "1-inch"
      },
      {
        "name": "Black peppercorns & cloves",
        "quantity": "3 each"
      },
      {
        "name": "Sugar or jaggery",
        "quantity": "2-3 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a saucepan, bring water, crushed ginger, and whole spices to a rolling boil for 3 minutes to extract flavors."
      },
      {
        "step": 2,
        "description": "Add Assam black tea leaves and simmer for 2 minutes until rich dark amber liquor forms."
      },
      {
        "step": 3,
        "description": "Pour in whole milk and add sugar."
      },
      {
        "step": 4,
        "description": "Bring to a boil until the chai froths to the top; lower heat and let it rise twice more for rich body."
      },
      {
        "step": 5,
        "description": "Strain through a fine tea strainer into clay cups or mugs and serve piping hot."
      }
    ],
    "prepTime": 5,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Indian",
    "tags": [
      "drinks",
      "masala chai",
      "tea",
      "indian",
      "spiced",
      "comforting"
    ],
    "averageRating": 4.9,
    "ratingCount": 65,
    "_id": "bbaf9f259a3b7806535d92f7",
    "createdAt": "2026-09-22T19:41:46.554Z",
    "updatedAt": "2026-09-22T19:41:46.554Z",
    "isSystem": true
  },
  {
    "title": "Chilled Watermelon Basil Lime Cooler",
    "description": "Hydrating fresh seedless watermelon blended with freshly squeezed lime juice, sweet basil leaves, and a pinch of pink Himalayan salt.",
    "image": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&q=80",
    "ingredients": [
      {
        "name": "Cold seedless watermelon cubed",
        "quantity": "5 cups"
      },
      {
        "name": "Fresh lime juice",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh basil leaves",
        "quantity": "8-10 leaves"
      },
      {
        "name": "Honey or agave",
        "quantity": "1 tbsp optional"
      },
      {
        "name": "Pink Himalayan salt",
        "quantity": "pinch"
      },
      {
        "name": "Crushed ice",
        "quantity": "1 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Add cold watermelon chunks, fresh lime juice, and pink salt into a blender."
      },
      {
        "step": 2,
        "description": "Add fresh basil leaves and blend on high for 30-45 seconds until completely pureed."
      },
      {
        "step": 3,
        "description": "Pour through a fine-mesh strainer into a pitcher if a clearer juice is preferred, or enjoy with pulp."
      },
      {
        "step": 4,
        "description": "Fill glasses with crushed ice and pour cooler over."
      },
      {
        "step": 5,
        "description": "Garnish with a fresh watermelon wedge and a sprig of basil."
      }
    ],
    "prepTime": 10,
    "cookTime": 0,
    "servings": 3,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "American",
    "tags": [
      "drinks",
      "watermelon",
      "cooler",
      "hydrating",
      "summer",
      "refreshing"
    ],
    "averageRating": 4.7,
    "ratingCount": 30,
    "_id": "ba06dc0b849f006a16d97e17",
    "createdAt": "2026-09-22T20:41:46.705Z",
    "updatedAt": "2026-09-22T20:41:46.705Z",
    "isSystem": true
  },
  {
    "title": "Creamy Strawberry Banana Power Smoothie",
    "description": "Thick and energizing blend of ripe sweet strawberries, frozen banana, Greek yogurt, chia seeds, and raw honey.",
    "image": "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh or frozen strawberries",
        "quantity": "1.5 cups"
      },
      {
        "name": "Ripe frozen banana",
        "quantity": "1 large"
      },
      {
        "name": "Plain Greek yogurt",
        "quantity": "1/2 cup"
      },
      {
        "name": "Almond milk or whole milk",
        "quantity": "1 cup"
      },
      {
        "name": "Chia seeds",
        "quantity": "1 tbsp"
      },
      {
        "name": "Raw honey",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Add almond milk and Greek yogurt to the blender container first."
      },
      {
        "step": 2,
        "description": "Add frozen strawberries, banana chunks, chia seeds, and honey."
      },
      {
        "step": 3,
        "description": "Blend on high speed for 60 seconds until creamy, silky, and thick."
      },
      {
        "step": 4,
        "description": "Pour into a tall smoothie glass."
      },
      {
        "step": 5,
        "description": "Top with a sliced strawberry and a sprinkle of chia seeds."
      }
    ],
    "prepTime": 5,
    "cookTime": 0,
    "servings": 1,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "American",
    "tags": [
      "drinks",
      "smoothie",
      "strawberry",
      "banana",
      "healthy",
      "breakfast"
    ],
    "averageRating": 4.8,
    "ratingCount": 40,
    "_id": "f56e18d167112c9fce3b32d2",
    "createdAt": "2026-09-22T21:41:46.883Z",
    "updatedAt": "2026-09-22T21:41:46.883Z",
    "isSystem": true
  },
  {
    "title": "Golden Turmeric Spiced Milk (Haldi Doodh)",
    "description": "Ancient Ayurvedic golden elixir made by simmering whole milk with ground turmeric, crushed black pepper, ginger, and raw honey.",
    "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&q=80",
    "ingredients": [
      {
        "name": "Whole milk or oat milk",
        "quantity": "2 cups"
      },
      {
        "name": "Ground turmeric",
        "quantity": "1 tsp"
      },
      {
        "name": "Fresh ginger grated",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Ground cinnamon",
        "quantity": "1/4 tsp"
      },
      {
        "name": "Freshly ground black pepper",
        "quantity": "pinch (aids curcumin absorption)"
      },
      {
        "name": "Virgin coconut oil or ghee",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Raw honey",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk milk, turmeric, ginger, cinnamon, black pepper, and coconut oil in a small saucepan."
      },
      {
        "step": 2,
        "description": "Bring to a gentle simmer over medium-low heat for 8-10 minutes, whisking occasionally."
      },
      {
        "step": 3,
        "description": "Remove from heat and let cool to drinking temperature."
      },
      {
        "step": 4,
        "description": "Stir in raw honey (do not boil honey to preserve nutrients)."
      },
      {
        "step": 5,
        "description": "Pour into warm mugs through a strainer and dust with extra cinnamon."
      }
    ],
    "prepTime": 5,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Indian",
    "tags": [
      "drinks",
      "golden milk",
      "turmeric",
      "ayurveda",
      "immunity",
      "wellness"
    ],
    "averageRating": 4.8,
    "ratingCount": 35,
    "_id": "5d510e0fc9f3205f568dbb47",
    "createdAt": "2026-09-22T22:41:47.063Z",
    "updatedAt": "2026-09-22T22:41:47.063Z",
    "isSystem": true
  },
  {
    "title": "Classic Heirloom Tomato & Basil Bruschetta",
    "description": "Grilled garlic-rubbed artisan country bread crowned with diced multicolored heirloom tomatoes, fresh basil, and 25-year aged balsamic.",
    "image": "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=80",
    "ingredients": [
      {
        "name": "Artisan sourdough or ciabatta sliced thick",
        "quantity": "8 slices"
      },
      {
        "name": "Heirloom tomatoes seeded and diced",
        "quantity": "4 medium"
      },
      {
        "name": "Garlic cloves",
        "quantity": "3 (1 minced, 2 whole for rubbing)"
      },
      {
        "name": "Fresh basil leaves chiffonade",
        "quantity": "1/4 cup"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "3 tbsp"
      },
      {
        "name": "Aged balsamic glaze",
        "quantity": "2 tbsp"
      },
      {
        "name": "Flaky sea salt and black pepper",
        "quantity": "to taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Toss diced heirloom tomatoes, minced garlic, olive oil, basil, salt, and pepper in a bowl; rest 15 minutes."
      },
      {
        "step": 2,
        "description": "Brush bread slices lightly with olive oil and grill or toast until golden and charred at edges."
      },
      {
        "step": 3,
        "description": "Immediately rub the warm bread with the cut side of a raw garlic clove."
      },
      {
        "step": 4,
        "description": "Spoon the seasoned tomato mixture generously over each garlic toast slice."
      },
      {
        "step": 5,
        "description": "Drizzle with aged balsamic glaze and finish with flaky sea salt."
      }
    ],
    "prepTime": 15,
    "cookTime": 5,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "Italian",
    "tags": [
      "appetizers",
      "bruschetta",
      "italian",
      "finger food",
      "tomatoes",
      "vegetarian"
    ],
    "averageRating": 4.9,
    "ratingCount": 51,
    "_id": "ea351e29ab5221215e071674",
    "createdAt": "2026-09-22T23:41:47.646Z",
    "updatedAt": "2026-09-22T23:41:47.646Z",
    "isSystem": true
  },
  {
    "title": "Crispy Salt & Pepper Calamari with Lemon Aioli",
    "description": "Tender squid rings coated in light seasoned cornstarch and flash-fried to golden crunch, garnished with fried jalapeños and garlic aioli.",
    "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh squid rings and tentacles cleaned",
        "quantity": "500g"
      },
      {
        "name": "Cornstarch",
        "quantity": "3/4 cup"
      },
      {
        "name": "Coarse sea salt & freshly ground Sichuan or black pepper",
        "quantity": "1 tsp each"
      },
      {
        "name": "Garlic powder & paprika",
        "quantity": "1/2 tsp each"
      },
      {
        "name": "Jalapeño pepper sliced thin",
        "quantity": "1"
      },
      {
        "name": "Garlic lemon aioli",
        "quantity": "1/2 cup"
      },
      {
        "name": "Lemon wedges",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pat squid completely dry with paper towels to prevent popping in oil."
      },
      {
        "step": 2,
        "description": "Whisk cornstarch, salt, pepper, garlic powder, and paprika in a wide bowl."
      },
      {
        "step": 3,
        "description": "Toss squid pieces in cornstarch mixture, shaking off excess in a sieve."
      },
      {
        "step": 4,
        "description": "Flash fry in 375°F (190°C) oil in small batches for 60-90 seconds only (overcooking makes squid rubbery)."
      },
      {
        "step": 5,
        "description": "Drain on paper towels, toss with fried jalapeño slices, and serve hot with lemon aioli."
      }
    ],
    "prepTime": 15,
    "cookTime": 5,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Appetizers",
    "cuisine": "Mediterranean",
    "tags": [
      "appetizers",
      "calamari",
      "seafood",
      "crispy",
      "finger food"
    ],
    "averageRating": 4.8,
    "ratingCount": 43,
    "_id": "d485ebb49adcd5c4c475e5f2",
    "createdAt": "2026-09-23T00:41:48.201Z",
    "updatedAt": "2026-09-23T00:41:48.201Z",
    "isSystem": true
  },
  {
    "title": "Garlic Butter & Herb Stuffed Cremini Mushrooms",
    "description": "Plump baby bella mushroom caps stuffed with cream cheese, savory herbs, garlic, parmesan, and buttery golden breadcrumbs.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/21/Portobello_with_goats%27_cheese%2C_bacon_and_thym.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "ingredients": [
      {
        "name": "Cremini or baby bella mushrooms stems removed",
        "quantity": "16 large"
      },
      {
        "name": "Cream cheese softened",
        "quantity": "4 oz"
      },
      {
        "name": "Parmesan cheese grated",
        "quantity": "1/2 cup"
      },
      {
        "name": "Panko breadcrumbs",
        "quantity": "1/3 cup"
      },
      {
        "name": "Garlic minced",
        "quantity": "3 cloves"
      },
      {
        "name": "Fresh parsley and thyme chopped",
        "quantity": "2 tbsp"
      },
      {
        "name": "Melted butter",
        "quantity": "3 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Wipe mushroom caps clean and pop out stems; finely mince half the stems."
      },
      {
        "step": 2,
        "description": "Sauté minced mushroom stems and garlic in 1 tbsp butter for 3 minutes until soft."
      },
      {
        "step": 3,
        "description": "In a bowl, mix sautéed stems, cream cheese, parmesan, herbs, salt, and black pepper."
      },
      {
        "step": 4,
        "description": "Stuff each mushroom cap generously with the cheese mixture and top with panko tossed in remaining melted butter."
      },
      {
        "step": 5,
        "description": "Bake at 400°F (200°C) for 18-20 minutes until caps are tender and panko is deep golden brown."
      }
    ],
    "prepTime": 15,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "American",
    "tags": [
      "appetizers",
      "mushrooms",
      "stuffed",
      "vegetarian",
      "party food"
    ],
    "averageRating": 4.7,
    "ratingCount": 36,
    "_id": "ae626c09ad78599ec72ec690",
    "createdAt": "2026-09-23T01:41:48.344Z",
    "updatedAt": "2026-09-23T01:41:48.344Z",
    "isSystem": true
  },
  {
    "title": "Fresh Vietnamese Rice Paper Summer Rolls",
    "description": "Translucent rice paper rolls filled with plump poached shrimp, crisp lettuce, mint, Thai basil, and rice vermicelli with hoisin peanut dip.",
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
    "ingredients": [
      {
        "name": "Large round rice paper wrappers",
        "quantity": "8"
      },
      {
        "name": "Cooked shrimp halved lengthwise",
        "quantity": "16 halves"
      },
      {
        "name": "Cooked rice vermicelli noodles",
        "quantity": "1.5 cups"
      },
      {
        "name": "Butter lettuce leaves",
        "quantity": "8 leaves"
      },
      {
        "name": "Fresh mint and Thai basil leaves",
        "quantity": "1/2 cup each"
      },
      {
        "name": "Cucumber julienned",
        "quantity": "1 small"
      },
      {
        "name": "Hoisin peanut dipping sauce",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Dip one rice paper sheet into warm water for 5 seconds; lay flat on clean damp towel (it will soften)."
      },
      {
        "step": 2,
        "description": "Place lettuce, cucumber, vermicelli, and herbs on the bottom third of the wrapper."
      },
      {
        "step": 3,
        "description": "Roll up tightly halfway, then place 3-4 shrimp halves cut-side up along the fold."
      },
      {
        "step": 4,
        "description": "Fold in left and right sides tightly over filling, then roll all the way forward to seal."
      },
      {
        "step": 5,
        "description": "Cut diagonally and serve fresh with homemade hoisin peanut dipping sauce."
      }
    ],
    "prepTime": 25,
    "cookTime": 0,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Appetizers",
    "cuisine": "Vietnamese",
    "tags": [
      "appetizers",
      "spring rolls",
      "vietnamese",
      "healthy",
      "seafood",
      "fresh"
    ],
    "averageRating": 4.9,
    "ratingCount": 45,
    "_id": "5de3736c5c90a70a07c2592a",
    "createdAt": "2026-09-23T02:41:48.619Z",
    "updatedAt": "2026-09-23T02:41:48.619Z",
    "isSystem": true
  },
  {
    "title": "Warm Creamy Spinach & Artichoke Dip",
    "description": "Decadent bubbly dip with tender chopped artichoke hearts, spinach, roasted garlic, cream cheese, and molten mozzarella.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/48/Spinach_%26_artichoke_dip.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "ingredients": [
      {
        "name": "Frozen chopped spinach thawed & squeezed dry",
        "quantity": "10 oz"
      },
      {
        "name": "Marinated artichoke hearts drained & chopped",
        "quantity": "1 can (14 oz)"
      },
      {
        "name": "Cream cheese softened",
        "quantity": "8 oz"
      },
      {
        "name": "Sour cream & mayonnaise",
        "quantity": "1/2 cup each"
      },
      {
        "name": "Mozzarella cheese shredded",
        "quantity": "1.5 cups"
      },
      {
        "name": "Parmesan cheese grated",
        "quantity": "1/2 cup"
      },
      {
        "name": "Garlic cloves minced",
        "quantity": "3"
      },
      {
        "name": "Tortilla chips or toasted baguette slices",
        "quantity": "for dipping"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat oven to 375°F (190°C) and grease a 9-inch baking dish."
      },
      {
        "step": 2,
        "description": "Beat cream cheese, sour cream, mayonnaise, garlic, and parmesan until smooth."
      },
      {
        "step": 3,
        "description": "Fold in completely dried spinach, chopped artichokes, and 1 cup of the mozzarella."
      },
      {
        "step": 4,
        "description": "Spread into prepared baking dish and scatter remaining 1/2 cup mozzarella on top."
      },
      {
        "step": 5,
        "description": "Bake for 20 minutes until bubbling around edges; broil 2 minutes until cheese browns nicely."
      }
    ],
    "prepTime": 15,
    "cookTime": 20,
    "servings": 6,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "American",
    "tags": [
      "appetizers",
      "spinach dip",
      "cheese",
      "party food",
      "comfort food"
    ],
    "averageRating": 4.8,
    "ratingCount": 52,
    "_id": "e52440b1c9e30b08c9b95ae4",
    "createdAt": "2026-09-23T03:41:48.745Z",
    "updatedAt": "2026-09-23T03:41:48.745Z",
    "isSystem": true
  },
  {
    "title": "Caprese Skewers with Aged Balsamic Drizzle",
    "description": "Bite-sized cherry tomatoes, fresh baby bocconcini mozzarella balls, and sweet basil leaves threaded on skewers and drizzled with reduction.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Caprese-1_%28tigher_crop%29.jpg/1280px-Caprese-1_%28tigher_crop%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Cherry tomatoes sweet",
        "quantity": "20"
      },
      {
        "name": "Mini mozzarella pearls / bocconcini",
        "quantity": "20"
      },
      {
        "name": "Fresh basil leaves",
        "quantity": "20"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "2 tbsp"
      },
      {
        "name": "Thick balsamic glaze reduction",
        "quantity": "2 tbsp"
      },
      {
        "name": "Flaky sea salt & cracked black pepper",
        "quantity": "pinch each"
      },
      {
        "name": "Bamboo skewers (4-inch)",
        "quantity": "20"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Thread one cherry tomato, a folded fresh basil leaf, and a bocconcini pearl onto each skewer."
      },
      {
        "step": 2,
        "description": "Arrange skewers artfully on a chilled white ceramic serving platter."
      },
      {
        "step": 3,
        "description": "Drizzle lightly with fruity extra virgin olive oil."
      },
      {
        "step": 4,
        "description": "Drizzle balsamic glaze in a decorative zigzag over skewers."
      },
      {
        "step": 5,
        "description": "Finish with freshly cracked black pepper and flaky sea salt right before serving."
      }
    ],
    "prepTime": 15,
    "cookTime": 0,
    "servings": 6,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "Italian",
    "tags": [
      "appetizers",
      "caprese",
      "skewers",
      "italian",
      "no-cook",
      "finger food",
      "fresh"
    ],
    "averageRating": 4.8,
    "ratingCount": 37,
    "_id": "98e4800b609d192bd4e3483b",
    "createdAt": "2026-09-23T04:41:48.909Z",
    "updatedAt": "2026-09-23T04:41:48.909Z",
    "isSystem": true
  },
  {
    "title": "Crispy Buffalo Cauliflower Wings with Ranch",
    "description": "Spiced beer-battered roasted cauliflower florets tossed in tangy Frank's RedHot butter sauce, served with cool buttermilk ranch.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/51/Buffalo_wings-01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "ingredients": [
      {
        "name": "Cauliflower head cut into bite-size florets",
        "quantity": "1 large"
      },
      {
        "name": "All-purpose flour",
        "quantity": "3/4 cup"
      },
      {
        "name": "Garlic powder & paprika",
        "quantity": "1 tsp each"
      },
      {
        "name": "Water or milk",
        "quantity": "3/4 cup"
      },
      {
        "name": "Buffalo hot pepper sauce",
        "quantity": "1/2 cup"
      },
      {
        "name": "Melted butter",
        "quantity": "2 tbsp"
      },
      {
        "name": "Buttermilk ranch dressing & celery sticks",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat oven to 450°F (230°C) and line a large baking sheet with parchment."
      },
      {
        "step": 2,
        "description": "Whisk flour, spices, salt, and water into a smooth batter."
      },
      {
        "step": 3,
        "description": "Dip cauliflower florets into batter, shaking off excess, and place onto baking sheet."
      },
      {
        "step": 4,
        "description": "Bake 20 minutes until golden and firm."
      },
      {
        "step": 5,
        "description": "Toss baked florets in melted butter and hot sauce, return to oven for 10 more minutes until crisp."
      }
    ],
    "prepTime": 15,
    "cookTime": 30,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "American",
    "tags": [
      "appetizers",
      "buffalo",
      "cauliflower",
      "vegetarian",
      "game day",
      "crispy"
    ],
    "averageRating": 4.7,
    "ratingCount": 34,
    "_id": "f58ae2a8f6bf479a36be505b",
    "createdAt": "2026-09-23T05:41:49.140Z",
    "updatedAt": "2026-09-23T05:41:49.140Z",
    "isSystem": true
  },
  {
    "title": "Grilled Chicken Satay with Spicy Peanut Sauce",
    "description": "Tender chicken skewers marinated in coconut milk, lemongrass, and turmeric, flame-grilled and served with rich warm peanut sauce.",
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    "ingredients": [
      {
        "name": "Chicken tenderloins or thighs sliced into strips",
        "quantity": "500g"
      },
      {
        "name": "Coconut milk",
        "quantity": "1/2 cup"
      },
      {
        "name": "Lemongrass minced",
        "quantity": "1 stalk"
      },
      {
        "name": "Ground turmeric & coriander",
        "quantity": "1 tsp each"
      },
      {
        "name": "Creamy peanut butter",
        "quantity": "1/2 cup"
      },
      {
        "name": "Soy sauce & brown sugar",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Red curry paste & lime juice",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Wooden skewers soaked in water",
        "quantity": "12"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Marinate chicken in coconut milk, lemongrass, turmeric, coriander, and salt for 1 hour."
      },
      {
        "step": 2,
        "description": "Thread marinated chicken strips onto soaked wooden skewers in an S-shape."
      },
      {
        "step": 3,
        "description": "Make peanut sauce: whisk peanut butter, red curry paste, soy sauce, brown sugar, lime juice, and 1/3 cup warm water."
      },
      {
        "step": 4,
        "description": "Grill skewers on high heat for 3-4 minutes per side until charred and cooked through."
      },
      {
        "step": 5,
        "description": "Serve skewers hot garnished with cilantro and accompanied by warm peanut sauce."
      }
    ],
    "prepTime": 25,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Appetizers",
    "cuisine": "Thai",
    "tags": [
      "appetizers",
      "satay",
      "chicken",
      "thai",
      "peanut sauce",
      "grilled"
    ],
    "averageRating": 4.9,
    "ratingCount": 46,
    "_id": "1b587e356785881092067187",
    "createdAt": "2026-09-23T06:41:49.300Z",
    "updatedAt": "2026-09-23T06:41:49.300Z",
    "isSystem": true
  },
  {
    "title": "French Onion Soup Gratinée",
    "description": "Rich caramelized onion soup slow-simmered in beef stock and dry sherry, crowned with a toasted baguette slice and bubbling Gruyère.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Soupe_%C3%A0_l%27oignon.jpg/1280px-Soupe_%C3%A0_l%27oignon.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Yellow onions thinly sliced",
        "quantity": "4 large"
      },
      {
        "name": "Butter",
        "quantity": "3 tbsp"
      },
      {
        "name": "Dry sherry or white wine",
        "quantity": "1/2 cup"
      },
      {
        "name": "Rich beef bone broth",
        "quantity": "6 cups"
      },
      {
        "name": "Fresh thyme sprigs & bay leaf",
        "quantity": "3 sprigs + 1 leaf"
      },
      {
        "name": "French baguette slices toasted",
        "quantity": "4 thick slices"
      },
      {
        "name": "Gruyère cheese shredded",
        "quantity": "1.5 cups"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Melt butter in a Dutch oven; slowly cook sliced onions over medium-low heat for 45 minutes until deeply caramelized."
      },
      {
        "step": 2,
        "description": "Deglaze pan with sherry, scraping up all browned bits."
      },
      {
        "step": 3,
        "description": "Add beef broth, thyme, and bay leaf. Simmer gently for 25 minutes, then season with salt and pepper."
      },
      {
        "step": 4,
        "description": "Ladle hot soup into oven-safe ceramic crocks; place a toasted baguette slice on top of each."
      },
      {
        "step": 5,
        "description": "Mound with shredded Gruyère cheese and broil for 3-4 minutes until cheese is melted, browned, and bubbling."
      }
    ],
    "prepTime": 20,
    "cookTime": 75,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Appetizers",
    "cuisine": "French",
    "tags": [
      "appetizers",
      "french onion",
      "soup",
      "french",
      "cheese",
      "comfort food"
    ],
    "averageRating": 4.8,
    "ratingCount": 39,
    "_id": "613118eee84e7f792f7cae43",
    "createdAt": "2026-09-23T07:41:49.432Z",
    "updatedAt": "2026-09-23T07:41:49.432Z",
    "isSystem": true
  },
  {
    "title": "Sizzling Spanish Garlic Herb Prawns (Gambas al Ajillo)",
    "description": "Plump wild prawns sizzling in rich olive oil with thinly sliced garlic cloves, dried red chilies, dry sherry, and fresh parsley.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/TapasenBarcelona.JPG/1280px-TapasenBarcelona.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Wild jumbo prawns peeled & deveined",
        "quantity": "450g"
      },
      {
        "name": "Extra virgin Spanish olive oil",
        "quantity": "1/2 cup"
      },
      {
        "name": "Garlic cloves thinly sliced",
        "quantity": "8"
      },
      {
        "name": "Dried red chili pepper sliced",
        "quantity": "1"
      },
      {
        "name": "Dry Spanish sherry (Fino)",
        "quantity": "2 tbsp"
      },
      {
        "name": "Fresh flat-leaf parsley chopped",
        "quantity": "3 tbsp"
      },
      {
        "name": "Crusty bread for dipping",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pat prawns completely dry with paper towels and season with sea salt."
      },
      {
        "step": 2,
        "description": "Heat olive oil in a wide cast iron or clay cazuela skillet over medium heat."
      },
      {
        "step": 3,
        "description": "Add sliced garlic and dried chili; cook for 1-2 minutes until garlic turns pale golden (do not burn)."
      },
      {
        "step": 4,
        "description": "Turn heat to high, add prawns and cook for 90 seconds until pink and curled."
      },
      {
        "step": 5,
        "description": "Splash with sherry and fresh parsley, remove immediately from heat, and serve sizzling with warm bread."
      }
    ],
    "prepTime": 10,
    "cookTime": 5,
    "servings": 3,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "Spanish",
    "tags": [
      "appetizers",
      "tapas",
      "prawns",
      "seafood",
      "spanish",
      "garlic",
      "quick"
    ],
    "averageRating": 4.9,
    "ratingCount": 47,
    "_id": "4200daf603ed2b3163985300",
    "createdAt": "2026-09-23T08:41:49.603Z",
    "updatedAt": "2026-09-23T08:41:49.603Z",
    "isSystem": true
  },
  {
    "title": "Paneer Butter Masala",
    "description": "Soft paneer cubes simmered in a velvety tomato-butter sauce enriched with cashews, fresh cream, and aromatic fenugreek.",
    "image": "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh paneer cubed",
        "quantity": "350g"
      },
      {
        "name": "Tomatoes pureed",
        "quantity": "4 large"
      },
      {
        "name": "Butter",
        "quantity": "3 tbsp"
      },
      {
        "name": "Heavy cream",
        "quantity": "1/2 cup"
      },
      {
        "name": "Cashews soaked",
        "quantity": "12"
      },
      {
        "name": "Ginger-garlic paste",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Red chili & garam masala",
        "quantity": "1 tsp each"
      },
      {
        "name": "Kasuri methi (fenugreek)",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Blend soaked cashews and 1 onion into a silky smooth paste."
      },
      {
        "step": 2,
        "description": "Melt butter in a pan, add ginger-garlic paste and sauté for 1 minute."
      },
      {
        "step": 3,
        "description": "Add pureed tomatoes and cook 10 minutes until oil separates."
      },
      {
        "step": 4,
        "description": "Stir in cashew paste, spices, salt, and simmer for 5 minutes."
      },
      {
        "step": 5,
        "description": "Add paneer cubes, heavy cream, and crushed kasuri methi. Simmer 3 minutes and serve with naan."
      }
    ],
    "prepTime": 20,
    "cookTime": 25,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Indian",
    "tags": [
      "main course",
      "paneer",
      "indian",
      "vegetarian",
      "curry",
      "dinner"
    ],
    "averageRating": 4.8,
    "ratingCount": 52,
    "_id": "fca593db62ab0cf140f14c4e",
    "createdAt": "2026-09-23T09:41:49.740Z",
    "updatedAt": "2026-09-23T09:41:49.740Z",
    "isSystem": true
  },
  {
    "title": "Neapolitan Artisan Margherita Pizza",
    "description": "Blistered thin sourdough crust topped with sweet San Marzano tomato sauce, fresh mozzarella di bufala, and torn basil.",
    "image": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
    "ingredients": [
      {
        "name": "Neapolitan pizza dough ball",
        "quantity": "1 (250g)"
      },
      {
        "name": "San Marzano tomatoes crushed with salt",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh mozzarella di bufala torn",
        "quantity": "150g"
      },
      {
        "name": "Fresh basil leaves",
        "quantity": "handful"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "1 tbsp"
      },
      {
        "name": "Flaky sea salt",
        "quantity": "pinch"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat oven with pizza stone to highest temperature (500-550°F / 280°C) for 1 hour."
      },
      {
        "step": 2,
        "description": "Stretch pizza dough by hand on a floured peel, leaving an airy rim (cornicione)."
      },
      {
        "step": 3,
        "description": "Spread crushed tomato sauce in concentric circles, leaving rim bare."
      },
      {
        "step": 4,
        "description": "Distribute torn fresh mozzarella evenly and drizzle with extra virgin olive oil."
      },
      {
        "step": 5,
        "description": "Slide onto stone and bake 7-9 minutes until crust is blistered and cheese is molten. Scatter fresh basil."
      }
    ],
    "prepTime": 20,
    "cookTime": 8,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "main course",
      "pizza",
      "italian",
      "vegetarian",
      "artisan",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 67,
    "_id": "a970c7f9e7583b4484249351",
    "createdAt": "2026-09-23T10:41:49.884Z",
    "updatedAt": "2026-09-23T10:41:49.884Z",
    "isSystem": true
  },
  {
    "title": "Creamy Garlic Fettuccine Alfredo",
    "description": "Tender ribbons of fettuccine tossed in a luxurious emulsion of European butter, heavy cream, garlic, and freshly aged Parmigiano-Reggiano.",
    "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh fettuccine pasta",
        "quantity": "400g"
      },
      {
        "name": "Unsalted butter",
        "quantity": "1/2 cup"
      },
      {
        "name": "Heavy whipping cream",
        "quantity": "1 cup"
      },
      {
        "name": "Fresh garlic cloves finely grated",
        "quantity": "4"
      },
      {
        "name": "Parmigiano-Reggiano freshly grated",
        "quantity": "1.5 cups"
      },
      {
        "name": "Fresh nutmeg freshly grated",
        "quantity": "pinch"
      },
      {
        "name": "Fresh parsley chopped",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Cook fettuccine in salted boiling water until al dente; reserve 1/2 cup starchy pasta water."
      },
      {
        "step": 2,
        "description": "Melt butter in a wide skillet over medium-low heat; add grated garlic and cook 1 minute without browning."
      },
      {
        "step": 3,
        "description": "Pour in heavy cream and gently simmer for 3 minutes until slightly reduced."
      },
      {
        "step": 4,
        "description": "Toss hot pasta directly into sauce; turn off heat and stir in grated parmesan in batches until velvety."
      },
      {
        "step": 5,
        "description": "Add pasta water if needed to loosen sauce, season with nutmeg and black pepper, and garnish with parsley."
      }
    ],
    "prepTime": 10,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "main course",
      "pasta",
      "alfredo",
      "italian",
      "creamy",
      "vegetarian",
      "dinner"
    ],
    "averageRating": 4.8,
    "ratingCount": 45,
    "_id": "3e3b5db48464c31f98d4dfeb",
    "createdAt": "2026-09-23T11:41:50.049Z",
    "updatedAt": "2026-09-23T11:41:50.049Z",
    "isSystem": true
  },
  {
    "title": "Japanese Tonkotsu Chashu Pork Ramen",
    "description": "Rich 12-hour pork bone broth with springy ramen noodles, melt-in-your-mouth rolled chashu pork belly, ajitsuke tamago egg, and nori.",
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh ramen noodles",
        "quantity": "400g"
      },
      {
        "name": "Rich Tonkotsu pork broth warm",
        "quantity": "5 cups"
      },
      {
        "name": "Rolled pork chashu slices",
        "quantity": "8 slices"
      },
      {
        "name": "Ramen eggs (Ajitsuke Tamago) halved",
        "quantity": "2"
      },
      {
        "name": "Menma (seasoned bamboo shoots)",
        "quantity": "1/2 cup"
      },
      {
        "name": "Green onions thinly sliced",
        "quantity": "1/2 cup"
      },
      {
        "name": "Nori seaweed sheets",
        "quantity": "4"
      },
      {
        "name": "Black garlic oil (Mayu)",
        "quantity": "2 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat ramen bowls with hot water, then discard water."
      },
      {
        "step": 2,
        "description": "Boil fresh ramen noodles for 90 seconds until firm (katame); drain vigorously."
      },
      {
        "step": 3,
        "description": "Pour hot tonkotsu broth into bowls and fold noodles neatly into broth."
      },
      {
        "step": 4,
        "description": "Sear chashu slices with a kitchen torch or in a dry pan until caramelized; place over noodles."
      },
      {
        "step": 5,
        "description": "Top with halved ramen eggs, menma, green onions, nori sheets, and a drizzle of black garlic oil."
      }
    ],
    "prepTime": 25,
    "cookTime": 20,
    "servings": 2,
    "difficulty": "Hard",
    "category": "Main Course",
    "cuisine": "Japanese",
    "tags": [
      "main course",
      "ramen",
      "japanese",
      "noodles",
      "pork",
      "comfort food"
    ],
    "averageRating": 5,
    "ratingCount": 78,
    "_id": "db76b915d345d41c14bb954f",
    "createdAt": "2026-09-23T12:41:50.225Z",
    "updatedAt": "2026-09-23T12:41:50.225Z",
    "isSystem": true
  },
  {
    "title": "Authentic Mexican Street Carnitas Tacos",
    "description": "Slow-roasted pork shoulder crisped in its own lard, tucked into warm corn tortillas with chopped white onion, cilantro, and salsa verde.",
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    "ingredients": [
      {
        "name": "Corn tortillas street-taco size",
        "quantity": "12"
      },
      {
        "name": "Pork shoulder carnitas shredded & crisped",
        "quantity": "500g"
      },
      {
        "name": "White onion finely diced",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh cilantro finely chopped",
        "quantity": "1/2 cup"
      },
      {
        "name": "Tomatillo salsa verde",
        "quantity": "1/2 cup"
      },
      {
        "name": "Lime wedges",
        "quantity": "4"
      },
      {
        "name": "Radish slices",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sear shredded carnitas meat in a smoking cast iron skillet for 3 minutes until edges turn dark and crisp."
      },
      {
        "step": 2,
        "description": "Warm corn tortillas on a dry comal or skillet until soft and fragrant."
      },
      {
        "step": 3,
        "description": "Double-layer tortillas and pile on generous portions of hot crispy carnitas."
      },
      {
        "step": 4,
        "description": "Top with diced white onions and fresh cilantro."
      },
      {
        "step": 5,
        "description": "Spoon tangy tomatillo salsa verde over each taco and squeeze fresh lime juice."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Mexican",
    "tags": [
      "main course",
      "tacos",
      "carnitas",
      "mexican",
      "street food",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 63,
    "_id": "f1cc631fe99fc03d3fcfee70",
    "createdAt": "2026-09-23T13:41:50.345Z",
    "updatedAt": "2026-09-23T13:41:50.345Z",
    "isSystem": true
  },
  {
    "title": "Yangzhou Special Fried Rice",
    "description": "Fluffy wok-charred jasmine rice tossed with Chinese char siu pork, sweet shrimp, scrambled egg ribbons, green peas, and scallions.",
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&q=80",
    "ingredients": [
      {
        "name": "Day-old cold jasmine rice",
        "quantity": "4 cups"
      },
      {
        "name": "Char siu pork diced",
        "quantity": "150g"
      },
      {
        "name": "Small prawns/shrimp peeled",
        "quantity": "150g"
      },
      {
        "name": "Eggs beaten",
        "quantity": "3 large"
      },
      {
        "name": "Green peas",
        "quantity": "1/2 cup"
      },
      {
        "name": "Scallions chopped",
        "quantity": "4"
      },
      {
        "name": "Shaoxing wine",
        "quantity": "1 tbsp"
      },
      {
        "name": "Light soy sauce & white pepper",
        "quantity": "1.5 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Break up cold rice with oiled hands so grains are individual and loose."
      },
      {
        "step": 2,
        "description": "Heat wok until smoking hot; scramble eggs quickly in oil, break up into small curds, and remove."
      },
      {
        "step": 3,
        "description": "Add diced char siu and shrimp to wok; stir-fry for 2 minutes until cooked."
      },
      {
        "step": 4,
        "description": "Add rice and toss continuously on maximum heat for 3-4 minutes until grains bounce in the wok (wok hei)."
      },
      {
        "step": 5,
        "description": "Drizzle soy sauce, Shaoxing wine, white pepper, cooked eggs, and scallions; toss 1 minute and serve."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Main Course",
    "cuisine": "Chinese",
    "tags": [
      "main course",
      "fried rice",
      "chinese",
      "quick",
      "dinner",
      "asian"
    ],
    "averageRating": 4.8,
    "ratingCount": 41,
    "_id": "092d12f0a982ae69c0b6d2d2",
    "createdAt": "2026-09-23T14:41:50.511Z",
    "updatedAt": "2026-09-23T14:41:50.511Z",
    "isSystem": true
  },
  {
    "title": "Crispy Golden Chicken Parmesan",
    "description": "Panko-parmesan crusted chicken breast cutlets smothered in rich marinara sauce, melted mozzarella, and fresh basil over spaghetti.",
    "image": "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&q=80",
    "ingredients": [
      {
        "name": "Chicken breasts pounded to 1/2 inch",
        "quantity": "2 large (halved)"
      },
      {
        "name": "Panko breadcrumbs mixed with parmesan",
        "quantity": "1.5 cups"
      },
      {
        "name": "Flour and beaten eggs for breading",
        "quantity": "for dredging"
      },
      {
        "name": "Marinara sauce",
        "quantity": "2 cups"
      },
      {
        "name": "Fresh mozzarella sliced",
        "quantity": "200g"
      },
      {
        "name": "Parmigiano-Reggiano grated",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh basil leaves",
        "quantity": "handful"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Dredge pounded chicken in flour, then beaten egg, then press firmly into panko-parmesan mixture."
      },
      {
        "step": 2,
        "description": "Pan-fry cutlets in olive oil over medium-high heat for 3-4 minutes per side until deeply golden and crunchy."
      },
      {
        "step": 3,
        "description": "Transfer cutlets to a baking sheet, spoon a layer of marinara over each, and top with mozzarella and parmesan."
      },
      {
        "step": 4,
        "description": "Bake at 425°F (220°C) for 10 minutes until cheese is melted and bubbling."
      },
      {
        "step": 5,
        "description": "Garnish with fresh basil and serve atop a bed of steaming spaghetti marinara."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "main course",
      "chicken parmesan",
      "italian",
      "crispy",
      "comfort food",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 56,
    "_id": "6bbc977fa367f5c80d01d3fd",
    "createdAt": "2026-09-23T15:41:50.923Z",
    "updatedAt": "2026-09-23T15:41:50.923Z",
    "isSystem": true
  },
  {
    "title": "Classic Beef Wellington with Herb Crepe",
    "description": "Center-cut beef tenderloin coated with mushroom duxelles, wrapped in prosciutto and all-butter puff pastry, baked golden brown.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Beef_Wellington_2019.jpg/1280px-Beef_Wellington_2019.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Center-cut beef tenderloin fillet",
        "quantity": "800g"
      },
      {
        "name": "Finely minced mixed wild mushrooms (duxelles)",
        "quantity": "500g"
      },
      {
        "name": "Prosciutto di Parma slices",
        "quantity": "8-10 slices"
      },
      {
        "name": "Puff pastry sheet thawed",
        "quantity": "1 sheet"
      },
      {
        "name": "Dijon mustard",
        "quantity": "2 tbsp"
      },
      {
        "name": "Egg yolks beaten with cream (egg wash)",
        "quantity": "2"
      },
      {
        "name": "Flaky sea salt",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sear tenderloin in a screaming-hot pan on all sides for 2 minutes total; immediately brush with Dijon mustard and cool."
      },
      {
        "step": 2,
        "description": "Cook mushroom duxelles with shallots in a dry pan until all moisture evaporates completely; cool."
      },
      {
        "step": 3,
        "description": "Lay plastic wrap, arrange overlapping prosciutto slices, and spread mushroom duxelles evenly on top."
      },
      {
        "step": 4,
        "description": "Place tenderloin in center and roll tightly into a log using plastic wrap; chill in fridge for 30 minutes to firm up."
      },
      {
        "step": 5,
        "description": "Wrap log in puff pastry, brush with egg wash, score decorative pattern, and bake at 400°F (200°C) for 35 minutes until pastry is golden and meat reaches 125°F."
      }
    ],
    "prepTime": 45,
    "cookTime": 35,
    "servings": 6,
    "difficulty": "Hard",
    "category": "Main Course",
    "cuisine": "French",
    "tags": [
      "main course",
      "beef wellington",
      "gourmet",
      "beef",
      "showstopper",
      "dinner"
    ],
    "averageRating": 5,
    "ratingCount": 74,
    "_id": "ca158df296b20b5fc8929c08",
    "createdAt": "2026-09-23T16:41:51.059Z",
    "updatedAt": "2026-09-23T16:41:51.059Z",
    "isSystem": true
  },
  {
    "title": "Royal Saffron Vegetable Dum Biryani",
    "description": "Layered basmati rice and garden vegetables slow-cooked in a sealed clay pot with saffron-infused milk, mint, and caramelized onions.",
    "image": "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80",
    "ingredients": [
      {
        "name": "Long-grain basmati rice",
        "quantity": "2 cups"
      },
      {
        "name": "Mixed vegetables (carrots, beans, cauliflower, potatoes)",
        "quantity": "3 cups"
      },
      {
        "name": "Fried onions (birista)",
        "quantity": "1 cup"
      },
      {
        "name": "Whisked yogurt",
        "quantity": "1/2 cup"
      },
      {
        "name": "Biryani spices & shahi jeera",
        "quantity": "2 tbsp"
      },
      {
        "name": "Saffron dissolved in warm milk",
        "quantity": "1/4 cup"
      },
      {
        "name": "Pure ghee",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh mint and coriander leaves",
        "quantity": "1/2 cup"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Marinate diced vegetables in yogurt, biryani spices, ginger-garlic paste, and half the fried onions for 30 minutes."
      },
      {
        "step": 2,
        "description": "Boil basmati rice with whole cloves, cardamom, and bay leaf until 70% cooked; drain."
      },
      {
        "step": 3,
        "description": "Cook marinated vegetables in a heavy pot until 80% done."
      },
      {
        "step": 4,
        "description": "Layer par-cooked rice over vegetables, drizzle saffron milk, ghee, mint, and remaining fried onions."
      },
      {
        "step": 5,
        "description": "Seal pot tightly with lid and cook on low heat (dum) for 20 minutes. Rest 10 minutes before gently fluffing."
      }
    ],
    "prepTime": 30,
    "cookTime": 30,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Indian",
    "tags": [
      "main course",
      "biryani",
      "vegetarian",
      "indian",
      "rice",
      "dinner"
    ],
    "averageRating": 4.8,
    "ratingCount": 46,
    "_id": "10b5b10bcd36e7ec87a06402",
    "createdAt": "2026-09-23T17:41:51.220Z",
    "updatedAt": "2026-09-23T17:41:51.220Z",
    "isSystem": true
  },
  {
    "title": "Herb-Crusted Roasted Rack of Lamb",
    "description": "Tender rack of lamb with a golden Dijon, parsley, and rosemary panko crust, served with a red wine reduction.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Rack_Carr%C3%A9_d%27agneau.JPG/1280px-Rack_Carr%C3%A9_d%27agneau.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Frenched rack of lamb (8 ribs)",
        "quantity": "1 (approx 750g)"
      },
      {
        "name": "Dijon mustard",
        "quantity": "2 tbsp"
      },
      {
        "name": "Panko breadcrumbs",
        "quantity": "1/2 cup"
      },
      {
        "name": "Fresh parsley, rosemary, and thyme minced",
        "quantity": "3 tbsp"
      },
      {
        "name": "Garlic cloves minced",
        "quantity": "2"
      },
      {
        "name": "Olive oil and butter",
        "quantity": "2 tbsp each"
      },
      {
        "name": "Sea salt and cracked pepper",
        "quantity": "to taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Season lamb rack with salt and pepper; sear in a hot skillet with olive oil for 3 minutes until browned; cool slightly."
      },
      {
        "step": 2,
        "description": "Brush the meaty side of the lamb generously with Dijon mustard."
      },
      {
        "step": 3,
        "description": "Mix panko, minced fresh herbs, garlic, salt, and 1 tbsp melted butter in a bowl."
      },
      {
        "step": 4,
        "description": "Press herb-panko mixture firmly onto the Dijon-coated lamb rack."
      },
      {
        "step": 5,
        "description": "Roast at 400°F (200°C) for 20-25 minutes until internal temp reaches 130°F (medium-rare). Rest 10 minutes before carving into chops."
      }
    ],
    "prepTime": 20,
    "cookTime": 25,
    "servings": 3,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "French",
    "tags": [
      "main course",
      "lamb",
      "rack of lamb",
      "gourmet",
      "french",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 40,
    "_id": "e5bb19a310a9e18dfa42e407",
    "createdAt": "2026-09-23T18:41:51.353Z",
    "updatedAt": "2026-09-23T18:41:51.353Z",
    "isSystem": true
  },
  {
    "title": "Szechuan Mapo Tofu",
    "description": "Silky soft tofu simmered in a fiery, fragrant fermented bean and chili sauce with minced beef and mouth-numbing Szechuan peppercorns.",
    "image": "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&q=80",
    "ingredients": [
      {
        "name": "Silken tofu cut into cubes",
        "quantity": "400g"
      },
      {
        "name": "Minced beef or pork",
        "quantity": "150g"
      },
      {
        "name": "Szechuan Pixian doubanjiang (broad bean paste)",
        "quantity": "2 tbsp"
      },
      {
        "name": "Fermented black beans (douchi)",
        "quantity": "1 tbsp"
      },
      {
        "name": "Ground Szechuan peppercorns",
        "quantity": "1 tsp"
      },
      {
        "name": "Garlic minced",
        "quantity": "3 cloves"
      },
      {
        "name": "Fresh ginger minced",
        "quantity": "1 tbsp"
      },
      {
        "name": "Chicken or vegetable stock",
        "quantity": "1 cup"
      },
      {
        "name": "Cornstarch slurry",
        "quantity": "2 tbsp"
      },
      {
        "name": "Chopped scallions",
        "quantity": "3 stalks"
      },
      {
        "name": "Chili oil",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Gently blanch tofu cubes in salted boiling water for 1 minute to firm up; drain and set aside."
      },
      {
        "step": 2,
        "description": "Heat oil in a wok over medium heat. Fry minced beef until browned and crispy."
      },
      {
        "step": 3,
        "description": "Add Pixian bean paste, fermented black beans, minced garlic, and ginger; stir-fry until fragrant and red oil emerges."
      },
      {
        "step": 4,
        "description": "Pour in chicken stock and bring to a simmer. Gently slide in tofu cubes without breaking them."
      },
      {
        "step": 5,
        "description": "Simmer for 4 minutes, swirl in cornstarch slurry in three additions until sauce glistens and thickens."
      },
      {
        "step": 6,
        "description": "Transfer to a heated serving bowl, dust generously with freshly ground toasted Szechuan peppercorns, and scatter scallions."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "tofu",
      "spicy",
      "szechuan",
      "dinner",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 34,
    "_id": "cf1bd4d664cde001ac037dcc",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Crispy Vegetable & Pork Potstickers",
    "description": "Golden pan-crisped Chinese dumplings filled with tender minced pork, crisp napa cabbage, garlic chives, and sesame oil.",
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800&q=80",
    "ingredients": [
      {
        "name": "Dumpling wrappers",
        "quantity": "30 round sheets"
      },
      {
        "name": "Ground pork",
        "quantity": "300g"
      },
      {
        "name": "Napa cabbage finely shredded and squeezed",
        "quantity": "2 cups"
      },
      {
        "name": "Chinese garlic chives chopped",
        "quantity": "1/2 cup"
      },
      {
        "name": "Soy sauce",
        "quantity": "2 tbsp"
      },
      {
        "name": "Toasted sesame oil",
        "quantity": "1 tbsp"
      },
      {
        "name": "Shaoxing cooking wine",
        "quantity": "1 tbsp"
      },
      {
        "name": "Grated fresh ginger",
        "quantity": "1 tbsp"
      },
      {
        "name": "Black Chinkiang vinegar and chili oil",
        "quantity": "for dipping"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Mix ground pork, shredded cabbage, chives, soy sauce, sesame oil, wine, and ginger vigorously in one direction until gelatinous."
      },
      {
        "step": 2,
        "description": "Place 1 tbsp filling into center of wrapper. Moisten edges with water and pleat into a crescent shape."
      },
      {
        "step": 3,
        "description": "Heat 1 tbsp oil in a non-stick skillet over medium-high heat. Arrange dumplings flat-side down and cook 2 minutes until bottoms turn deep golden."
      },
      {
        "step": 4,
        "description": "Carefully pour 1/3 cup water into skillet and immediately cover with lid to steam for 6-7 minutes."
      },
      {
        "step": 5,
        "description": "Uncover and cook another 1-2 minutes until remaining water evaporates and bottom recrisps with a lace pattern."
      },
      {
        "step": 6,
        "description": "Serve immediately with Chinkiang vinegar and fragrant chili oil."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Appetizers",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "dumplings",
      "potstickers",
      "appetizers",
      "snacks",
      "crispy"
    ],
    "averageRating": 4.9,
    "ratingCount": 46,
    "_id": "ea270b475e808461c4a367ea",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Kung Pao Chicken with Roasted Peanuts",
    "description": "Classic fiery stir-fried chicken breast with dried red chilies, roasted crunchy peanuts, scallions, and a glossy sweet-tangy sauce.",
    "image": "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80",
    "ingredients": [
      {
        "name": "Chicken breast cut into cubes",
        "quantity": "450g"
      },
      {
        "name": "Roasted unsalted peanuts",
        "quantity": "1/2 cup"
      },
      {
        "name": "Dried red Szechuan chilies stemmed",
        "quantity": "12 pieces"
      },
      {
        "name": "Scallions cut into 1-inch lengths",
        "quantity": "4 stalks"
      },
      {
        "name": "Garlic cloves sliced",
        "quantity": "4 cloves"
      },
      {
        "name": "Soy sauce",
        "quantity": "2 tbsp"
      },
      {
        "name": "Chinkiang black vinegar",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Sugar",
        "quantity": "1 tbsp"
      },
      {
        "name": "Cornstarch",
        "quantity": "1 tbsp"
      },
      {
        "name": "Szechuan peppercorns",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Marinate diced chicken with 1 tbsp soy sauce, shaoxing wine, and cornstarch for 15 minutes."
      },
      {
        "step": 2,
        "description": "Whisk remaining soy sauce, black vinegar, sugar, water, and cornstarch in a small bowl to form sauce."
      },
      {
        "step": 3,
        "description": "Heat oil in a hot wok. Fry dried chilies and Szechuan peppercorns for 30 seconds until blackened and aromatic."
      },
      {
        "step": 4,
        "description": "Add chicken cubes and stir-fry vigorously on high heat until pieces are 90% cooked through."
      },
      {
        "step": 5,
        "description": "Toss in garlic, scallion whites, and pour in sauce mixture, tossing quickly to coat chicken in a shiny glaze."
      },
      {
        "step": 6,
        "description": "Fold in roasted peanuts and scallion greens, remove from heat, and serve over jasmine rice."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 3,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "chicken",
      "spicy",
      "peanuts",
      "lunch",
      "main course",
      "quick"
    ],
    "averageRating": 4.7,
    "ratingCount": 39,
    "_id": "395f8843286d494d5312cf95",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Sweet & Sour Crispy Chicken",
    "description": "Tender battered chicken bites fried to a delicate crunch, tossed with fresh pineapple chunks, bell peppers, and vibrant sweet-sour glaze.",
    "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&q=80",
    "ingredients": [
      {
        "name": "Chicken thighs cut into chunks",
        "quantity": "500g"
      },
      {
        "name": "Fresh pineapple chunks",
        "quantity": "1.5 cups"
      },
      {
        "name": "Red and green bell peppers diced",
        "quantity": "1 each"
      },
      {
        "name": "Cornstarch for dredging",
        "quantity": "1 cup"
      },
      {
        "name": "Egg beaten",
        "quantity": "1 large"
      },
      {
        "name": "Rice vinegar",
        "quantity": "1/4 cup"
      },
      {
        "name": "Tomato paste and ketchup",
        "quantity": "3 tbsp"
      },
      {
        "name": "Brown sugar",
        "quantity": "1/4 cup"
      },
      {
        "name": "Soy sauce",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Dip chicken chunks in beaten egg, then dredge thoroughly in cornstarch."
      },
      {
        "step": 2,
        "description": "Deep fry in 350°F oil for 4 minutes until pale golden. Drain on wire rack, then fry a second time for 2 minutes for a crisp finish."
      },
      {
        "step": 3,
        "description": "In a clean pan, simmer rice vinegar, tomato paste, ketchup, brown sugar, and soy sauce until syrupy."
      },
      {
        "step": 4,
        "description": "Toss in bell peppers, onions, and pineapple chunks; cook 2 minutes until just tender-crisp."
      },
      {
        "step": 5,
        "description": "Add the double-fried crispy chicken into the wok, toss rapidly to coat every piece evenly, and serve instantly."
      }
    ],
    "prepTime": 15,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "chicken",
      "sweet and sour",
      "main course",
      "dinner",
      "family"
    ],
    "averageRating": 4.6,
    "ratingCount": 31,
    "_id": "4a62378acb08dec651972aa3",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Steamed Pork Xiao Long Bao (Soup Dumplings)",
    "description": "Artisanal pleated steamed buns enveloping savory seasoned pork and bursts of hot rich broth inside delicate thin dough skins.",
    "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=800&q=80",
    "ingredients": [
      {
        "name": "Dumpling flour dough",
        "quantity": "350g"
      },
      {
        "name": "Ground pork shoulder",
        "quantity": "300g"
      },
      {
        "name": "Solidified gelatinized pork bone stock",
        "quantity": "1.5 cups cubed"
      },
      {
        "name": "Ginger grated",
        "quantity": "1 tbsp"
      },
      {
        "name": "Shaoxing wine",
        "quantity": "1 tbsp"
      },
      {
        "name": "Sesame oil",
        "quantity": "1 tsp"
      },
      {
        "name": "Light soy sauce",
        "quantity": "1 tbsp"
      },
      {
        "name": "Julienned fresh ginger with black vinegar",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Prepare the filling by combining minced pork, cold gelatinized stock cubes, ginger, wine, and soy sauce."
      },
      {
        "step": 2,
        "description": "Roll dough into small discs with thinner edges and thicker center."
      },
      {
        "step": 3,
        "description": "Place one spoon of filling in the center and fold tightly with 18-20 delicate pleats, sealing top."
      },
      {
        "step": 4,
        "description": "Arrange dumplings on parchment in a bamboo steamer, leaving 1 inch between each dumpling."
      },
      {
        "step": 5,
        "description": "Steam over rolling boiling water for 8 minutes until skins turn translucent and broth melts inside."
      },
      {
        "step": 6,
        "description": "Serve immediately with a spoon and julienned ginger steeped in black vinegar."
      }
    ],
    "prepTime": 30,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Hard",
    "category": "Snacks",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "dim sum",
      "dumplings",
      "soup dumplings",
      "snacks",
      "steamed"
    ],
    "averageRating": 4.9,
    "ratingCount": 52,
    "_id": "9dc51554cee7fe942953cc7c",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Authentic Dan Dan Noodles",
    "description": "Springy wheat noodles bathed in a deeply complex chili oil sauce with sesame paste, spiced pork crumble, and preserved mustard greens.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Dan-dan_noodles%2C_Shanghai.jpg/1280px-Dan-dan_noodles%2C_Shanghai.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Fresh Chinese wheat noodles",
        "quantity": "400g"
      },
      {
        "name": "Minced pork",
        "quantity": "200g"
      },
      {
        "name": "Sui mi ya cai (Szechuan preserved mustard greens)",
        "quantity": "3 tbsp"
      },
      {
        "name": "Chinese sesame paste or tahini",
        "quantity": "2 tbsp"
      },
      {
        "name": "Szechuan roasted chili oil with flakes",
        "quantity": "3 tbsp"
      },
      {
        "name": "Light soy sauce and black vinegar",
        "quantity": "2 tbsp each"
      },
      {
        "name": "Ground Szechuan pepper",
        "quantity": "1 tsp"
      },
      {
        "name": "Baby bok choy",
        "quantity": "4 heads"
      },
      {
        "name": "Crushed roasted peanuts",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Fry minced pork in 1 tbsp oil until crispy and golden. Stir in sui mi ya cai and cook 2 minutes."
      },
      {
        "step": 2,
        "description": "In serving bowls, divide sesame paste, soy sauce, black vinegar, chili oil, garlic, and Szechuan pepper."
      },
      {
        "step": 3,
        "description": "Boil noodles in salted water until al dente (3 min). Blanch bok choy in same water for 45 seconds."
      },
      {
        "step": 4,
        "description": "Ladle 1/4 cup hot noodle water into each serving bowl to loosen sauce."
      },
      {
        "step": 5,
        "description": "Add hot noodles, arrange bok choy on top, crown with crispy pork topping and roasted peanuts. Toss vigorously before eating."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 3,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "noodles",
      "spicy",
      "chili oil",
      "dinner",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 38,
    "_id": "0a2831c16f4f68a23870db0e",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Cantonese Flaky Egg Tart (Dan Tat)",
    "description": "Famous dim sum bakery delicacy featuring layers of crisp flaky pastry holding a silky smooth, glossy baked egg custard center.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/HK_SSP_%E9%95%B7%E6%B2%99%E7%81%A3_Cheung_Sha_Wan_%E6%B7%B1%E7%9B%9B%E8%B7%AF_Sham_Shing_Road_%E6%B3%93%E6%99%AF%E6%BB%99%E5%95%86%E5%A0%B4_Banyan_Mall_shop_%E8%9B%8B%E6%92%BB%E7%8E%8B_King_Bakery_Studio_December_2019_SS2_egg_tarts.jpg/1280px-HK_SSP_%E9%95%B7%E6%B2%99%E7%81%A3_Cheung_Sha_Wan_%E6%B7%B1%E7%9B%9B%E8%B7%AF_Sham_Shing_Road_%E6%B3%93%E6%99%AF%E6%BB%99%E5%95%86%E5%A0%B4_Banyan_Mall_shop_%E8%9B%8B%E6%92%BB%E7%8E%8B_King_Bakery_Studio_December_2019_SS2_egg_tarts.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Puff pastry dough sheets",
        "quantity": "2 sheets"
      },
      {
        "name": "Whole milk",
        "quantity": "1/2 cup"
      },
      {
        "name": "Granulated sugar",
        "quantity": "1/3 cup"
      },
      {
        "name": "Large egg yolks plus 2 whole eggs",
        "quantity": "4 items"
      },
      {
        "name": "Warm water",
        "quantity": "1/2 cup"
      },
      {
        "name": "Pure vanilla extract",
        "quantity": "1/2 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Dissolve sugar in warm water; allow to cool completely, then whisk in eggs, milk, and vanilla extract."
      },
      {
        "step": 2,
        "description": "Strain custard mixture through a fine-mesh sieve twice to ensure an impeccably smooth texture."
      },
      {
        "step": 3,
        "description": "Cut pastry circles and press into tart tins, pinching pastry slightly above the rim."
      },
      {
        "step": 4,
        "description": "Ladle custard into pastry shells until 80% full."
      },
      {
        "step": 5,
        "description": "Bake at 390°F (200°C) for 15 minutes, reduce heat to 350°F (175°C) and bake 10 minutes until custard is gently set."
      }
    ],
    "prepTime": 20,
    "cookTime": 25,
    "servings": 6,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "dessert",
      "pastry",
      "egg tart",
      "sweet",
      "bakery"
    ],
    "averageRating": 4.8,
    "ratingCount": 29,
    "_id": "3d826c939f4360720d14e71f",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Jasmine Honey Green Milk Tea with Boba",
    "description": "Fragrant cold-brewed floral green tea lightly sweetened with wildflower honey, creamy oat milk, and chewy brown sugar tapioca pearls.",
    "image": "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800&q=80",
    "ingredients": [
      {
        "name": "High-grade loose leaf jasmine green tea",
        "quantity": "2 tbsp"
      },
      {
        "name": "Brown sugar boba tapioca pearls",
        "quantity": "1/2 cup"
      },
      {
        "name": "Oat milk or whole milk",
        "quantity": "1 cup"
      },
      {
        "name": "Raw wildflower honey",
        "quantity": "2 tbsp"
      },
      {
        "name": "Dark brown sugar syrup",
        "quantity": "2 tbsp"
      },
      {
        "name": "Crushed ice",
        "quantity": "2 cups"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Steep jasmine green tea in 80°C water for 5 minutes; strain and chill in refrigerator."
      },
      {
        "step": 2,
        "description": "Boil tapioca pearls in water for 15 minutes, simmer covered for 10 minutes, then toss in brown sugar syrup."
      },
      {
        "step": 3,
        "description": "Spoon warm boba pearls into bottom of two tall glasses, swirling syrup along glass walls."
      },
      {
        "step": 4,
        "description": "Fill glasses with crushed ice, pour chilled jasmine tea sweetened with honey, and top with milk."
      },
      {
        "step": 5,
        "description": "Stir with a wide boba straw and enjoy ice-cold."
      }
    ],
    "prepTime": 5,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Chinese",
    "tags": [
      "chinese",
      "boba",
      "milk tea",
      "drinks",
      "jasmine",
      "iced",
      "refreshing"
    ],
    "averageRating": 4.9,
    "ratingCount": 41,
    "_id": "d5fd7fd84fdfdc506c4c3b92",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Crispy Chicken Katsu Curry",
    "description": "Panko-breaded crispy golden chicken cutlet served over fragrant Japanese short-grain rice with a rich, velvety spiced curry sauce.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Beef_curry_rice_003.jpg/1280px-Beef_curry_rice_003.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Boneless chicken cutlets pounded flat",
        "quantity": "2 pieces"
      },
      {
        "name": "Japanese panko breadcrumbs",
        "quantity": "1.5 cups"
      },
      {
        "name": "Japanese curry roux blocks",
        "quantity": "3 blocks"
      },
      {
        "name": "Yellow onion sliced",
        "quantity": "1 large"
      },
      {
        "name": "Carrot and potato peeled and cut",
        "quantity": "1 each"
      },
      {
        "name": "Chicken broth",
        "quantity": "3 cups"
      },
      {
        "name": "Egg and flour for dredging",
        "quantity": "as needed"
      },
      {
        "name": "Steamed Japanese Koshihikari rice",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sauté onions, carrots, and potatoes in oil until lightly caramelized; add broth and simmer 15 minutes."
      },
      {
        "step": 2,
        "description": "Dissolve curry roux blocks into broth, stirring constantly over low heat until sauce thickens and turns glossy."
      },
      {
        "step": 3,
        "description": "Season chicken cutlets with salt and pepper, coat in flour, dip in beaten egg, and press firmly into panko."
      },
      {
        "step": 4,
        "description": "Deep-fry cutlets at 340°F (170°C) for 6 minutes until crispy and golden brown; rest for 2 minutes then slice into strips."
      },
      {
        "step": 5,
        "description": "Plate warm rice, ladle hot curry sauce generously to the side, and arrange sliced crispy chicken katsu."
      }
    ],
    "prepTime": 20,
    "cookTime": 20,
    "servings": 3,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Japanese",
    "tags": [
      "japanese",
      "curry",
      "katsu",
      "chicken",
      "dinner",
      "main course"
    ],
    "averageRating": 4.9,
    "ratingCount": 56,
    "_id": "deb632abed49fbd74d639226",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Pan-Fried Pork Gyoza with Citrus Ponzu",
    "description": "Crisp-bottomed Japanese dumplings filled with finely minced Berkshire pork, shredded cabbage, ginger, and garlic chives.",
    "image": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800&q=80",
    "ingredients": [
      {
        "name": "Gyoza skins",
        "quantity": "24 sheets"
      },
      {
        "name": "Ground pork",
        "quantity": "250g"
      },
      {
        "name": "Finely shredded cabbage salted and squeezed",
        "quantity": "1.5 cups"
      },
      {
        "name": "Nira garlic chives chopped",
        "quantity": "1/3 cup"
      },
      {
        "name": "Grated fresh ginger and garlic",
        "quantity": "1 tsp each"
      },
      {
        "name": "Sesame oil and soy sauce",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Ponzu dipping sauce with rayu chili oil",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Mix pork, cabbage, garlic chives, seasonings, and sesame oil thoroughly until sticky."
      },
      {
        "step": 2,
        "description": "Fill gyoza skins, pleating along one edge while pressing against the back flat edge."
      },
      {
        "step": 3,
        "description": "Heat oil in a heavy frying pan. Place gyoza in concentric circles and sear 2 minutes until bottoms turn chestnut brown."
      },
      {
        "step": 4,
        "description": "Add 1/4 cup water, immediately cover with lid, and steam on medium heat for 4 minutes."
      },
      {
        "step": 5,
        "description": "Drizzle 1 tsp sesame oil around edges and fry uncovered 1 minute until bottoms are crackly."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Appetizers",
    "cuisine": "Japanese",
    "tags": [
      "japanese",
      "gyoza",
      "dumplings",
      "appetizers",
      "snacks",
      "crispy"
    ],
    "averageRating": 4.8,
    "ratingCount": 42,
    "_id": "6cb50dd784ea91c20a3d16ae",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Fresh Salmon Poke Bowl",
    "description": "Sushi-grade fresh salmon cubes tossed in sesame-shoyu marinade, nestled over warm sushi rice with avocado, edamame, and pickled ginger.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5d/Shoyu_and_onion_poke.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "ingredients": [
      {
        "name": "Sashimi-grade salmon cubed",
        "quantity": "350g"
      },
      {
        "name": "Cooked sushi rice seasoned with rice vinegar",
        "quantity": "2 cups"
      },
      {
        "name": "Ripe avocado sliced",
        "quantity": "1 large"
      },
      {
        "name": "Shelled edamame beans",
        "quantity": "1/2 cup"
      },
      {
        "name": "Japanese cucumber sliced",
        "quantity": "1 cup"
      },
      {
        "name": "Soy sauce, sesame oil, and rice vinegar",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Toasted sesame seeds and nori strips",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a medium glass bowl, gently toss diced salmon with soy sauce, sesame oil, and rice vinegar."
      },
      {
        "step": 2,
        "description": "Divide warm seasoned sushi rice into two wide ceramic bowls."
      },
      {
        "step": 3,
        "description": "Arrange marinated salmon, sliced avocado, edamame, and crisp cucumber decoratively around the rice."
      },
      {
        "step": 4,
        "description": "Drizzle any leftover marinade over the bowl, sprinkle with toasted sesame seeds and shredded nori."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Japanese",
    "tags": [
      "japanese",
      "salmon",
      "poke",
      "healthy",
      "lunch",
      "seafood",
      "bowl"
    ],
    "averageRating": 4.9,
    "ratingCount": 47,
    "_id": "7cc7125e6311a5283dfede94",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Authentic Japanese Miso Ramen",
    "description": "Rich, umami-packed pork and chicken bone broth infused with fermented red and white miso, fresh wavy noodles, tender chashu, and ajitsuke tamago.",
    "image": "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh Japanese ramen noodles",
        "quantity": "2 servings"
      },
      {
        "name": "Rich bone broth",
        "quantity": "4 cups"
      },
      {
        "name": "Red and white miso paste blend",
        "quantity": "3 tbsp"
      },
      {
        "name": "Sesame paste (neri goma)",
        "quantity": "1 tbsp"
      },
      {
        "name": "Rolled pork chashu slices",
        "quantity": "4 slices"
      },
      {
        "name": "Soft-boiled ramen eggs (ajitsuke tamago)",
        "quantity": "2 halves"
      },
      {
        "name": "Menma bamboo shoots and sweet corn",
        "quantity": "1/4 cup each"
      },
      {
        "name": "Green onions and nori sheet",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk miso paste, sesame paste, grated garlic, and ginger with 1/2 cup warm broth in a small pot until smooth."
      },
      {
        "step": 2,
        "description": "Pour remaining broth into a saucepan, bring to a rolling simmer, and whisk in the miso tare base."
      },
      {
        "step": 3,
        "description": "Boil fresh ramen noodles for 90 seconds until chewy and springy; drain vigorously."
      },
      {
        "step": 4,
        "description": "Divide hot noodles into deep preheated bowls and ladle piping hot miso broth over noodles."
      },
      {
        "step": 5,
        "description": "Top with chashu pork slices, marinated egg halves, sweet corn, bamboo shoots, scallions, and nori."
      }
    ],
    "prepTime": 20,
    "cookTime": 25,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Japanese",
    "tags": [
      "japanese",
      "ramen",
      "noodles",
      "miso",
      "comfort food",
      "main course",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 65,
    "_id": "cbb6dce9d031372f55ffe263",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Crispy Shrimp & Vegetable Tempura",
    "description": "Light-as-air, gossamer-crisp tempura featuring colossal black tiger shrimp and sweet kabocha squash with warm dashi dipping tentsuyu.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Tempura_01.jpg/1280px-Tempura_01.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Large black tiger shrimp peeled and deveined",
        "quantity": "10 pieces"
      },
      {
        "name": "Kabocha squash and sweet potato sliced thin",
        "quantity": "8 slices"
      },
      {
        "name": "Ice-cold sparkling water",
        "quantity": "1 cup"
      },
      {
        "name": "Cake flour or tempura flour",
        "quantity": "1 cup"
      },
      {
        "name": "Egg yolk",
        "quantity": "1 large"
      },
      {
        "name": "Dashi stock, mirin, and soy sauce",
        "quantity": "for tentsuyu dip"
      },
      {
        "name": "Grated daikon radish",
        "quantity": "2 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Make small diagonal incisions on the underside of shrimp and gently stretch to keep them straight while frying."
      },
      {
        "step": 2,
        "description": "Whisk ice-cold sparkling water with egg yolk and flour using chopsticks for only 10 seconds (keep lumpy and cold)."
      },
      {
        "step": 3,
        "description": "Dust shrimp and vegetables in flour, dip in cold tempura batter, and gently drop into 360°F clean frying oil."
      },
      {
        "step": 4,
        "description": "Fry for 2-3 minutes until golden and feather-light; drain upright on wire rack."
      },
      {
        "step": 5,
        "description": "Serve immediately alongside warm tentsuyu dipping broth and grated fresh daikon."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 3,
    "difficulty": "Medium",
    "category": "Snacks",
    "cuisine": "Japanese",
    "tags": [
      "japanese",
      "tempura",
      "shrimp",
      "crispy",
      "snacks",
      "appetizers"
    ],
    "averageRating": 4.7,
    "ratingCount": 35,
    "_id": "f70e831057536bdc77ca9cf7",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Fluffy Japanese Soufflé Pancakes",
    "description": "Towering, cloud-like soufflé pancakes that jiggle with lightness, topped with churned whipped cream, powdered sugar, and strawberries.",
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    "ingredients": [
      {
        "name": "Egg whites whipped to stiff peaks with cream of tartar",
        "quantity": "3 large"
      },
      {
        "name": "Egg yolks",
        "quantity": "2 large"
      },
      {
        "name": "Milk",
        "quantity": "2 tbsp"
      },
      {
        "name": "Cake flour sifted",
        "quantity": "4 tbsp"
      },
      {
        "name": "Granulated sugar",
        "quantity": "3 tbsp"
      },
      {
        "name": "Vanilla extract",
        "quantity": "1 tsp"
      },
      {
        "name": "Fresh strawberries and maple syrup",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk egg yolks, milk, and vanilla until frothy; fold in sifted cake flour."
      },
      {
        "step": 2,
        "description": "Beat egg whites with cream of tartar, gradually adding sugar until stiff, glossy peaks form."
      },
      {
        "step": 3,
        "description": "Gently fold one-third of meringue into yolk batter, then carefully fold back into remaining meringue without deflating."
      },
      {
        "step": 4,
        "description": "Heat a covered non-stick pan on lowest heat with a splash of oil. Scoop tall mounds of batter, add 1 tsp water to pan, cover and cook 5 minutes."
      },
      {
        "step": 5,
        "description": "Stack an extra scoop of batter on top of each, flip carefully, add another tsp water, cover and cook 5 minutes until set."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 2,
    "difficulty": "Hard",
    "category": "Breakfast",
    "cuisine": "Japanese",
    "tags": [
      "japanese",
      "breakfast",
      "pancakes",
      "souffle",
      "fluffy",
      "brunch",
      "sweet"
    ],
    "averageRating": 4.9,
    "ratingCount": 44,
    "_id": "c9e79d980eefb4aa8d1d48f9",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Classic Pad Thai with Tiger Prawns",
    "description": "Iconic Bangkok street food: flat rice noodles wok-charred with jumbo prawns, pressed tofu, tamarind, palm sugar, scrambled egg, and crushed peanuts.",
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&q=80",
    "ingredients": [
      {
        "name": "Dried flat rice noodles soaked until pliable",
        "quantity": "250g"
      },
      {
        "name": "Tiger prawns peeled and tails left on",
        "quantity": "8 large"
      },
      {
        "name": "Firm yellow tofu diced",
        "quantity": "1/2 cup"
      },
      {
        "name": "Eggs lightly beaten",
        "quantity": "2 large"
      },
      {
        "name": "Tamarind paste",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fish sauce and palm sugar",
        "quantity": "2 tbsp each"
      },
      {
        "name": "Fresh bean sprouts and garlic chives",
        "quantity": "1 cup each"
      },
      {
        "name": "Crushed roasted peanuts and lime wedges",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Simmer tamarind paste, fish sauce, and palm sugar together in a small saucepan until sugar dissolves completely."
      },
      {
        "step": 2,
        "description": "Heat 2 tbsp oil in a sizzling wok over high heat; sear prawns for 2 minutes until pink, then remove."
      },
      {
        "step": 3,
        "description": "Stir-fry diced tofu and preserved radish for 1 minute, push to side, scramble eggs until lightly set."
      },
      {
        "step": 4,
        "description": "Add drained soaked rice noodles and pour tamarind sauce all over; toss rapidly until noodles soften and absorb sauce."
      },
      {
        "step": 5,
        "description": "Toss prawns back in with bean sprouts and Chinese chives for 30 seconds."
      },
      {
        "step": 6,
        "description": "Plate immediately with lime wedges, crushed roasted peanuts, and chili flakes."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 3,
    "difficulty": "Medium",
    "category": "Lunch",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "noodles",
      "pad thai",
      "prawns",
      "street food",
      "lunch",
      "main course"
    ],
    "averageRating": 4.9,
    "ratingCount": 60,
    "_id": "5cfe03fd8eb0a174e619bfa3",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Fragrant Thai Green Coconut Curry",
    "description": "Aromatic coconut milk curry with fresh green chilies, lemongrass, tender chicken breast, Thai baby eggplants, and sweet Thai basil.",
    "image": "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    "ingredients": [
      {
        "name": "Chicken breast sliced thin",
        "quantity": "450g"
      },
      {
        "name": "Authentic Thai green curry paste",
        "quantity": "3 tbsp"
      },
      {
        "name": "Thick coconut cream and coconut milk",
        "quantity": "1 can each"
      },
      {
        "name": "Thai round eggplants quartered",
        "quantity": "4 pieces"
      },
      {
        "name": "Makrut lime leaves torn",
        "quantity": "4 leaves"
      },
      {
        "name": "Fish sauce",
        "quantity": "2 tbsp"
      },
      {
        "name": "Palm sugar",
        "quantity": "1 tbsp"
      },
      {
        "name": "Fresh Thai sweet basil leaves",
        "quantity": "1 generous handful"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat 1/2 cup coconut cream in a pot until the coconut oil separates and cracks."
      },
      {
        "step": 2,
        "description": "Add green curry paste and fry over medium heat for 3 minutes until deeply fragrant and aromatic."
      },
      {
        "step": 3,
        "description": "Add sliced chicken and toss for 2 minutes until exterior is opaque."
      },
      {
        "step": 4,
        "description": "Pour in remaining coconut milk, add makrut lime leaves, palm sugar, and fish sauce; bring to gentle boil."
      },
      {
        "step": 5,
        "description": "Add Thai eggplants and simmer for 8 minutes until tender."
      },
      {
        "step": 6,
        "description": "Turn off heat, stir in fresh Thai basil leaves, and serve with warm jasmine rice."
      }
    ],
    "prepTime": 15,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "curry",
      "green curry",
      "coconut",
      "spicy",
      "dinner",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 45,
    "_id": "95d7ca4779766f8022055a53",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Spicy & Sour Tom Yum Goong Soup",
    "description": "The crown jewel of Thai soups: fiery broth infused with fresh galangal, lemongrass, bird's eye chilies, lime juice, and plump river prawns.",
    "image": "https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=800&q=80",
    "ingredients": [
      {
        "name": "Jumbo prawns with heads on",
        "quantity": "8 pieces"
      },
      {
        "name": "Shrimp stock or chicken broth",
        "quantity": "4 cups"
      },
      {
        "name": "Stalks lemongrass bruised and sliced",
        "quantity": "3 stalks"
      },
      {
        "name": "Fresh galangal root sliced",
        "quantity": "1 inch"
      },
      {
        "name": "Makrut lime leaves torn",
        "quantity": "5 leaves"
      },
      {
        "name": "Straw mushrooms halved",
        "quantity": "1 cup"
      },
      {
        "name": "Thai roasted chili paste (nam prik pao)",
        "quantity": "2 tbsp"
      },
      {
        "name": "Freshly squeezed lime juice and fish sauce",
        "quantity": "3 tbsp each"
      },
      {
        "name": "Fresh cilantro and bird eye chilies",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Bring broth to a boil with bruised lemongrass, sliced galangal, and torn lime leaves for 5 minutes."
      },
      {
        "step": 2,
        "description": "Stir in Thai chili paste (nam prik pao) and fish sauce, creating a rich orange broth."
      },
      {
        "step": 3,
        "description": "Add straw mushrooms and bring back to a boil."
      },
      {
        "step": 4,
        "description": "Slide in jumbo prawns and simmer for 3 minutes until cooked through."
      },
      {
        "step": 5,
        "description": "Turn off heat completely before stirring in fresh lime juice and crushed bird's eye chilies to preserve bright flavor."
      },
      {
        "step": 6,
        "description": "Ladle into bowls and scatter with fresh cilantro leaves."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Appetizers",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "soup",
      "tom yum",
      "shrimp",
      "spicy",
      "sour",
      "appetizers"
    ],
    "averageRating": 4.9,
    "ratingCount": 49,
    "_id": "e4ea298e7956565477e02cd2",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Sweet Thai Mango Sticky Rice",
    "description": "Sweet glutinous sticky rice steamed with salted coconut milk cream, served alongside chilled slices of ripe honey mango and toasted mung beans.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Mango_sticy_rice_%283859549574%29.jpg/1280px-Mango_sticy_rice_%283859549574%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Thai sweet glutinous rice soaked overnight",
        "quantity": "1.5 cups"
      },
      {
        "name": "Ripe golden honey mangoes peeled and sliced",
        "quantity": "2 large"
      },
      {
        "name": "Full-fat coconut cream",
        "quantity": "1 can (400ml)"
      },
      {
        "name": "Sugar",
        "quantity": "1/2 cup"
      },
      {
        "name": "Sea salt",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Crispy fried yellow mung beans",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Steam soaked glutinous rice in a cheesecloth-lined steamer for 20 minutes until tender and chewy."
      },
      {
        "step": 2,
        "description": "Warm 3/4 can coconut cream with sugar and salt until dissolved (do not boil)."
      },
      {
        "step": 3,
        "description": "Pour hot coconut mixture over warm steamed rice, stir gently, cover and let absorb for 20 minutes."
      },
      {
        "step": 4,
        "description": "Simmer remaining coconut cream with a pinch of cornstarch and salt for 2 minutes to make topping sauce."
      },
      {
        "step": 5,
        "description": "Plate warm sticky rice next to sliced golden mangoes, drizzle coconut cream sauce, and top with crispy mung beans."
      }
    ],
    "prepTime": 15,
    "cookTime": 25,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dessert",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "dessert",
      "mango",
      "sticky rice",
      "coconut",
      "sweet"
    ],
    "averageRating": 5,
    "ratingCount": 58,
    "_id": "5a4b70d2b0059257a9a352c5",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Thai Basil Minced Chicken (Pad Krapow Gai)",
    "description": "Street-style minced chicken stir-fried with fragrant holy basil, garlic, and fiery chilies, served with steamed jasmine rice and a crispy fried egg.",
    "image": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&q=80",
    "ingredients": [
      {
        "name": "Coarsely ground chicken thighs",
        "quantity": "400g"
      },
      {
        "name": "Fresh holy basil or Thai basil leaves",
        "quantity": "2 packed cups"
      },
      {
        "name": "Thai bird eye chilies crushed",
        "quantity": "6 pieces"
      },
      {
        "name": "Garlic cloves smashed",
        "quantity": "6 cloves"
      },
      {
        "name": "Oyster sauce",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Light soy sauce and dark soy sauce",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Fish sauce",
        "quantity": "1 tbsp"
      },
      {
        "name": "Eggs fried with crispy lacy edges",
        "quantity": "2 items"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pound garlic and bird's eye chilies in a mortar and pestle into a rough paste."
      },
      {
        "step": 2,
        "description": "Heat oil in a scorching hot wok. Fry chili-garlic paste for 30 seconds until pungent."
      },
      {
        "step": 3,
        "description": "Add minced chicken, breaking it apart with spatula until browned (3 minutes)."
      },
      {
        "step": 4,
        "description": "Swirl in oyster sauce, light soy sauce, dark soy sauce, and fish sauce; stir-fry vigorously."
      },
      {
        "step": 5,
        "description": "Turn off heat, throw in holy basil leaves, and fold until wilted from residual heat."
      },
      {
        "step": 6,
        "description": "Serve over hot jasmine rice crowned with a crispy-edged runny fried egg."
      }
    ],
    "prepTime": 10,
    "cookTime": 12,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Main Course",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "chicken",
      "basil",
      "pad krapow",
      "spicy",
      "lunch",
      "dinner",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 42,
    "_id": "2326cbc832e8921484be3e47",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Authentic Iced Thai Milk Tea (Cha Yen)",
    "description": "Bold black Ceylon tea infused with star anise and cardamom, poured over crushed ice and sweetened with condensed milk.",
    "image": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80",
    "ingredients": [
      {
        "name": "Traditional Thai black tea mix",
        "quantity": "4 tbsp"
      },
      {
        "name": "Boiling water",
        "quantity": "2 cups"
      },
      {
        "name": "Sweetened condensed milk",
        "quantity": "4 tbsp"
      },
      {
        "name": "Evaporated milk",
        "quantity": "4 tbsp"
      },
      {
        "name": "Crushed ice",
        "quantity": "as needed"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Steep Thai tea leaves in boiling water using a traditional cloth tea sock or fine strainer for 5 minutes."
      },
      {
        "step": 2,
        "description": "Strain brewed tea into a pitcher; stir in sweetened condensed milk until completely dissolved."
      },
      {
        "step": 3,
        "description": "Pack two tall glasses to the brim with crushed ice."
      },
      {
        "step": 4,
        "description": "Pour the warm orange tea over ice and float evaporated milk gently on top."
      }
    ],
    "prepTime": 5,
    "cookTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "tea",
      "thai tea",
      "drinks",
      "iced",
      "sweet",
      "creamy"
    ],
    "averageRating": 4.9,
    "ratingCount": 51,
    "_id": "e85b0fb52f63bb26ad690800",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Crispy Thai Sweet Corn Fritters",
    "description": "Golden fried fritters packed with sweet corn kernels, fragrant red curry paste, and kaffir lime leaves, served with sweet chili dipping sauce.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Barranquilla_bu%C3%B1uelos_de_ma%C3%ADz.jpg/1280px-Barranquilla_bu%C3%B1uelos_de_ma%C3%ADz.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Fresh sweet corn kernels",
        "quantity": "3 cups"
      },
      {
        "name": "Rice flour and all-purpose flour",
        "quantity": "1/2 cup each"
      },
      {
        "name": "Thai red curry paste",
        "quantity": "1.5 tbsp"
      },
      {
        "name": "Egg beaten",
        "quantity": "1 large"
      },
      {
        "name": "Makrut lime leaves finely sliced",
        "quantity": "4 leaves"
      },
      {
        "name": "Ice water",
        "quantity": "1/4 cup"
      },
      {
        "name": "Sweet chili sauce with crushed peanuts",
        "quantity": "for dipping"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pound 1 cup of corn kernels lightly to release milk; mix with remaining whole kernels in a bowl."
      },
      {
        "step": 2,
        "description": "Add red curry paste, egg, lime leaves, flours, and ice water; mix until a thick batter forms."
      },
      {
        "step": 3,
        "description": "Heat oil to 350°F (175°C) in a skillet. Drop 2-tablespoon mounds of batter into oil, flattening slightly."
      },
      {
        "step": 4,
        "description": "Fry 3 minutes on each side until deeply golden and crispy; drain on paper towels."
      },
      {
        "step": 5,
        "description": "Serve warm with Thai sweet chili sauce topped with roasted crushed peanuts."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Snacks",
    "cuisine": "Thai",
    "tags": [
      "thai",
      "fritters",
      "corn",
      "snacks",
      "appetizers",
      "crispy",
      "vegetarian"
    ],
    "averageRating": 4.7,
    "ratingCount": 30,
    "_id": "e0b38588b234665662ce24a6",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Sizzling Skillet Steak Fajitas",
    "description": "Marinated tender flank steak strips seared with bell peppers and red onions, served on a sizzling cast-iron skillet with warm flour tortillas.",
    "image": "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=800&q=80",
    "ingredients": [
      {
        "name": "Flank steak or skirt steak sliced thin",
        "quantity": "600g"
      },
      {
        "name": "Tri-color bell peppers sliced into strips",
        "quantity": "3 peppers"
      },
      {
        "name": "Red onion sliced",
        "quantity": "1 large"
      },
      {
        "name": "Lime juice, olive oil, and cumin",
        "quantity": "2 tbsp each"
      },
      {
        "name": "Chili powder and smoked paprika",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Warm flour tortillas, guacamole, and sour cream",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Marinate steak strips with lime juice, olive oil, cumin, chili powder, and garlic for 30 minutes."
      },
      {
        "step": 2,
        "description": "Heat a heavy cast-iron skillet over high heat until smoking hot."
      },
      {
        "step": 3,
        "description": "Sear steak in batches for 3-4 minutes until charred on edges; set aside."
      },
      {
        "step": 4,
        "description": "Add peppers and onions to skillet, tossing for 4 minutes until blistered yet crisp."
      },
      {
        "step": 5,
        "description": "Return steak to the sizzling skillet, garnish with cilantro, and serve immediately with warm tortillas and salsa."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Mexican",
    "tags": [
      "mexican",
      "steak",
      "fajitas",
      "sizzling",
      "dinner",
      "main course"
    ],
    "averageRating": 4.8,
    "ratingCount": 50,
    "_id": "f4d9a7e6403e09829b49c934",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Creamy Chicken Enchiladas Verdes",
    "description": "Corn tortillas stuffed with shredded chicken breast, baked in a rich tangy tomatillo salsa verde, melted Monterey Jack cheese, and crema.",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&q=80",
    "ingredients": [
      {
        "name": "Corn tortillas",
        "quantity": "12 tortillas"
      },
      {
        "name": "Cooked shredded chicken breast",
        "quantity": "500g"
      },
      {
        "name": "Salsa verde (roasted tomatillo salsa)",
        "quantity": "2.5 cups"
      },
      {
        "name": "Monterey Jack and Cotija cheese shredded",
        "quantity": "2 cups"
      },
      {
        "name": "Mexican crema or sour cream",
        "quantity": "1/2 cup"
      },
      {
        "name": "Chopped cilantro and pickled red onions",
        "quantity": "for garnish"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Briefly warm corn tortillas in hot oil for 10 seconds to make pliable."
      },
      {
        "step": 2,
        "description": "Toss shredded chicken with 1/2 cup salsa verde and 1/2 cup shredded cheese."
      },
      {
        "step": 3,
        "description": "Roll filling inside tortillas and place seam-side down in a baking dish."
      },
      {
        "step": 4,
        "description": "Pour remaining salsa verde over enchiladas and blanket generously with shredded Monterey Jack."
      },
      {
        "step": 5,
        "description": "Bake at 375°F (190°C) for 20 minutes until bubbling and lightly browned on top."
      },
      {
        "step": 6,
        "description": "Drizzle with crema, scatter fresh cilantro and pickled red onions, and serve warm."
      }
    ],
    "prepTime": 20,
    "cookTime": 25,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Mexican",
    "tags": [
      "mexican",
      "enchiladas",
      "chicken",
      "salsa verde",
      "cheesy",
      "dinner",
      "main course"
    ],
    "averageRating": 4.9,
    "ratingCount": 46,
    "_id": "58c4e4eb76d98f1a5bcc3fc0",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Traditional Mexican Cinnamon Horchata",
    "description": "Creamy, refreshing artisanal Mexican drink made by soaking long-grain rice with Mexican Canela cinnamon sticks, vanilla, and sweet milk.",
    "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    "ingredients": [
      {
        "name": "White long-grain rice rinsed",
        "quantity": "1 cup"
      },
      {
        "name": "Mexican Canela cinnamon sticks broken",
        "quantity": "2 sticks"
      },
      {
        "name": "Warm water",
        "quantity": "4 cups"
      },
      {
        "name": "Evaporated milk and whole milk",
        "quantity": "1 cup each"
      },
      {
        "name": "Granulated sugar or sweetened condensed milk",
        "quantity": "1/2 cup"
      },
      {
        "name": "Pure Mexican vanilla extract",
        "quantity": "1 tbsp"
      },
      {
        "name": "Ground cinnamon for dusting",
        "quantity": "1 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Soak rice and cinnamon sticks in 4 cups warm water overnight or for at least 4 hours."
      },
      {
        "step": 2,
        "description": "Blend rice, cinnamon sticks, and soaking water on high speed for 3 minutes until smooth."
      },
      {
        "step": 3,
        "description": "Strain mixture through a fine-mesh nut milk bag or double-layered cheesecloth into a pitcher."
      },
      {
        "step": 4,
        "description": "Stir in milks, vanilla extract, and sugar until well combined; chill thoroughly in refrigerator."
      },
      {
        "step": 5,
        "description": "Serve over plenty of ice, dusted with ground cinnamon."
      }
    ],
    "prepTime": 15,
    "cookTime": 0,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Drinks",
    "cuisine": "Mexican",
    "tags": [
      "mexican",
      "horchata",
      "drinks",
      "cinnamon",
      "rice milk",
      "refreshing"
    ],
    "averageRating": 4.8,
    "ratingCount": 37,
    "_id": "62aaf6bce99a2c7d596b5118",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Crispy Fish Tacos with Chipotle Slaw",
    "description": "Beer-battered flaky white fish fillets fried until golden and crisp, tucked into warm corn tortillas with crunchy chipotle crema slaw.",
    "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    "ingredients": [
      {
        "name": "Fresh cod or halibut fillets cut into strips",
        "quantity": "450g"
      },
      {
        "name": "Mexican lager beer cold",
        "quantity": "1 cup"
      },
      {
        "name": "Flour and baking powder",
        "quantity": "1 cup and 1 tsp"
      },
      {
        "name": "Shredded purple and green cabbage",
        "quantity": "2 cups"
      },
      {
        "name": "Chipotle peppers in adobo with sour cream",
        "quantity": "for slaw dressing"
      },
      {
        "name": "Warm corn tortillas and lime wedges",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Whisk flour, baking powder, salt, and cold Mexican beer into a smooth batter."
      },
      {
        "step": 2,
        "description": "Toss shredded cabbage with sour cream, minced chipotle, and lime juice for slaw."
      },
      {
        "step": 3,
        "description": "Dip fish strips in batter and fry in 375°F oil for 4 minutes until golden and super crispy."
      },
      {
        "step": 4,
        "description": "Assemble warm tortillas with crispy fish, generous chipotle slaw, and fresh cilantro."
      }
    ],
    "prepTime": 15,
    "cookTime": 12,
    "servings": 3,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Mexican",
    "tags": [
      "mexican",
      "tacos",
      "fish tacos",
      "seafood",
      "lunch",
      "crispy"
    ],
    "averageRating": 4.9,
    "ratingCount": 48,
    "_id": "3638a68888004b21f709b1fb",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Homemade Lasagna Bolognese",
    "description": "Layer upon layer of handmade pasta sheets, slow-simmered rich beef and pork ragù, silky nutmeg béchamel sauce, and aged Parmigiano-Reggiano.",
    "image": "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=800&q=80",
    "ingredients": [
      {
        "name": "Lasagna pasta sheets",
        "quantity": "12 sheets"
      },
      {
        "name": "Slow-cooked Bolognese meat sauce",
        "quantity": "4 cups"
      },
      {
        "name": "Butter and flour for roux",
        "quantity": "4 tbsp each"
      },
      {
        "name": "Whole milk for béchamel",
        "quantity": "3.5 cups"
      },
      {
        "name": "Pinch of ground nutmeg",
        "quantity": "1/4 tsp"
      },
      {
        "name": "Freshly grated Parmigiano-Reggiano",
        "quantity": "1.5 cups"
      },
      {
        "name": "Fresh mozzarella torn",
        "quantity": "200g"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Make béchamel: melt butter, whisk in flour for 1 minute, slowly incorporate warm milk, simmer until creamy and season with nutmeg."
      },
      {
        "step": 2,
        "description": "Spread a thin layer of meat sauce on the bottom of a 9x13 inch ceramic baking dish."
      },
      {
        "step": 3,
        "description": "Layer pasta sheets, followed by Bolognese sauce, silky béchamel, and grated Parmigiano."
      },
      {
        "step": 4,
        "description": "Repeat layers 4 times, finishing with béchamel, Parmigiano, and torn mozzarella."
      },
      {
        "step": 5,
        "description": "Bake at 375°F (190°C) for 35 minutes covered, then uncover and bake 10 minutes until golden and bubbling."
      },
      {
        "step": 6,
        "description": "Let rest for 15 minutes before slicing into neat, structural editorial portions."
      }
    ],
    "prepTime": 30,
    "cookTime": 45,
    "servings": 6,
    "difficulty": "Hard",
    "category": "Dinner",
    "cuisine": "Italian",
    "tags": [
      "italian",
      "lasagna",
      "pasta",
      "bolognese",
      "comfort food",
      "dinner",
      "main course"
    ],
    "averageRating": 5,
    "ratingCount": 62,
    "_id": "c95e8194dbf34b961b3d83e0",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Wild Mushroom & Truffle Risotto",
    "description": "Creamy Carnaroli rice slowly coaxed with warm vegetable broth, sautéed porcini and chanterelle mushrooms, white truffle butter, and aged parmesan.",
    "image": "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&q=80",
    "ingredients": [
      {
        "name": "Carnaroli or Arborio rice",
        "quantity": "1.5 cups"
      },
      {
        "name": "Assorted wild mushrooms (porcini, chanterelles, cremini)",
        "quantity": "350g"
      },
      {
        "name": "Dry white wine",
        "quantity": "1/2 cup"
      },
      {
        "name": "Hot mushroom or vegetable stock",
        "quantity": "5 cups"
      },
      {
        "name": "Shallots minced",
        "quantity": "2 large"
      },
      {
        "name": "White truffle butter or truffle oil",
        "quantity": "2 tbsp"
      },
      {
        "name": "Parmigiano-Reggiano grated",
        "quantity": "3/4 cup"
      },
      {
        "name": "Fresh thyme leaves",
        "quantity": "1 tbsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sauté sliced wild mushrooms in olive oil with thyme until golden brown and tender; set half aside for topping."
      },
      {
        "step": 2,
        "description": "In a heavy pot, sweat minced shallots in butter; add rice and toast for 2 minutes until translucent around edges."
      },
      {
        "step": 3,
        "description": "Deglaze with white wine and cook until absorbed completely."
      },
      {
        "step": 4,
        "description": "Add warm stock one ladle at a time, stirring constantly until each addition is absorbed (approx 18-20 minutes total)."
      },
      {
        "step": 5,
        "description": "Remove from heat. Mantecatura: vigorously beat in truffle butter and Parmigiano-Reggiano until exceptionally creamy."
      },
      {
        "step": 6,
        "description": "Spoon onto flat warm plates, top with reserved sautéed mushrooms and fresh cracked pepper."
      }
    ],
    "prepTime": 15,
    "cookTime": 30,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "italian",
      "risotto",
      "mushrooms",
      "truffle",
      "creamy",
      "dinner",
      "main course"
    ],
    "averageRating": 4.9,
    "ratingCount": 51,
    "_id": "31e39dacd7e86f0f639509c5",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Italian Espresso Affogato al Caffè",
    "description": "A classic two-ingredient Italian dessert: a scoop of vanilla bean gelato finished with a freshly pulled shot of hot espresso.",
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg/1280px-Vinoteca%2C_Smithfield%2C_London_%284485849609%29.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "ingredients": [
      {
        "name": "Artisanal Madagascar vanilla bean gelato",
        "quantity": "2 large scoops"
      },
      {
        "name": "Freshly brewed hot espresso",
        "quantity": "2 shots"
      },
      {
        "name": "Dark chocolate shavings",
        "quantity": "1 tbsp"
      },
      {
        "name": "Amaretti cookies",
        "quantity": "for serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pre-chill two dessert glasses or coupe cups in the freezer for 15 minutes."
      },
      {
        "step": 2,
        "description": "Place one large round scoop of cold vanilla gelato into each glass."
      },
      {
        "step": 3,
        "description": "Pull two fresh, steaming shots of dark espresso."
      },
      {
        "step": 4,
        "description": "Pour hot espresso immediately over the gelato table-side, shower with shaved dark chocolate, and serve with amaretti."
      }
    ],
    "prepTime": 5,
    "cookTime": 5,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Dessert",
    "cuisine": "Italian",
    "tags": [
      "italian",
      "dessert",
      "coffee",
      "affogato",
      "gelato",
      "espresso",
      "drinks"
    ],
    "averageRating": 4.8,
    "ratingCount": 38,
    "_id": "087819a35ff74019b94ae1c6",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Crispy Golden Falafel with Creamy Tahini",
    "description": "Herbaceous, crispy Egyptian-style chickpea fritters laced with fresh coriander, parsley, and cumin, served with garlicky lemon tahini dip.",
    "image": "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80",
    "ingredients": [
      {
        "name": "Dried chickpeas soaked 24 hours (do not use canned)",
        "quantity": "2 cups"
      },
      {
        "name": "Fresh parsley and cilantro leaves",
        "quantity": "1 cup each"
      },
      {
        "name": "Yellow onion chopped",
        "quantity": "1 small"
      },
      {
        "name": "Garlic cloves",
        "quantity": "5 cloves"
      },
      {
        "name": "Cumin and coriander powder",
        "quantity": "1 tbsp each"
      },
      {
        "name": "Baking soda",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Toasted sesame seeds",
        "quantity": "2 tbsp"
      },
      {
        "name": "Tahini paste whisked with garlic and lemon juice",
        "quantity": "for dip"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Pulse soaked raw chickpeas, herbs, onion, garlic, and spices in food processor until coarse sand texture."
      },
      {
        "step": 2,
        "description": "Chill mixture in refrigerator for 1 hour; stir in baking soda and sesame seeds right before frying."
      },
      {
        "step": 3,
        "description": "Shape into compact patties using a falafel scoop or wet hands."
      },
      {
        "step": 4,
        "description": "Deep-fry in 365°F (185°C) oil for 4 minutes until dark golden brown and super crunchy."
      },
      {
        "step": 5,
        "description": "Drain on paper towels and serve piping hot with creamy garlic tahini sauce and warm pita."
      }
    ],
    "prepTime": 20,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Snacks",
    "cuisine": "Mediterranean",
    "tags": [
      "mediterranean",
      "falafel",
      "vegetarian",
      "snacks",
      "appetizers",
      "crispy"
    ],
    "averageRating": 4.8,
    "ratingCount": 40,
    "_id": "fe9c80f121ddb6d87d8387e7",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Greek Lemon Herb Roasted Potatoes & Lamb",
    "description": "Slow-roasted tender lamb chops and Yukon gold potato wedges roasted in rich chicken broth, oregano, garlic, and fresh lemon juice until fork-tender.",
    "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80",
    "ingredients": [
      {
        "name": "Yukon gold potatoes cut into thick wedges",
        "quantity": "1 kg"
      },
      {
        "name": "Lamb chops or shoulder pieces",
        "quantity": "500g"
      },
      {
        "name": "Extra virgin olive oil",
        "quantity": "1/2 cup"
      },
      {
        "name": "Freshly squeezed lemon juice",
        "quantity": "1/3 cup"
      },
      {
        "name": "Dried Greek oregano",
        "quantity": "2 tbsp"
      },
      {
        "name": "Garlic cloves minced",
        "quantity": "6 cloves"
      },
      {
        "name": "Chicken broth",
        "quantity": "1 cup"
      },
      {
        "name": "Sea salt and cracked black pepper",
        "quantity": "to taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Arrange potato wedges and lamb pieces in a single layer inside a large roasting pan."
      },
      {
        "step": 2,
        "description": "Whisk olive oil, lemon juice, chicken broth, garlic, Greek oregano, salt, and pepper in a measuring cup."
      },
      {
        "step": 3,
        "description": "Pour marinade evenly over potatoes and lamb, tossing thoroughly to coat."
      },
      {
        "step": 4,
        "description": "Roast at 400°F (200°C) for 45 minutes; flip potatoes and lamb once."
      },
      {
        "step": 5,
        "description": "Roast an additional 15 minutes until broth has reduced to a savory lemon glaze and potatoes are deeply caramelized."
      }
    ],
    "prepTime": 20,
    "cookTime": 60,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Dinner",
    "cuisine": "Mediterranean",
    "tags": [
      "mediterranean",
      "greek",
      "lamb",
      "potatoes",
      "dinner",
      "main course"
    ],
    "averageRating": 4.9,
    "ratingCount": 43,
    "_id": "0532d106eb7f661f96fefb4a",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "title": "Golden French Butter Croissants",
    "description": "Artisanal flaky Parisian croissants laminated with high-fat European butter, featuring honeycomb crumb structure and a golden shatteringly crisp crust.",
    "image": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
    "ingredients": [
      {
        "name": "Bread flour",
        "quantity": "500g"
      },
      {
        "name": "European cultured butter (82% fat) for laminating block",
        "quantity": "280g"
      },
      {
        "name": "Whole milk cold",
        "quantity": "140ml"
      },
      {
        "name": "Water cold",
        "quantity": "140ml"
      },
      {
        "name": "Granulated sugar",
        "quantity": "55g"
      },
      {
        "name": "Instant yeast",
        "quantity": "10g"
      },
      {
        "name": "Fine sea salt",
        "quantity": "10g"
      },
      {
        "name": "Egg yolk beaten with 1 tbsp milk for wash",
        "quantity": "1 egg"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Knead flour, milk, water, sugar, salt, and yeast into a smooth détrempe dough; chill overnight."
      },
      {
        "step": 2,
        "description": "Roll chilled butter into a flat square; wrap dough around butter block and perform three sets of envelope letter folds with chilling between each."
      },
      {
        "step": 3,
        "description": "Roll laminated dough to 4mm thickness and slice into elongated isosceles triangles."
      },
      {
        "step": 4,
        "description": "Gently stretch and roll triangles from base to tip into crescent shapes; proof at 78°F for 2 hours until doubled and jiggling."
      },
      {
        "step": 5,
        "description": "Brush gently with egg wash and bake at 390°F (200°C) for 18 minutes until deep chestnut amber and crackly."
      }
    ],
    "prepTime": 30,
    "cookTime": 20,
    "servings": 8,
    "difficulty": "Hard",
    "category": "Breakfast",
    "cuisine": "French",
    "tags": [
      "french",
      "croissants",
      "pastry",
      "breakfast",
      "bakery",
      "butter"
    ],
    "averageRating": 4.9,
    "ratingCount": 55,
    "_id": "0090df0e7f7d3d941c0aa863",
    "createdAt": "2026-09-23T19:59:10.787Z",
    "updatedAt": "2026-09-23T19:59:10.787Z",
    "isSystem": true
  },
  {
    "_id": "2d24ba34baf561b01aad39a6",
    "title": "Classic Roman Spaghetti Carbonara",
    "description": "Silky, rich Roman pasta emulsified with farm-fresh egg yolks, crisp cured guanciale, coarsely cracked black pepper, and finely aged Pecorino Romano cheese. An Italian standard with zero cream.",
    "image": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80",
    "ingredients": [
      {
        "name": "Bronze-cut Spaghetti",
        "quantity": "400g"
      },
      {
        "name": "Guanciale (or thick pancetta)",
        "quantity": "150g, diced"
      },
      {
        "name": "Fresh Egg Yolks",
        "quantity": "4 large + 1 whole egg"
      },
      {
        "name": "Pecorino Romano",
        "quantity": "60g, finely grated"
      },
      {
        "name": "Black Peppercorns",
        "quantity": "2 tsp, coarsely toasted and crushed"
      },
      {
        "name": "Sea Salt",
        "quantity": "For pasta water"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Bring a large pot of salted water to a gentle rolling boil. Drop the spaghetti and cook until 2 minutes shy of al dente."
      },
      {
        "step": 2,
        "description": "In a wide skillet over medium heat, crisp the diced guanciale until golden-brown and the fat has rendered. Turn off the heat."
      },
      {
        "step": 3,
        "description": "In a mixing bowl, vigorously whisk together the egg yolks, whole egg, grated Pecorino Romano, and cracked black pepper until a thick paste forms."
      },
      {
        "step": 4,
        "description": "Transfer the hot pasta directly into the guanciale skillet with 1/4 cup of starchy pasta water. Toss rapidly to coat."
      },
      {
        "step": 5,
        "description": "Allow pan to cool for 30 seconds off heat, then pour in the egg-cheese mixture, tossing continuously to create a glossy, silky emulsion without scrambling the eggs."
      }
    ],
    "prepTime": 10,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "spaghetti",
      "carbonara",
      "italian",
      "dinner",
      "classic",
      "quick meals"
    ],
    "averageRating": 4.9,
    "ratingCount": 38,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.741Z",
    "updatedAt": "2026-09-23T22:01:41.741Z"
  },
  {
    "_id": "94fff8b9911d3162e5f1fe78",
    "title": "Spicy Penne all'Arrabbiata",
    "description": "Fiery, robust Roman pasta tossed in a simmered San Marzano tomato sauce infused with golden toasted garlic, crushed Calabrian red chili peppers, and freshly chopped Italian flat-leaf parsley.",
    "image": "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=80",
    "ingredients": [
      {
        "name": "Penne Rigate Pasta",
        "quantity": "400g"
      },
      {
        "name": "San Marzano Canned Tomatoes",
        "quantity": "400g, hand-crushed"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "4, thinly sliced"
      },
      {
        "name": "Calabrian Chili Flakes",
        "quantity": "1.5 tsp"
      },
      {
        "name": "Extra Virgin Olive Oil",
        "quantity": "3 tbsp"
      },
      {
        "name": "Fresh Italian Parsley",
        "quantity": "1/4 cup, finely chopped"
      },
      {
        "name": "Parmigiano-Reggiano",
        "quantity": "For serving"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a wide skillet, gently warm the olive oil over medium-low heat. Add the sliced garlic and red chili flakes, swirling until garlic turns lightly golden and fragrant."
      },
      {
        "step": 2,
        "description": "Pour in the crushed San Marzano tomatoes, season with sea salt, and simmer over low heat for 15 minutes until sauce thickens and oils begin to separate."
      },
      {
        "step": 3,
        "description": "Meanwhile, boil penne in salted water until firm to the bite (al dente)."
      },
      {
        "step": 4,
        "description": "Drain pasta and toss immediately in the simmering arrabbiata sauce with a splash of pasta cooking water."
      },
      {
        "step": 5,
        "description": "Garnish with fresh parsley and a dusting of Parmigiano-Reggiano before serving piping hot."
      }
    ],
    "prepTime": 10,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "penne",
      "arrabbiata",
      "spicy",
      "italian",
      "lunch",
      "vegetarian",
      "quick meals"
    ],
    "averageRating": 4.8,
    "ratingCount": 29,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.741Z",
    "updatedAt": "2026-09-23T22:01:41.741Z"
  },
  {
    "_id": "3d7a8ecb0b38cc9d42475a9f",
    "title": "Traditional Basil Pesto Genovese Pasta",
    "description": "Al dente penne pasta coated in vibrant homemade Ligurian pesto pounded with young Genovese basil leaves, toasted Mediterranean pine nuts, cold-pressed olive oil, and aged Parmigiano-Reggiano.",
    "image": "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80",
    "ingredients": [
      {
        "name": "Penne or Trofie Pasta",
        "quantity": "400g"
      },
      {
        "name": "Fresh Sweet Basil Leaves",
        "quantity": "2 packed cups"
      },
      {
        "name": "Pine Nuts",
        "quantity": "3 tbsp, lightly toasted"
      },
      {
        "name": "Garlic",
        "quantity": "1 small clove"
      },
      {
        "name": "Parmigiano-Reggiano",
        "quantity": "1/2 cup, freshly grated"
      },
      {
        "name": "Pecorino Fiore Sardo",
        "quantity": "2 tbsp, grated"
      },
      {
        "name": "Extra Virgin Olive Oil",
        "quantity": "1/2 cup"
      },
      {
        "name": "Flaky Sea Salt",
        "quantity": "1/2 tsp"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a food processor or mortar, pulse toasted pine nuts and garlic clove into a rough paste."
      },
      {
        "step": 2,
        "description": "Add fresh basil leaves and coarse sea salt. Pulse gently in short bursts to preserve the bright emerald green color."
      },
      {
        "step": 3,
        "description": "Slowly drizzle in extra virgin olive oil while pulsing until smooth, then stir in grated cheeses by hand."
      },
      {
        "step": 4,
        "description": "Boil pasta in well-salted water until al dente. Reserve 1/2 cup starchy pasta water."
      },
      {
        "step": 5,
        "description": "In a large serving bowl off the heat, toss hot pasta with the fresh pesto and 2-3 tablespoons of pasta water until every ridge is thoroughly coated."
      }
    ],
    "prepTime": 15,
    "cookTime": 10,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "pesto",
      "penne",
      "italian",
      "vegetarian",
      "lunch",
      "quick meals"
    ],
    "averageRating": 4.9,
    "ratingCount": 34,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.741Z",
    "updatedAt": "2026-09-23T22:01:41.741Z"
  },
  {
    "_id": "0371ee3fe29b079528e8d0b6",
    "title": "Creamy Tuscan Garlic Chicken Pasta",
    "description": "Golden pan-seared chicken breast cutlets served over tender fettuccine pasta in a velvety garlic parmesan cream sauce loaded with tart sun-dried tomatoes, wilted baby spinach, and Italian herbs.",
    "image": "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80",
    "ingredients": [
      {
        "name": "Fettuccine Pasta",
        "quantity": "350g"
      },
      {
        "name": "Chicken Breasts",
        "quantity": "2 large, halved horizontally"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "5, minced"
      },
      {
        "name": "Heavy Cream",
        "quantity": "1 cup"
      },
      {
        "name": "Chicken Broth",
        "quantity": "1/2 cup"
      },
      {
        "name": "Sun-dried Tomatoes",
        "quantity": "1/2 cup, drained and sliced"
      },
      {
        "name": "Fresh Baby Spinach",
        "quantity": "2 cups"
      },
      {
        "name": "Parmesan Cheese",
        "quantity": "3/4 cup, freshly grated"
      },
      {
        "name": "Italian Herb Seasoning",
        "quantity": "1 tsp"
      },
      {
        "name": "Olive Oil & Butter",
        "quantity": "1 tbsp each"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Season chicken cutlets with salt, pepper, and Italian herbs. Sear in olive oil over medium-high heat until golden brown on both sides and cooked through (6-8 minutes). Transfer to a cutting board."
      },
      {
        "step": 2,
        "description": "Melt butter in the same pan, add minced garlic and sun-dried tomatoes, cooking for 1 minute until fragrant."
      },
      {
        "step": 3,
        "description": "Pour in chicken broth and heavy cream, bringing to a gentle simmer for 3 minutes. Stir in parmesan until smooth and creamy."
      },
      {
        "step": 4,
        "description": "Fold in baby spinach until wilted. Add boiled fettuccine and toss thoroughly."
      },
      {
        "step": 5,
        "description": "Slice chicken into strips and nestle over the creamy pasta before serving."
      }
    ],
    "prepTime": 15,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "chicken",
      "tuscan",
      "creamy",
      "italian",
      "main course",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 42,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.741Z",
    "updatedAt": "2026-09-23T22:01:41.741Z"
  },
  {
    "_id": "8a6fbbc90d39ad9590de2fa2",
    "title": "Spaghetti Aglio e Olio with Crispy Garlic",
    "description": "The iconic midnight pasta of Naples: slow-sautéed sweet garlic chips, Calabrian chili, and fresh parsley tossed with al dente spaghetti and starchy pasta cooking water for pure simplicity.",
    "image": "https://images.unsplash.com/photo-1556761223-4c4282c73f77?w=800&q=80",
    "ingredients": [
      {
        "name": "Spaghetti",
        "quantity": "350g"
      },
      {
        "name": "Quality Extra Virgin Olive Oil",
        "quantity": "1/3 cup"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "6, very thinly sliced"
      },
      {
        "name": "Red Chili Flakes",
        "quantity": "1 tsp"
      },
      {
        "name": "Fresh Flat-Leaf Parsley",
        "quantity": "1/3 cup, finely chopped"
      },
      {
        "name": "Lemon Juice",
        "quantity": "1 tsp (optional)"
      },
      {
        "name": "Sea Salt",
        "quantity": "To taste"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Boil spaghetti in salted water until 1 minute before al dente. Reserve 1 cup of pasta cooking water."
      },
      {
        "step": 2,
        "description": "In a cold wide skillet, combine olive oil and thinly sliced garlic. Place over medium-low heat and cook gently until garlic turns pale golden."
      },
      {
        "step": 3,
        "description": "Add chili flakes and stir for 20 seconds, taking care not to scorch the garlic."
      },
      {
        "step": 4,
        "description": "Add 1/2 cup of hot pasta water to the pan to halt the garlic browning and form an emulsion."
      },
      {
        "step": 5,
        "description": "Transfer spaghetti to skillet, add fresh parsley, and toss vigorously over heat until sauce clings to every strand."
      }
    ],
    "prepTime": 5,
    "cookTime": 10,
    "servings": 2,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "spaghetti",
      "aglio e olio",
      "italian",
      "vegan",
      "lunch",
      "quick meals"
    ],
    "averageRating": 4.8,
    "ratingCount": 31,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.741Z",
    "updatedAt": "2026-09-23T22:01:41.741Z"
  },
  {
    "_id": "3ee1c684fd411b6187fe54f6",
    "title": "Classic Rigatoni alla Vodka",
    "description": "Ridged rigatoni pasta bathed in a velvety tomato vodka cream reduction enriched with sweet caramelized shallots, garlic, and freshly grated aged Parmigiano-Reggiano.",
    "image": "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80",
    "ingredients": [
      {
        "name": "Rigatoni Pasta",
        "quantity": "400g"
      },
      {
        "name": "Italian Double-Concentrated Tomato Paste",
        "quantity": "4 tbsp"
      },
      {
        "name": "Vodka",
        "quantity": "1/4 cup"
      },
      {
        "name": "Heavy Whipping Cream",
        "quantity": "3/4 cup"
      },
      {
        "name": "Shallot",
        "quantity": "1 medium, finely minced"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "3, minced"
      },
      {
        "name": "Red Pepper Flakes",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Parmigiano-Reggiano",
        "quantity": "1/2 cup, freshly grated"
      },
      {
        "name": "Butter & Olive Oil",
        "quantity": "2 tbsp each"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Heat butter and olive oil in a deep skillet over medium heat. Sauté minced shallot and garlic until translucent and fragrant (3 minutes)."
      },
      {
        "step": 2,
        "description": "Stir in tomato paste and chili flakes, caramelizing for 4-5 minutes until rust-colored and caramelized."
      },
      {
        "step": 3,
        "description": "Deglaze the pan with vodka, scraping browned bits, and simmer until reduced by half (2 minutes)."
      },
      {
        "step": 4,
        "description": "Pour in heavy cream, stirring vigorously until a smooth orange-hued velvet sauce emerges. Season with sea salt."
      },
      {
        "step": 5,
        "description": "Toss boiled rigatoni into sauce with 1/4 cup pasta water and parmesan until sauce fills every groove."
      }
    ],
    "prepTime": 10,
    "cookTime": 20,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Dinner",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "rigatoni",
      "vodka sauce",
      "italian",
      "dinner",
      "vegetarian"
    ],
    "averageRating": 4.9,
    "ratingCount": 36,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  },
  {
    "_id": "cee24a12d2d71e552f9316b9",
    "title": "Authentic Roman Cacio e Pepe Pasta",
    "description": "A minimalist Roman culinary triumph: Tellicherry black peppercorns dry-toasted in bronze-cut pasta water, emulsified with finely grated Pecorino Romano into a naturally glossy cream sauce.",
    "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800&q=80",
    "ingredients": [
      {
        "name": "Tonnarelli or Thick Spaghetti",
        "quantity": "350g"
      },
      {
        "name": "Whole Black Peppercorns",
        "quantity": "1.5 tbsp, freshly crushed in mortar"
      },
      {
        "name": "Pecorino Romano DOP",
        "quantity": "150g, very finely grated on microplane"
      },
      {
        "name": "Sea Salt",
        "quantity": "Sparingly for pasta water"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Boil tonnarelli or spaghetti in a shallow pot with minimal water to concentrate the starch."
      },
      {
        "step": 2,
        "description": "Toast crushed black peppercorns in a dry skillet over medium heat until fragrant (1 minute)."
      },
      {
        "step": 3,
        "description": "Ladle two splashes of starchy boiling pasta water into the skillet with the pepper; turn heat to low."
      },
      {
        "step": 4,
        "description": "In a bowl, mix grated Pecorino Romano with a ladle of warm pasta water, whisking vigorously into a thick, lump-free cheese paste."
      },
      {
        "step": 5,
        "description": "Transfer hot pasta to skillet, remove from heat, and stir in cheese paste quickly until a velvety, clinging sauce coats the noodles."
      }
    ],
    "prepTime": 5,
    "cookTime": 12,
    "servings": 2,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "cacio e pepe",
      "spaghetti",
      "italian",
      "dinner",
      "vegetarian",
      "quick meals"
    ],
    "averageRating": 4.9,
    "ratingCount": 45,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  },
  {
    "_id": "983650c14f6cae86c7aab39a",
    "title": "Garlic Butter Shrimp Linguine Pasta",
    "description": "Plump wild-caught shrimp sautéed in garlic-infused brown butter, crisp Pinot Grigio white wine, and fresh lemon zest, tossed through linguine pasta with chopped flat-leaf parsley.",
    "image": "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=800&q=80",
    "ingredients": [
      {
        "name": "Linguine Pasta",
        "quantity": "350g"
      },
      {
        "name": "Large Raw Shrimp",
        "quantity": "400g, peeled and deveined"
      },
      {
        "name": "Unsalted Butter",
        "quantity": "4 tbsp"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "5, minced"
      },
      {
        "name": "Dry White Wine",
        "quantity": "1/3 cup"
      },
      {
        "name": "Fresh Lemon Juice & Zest",
        "quantity": "1 lemon"
      },
      {
        "name": "Red Pepper Flakes",
        "quantity": "1/2 tsp"
      },
      {
        "name": "Italian Parsley",
        "quantity": "1/3 cup, chopped"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Cook linguine in salted water until al dente. Reserve 1/2 cup pasta cooking water."
      },
      {
        "step": 2,
        "description": "Melt 2 tbsp butter with olive oil in a wide pan over high heat. Sear shrimp with salt and red pepper flakes for 1.5 minutes per side until pink. Set shrimp aside."
      },
      {
        "step": 3,
        "description": "Lower heat, add garlic and cook for 30 seconds. Pour in white wine and simmer until reduced by half."
      },
      {
        "step": 4,
        "description": "Whisk in remaining cold butter, lemon juice, and zest to form a silky butter sauce."
      },
      {
        "step": 5,
        "description": "Toss linguine, cooked shrimp, and chopped parsley in the skillet, loosening with pasta water as needed."
      }
    ],
    "prepTime": 10,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "shrimp",
      "seafood",
      "linguine",
      "italian",
      "main course",
      "quick meals"
    ],
    "averageRating": 4.8,
    "ratingCount": 30,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  },
  {
    "_id": "54a11627ceb446b61daefa45",
    "title": "Truffled Wild Mushroom Fettuccine Pasta",
    "description": "Earthy golden-sautéed cremini, shiitake, and oyster mushrooms bathed in a velvety white wine mascarpone reduction, infused with thyme, truffle oil, and ribbon fettuccine.",
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    "ingredients": [
      {
        "name": "Egg Fettuccine Pasta",
        "quantity": "350g"
      },
      {
        "name": "Assorted Wild Mushrooms",
        "quantity": "350g, sliced"
      },
      {
        "name": "Shallot",
        "quantity": "1 large, finely minced"
      },
      {
        "name": "Garlic",
        "quantity": "3 cloves, minced"
      },
      {
        "name": "Fresh Thyme Leaves",
        "quantity": "1 tbsp"
      },
      {
        "name": "Dry White Wine",
        "quantity": "1/3 cup"
      },
      {
        "name": "Mascarpone or Heavy Cream",
        "quantity": "1/2 cup"
      },
      {
        "name": "White or Black Truffle Oil",
        "quantity": "1 tsp for finishing"
      },
      {
        "name": "Parmigiano-Reggiano",
        "quantity": "1/2 cup, grated"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Sear sliced wild mushrooms in olive oil over high heat without crowding, allowing deep golden crusting before flipping."
      },
      {
        "step": 2,
        "description": "Lower heat, add shallot, garlic, and fresh thyme, cooking gently until tender (2 minutes)."
      },
      {
        "step": 3,
        "description": "Deglaze pan with dry white wine and simmer until liquid is almost entirely absorbed."
      },
      {
        "step": 4,
        "description": "Stir in mascarpone cheese and grated parmesan with a ladle of pasta water until smooth and creamy."
      },
      {
        "step": 5,
        "description": "Fold through cooked fettuccine ribbons, remove from heat, and drizzle with truffle oil before serving."
      }
    ],
    "prepTime": 15,
    "cookTime": 15,
    "servings": 4,
    "difficulty": "Medium",
    "category": "Dinner",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "mushrooms",
      "fettuccine",
      "truffle",
      "italian",
      "vegetarian",
      "dinner"
    ],
    "averageRating": 4.9,
    "ratingCount": 27,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  },
  {
    "_id": "d4524af0b8b5aa170ccbb558",
    "title": "Rich Four-Cheese Baked Ziti Pasta",
    "description": "Golden, comforting tubular ziti pasta tossed with slow-simmered marinara, creamy whole-milk ricotta, shredded mozzarella, and melted fontina, baked until bubbly with a crisp cheesy crust.",
    "image": "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80",
    "ingredients": [
      {
        "name": "Ziti or Rigatoni Pasta",
        "quantity": "450g"
      },
      {
        "name": "Whole Milk Ricotta Cheese",
        "quantity": "400g"
      },
      {
        "name": "Low-Moisture Mozzarella",
        "quantity": "300g, shredded"
      },
      {
        "name": "Fontina or Provolone",
        "quantity": "100g, grated"
      },
      {
        "name": "Parmigiano-Reggiano",
        "quantity": "1/2 cup, grated"
      },
      {
        "name": "Classic Marinara Sauce",
        "quantity": "3 cups"
      },
      {
        "name": "Egg",
        "quantity": "1, beaten"
      },
      {
        "name": "Fresh Basil",
        "quantity": "1/4 cup, torn"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Preheat oven to 375°F (190°C). Cook ziti pasta in salted water for 2 minutes less than package directions."
      },
      {
        "step": 2,
        "description": "In a large bowl, mix ricotta, beaten egg, half the mozzarella, parmesan, and torn basil."
      },
      {
        "step": 3,
        "description": "Toss drained ziti with marinara sauce and the ricotta mixture."
      },
      {
        "step": 4,
        "description": "Spread into a buttered 9x13-inch baking dish. Top with remaining mozzarella and fontina cheese."
      },
      {
        "step": 5,
        "description": "Bake for 25 minutes until cheese is bubbly and edges are golden-brown. Rest 5 minutes before scooping."
      }
    ],
    "prepTime": 20,
    "cookTime": 30,
    "servings": 6,
    "difficulty": "Easy",
    "category": "Main Course",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "baked ziti",
      "casserole",
      "italian",
      "comfort food",
      "main course",
      "cheese"
    ],
    "averageRating": 4.8,
    "ratingCount": 40,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  },
  {
    "_id": "1ff72bf653a5d61398729095",
    "title": "Hearty Tuscan Ditalini Pasta e Fagioli",
    "description": "Rustic Italian peasant soup loaded with tender ditalini pasta, creamy cannellini beans, rosemary, garlic, and diced tomatoes simmered in a rich vegetable-herb broth.",
    "image": "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
    "ingredients": [
      {
        "name": "Ditalini or Small Shell Pasta",
        "quantity": "200g"
      },
      {
        "name": "Cannellini Beans",
        "quantity": "2 cans (400g each), rinsed"
      },
      {
        "name": "Crushed San Marzano Tomatoes",
        "quantity": "1 can (400g)"
      },
      {
        "name": "Vegetable or Chicken Broth",
        "quantity": "4 cups"
      },
      {
        "name": "Onion, Carrot, & Celery",
        "quantity": "1 each, finely diced (soffritto)"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "3, minced"
      },
      {
        "name": "Fresh Rosemary & Thyme",
        "quantity": "1 sprig each"
      },
      {
        "name": "Parmesan Rind",
        "quantity": "1 piece (optional for flavor)"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "In a heavy pot, warm olive oil over medium heat. Sauté diced onion, carrot, and celery until softened (6-8 minutes)."
      },
      {
        "step": 2,
        "description": "Add garlic and herbs, cooking for 1 minute until fragrant."
      },
      {
        "step": 3,
        "description": "Pour in crushed tomatoes, broth, parmesan rind, and one can of beans. Puree the second can of beans with 1/2 cup broth and stir in for natural thickness."
      },
      {
        "step": 4,
        "description": "Simmer gently for 15 minutes, then add ditalini pasta and cook until tender."
      },
      {
        "step": 5,
        "description": "Ladle into warm bowls, drizzle with extra virgin olive oil, and finish with freshly grated parmesan."
      }
    ],
    "prepTime": 15,
    "cookTime": 25,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "soup",
      "tuscan",
      "beans",
      "italian",
      "lunch",
      "comfort food"
    ],
    "averageRating": 4.8,
    "ratingCount": 22,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  },
  {
    "_id": "38bda26c30e2d1d5a83571e7",
    "title": "Pasta Primavera with Crisp Garden Vegetables",
    "description": "Bright and cheerful penne pasta tossed with tender-crisp asparagus, sweet sugar snap peas, cherry tomatoes, and bell peppers in a light white wine lemon-parmesan sauce.",
    "image": "https://images.unsplash.com/photo-1597393353415-b3730f3719fe?w=800&q=80",
    "ingredients": [
      {
        "name": "Penne or Farfalle Pasta",
        "quantity": "350g"
      },
      {
        "name": "Asparagus Spears",
        "quantity": "1 bunch, cut into 1-inch pieces"
      },
      {
        "name": "Sugar Snap Peas",
        "quantity": "1 cup, trimmed"
      },
      {
        "name": "Cherry Tomatoes",
        "quantity": "1 cup, halved"
      },
      {
        "name": "Yellow Bell Pepper",
        "quantity": "1, diced"
      },
      {
        "name": "Garlic Cloves",
        "quantity": "3, minced"
      },
      {
        "name": "Dry White Wine or Vegetable Broth",
        "quantity": "1/3 cup"
      },
      {
        "name": "Fresh Lemon Juice",
        "quantity": "2 tbsp"
      },
      {
        "name": "Parmigiano-Reggiano",
        "quantity": "1/2 cup, grated"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "description": "Cook pasta in salted water. In the last 2 minutes of boiling, toss in asparagus and snap peas to blanch alongside the pasta. Drain and reserve 1/2 cup pasta water."
      },
      {
        "step": 2,
        "description": "Heat olive oil in a large skillet over medium-high heat. Sauté bell pepper and cherry tomatoes for 2 minutes until tomatoes blister."
      },
      {
        "step": 3,
        "description": "Add minced garlic and stir for 30 seconds, then pour in white wine and lemon juice, simmering for 1 minute."
      },
      {
        "step": 4,
        "description": "Add pasta, blanched vegetables, parmesan, and a splash of reserved cooking water."
      },
      {
        "step": 5,
        "description": "Toss vigorously until a light glossy sauce coats the vegetables and pasta."
      }
    ],
    "prepTime": 15,
    "cookTime": 12,
    "servings": 4,
    "difficulty": "Easy",
    "category": "Lunch",
    "cuisine": "Italian",
    "tags": [
      "pasta",
      "primavera",
      "vegetables",
      "healthy",
      "italian",
      "lunch",
      "vegetarian",
      "quick meals"
    ],
    "averageRating": 4.8,
    "ratingCount": 26,
    "isSystem": true,
    "createdAt": "2026-09-23T22:01:41.742Z",
    "updatedAt": "2026-09-23T22:01:41.742Z"
  }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Recipe.deleteMany();
    await Comment.deleteMany();
    await Rating.deleteMany();

    console.log(`Inserting ${recipes.length} curated recipes across all categories...`);
    await Recipe.insertMany(recipes);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
