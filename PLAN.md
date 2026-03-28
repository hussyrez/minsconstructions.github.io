# Mins Constructions — Project Plan

## Overview

Static website for **Mins Constructions**, a licenced rendering company in South East Melbourne. Built with Bootstrap 5.3.8 (CDN), hosted on GitHub Pages.

## Pages

### Home (`index.html`)
- **Sticky hero** with company name, lead paragraph targeting "Melbourne rendering services" and "licenced renderers"
- **Hero box** (white border, rounded corners) with 2-column feature list and two CTA buttons (Call Now + Get a Free Quote, stack on mobile)
- **Parallax photo** (`photos/site/home_page.jpg`) — full image, scrolls over sticky hero via `.content-overlay` wrapper
- **Interactive services section** — 3 numbered service cards (left) with expandable detail panel (right), scroll-triggered animation via IntersectionObserver:
  1. Cement & Acrylic Rendering
  2. Texture Coating & Finishes
  3. Repairs & Cladding
- **Why Choose Us** — 3-column value proposition section (Licenced & Insured, Quality Materials, Free Quotes)
- **Gallery reel** — horizontal scrollable photo strip with 13 project photos, click-to-open lightbox modal with keyboard/swipe navigation. Driven by `photos/gallery/manifest.json`
- **FAQ accordion** — 6 questions with Bootstrap accordion, matching FAQPage schema for featured snippets
- **Service Areas grid** — 22 suburbs listed in a 4-column grid with CTA button
- **Schema.org structured data**: LocalBusiness, WebSite, BreadcrumbList, FAQPage

### About Us (`about.html`)
- **Dark hero** — matches homepage gradient background, Instrument Serif H1 with orange accent, animated accent line
- **Company story** — 3 paragraphs about the team, approach, and values
- **Feature cards** — 3 horizontal cards (Proven Experience, Quality Craftsmanship, Premium Materials) with orange accent lines and hover lift
- **Project showcase** — 4-photo grid on dark gallery-section background (Berwick, Hampton, Warragul)
- **Rendering services detail** — 4 technique cards (Smooth, Textured, Pigmented Finish, Membrane Colouring)
- **Why Choose Us** — 6 items in 2 columns with orange checkmarks
- **Customer reviews** — auto-scrolling carousel (6 reviews, duplicated for seamless loop, pauses on hover)
- **Dark CTA section** — "Ready to Get Started?" on dark gradient background

### Contact (`contact.html`)
- **Dark hero banner** — "Get In Touch" heading
- **Form (left, col-lg-7)** — Name, Phone, Email, Suburb, Service dropdown, Message, full-width submit button inside shadow card
- **Details (right, col-lg-5)** — Contact details card with orange circle icons + "Prefer to Call?" dark card with Call Now button
- **Web3Forms** integration (free, 250 submissions/month)

## Tech Stack

- HTML5, CSS3, vanilla JavaScript
- Bootstrap 5.3.8 via CDN (CSS + JS bundle)
- No build tools, no frameworks, no server-side code
- GitHub Pages hosting from main branch root

## Folder Structure

```
minscons/
├── index.html, about.html, contact.html
├── css/custom.css
├── js/gallery.js
├── photos/gallery/          (project photos + manifest.json)
├── photos/site/             (site asset images)
├── images/                  (logo, favicon)
├── PLAN.md, STYLE.md, DEPLOYMENT.md, note.txt, LICENSE
├── robots.txt, sitemap.xml
└── .gitignore
```

## SEO

- Keyword-optimised titles, meta descriptions, Open Graph tags on all pages
- Schema.org JSON-LD on home page: LocalBusiness, WebSite, BreadcrumbList, FAQPage
- Canonical URLs, geo meta tags (AU-VIC)
- `robots.txt` + `sitemap.xml`
- FAQ section with accordion UI + matching FAQPage schema (targets featured snippets)
- Service Areas section with 22 suburb names for local keyword coverage
- Expanded areaServed in LocalBusiness schema (22 suburbs including Melbourne)
- Target keywords: Melbourne rendering services, renderers Melbourne, rendering company Melbourne, cement rendering Melbourne, acrylic rendering Melbourne, rendering specialists Melbourne, rendering contractors Melbourne

## Before Going Live

See `note.txt` for the pre-launch checklist and `DEPLOYMENT.md` for GitHub Pages setup instructions.

## Reference Files

- `STYLE.md` — complete design system, component patterns, and conventions for future edits
- `DEPLOYMENT.md` — step-by-step GitHub Pages hosting guide
- `LICENSE` — All Rights Reserved, no copying or reuse permitted
