# Helix Research Technologies website

helixresearchtech.com. Next.js 16 (App Router), React 19, Tailwind 4, TypeScript. Deployed on Vercel.

Full rebuild, 2026-09-29, from the competitor research and ADR-001 in Helix-Vault (`Business/`). Positioning: AI agents for lab, medical, and B2B supply companies. Hero is the lead form. Every lead lands in GoHighLevel.

## Run it

```bash
npm ci
cp .env.example .env.local   # fill what you have, everything is optional for local dev
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
npm run lint
```

Node 22 or newer.

## Push to a new repo

```bash
git remote add origin https://github.com/ronlenserdigital/helix-website.git
git push -u origin main
```

Then in Vercel: New Project, import the repo, framework Next.js, root `.`, no build overrides. Add the env vars below. Point `helixresearchtech.com` at the new project (Cloudflare DNS: CNAME to `cname.vercel-dns.com`). Vercel Hobby is non-commercial; use Pro.

## Env vars (Vercel > Settings > Environment Variables)

| Key | Needed for | Notes |
|-----|-----------|-------|
| `GHL_API_KEY` | Leads into GHL | Private integration token, contacts.write scope |
| `GHL_LOCATION_ID` | Leads into GHL | Sub-account location id |
| `GHL_FIELD_NEED_ID`, `GHL_FIELD_BUDGET_ID`, `GHL_FIELD_MESSAGE_ID` | Optional | Custom field ids; without them need/budget go in as tags and the message as a note |
| `NEXT_PUBLIC_GHL_CALENDAR_URL` | Calendar on /contact | Booking widget URL, white-label domain if you have one |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL` | Optional email copy of each lead | Resend account, verified sending domain |
| `NEXT_PUBLIC_GTM_ID` | Analytics | GTM container; GA4 tag inside it |

With no env vars set the site still builds and runs. The form returns ok, logs the lead to the server console, and redirects to /contact. Do not launch like that.

## Edit map (copy lives in data, not components)

| Change | File |
|--------|------|
| Phone, email, city, hours, socials, stats, guarantee, calendar note | `src/data/site.json` |
| Services (names, bullets, deliverables, timelines) | `src/data/services.json` |
| Industry pages (signals, use cases, FAQ) | `src/data/industries.json` |
| Results / case studies | `src/data/cases.json` |
| FAQ | `src/data/faq.json` |
| Pricing tiers, budget tiers, project shapes | `src/data/pricing.json` |
| Comparison tables and compare pages | `src/data/compare.json` |
| Founders (names, roles, credentials, LinkedIn, photos) | `src/data/founders.json` + `public/founders/` |
| Tool / partner badges in the marquee | `src/data/badges.json` |
| Hero headline and subhead | `src/components/hero.tsx` |
| Homepage section order | `src/app/page.tsx` |
| All reusable sections | `src/components/sections.tsx` |
| Design tokens, buttons, glass, animations | `src/app/globals.css` |
| Lead API (GHL, email, rate limit, honeypot) | `src/app/api/lead/route.ts` |
| JSON-LD | `src/components/json-ld.tsx` |
| OG image | `src/app/opengraph-image.tsx` |
| Sitemap, robots, llms.txt | `src/app/sitemap.ts`, `src/app/robots.ts`, `public/llms.txt` |

Any value containing `TODO` in the data files is hidden on the site automatically (`isTodo()` in `src/lib/data.ts`). Replace the value and it appears. Nothing with TODO ever renders.

## Before launch (the 10 fields)

1. `site.json`: `phone`, `phoneDisplay`, `socials.linkedin`, `calendarUrl` (or the env var), `guarantee` (set `enabled: true` once wording is agreed).
2. `founders.json`: Martin's 3 credentials + LinkedIn, third founder's name, role, credentials, LinkedIn. Drop real photos in `public/founders/` as `ron.jpg`, `martin.jpg`, `steen.jpg` and update the `photo` paths.
3. `pricing.json`: audit `price` (currently `TODO`, renders as "Priced").
4. `cases.json`: replace the three placeholder entries with real ones and set `status` to `"published"`. Until then they render as target outcomes with a visible label.
5. Vercel env vars above.
6. Run `npm run build`, then `grep -r "TODO" src/data` should return only fields you intend to leave hidden.

## Routes

```
/                          home
/services, /services/[slug]
/industries/[slug]         lab-supply, medical-supply, distributors
/work, /work/[slug]        results
/pricing
/compare/[slug]            chatbot-vs-ai-agent, helix-vs-hiring, helix-vs-freelancer, helix-vs-diy-ghl
/about, /contact, /privacy, /terms
/api/lead                  POST
/sitemap.xml, /robots.txt, /llms.txt, /opengraph-image
```

## Not in v1 (next)

Blog (MDX), `/tools/quote-audit`, `/demo` with the live Helix agent, testimonials block, migration pages. All slots exist in the ADR.
