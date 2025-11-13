# Module 2 (Learn English) Setup

This document explains how to use the scaffold added for Module 2 (Learn English). The scaffold includes:

- SQL migration: `english-backend/migrations/001_create_module2_tables.sql`
- Content folder (markdown stubs): `english-backend/content/module-2/*.md`
- Seed helper: `english-backend/seed_module2.js`
- Backend scaffold routes: `english-backend/routes/module2.js` (exposes `/api/module2` endpoints)
- Frontend pages/components: `english-frontend/src/pages/Modules/LearnEnglish.jsx`, `src/components/Module2/*`

Notes
- The scaffold intentionally does not perform destructive DB migrations. Review the SQL and apply using your migration tooling (Sequelize CLI, psql, etc.).
- Media hosting is configured as S3 in design — implement S3 presigned upload endpoints and store S3 URLs in `lesson_sections.media_url`.

Quick steps

1. Review and apply migration:

   psql -d <your_db> -f english-backend/migrations/001_create_module2_tables.sql

2. Seed sample content (prints JSON):

   node english-backend/seed_module2.js

3. Start backend and frontend

   # backend
   cd english-backend
   npm install
   node app.js

   # frontend
   cd ../english-frontend
   npm install
   npm run dev

4. Browse to the Learn English page:

   http://localhost:5173/modules/learn-english

Next steps
- Replace markdown stubs with extracted content from your Module 2.docx file.
- Implement S3 upload endpoints or local uploads as desired.
- Wire seed script to insert into DB via Sequelize or pg client.
