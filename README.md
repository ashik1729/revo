# Revo Website

Next.js site for [Revo Qatar](https://revo.qa/) with:

- public multilingual pages (`/en`, `/ar`)
- admin CMS panel at `/admin`
- optional PostgreSQL (Prisma) content database
- SMTP email for contact form submissions

Packaging product ranges are adapted from industry catalogue content (eco, bagasse, kraft, aluminium, hygiene, and more) while keeping Revo Qatar branding and services.

## 1) Setup environment variables

Create `.env.local` based on `.env.example`.

## 2) Setup database (optional)

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
```

## 3) Start local development

```bash
npm run dev
```

## Staging / Production (Cloudflare)

- Staging branch: `staging` → Worker `revo-staging`
- Production: `main` → Worker `revo` (deploy only after approval)

```bash
npm run cf:deploy:staging
```
