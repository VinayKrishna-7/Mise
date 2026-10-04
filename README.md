# MISE — The Kitchen Journal

> An editorial recipe discovery and cooking journal built with React 18, Express 4, Node.js, and Tailwind CSS.

[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A518.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)

**MISE** is an open culinary platform featuring a curated database of 123 recipes, dynamic servings recalculation, interactive cooking checklists, full-text search, and anonymous recipe publishing.

---

## Highlights

* **Search & Autocomplete**: Debounced full-text search and real-time query suggestions across titles, ingredients, cuisines, and tags.
* **Smart Filtering**: Multi-criteria filters for category, cuisine, difficulty, and cooking time (including 72 quick meals under 30 minutes).
* **Interactive Cooking**: Dynamic servings scaler (`− / +`), strike-through ingredient checklists, and distraction-free Cooking Mode.
* **Local Bookmarks**: Instant client-side recipe saving without requiring an account.
* **Protected System Archive**: 123 foundation recipes pre-seeded with server-enforced immutability (`403 Forbidden` on mutation).
* **Author Authorization**: Anonymous recipe creation secured via browser-held cryptographic creator tokens (`x-creator-token`).
* **Ratings & Comments**: 1-to-5 star ratings with duplicate-submission guards and recipe discussions.
* **Theme System**: Zero-flash dark and light modes with system preference persistence.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 4, Tailwind CSS 3, React Router 6, React Hook Form, Lucide Icons |
| **Backend** | Node.js, Express 4, Helmet, CORS, Multer |
| **Data Layer** | Mongoose 7 / Local Persistent JSON Engine (runs out-of-the-box without setup) |
| **CI & Testing** | GitHub Actions, Node.js Native Test Runner (`node:test`) |

---

## Quick Start

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### 1. Clone & Install
```bash
git clone https://github.com/VinayKrishna-7/Mise.git
cd Mise
npm run install:all
```

### 2. Run Locally
```bash
npm run dev
```

* **Frontend**: [`http://localhost:5173`](http://localhost:5173)
* **Backend API**: [`http://localhost:5000`](http://localhost:5000) (Health check: `http://localhost:5000/api/health`)

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts both backend API and frontend client concurrently |
| `npm run server` | Runs the Express backend with hot-reload (`PORT=5000`) |
| `npm run client` | Runs the Vite frontend development server (`PORT=5173`) |
| `npm test` | Runs the automated API smoke and integrity test suite |
| `npm --prefix client run build` | Builds the production client bundle |
| `npm run seed` | Reseeds the database with 123 foundation recipes |

---

## Project Structure

```text
Mise/
├── .github/workflows/    # CI automation (Node.js 18 & 20 matrix)
├── client/               # React 18 + Vite frontend
│   ├── public/           # Favicon assets & manifest
│   └── src/
│       ├── components/   # Modular UI components
│       ├── context/      # Theme, bookmark, and toast state
│       ├── pages/        # Route views (Home, Recipes, Details, etc.)
│       └── services/     # Axios client configuration
├── server/               # Express API backend
│   ├── config/           # Database persistence layer
│   ├── controllers/      # Route handlers
│   ├── data/             # Persistent JSON datastore (db.json)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # REST endpoints
│   └── test/             # Native Node.js API smoke tests
├── CONTRIBUTING.md       # Open-source contribution guide
├── LICENSE               # MIT License
└── README.md
```

---

## Contributing

Contributions and feedback are welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for local setup, standards, and pull request procedures.

---

## License

This project is licensed under the [MIT License](LICENSE).
