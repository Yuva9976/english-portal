# Tutor Dashboard Manual Validation

This document records the manual verification steps for the `/tutor/dashboard` experience now that the UI, API, and supporting seeds/tests are in place.

## 0. Seed the sample data

Before running the frontend, populate the demo records:

1. `cd english-backend`
2. `node seed-tutor-data.js`
3. Confirm you see `✅ Tutor demo data ready.` in the console.

After the script runs you will have:
- One tutor (`tutor@test.com`, password `Password123`, role `tutor`).
- Two classrooms owned by that tutor, plus a scheduled session per class for today.
- Three learners (`learner1@test.com`, `learner2@test.com`, `learner3@test.com`) enrolled across the classes.
- Five class resources (mix of pdf/video/link) and ten resource views.
- A lesson, quiz, and three quiz attempts that average to **78%**.


## 1. Tutor login & dashboard verification

1. Start the backend (`npm run dev` in `english-backend`) and the frontend (`npm run dev` in `english-frontend`).
2. Point your browser to `/login`, log in using `tutor@test.com` / `Password123`.
3. The site should automatically redirect to `/tutor/dashboard`.
4. Verify the sections use real data (no skeletons or empty-state text):
   - **Today's Schedule** lists at least 1–2 classes with times and a `Join class` button.
   - **Key Stats** should show activeClasses=2, totalStudents=3, avg quiz score=78%, resources shared ≈ 5.
   - **Recent Activity** lists 3–5 resources, each showing view counts and last-updated timestamps.
   - **Notifications** surface 2–3 events (student joins, quiz submissions).
5. Confirm the refresh banner updates with `Last updated at …` after the initial request completes.
6. Capture a screenshot (browser viewport showing the four sections) as your “production-ready demo” evidence.

## 2. Role protection

1. Log out (if applicable) or open a private window.
2. Log in as one of the seeded learners, e.g., `learner1@test.com` / `Password123`.
3. Navigate to `/tutor/dashboard` manually.
4. Expect to be redirected away (e.g., to `/learner` or `/login`) because the learner role is not allowed.
5. Repeat the same manual visit and confirm you do **not** see any tutor content.

## 3. Backend error-handling test

1. With the dashboard open, stop the backend process (`Ctrl+C` in the server terminal).
2. Refresh `/tutor/dashboard` in the browser.
3. The dashboard should show an inline error banner (`Couldn't load tutor overview...`) with a retry button.
4. Restart the backend (`npm run dev`), click **Retry**, and confirm the overview data loads again without extra errors.

## 4. Expected production-ready "screenshot" results

When the data above is seeded and load succeeds, the dashboard should roughly match these values:
- Schedule: 1–2 cards for today with accurate start/end times and `Join class` CTAs.
- Stats: Active classes = 2, Total students = 3, Avg quiz score this week = 78%, Resources shared = 5.
- Recent Resources: At least 3–5 entries enriched by view counts (ranging from 1–3) and updated timestamps.
- Notifications: 2–3 entries (combining student joins + quiz submissions) sorted newest-first.

Use this document to validate the demo UI and ensure the `/tutor/dashboard` route is fully protected and resilient.