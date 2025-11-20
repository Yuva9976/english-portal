# How to Start the Frontend

## Quick Start

Navigate to the frontend folder and run:

```bash
cd english-frontend
npm install
npm run dev
```

## What to expect:

- **Vite dev server** will start (by default on port **5173**, NOT 3000)
- Open your browser and go to: **http://localhost:5173**
- You should see the Home page with:
  - Hero section
  - Featured Topics
  - Latest Lessons
  - Testimonials
  - Sidebar with quick links

## Troubleshooting:

### Issue: Nothing shows at http://localhost:3000
- **Solution**: The server is running on **5173** by default. Go to **http://localhost:5173** instead.

### Issue: Port 5173 doesn't respond
- **Check if Vite is running**: Look for a terminal window with "VITE v5.x.x ready in X ms"
- **If not running**: Run `npm run dev` in the `english-frontend` folder

### Issue: Blank white page or errors in console
- **Check browser console** (F12 or right-click > Inspect > Console)
- **Common issue**: Backend not running
  - Make sure backend is running on http://localhost:4000
  - Check that `apiClient.js` has correct baseURL

### To change port to 3000:

Edit `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // ← already set to 3000
  }
})
```

If set to 3000 and still nothing shows:
1. Kill any process on port 3000: `netstat -ano | findstr :3000`
2. Restart: `npm run dev`
3. Visit: http://localhost:3000

## Backend Requirements:

Make sure the backend is also running:

```bash
cd english-backend
npm install
npm start
```

Backend should be on: http://localhost:4000
