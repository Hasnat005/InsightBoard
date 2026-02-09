# InsightBoard

## Overview
InsightBoard is a production-ready hiring analytics dashboard built with the Next.js App Router. It delivers KPI summaries, pipeline performance, and cohort insights with a polished, accessible UI and responsive layout.

## Features
- KPI overview with loading, empty, and error states
- Interactive charts (line, bar, pie) powered by Recharts
- Filterable reporting window and user segment controls
- Responsive layout with sidebar navigation and mobile drawer
- Accessible UI patterns with focus states and ARIA support
- Optimized rendering using memoization and dynamic imports

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- Recharts
- Axios (API client scaffold)

## Architecture Decisions
- App Router for routing and layout composition
- Feature-oriented structure with shared UI primitives
- Zustand for lightweight global state and async data fetching
- Dynamic import for charts to avoid SSR rendering issues
- Service layer to separate data access from UI components
- Typed domain models in a dedicated types folder

## Setup Instructions
Requirements:
- Node.js 18+ (recommended 20+)

Install and run:
1. `npm install`
2. `npm run dev`
3. Open http://localhost:3000

Useful scripts:
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — run lint checks

## Deployment to Vercel
1. Push the repository to GitHub.
2. In Vercel, click New Project and import the repository.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output: `.next` (auto-detected).
6. Click Deploy.

## Screenshots
- Dashboard overview:
	![Dashboard overview](/public/screenshots/overview.png)
- KPI grid:
	![KPI grid](/public/screenshots/kpis.png)
- Charts section:
	![Charts section](/public/screenshots/charts.png)
