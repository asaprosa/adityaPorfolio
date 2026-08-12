# Aditya Ghodke — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.
Design system matches the Framer "Majd" template: cream (`#faf7f3`) + near-black ink (`#111111`)
palette, Archivo typeface, oversized editorial typography, and a floating pill nav.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion (scroll-triggered reveal animations, scroll-scrubbed ink-reveal text)
- Resend (contact form email delivery)
- Groq / Gemini / Kimi / NVIDIA NIM (bring-your-own-key, for the Resume Builder tool)

## Content

All personal content lives in [`src/data/`](src/data/) — edit these files to update the site, no component changes needed:

- `personal.ts` — name, role, bio, contact links, hero headline words, footer statement, scroll-reveal manifesto text
- `skills.ts` — skill groups (rendered as the "Services"-style row list)
- `experience.ts` — work history, education, achievements
- `projects.ts` — project tiles

Photo/screenshot slots (`Placeholder` component) currently render a styled placeholder block —
swap in real assets by replacing `<Placeholder .../>` usages in `Hero.tsx`, `About.tsx`, and
`Projects.tsx` with `next/image`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 (Next.js will pick the next free port, e.g. 3001, if something else is
already on 3000).

**Don't run `npm run build` and `npm run dev` at the same time** — both write to the same `.next`
directory and will corrupt each other's cache. Stop the dev server first if you need to build.

### Contact form

The contact form (`/`, Contact section) sends email via [Resend](https://resend.com). Without an
API key it still renders and validates input, but submissions return a friendly "not configured"
error instead of sending.

Copy `.env.example` to `.env.local` and fill in:

```
RESEND_API_KEY=      # from https://resend.com/api-keys
CONTACT_TO_EMAIL=    # where messages should land
CONTACT_FROM_EMAIL=  # verified sender, or Resend's sandbox address
```

### Resume Builder (`/resume-builder`)

A public tool: visitors paste their own resume + a job description, pick an LLM provider, and
**bring their own API key**. No server-side API keys or accounts needed for this feature — the
key is kept in the visitor's browser `sessionStorage` and forwarded to the chosen provider for a
single request only (`src/app/api/resume-builder/route.ts` never logs or persists it). Supported
providers: Groq, Gemini, Kimi (Moonshot AI), NVIDIA NIM — adapters live in
`src/lib/resumeProviders.ts`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at https://vercel.com/new.
3. Add the contact-form environment variables (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CONTACT_FROM_EMAIL`) in the Vercel project settings. The Resume Builder needs no env vars —
   it's bring-your-own-key.
4. Deploy — Vercel auto-detects Next.js, no extra config needed.
"# adityaPorfolio" 
