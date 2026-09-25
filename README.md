# MISE — The Kitchen Journal

> A full-stack recipe discovery and publishing application built with React, Express, Node.js, and MongoDB.

**MISE — The Kitchen Journal** provides home cooks with a curated collection of kitchen-tested recipes, step-by-step techniques, and recipe authoring tools without requiring mandatory accounts or paywalls.

---

## Brand Identity

* **Brand Name:** `MISE`
* **Descriptor:** `The Kitchen Journal`
* **Official Presentation:** `MISE — The Kitchen Journal`
* **Browser Tab Title:** `MISE — The Kitchen Journal`
* **Favicon:** Terracotta tile with white kitchen utensils (`favicon.svg`, `favicon.ico`, `favicon.png`)

---

## Highlights & Verified Metrics

* **123 Complete Recipes:** Every dish includes photographs, ingredient measurements, and cooking instructions.
* **123 Protected System Recipes:** All initial seed dishes are protected with `isSystem: true`; the server rejects modification or deletion requests with `403 Forbidden`.
* **72 Verified Quick Meals:** Exactly 72 recipes require 30 minutes or less of total preparation and cooking time.
* **15 Italian Pasta Recipes:** 15 dedicated pasta dishes across 24 Italian recipes (e.g., Bolognese, Carbonara, Fettuccine Alfredo, Penne all'Arrabbiata, Lasagna, Cacio e Pepe, Aglio e Olio).
* **13 Global Cuisines:** Italian (24), American (19), Indian (12), Mediterranean (11), Mexican (11), Japanese (10), Chinese (10), Thai (10), French (10), Spanish (2), Vietnamese (2), Korean (1), and German (1).
* **8 Recipe Categories:** Breakfast (12), Lunch (19), Dinner (21), Dessert (13), Snacks (14), Drinks (13), Appetizers (13), Main Course (18).

---

## Core Features

### 1. Search & Autocomplete
* Debounced full-text search across titles, descriptions, ingredients, cuisines, categories, and tags.
* Autocomplete suggestions endpoint (`GET /api/recipes/suggestions?q=`) returning matching recipes, cuisines, and categories in real time.

### 2. Multi-Criteria Filtering & Sorting
* Filter by **Category**, **Cuisine**, **Difficulty** (Easy, Medium, Hard), and **Cooking Time** (≤ 15m, ≤ 30m, ≤ 60m).
* Sort by Newest, Oldest, Highest Rated, Lowest Rated, Cooking Time, and Alphabetical order.
* Active filter pills with individual remove actions and a single-click reset.

### 3. Interactive Cooking Tools
* **Dynamic Servings Scaler:** Real-time `− / +` serving adjuster that scales ingredient quantities proportionally.
* **Ingredient Checklist:** Interactive checkboxes with strike-through states persisted in `localStorage`.
* **Distraction-Free Cooking Mode:** Full-screen layout with oversized typography, step progression, and keyboard navigation.

### 4. Personal Recipe Collection (Saved Recipes)
* One-click bookmarking (heart icon) stored locally in browser storage (`mise_saved`).
* Live counter badge in the navigation bar and dedicated "Saved Only" archive filter.

### 5. Server-Enforced Rating System & Community Notes
* 1-to-5 star rating submission with server-side average calculation and total vote tracking.
* **Server-Side Rating Protection:**
  * Strict integer validation (1–5) returning `400 Bad Request` for invalid scores.
  * Duplicate vote prevention via client identifier (`x-client-id` header with IP hash fallback), returning `409 Conflict` if a client has already rated that recipe.
* Community culinary notes and discussion threads for every recipe.

### 6. Recipe Authoring & Edit Authorization
* Recipe submission form with drag-and-drop cover photo upload, dynamic ingredient arrays, numbered instruction steps, and tag pills.
* **Anonymous Creator Tokens:** On creation, the server generates a token saved in the creator's browser (`mise_creator_tokens`). Subsequent updates or deletions require passing this token in the `x-creator-token` header.

### 7. Zero-Flash Dark & Light Themes
* Instant theme switching with preference saved in `localStorage` (`mise_theme`).
* Inline boot script in the HTML `<head>` prevents theme flashes during page load.

---

## Visual System & Typography

### Modern Typography System
* **Headings & Display:** **Outfit** (weights 400 to 800) — Bold, geometric contemporary display font for titles, badges, and wordmarks.
* **Interface & Body Text:** **Plus Jakarta Sans** (weights 300 to 800) — Clean, crisp contemporary sans-serif for UI controls, body copy, and metadata.

### Clean Surfaces & Appetizing Culinary Palette
* **Light Theme:**
  * Background: `#F8FAFC` (Slate 50)
  * Card Surfaces: `#FFFFFF` (Pure White)
  * Text: `#0F172A` (Slate 900)
  * Culinary Accents: Vibrant orange (`#F97316`) and amber gradients (`from-orange-500 to-amber-500`) with ambient glow (`shadow-glow`)
  * Border: `#E2E8F0`
* **Dark Theme:**
  * Background: `#0F172A` (Slate 900)
  * Card Surfaces: `#1E293B` (Slate 800)
  * Text: `#F8FAFC` (Slate 50)
  * Culinary Accents: Warm amber orange (`#FB923C`)
  * Border: `#334155`
* **Semantic Indicators:** Emerald for quick meals (≤ 30m), rose for saved bookmarks, amber for ratings.

### Tactile Curves & Modern Geometry
* **`rounded-2xl` (16px):** Recipe cards, form containers, filter panels, and modal dialogs.
* **`rounded-3xl` (24px):** Hero spotlight cards and recipe detail banners.
* **`rounded-full`:** Search input bars, category pill filters, tags, and action buttons.
* **Elevation:** Layered smooth drop shadows (`shadow-sm`, `shadow-card`, `shadow-card-hover`, `shadow-glow`).

---

## Tech Stack

### Frontend (`client/`)
* **React 18** + **Vite**
* **Tailwind CSS v3** with custom theme tokens
* **React Router DOM v6**
* **Axios** (with automatic `x-creator-token` and `x-client-id` interceptors)
* **React Hook Form** (dynamic field arrays for ingredients and steps)
* **Lucide React** (icons)

### Backend (`server/`)
* **Node.js** + **Express 4**
* **Mongoose 7 ODM**
* **Multer** (local image upload storage)
* **Helmet** (HTTP security headers) & **CORS**

### Data Persistence
The backend uses Mongoose 7 models for data access (`Recipe`, `Comment`, `Rating`).
* **External MongoDB:** When the `MONGODB_URI` environment variable is set, Mongoose connects directly to that MongoDB cluster.
* **Local Persistent Storage:** When running locally without an external database, the server falls back to a file-persisted JSON datastore in `server/data/db.json` queried via Mingo, exposing the identical Mongoose model interface through proxy bindings. Data persists across process restarts.

---

## Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (bundled with Node.js)

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VinayKrishna-7/Mise.git
   cd Mise
   ```

2. **Configure environment variables:**
   ```bash
   # Linux / macOS
   cp server/.env.example server/.env
   cp client/.env.example client/.env

   # Windows PowerShell
   copy server/.env.example server/.env
   copy client/.env.example client/.env
   ```

3. **Install all dependencies across root, server, and client:**
   ```bash
   npm run install:all
   ```

   *Alternatively, install manually:*
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   cd ..
   ```

---

### Seeding the Database (Optional)

The application already includes all 123 pre-seeded recipes in `server/data/db.json`. To re-seed from scratch:

```bash
npm run seed
```

---

### Commands to Run the Project

#### Option A: Run Concurrently (Recommended)
From the project root, start both the Express API and the Vite frontend with a single command:

```bash
npm run dev
```

#### Option B: Run in Separate Terminals

* **Terminal 1 — Backend Server:**
  ```bash
  npm run server
  ```
  *Or:*
  ```bash
  cd server
  npm run dev
  ```
  The API will be live at **`http://localhost:5000`** (Health check: `http://localhost:5000/api/health`).

* **Terminal 2 — Frontend Client:**
  ```bash
  npm run client
  ```
  *Or:*
  ```bash
  cd client
  npm run dev
  ```
  The web app will be live at **`http://localhost:5173`**.

---

### Building for Production

To create an optimized production bundle of the client:

```bash
cd client
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Environment Variables

### Server Configuration (`server/.env`)
```env
PORT=5000
CLIENT_URL=http://localhost:5173
# Optional: Connect to an external MongoDB cluster
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mise?retryWrites=true&w=majority
```

### Client Configuration (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/recipes/stats` | Aggregated recipe, category, cuisine, and quick meal totals |
| `GET` | `/api/recipes/suggestions?q=` | Search autocomplete suggestions |
| `GET` | `/api/recipes` | Filtered, sorted, and paginated recipe listing |
| `GET` | `/api/recipes/:id` | Single recipe details |
| `POST` | `/api/recipes` | Submit a new recipe (`multipart/form-data`) |
| `PUT` | `/api/recipes/:id` | Update recipe (requires `x-creator-token` header) |
| `DELETE` | `/api/recipes/:id` | Delete recipe (requires `x-creator-token` header) |
| `GET` | `/api/recipes/:id/rating` | Current rating and total votes for a recipe |
| `POST` | `/api/recipes/:id/rating` | Submit a rating (validates 1–5, blocks duplicate votes) |
| `GET` | `/api/recipes/:id/comments` | Retrieve comments for a recipe |
| `POST` | `/api/recipes/:id/comments` | Post a comment |
| `DELETE` | `/api/comments/:commentId` | Delete a comment |

---

## Project Structure

```text
Food Recipe App/
├── client/                     # Frontend React + Vite application
│   ├── public/
│   │   ├── favicon.svg         # Vector brand favicon (Terracotta tile with utensils)
│   │   ├── favicon.ico         # Standard 32x32 ICO favicon
│   │   ├── favicon.png         # 32x32 PNG favicon
│   │   ├── vite.svg            # Fallback favicon
│   │   └── manifest.json       # Web app manifest
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── CategoryCard.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── MobileNav.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── RatingStars.jsx
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeGrid.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   └── ToastContainer.jsx
│   │   ├── context/            # React context providers
│   │   │   ├── SavedRecipesContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── pages/              # Route views
│   │   │   ├── AddRecipe.jsx
│   │   │   ├── EditRecipe.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   └── Recipes.jsx
│   │   ├── services/
│   │   │   └── api.js          # Axios instance and request interceptors
│   │   ├── utils/
│   │   │   ├── constants.js    # Cuisines, categories, and editorial copy
│   │   │   └── helpers.js      # Unit formatting, image handlers, and time formatters
│   │   ├── App.jsx             # Main layout and route configuration
│   │   ├── index.css           # Design tokens, custom utility classes, and base styles
│   │   └── main.jsx            # React DOM entry point
│   ├── index.html              # Document head, fonts, and zero-flash theme loader
│   ├── tailwind.config.js      # Custom colors, typography, and shadow definitions
│   └── vite.config.js
│
├── server/                     # Backend Node.js + Express API
│   ├── config/
│   │   ├── db.js               # Database connection and persistence configuration
│   │   └── localDb.js          # File-persisted local database engine
│   ├── controllers/            # Route controllers
│   │   ├── commentController.js
│   │   ├── ratingController.js
│   │   └── recipeController.js
│   ├── middleware/             # Express middlewares
│   │   ├── errorHandler.js     # Centralized error handler
│   │   └── upload.js           # Multer configuration for cover photos
│   ├── models/                 # Mongoose schemas
│   │   ├── Comment.js
│   │   ├── Rating.js
│   │   └── Recipe.js
│   ├── routes/                 # Express route definitions
│   │   ├── commentRoutes.js
│   │   └── recipeRoutes.js
│   ├── services/
│   │   └── imageService.js     # Image file deletion and cleanup
│   ├── data/                   # Persistent database storage directory (db.json)
│   ├── uploads/                # User-uploaded recipe photography
│   ├── seed.js                 # Seeder script (123 system recipes)
│   ├── server.js               # Express application entry point
│   └── package.json
│
├── LICENSE
├── package.json                # Root package orchestration scripts
└── README.md
```

---

## License

This project is licensed under the MIT License.
