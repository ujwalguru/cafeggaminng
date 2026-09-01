# Blank-page production finding

Opening `https://cafeggaminng-airavoto-pos.vercel.app/cafes/fgh-cafe` reproduces the user's blank black page. The page title is `Café Not Found`, but there are no visible DOM elements and no console output was captured by the browser session.

The homepage can load live Render cafés, so the failure is isolated to the direct live café detail route or the production asset currently served for it. The local source currently attempts to resolve a live café asynchronously after the first render; this needs a robust loading state and a safe live-café fallback so the route cannot render a blank page while the request is pending or malformed.
