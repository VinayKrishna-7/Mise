# Mise

A recipe discovery and cooking web app built with React, Node.js, and Express. Browse dishes across different cuisines, scale ingredients by serving size, and follow along with a step-by-step cooking mode.

## Features

- **Search & Filters**: Search dishes by name or ingredients. Filter by category, cuisine, difficulty, and cooking time.
- **Cooking Mode**: Fullscreen step-by-step cooking view with an ingredient drawer and step navigation.
- **Serving Scaler**: Adjust servings up or down with automatic ingredient quantity recalculation.
- **Ingredient Checklist**: Check off ingredients as you prep (persisted in local storage).
- **Save Recipes**: Bookmark recipes to access them quickly from the navigation bar.
- **Add & Edit Recipes**: Upload cover photos, add structured ingredients and steps, and edit your dishes.
- **Ratings & Comments**: Rate dishes from 1 to 5 stars and leave comments.
- **Dark Mode**: Toggle between light and dark themes.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Lucide Icons
- **Backend**: Node.js, Express, Multer
- **Database**: MongoDB / Local JSON fallback (runs without database setup)
- **Testing**: Node.js native test runner (`node:test`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VinayKrishna-7/Mise.git
   cd Mise
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Start the application:
   ```bash
   npm run dev
   ```
