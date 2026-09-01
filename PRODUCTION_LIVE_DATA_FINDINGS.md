# Production live-data diagnosis

The exact Vercel homepage now successfully displays cafés returned from Render: `oklp cafe`, `idk cafe`, `fgh cafe`, `op cafe`, and `GG Cafe`. The Render café `fgh cafe` shows `50 available`, with `PC 30/30` and `PS5 20/20`, confirming the direct Render request is working in production.

The direct route `/cafes/fgh-cafe` still returns the static catalog's 404 page because the detail page's lookup only checks the hard-coded `cafes` array. The next fix must make the detail route resolve a live café from the fetched Render snapshot instead of treating it as missing.
