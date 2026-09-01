# Production live-data diagnosis

The deployed Airavoto service at `https://airavotoheadcli.onrender.com/api/directory` responds successfully and contains live PC and PS5 availability.

The exact Vercel URL `https://cafeggaminng-airavoto-pos.vercel.app/` is reachable, but the homepage still shows the static catalog (`HyperFrame Gaming`, `Arena Pro Gaming`, and `Neon Arena`). Directly opening `https://cafeggaminng-airavoto-pos.vercel.app/api/live-cafes` returns the Café Gaming 404 SPA page rather than JSON. This proves the Vercel rewrite is not active on the currently served production deployment, or the deployment is using a different project configuration than the repository's `vercel.json`.

The latest GitHub code includes a Render rewrite and homepage live fetching, but production behavior has not picked it up yet. The fix must therefore be deployed to the Vercel project configured for this exact domain, and the production deployment must be confirmed against commit `cd99a6a` or a later commit.
