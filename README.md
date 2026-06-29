# Bora Orneles — Frontend

Frontend web app for managing customers and travel plans.

This project is built with **React**, **Vite**, and **React Router DOM**. It connects to the backend API running at `http://127.0.0.1:5001` and provides pages for:

- customer registration
- travel plan creation
- client management
- travel plan review
- client-specific travel actions

## Prerequisites

- Node.js 18+ and npm
- Backend service running separately at `http://127.0.0.1:5001`

## Local setup

Install dependencies from the project root:

```bash
npm install
```

## Run the app

Start the development server:

```bash
npm run dev
```

Open the app in the browser at the URL shown by Vite, typically:

- `http://127.0.0.1:5173`

## Build for production

Compile the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Main React app with routes and page components |
| `src/main.jsx` | App entry point for Vite |
| `src/index.css` | Shared stylesheet and UI styling |
| `images/` | Static assets used by the UI |
| `index.html` | Vite HTML template |

## Notes

- The app assumes the backend API endpoints are available at `http://127.0.0.1:5001`.
- If the backend is not running, customer and travel-plan operations will fail.
- Use the backend README in `../MVP2_backend/README.md` for backend setup details.
