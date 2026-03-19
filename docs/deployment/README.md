# Deployment Notes

## Current State

- No automated deployment workflows.
- Web app is Vite-based and can be built as static assets.
- API is a Node/Express service with Prisma/PostgreSQL.

## Suggested Deployment Shape (When Ready)

- Web: static hosting (Vercel, Netlify, or CDN-backed host).
- API: Node service (Render, Railway, Fly.io, or containerized VM).
- Database: Managed PostgreSQL.

## Required Environment Variables

- `DATABASE_URL` (API)
- `API_PORT` (API)
- `OUTPUT_DIR` (API)
- `VITE_API_BASE_URL` (Web)

## Next Steps

- Decide hosting providers.
- Add staging deploy pipeline and secrets.
- Add migration/seed workflow for Prisma.