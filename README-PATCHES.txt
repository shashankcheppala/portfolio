# Apply these patches

1) Replace your `src/Data/Constants.js` with the provided version (update your links).
2) Replace your `src/Data/Projects.js` with the provided version (add screenshots & links).
3) Swap your `src/Components/NavBar.js` with this version (accessibility + label fixes).
4) In `src/Components/ContactForm.js`, use this env‑based version (no hardcoded keys).
5) In `public/index.html`, paste the `head-snippet.html` content inside `<head>` (below existing tags).
6) Rename `src/Components/Experinces.js` -> `src/Components/Experiences.js` and update imports.

## .env (create at repo root)
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_USER_ID=your_public_key

## Build & Deploy
npm i
npm run build
# Deploy the /build to Vercel/Netlify
