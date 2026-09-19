# Revo Website

Next.js site for [Revo Trading](https://revo.qa/) — eco-friendly packaging supply (aligned with industry packaging catalogue content) with:

- public multilingual pages (`/en`, `/ar`) with rich packaging content
- admin CMS at `/admin` (English + Arabic for all copy, images, products, solutions, FAQs)
- optional PostgreSQL (Prisma)
- SMTP contact form

## Setup

```bash
npm install
cp .env.example .env.local
npm run db:generate
npx prisma db push
npm run db:seed
npm run dev
```

Open:

- Site: http://localhost:3000/en
- Arabic: http://localhost:3000/ar
- Admin: http://localhost:3000/admin?locale=en (switch to `ar` for Arabic edits)

## Staging / Production (Cloudflare)

- Staging branch `staging` → `revo-staging`
- Production only after approval

```bash
npm run cf:deploy:staging
```
