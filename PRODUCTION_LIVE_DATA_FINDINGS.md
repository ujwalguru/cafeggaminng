# Production live-data diagnosis

The exact Vercel homepage is now live-data backed: it displays `oklp cafe`, `idk cafe`, `fgh cafe`, `op cafe`, and `GG Cafe`, with `fgh cafe` showing `PC 30/30` and `PS5 20/20`.

The exact detail URL `/cafes/fgh-cafe` still shows the static 404 page. Its browser-loaded JavaScript asset is `assets/index-CvftZxgS.js`, the same asset fingerprint produced by the earlier homepage live-data build, while the latest local detail-fix build produced `index-BkywOnVp.js`. The detail fix commit `c818b4e` has not been deployed to this Vercel domain yet, even though the homepage commit `8aa7d46` is active. The next action is to ensure Vercel deploys the latest `main` commit for the exact project/domain.
