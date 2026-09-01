# Airavoto → Café Gaming Live Availability

The two repositories are connected through a server-side proxy. Airavoto receives café heartbeats at `POST /api/directory/heartbeat` and exposes persisted public snapshots through `GET /api/directory`. The Café Gaming API server exposes the same data to the website at `GET /api/live-cafes`, so the browser never needs to know the Airavoto Render URL.

## Deployment configuration

| Service | Variable | Value |
| --- | --- | --- |
| Airavoto on Render | `DATABASE_URL` | The production PostgreSQL connection string. This keeps heartbeats available after a restart. |
| Airavoto on Render | `CORS_ORIGINS` | The Café Gaming website origin, for example `https://cafe.example.com`. Multiple origins may be comma-separated. |
| Café Gaming API server | `AIRAVOTO_API_URL` | `https://airavotoheadcli.onrender.com` |
| Café Gaming Vercel frontend | `VITE_AIRAVOTO_API_URL` | `https://airavotoheadcli.onrender.com` |

The Vercel deployment is a static frontend. The frontend now calls `${VITE_AIRAVOTO_API_URL}/api/directory` directly, defaulting to `https://airavotoheadcli.onrender.com`; set `VITE_AIRAVOTO_API_URL` in Vercel if you want to override it. The repository also keeps a `vercel.json` rewrite as a fallback for `/api/live-cafes`. After pushing changes, redeploy the Vercel project. If Café Gaming is deployed with its separate Express API server instead, set `AIRAVOTO_API_URL` there and use that proxy.

## Frontend behavior

The Café Gaming homepage, listings page, and café detail page refresh the live snapshot every 15 seconds. Public catalog responses are filtered to `status: online` and `is_stale: false`, so cafés marked offline, suspended, or stale are hidden. There is no static café fallback in public results. The detail page uses the Airavoto `availability` array for PC and PS5 totals and uses the nested `seats`/`seatAvailability` values for the station modal. If the live service is unavailable, public pages show an empty/loading state rather than presenting hard-coded café data as current.

New cafés that Airavoto registers are also included in the Café Gaming listings automatically when their live snapshot contains a name and slug.

## Expected heartbeat shape

The existing Airavoto POS client can send a payload like this:

```json
{
  "slug": "hyperframe-gaming-bangalore",
  "cafe": {
    "name": "HyperFrame Gaming",
    "city": "Bangalore",
    "area": "Koramangala",
    "address": "12, 80 Feet Rd",
    "categories": ["PC", "Console"],
    "phone": "+91 80400 91234"
  },
  "availability": [
    {
      "category": "PC",
      "total": 40,
      "available": 12,
      "seats": [
        { "id": "PC-01", "label": "PC 01", "available": true },
        { "id": "PC-02", "label": "PC 02", "available": false, "occupiedUntil": "8:30 PM" }
      ]
    },
    {
      "category": "PS5",
      "total": 10,
      "available": 4,
      "seats": []
    }
  ],
  "capturedAt": "2026-09-01T12:00:00.000Z"
}
```

The website treats `category`, `type`, `name`, and `platform` as device descriptors. Values containing `PS5` or `PlayStation` are shown as PS5; values containing `PC` or `Computer` are shown as PC.

## Changed files

Airavoto changes are in `server.ts`, `db.ts`, and `.env.example`. Café Gaming changes are in `artifacts/api-server/src/routes/live-cafes.ts`, `artifacts/api-server/src/routes/index.ts`, `artifacts/api-server/.env.example`, `artifacts/airavoto-pos/src/lib/live-cafes.ts`, `artifacts/airavoto-pos/src/pages/cafes.tsx`, `artifacts/airavoto-pos/src/pages/cafe-detail.tsx`, `artifacts/airavoto-pos/src/components/site/CafeCard.tsx`, and the existing static catalog correction in `artifacts/airavoto-pos/src/lib/cafes.ts`.
