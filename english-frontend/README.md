# English Learning Frontend (React + Tailwind)

This is a scaffolded React (JavaScript) frontend for your English Learning app.
It assumes your backend runs at http://localhost:5000 and exposes the API routes described.

## Quick start

1. Install dependencies
   ```bash
   cd english-frontend
   npm install
   ```

2. Start dev server
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000`

## Notes
- API client is in `src/apiClient.js`. It uses baseURL `http://localhost:5000/api`.
- Token (if returned as `res.data.token`) is saved to `localStorage` and attached to requests.
- Protected routes redirect to `/login` when no token present.
- Tailwind is configured; run `npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch` is not necessary because Vite + PostCSS will process it.

