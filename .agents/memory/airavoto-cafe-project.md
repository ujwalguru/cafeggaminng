---
name: Airavoto Cafe project
description: Project direction, key files, data shape, and route map for the Airavoto Cafe gaming-cafe discovery platform.
---

The project was pivoted from a POS marketing site to a gaming-cafe finder platform called "Airavoto Cafe."

**Routes (App.tsx):**
- `/` → `src/pages/home.tsx` — hero search bar, categories, featured cafes, how-it-works, cities CTA
- `/cafes` → `src/pages/cafes.tsx` — listing with sidebar filter (city/game type/open-now), sort, compact search bar
- `/cafes/:slug` → `src/pages/cafe-detail.tsx` — full detail: hero banner, amenities, gallery, pricing, hours, reviews, sticky sidebar
- `/list-cafe` → `src/pages/list-cafe.tsx` — owner submission form with confirmation panel
- `/blog`, `/blog/:slug` — carried from original POS site
- 404 → `src/pages/not-found.tsx`

**Data layer:** `src/lib/cafes.ts` — 8 mock `Cafe` objects with full attributes (slug, rating, isOpen, pricePerHour, categories, amenities, plans, reviews, gallery images from Unsplash). Helpers: `searchCafes`, `getCafeBySlug`, `getFeaturedCafes`, `CITIES`, `CATEGORIES`.

**Key components:**
- `src/components/site/CafeCard.tsx` — card with image overlay, open/closed badge, category chips, star rating, amenity icons, ₹/hr price, Book Now CTA
- `src/components/site/SearchBar.tsx` — two variants: `hero` (large, full-width, city + game-type dropdowns) and `compact` (inline). Navigates to `/cafes?q=...&city=...&cat=...` by default, or calls `onSearch` prop.
- `src/components/site/Navbar.tsx` — updated to Airavoto Cafe branding (Gamepad2 icon, "Find Cafes" CTA, "List Your Cafe" secondary CTA).

**Why:** User asked to pivot the site from POS marketing to a gaming-cafe discovery platform.
**How to apply:** When adding new cafes, add to the `cafes` array in `src/lib/cafes.ts` following the `Cafe` interface. Real backend/DB integration would replace the static array with an API call.
