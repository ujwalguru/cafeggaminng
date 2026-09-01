# Production live-data diagnosis

The deployed Airavoto service at `https://airavotoheadcli.onrender.com/api/directory` responds successfully and contains live PC and PS5 availability.

The exact Vercel URL `https://cafeggaminng-airavoto-pos.vercel.app/` still renders the static catalog. In the live browser, `fetch('/api/live-cafes')` returns HTTP 200 with `content-type: text/html` and a 1,401-byte HTML document, not JSON. This is the SPA fallback, confirming that the deployed Vercel project is not applying the repository rewrite for `/api/live-cafes`.

The homepage's deployed output therefore cannot receive live data and continues to show the bundled defaults. The robust fix is to make the frontend call the Airavoto Render URL directly, with a configurable `VITE_AIRAVOTO_API_URL` and a safe default of `https://airavotoheadcli.onrender.com`, while retaining the rewrite/proxy configuration for deployments where it is supported.
