# Mins Constructions — Style & Development Guide

This document defines the design system, conventions, and patterns used across the website. Follow this guide for all future edits to maintain consistency.

## Brand Colours

| CSS Variable | Hex | Usage |
|---|---|---|
| `--mc-primary` | `#e77f24` | Buttons, accent text, icons, links, service numbers, gallery arrows |
| `--mc-dark` | `#1a1a2e` | Hero backgrounds, gallery section, dark sections |
| Bootstrap `bg-dark` | `#212529` | Navbar, footer |
| Bootstrap `bg-light` | `#f8f9fa` | Alternating section backgrounds |
| White | `#ffffff` | Default section backgrounds, cards |

## Typography

- **No web fonts** — system font stack via Bootstrap default
- Headings: Bootstrap default weights (`fw-bold` for hero H1)
- Body: Bootstrap default (`1rem`)
- Use `.text-accent` class for orange-coloured text

## CSS Architecture

- **One file**: `css/custom.css` linked after Bootstrap CDN
- All custom styles use `.class` selectors — no IDs for styling
- CSS variables defined in `:root` — always use variables, never hardcode hex
- Keep it minimal — Bootstrap classes handle layout, spacing, grid

## Layout Conventions

### Shared Across All Pages
- **Navbar**: `.navbar-dark .bg-dark .sticky-top` with `container` inside
- **Active link**: `class="nav-link active" aria-current="page"` on current page
- **Footer**: `.bg-dark .text-light .py-4` — copyright + tagline, centred

### Section Alternation Pattern
Alternate section backgrounds for visual separation:
```
Dark hero → White section → Light grey section → White section → ...
```
Use `bg-white`, `bg-light`, or no class (default white). The gallery section uses `gallery-section` (dark navy) as a dramatic break in the pattern.

### Container Pattern
Every section uses:
```html
<section class="py-5 bg-light">
  <div class="container">
    <h2 class="text-center mb-4">Section Heading</h2>
    ...
  </div>
</section>
```

## Component Patterns

### Interactive Services (Home page)
- `.services-split` — flex container (left cards 38%, right detail panel), scroll-triggered via IntersectionObserver
- `.svc-card` — numbered cards (01, 02, 03) with orange left border on active state, staggered slide-in animation
- `.svc-detail` — detail panel with description, checkmark list, CTA button; switches on card click with fade animation
- Cards slide in from left, detail slides in from right when section enters viewport
- Responsive: stacks vertically on mobile (`flex-direction: column` at 768px)

### Gallery Reel (Home page)
- `.gallery-section` — dark navy background for photo contrast
- `.greel` — horizontal scrollable strip with `scroll-snap-type: x mandatory`, hidden scrollbar
- `.greel-slide` — 320×260px cards with `object-fit: cover`, rounded corners, location caption overlay
- `.greel-arrow` — circular nav buttons, auto-hide at scroll edges, orange on hover
- Hover effect: card scales 1.03, image scales 1.06, shadow lifts
- Click opens lightbox modal (`.gmodal`)

### Gallery Modal Lightbox
- `.gmodal` — fixed fullscreen overlay with dark backdrop + `backdrop-filter: blur(12px)`
- `.gmodal-body` — centred image with `object-fit: contain`, scale-up entry animation
- Navigation: left/right arrows (loop), close button, keyboard (arrows + Escape), touch swipe
- Image transitions: opacity + scale crossfade on nav (180ms delay)
- Responsive: larger image area on mobile, smaller nav buttons

### Contact Icons
- 44x44px orange circle: `.contact-icon`
- Flexbox centred, `min-width: 44px`

### Buttons
- Primary: `.btn-primary` — orange (`--mc-primary`), darker on hover
- Outline: `.btn-outline-light` — white border, fills on hover
- Full-width: add `.w-100`
- Large: `.btn-lg`
- Side-by-side on desktop, stacked on mobile: `col-12 col-sm-6` with `w-100`

### Hero Sections
- Home: `.hero` — sticky, dark gradient background, Instrument Serif H1 with animated fade-up, glassmorphism `.hero-box`, orange accent line
- About: `.about-hero` — same dark gradient as homepage but not sticky, Instrument Serif H1, also reused for the dark CTA section at page bottom
- Contact: `.contact-hero` — dark navy, centred text, no sticky
- All hero variants use `padding: 3.5-5rem 0`

### Feature Cards (About page)
- `.feature-card` — white card with subtle shadow, hover lift (`translateY(-4px)`), generous padding
- `.feature-accent` — 40px orange line at top of each card
- 3 cards in a row on desktop (`col-md-4`), stacked on mobile
- Used for: Proven Experience, Quality Craftsmanship, Premium Materials

### Project Photo Grid (About page)
- `.about-photo` — `object-fit: cover` at 200px height, hover scale (1.03)
- 4 photos in a row on desktop (`col-md-3`), 2 per row on mobile
- Displayed on `.gallery-section` dark background for contrast

### Parallax Image (Home)
- `.content-overlay` wraps everything below hero (z-index: 1, bg-white)
- Hero is `position: sticky; top: 0; z-index: 0` — content scrolls over it
- Image uses `<img>` tag (not background-image) for full visibility, no cropping

### FAQ Accordion (Home)
- Bootstrap accordion (`#faqAccordion`) with `data-bs-parent` for single-open behaviour
- Each item: `.accordion-item .border-0 .mb-3 .shadow-sm .rounded`
- Questions use `<h3>` tags for SEO heading hierarchy
- Matches FAQPage schema in `<head>` — keep content in sync

### Review Carousel (About)
- Auto-scrolling left to right, pauses on hover
- Cards duplicated in HTML for seamless infinite loop
- `.review-scroll-wrapper` overflow hidden, `.review-scroll-track` flex + CSS animation
- `.review-card` fixed 300px width
- Stars: `&#9733;` (filled) `&#9734;` (empty), colour `#f5a623`

### "Why Choose Us" List
- Two columns (`col-md-6`)
- Each item: orange checkmark `&#10003;` + heading + description
- Uses `d-flex align-items-start` layout

## Folder Structure

```
minscons/
├── index.html              # Home: hero + parallax + services + why choose + gallery reel + FAQ + service areas
├── about.html              # About: welcome + after photos + services detail + why choose us + reviews + CTA
├── contact.html            # Contact: hero + form (left) + details (right)
├── css/
│   └── custom.css          # All custom styles
├── js/
│   └── gallery.js          # Gallery reel + lightbox modal logic
├── photos/
│   ├── gallery/            # Project photos + manifest.json
│   └── site/               # Site asset images (home_page.jpg etc.)
├── images/                 # Logo, favicon
├── PLAN.md                 # Project plan
├── STYLE.md                # This file
├── DEPLOYMENT.md           # GitHub Pages deployment instructions
├── note.txt                # Pre-launch checklist
├── LICENSE                 # All rights reserved
├── robots.txt              # SEO crawler config
├── sitemap.xml             # SEO sitemap
└── .gitignore              # .claude/, .DS_Store
```

## Adding New Gallery Photos

1. Drop the photo into `photos/gallery/`
2. Add an entry to `photos/gallery/manifest.json`:
   ```json
   {"file": "my_photo.jpg", "location": "Suburb Name"}
   ```
3. Photos can be any size or aspect ratio — they display with `object-fit: cover` in the reel and `object-fit: contain` in the modal
4. Commit and push

## Adding Site Images

Place in `photos/site/` — reference as `photos/site/filename.jpg`

## SEO Conventions

- Every page has: unique `<title>`, `<meta description>`, canonical URL, Open Graph tags
- Geo meta tags: `AU-VIC`, `South East Melbourne`
- `index.html` has Schema.org JSON-LD: `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`
- FAQ accordion content must stay in sync with FAQPage schema in `<head>`
- Service Areas section lists 22 suburbs — keep in sync with `areaServed` in LocalBusiness schema
- Target keywords: Melbourne rendering services, renderers Melbourne, rendering company Melbourne, cement rendering Melbourne, acrylic rendering Melbourne, rendering specialists Melbourne, rendering contractors Melbourne
- `robots.txt` and `sitemap.xml` at project root

## Contact Form

- Uses **Web3Forms** (free, 250 submissions/month)
- Action: `https://api.web3forms.com/submit`
- Hidden field: `access_key` — replace `YOUR_ACCESS_KEY_HERE` with real key
- Hidden `botcheck` checkbox for spam protection
