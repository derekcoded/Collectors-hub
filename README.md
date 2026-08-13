# Collector's Hub

A responsive React + TypeScript web app for collectors: browse a marketplace, discover community posts, and manage a personal collection across three lists (Owned, Wishlist, Selling).

## Setup Instructions

```bash
npm install
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check and produce a production build in dist/
npm run preview   # serve the production build locally
```

No environment variables, backend, or authentication are required — all data is mocked in `src/data/`.

## Project Structure

```
src/
  components/   Reusable UI: cards, search, filters, badges, empty/error/skeleton states, toasts
  context/      AppContext — global state for collections, likes, saves, toasts (persisted to localStorage)
  data/         Mock products and community posts
  hooks/        useAsyncData — simulates network loading/error states
  pages/        Marketplace, ProductDetail, CommunityFeed, PostDetail, MyCollection, NotFound
  types.ts      Shared TypeScript types
```

## Assumptions Made

- **No backend / no auth.** All "sellers" and "community users" are represented in static mock data; there's no login, so every visitor shares one anonymous identity for likes, saves, and collection actions.
- **"Add to Collection" defaults to the Owned list**, since the assignment's marketplace flow separates "Add to Collection" from "Add to Wishlist" as two distinct actions. "Selling" is populated only via the Move action inside My Collection, since nothing in the spec has users list items for sale directly from the Marketplace.
- **Duplicate prevention is scoped per list.** The same product can exist in Owned and Wishlist simultaneously (a real collector might own one copy and want another), but not twice within the same list.
- **Estimated Value** in My Collection is mocked as the item's marketplace price at the time it was added, since there's no real valuation service.
- **Simulated network behavior.** Data "fetches" have a short artificial delay and a small random failure rate (~5%) so loading and error states are visible and testable, with a retry action, rather than resolving instantly every time.
- **Filters persist via URL query parameters** (e.g. `?q=camera&category=Coins&sort=price-asc`) rather than global state, so browser back/forward and page refresh preserve the same filtered view, per the "maintain filters while navigating" requirement.
- Comments on community posts are read-only mock content (posting new comments wasn't in the functional requirements).

## Libraries Used

- **React 19** + **TypeScript**
- **React Router v7** — routing between modules and detail pages
- **Tailwind CSS v4** — styling, using a custom design token theme (see `src/index.css`)
- No external UI kit — components are hand-built to match a custom "curator's ledger" visual identity (specimen-tag cards, catalog numbering, brass/ink/paper palette).
- No additional state library — React Context + hooks was sufficient for this scope.

## Additional Features Implemented

Beyond the core functional requirements:

- **Local persistence** — collections, likes, and saves survive a page refresh via `localStorage`.
- **Debounced search** — search inputs wait 300ms after typing stops before filtering, avoiding excessive re-renders.
- **Skeleton loaders** for grids and detail pages while data "loads."
- **Simulated error states with retry** on every data-fetching view (Marketplace, Community Feed, Product Detail, Post Detail).
- **Toast notifications** for add/remove/move/save actions, so every interaction gives feedback.
- **Move item between collections** (Owned ↔ Wishlist ↔ Selling) with duplicate protection at the destination.
- **Responsive mobile navigation** with a collapsible menu.
- **Graceful missing-image handling** — listings/posts without an image show a labeled placeholder instead of a broken image icon.
- **Lazy-loaded images** (`loading="lazy"`) across product and post grids.
- **Accessible focus states and `aria-pressed`/`aria-label` attributes** on interactive controls (like, save, wishlist, mobile menu).

## Design Notes

The visual identity draws on the idea of a museum or auction-house **catalog**: parchment backgrounds, a serif display face (Fraunces) for titles, a monospace face (IBM Plex Mono) for prices and catalog numbers, and a "specimen tag" card treatment (dashed inner border) used consistently for marketplace listings, posts, and collection items.
