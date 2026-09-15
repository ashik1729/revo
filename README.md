# Realpack Website

Next.js site for [Realpack Packaging](https://realpackpackaging.com/) with:

- public multilingual pages (`/en`, `/ar`)
- admin CMS panel at `/admin`
- optional PostgreSQL (Prisma) content database
- SMTP email for contact form submissions

## 1) Setup environment variables

Create `.env.local` based on `.env.example`.

Required for contact email:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO` (defaults to `info@realpackpackaging.com`)

Optional:

- `DATABASE_URL` (without it, the site uses built-in Realpack fallback content)

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

Open:

- Website: [http://localhost:3000](http://localhost:3000)
- Admin CMS: [http://localhost:3000/admin](http://localhost:3000/admin)

## Staging / Production (Cloudflare)

- Staging branch: `staging` → Cloudflare Worker `realpack-staging`
- Production: `main` → Cloudflare Worker `realpack` (deploy only after approval)

```bash
npm run cf:build
npm run cf:deploy:staging
```
