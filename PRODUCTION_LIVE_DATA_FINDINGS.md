# Production live-data diagnosis

The deployed Airavoto service at `https://airavotoheadcli.onrender.com/api/directory` responds successfully and contains a live record such as `fgh-cafe`, with PC and PS5 availability. The Café Gaming Vercel configuration currently builds only the static frontend at `artifacts/airavoto-pos/dist` and rewrites every path to `/index.html`; it does not deploy the separate Express API server. Therefore the browser request to `/api/live-cafes` cannot reach the Café Gaming proxy and the UI silently falls back to the static catalog.

The homepage also still derives its cards from `getTopRated(6)` and had not yet been wired to the live snapshots, which explains why the screenshot showed the default featured cafés even after the backend integration was pushed.
