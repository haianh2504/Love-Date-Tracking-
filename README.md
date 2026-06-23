<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/8a9cc6c0-d46a-4e29-8840-146c946d1f5a

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and fill the Firebase values.
   - Keep `.env` local only; do not commit it to Git.
   - If you want to use Gemini, also set `GEMINI_API_KEY` in `.env`.
3. Run the app:
   `npm run dev`

## Notes

- Firebase config uses Vite env vars beginning with `VITE_`.
- `measurementId` is optional for Firebase analytics.
- `.env.example` is safe to commit; `.env` is ignored by `.gitignore`.
