# Jack Oliver Dev design system

The single source of truth for how jackodev.co.uk looks and moves. v2 "Nature", 07/11/2026. Earlier looks are recorded in `docs/design-history.md`. If this file and the code disagree, the code wins: fix this file in the same change.

## Where to change things

| What | File |
| --- | --- |
| Palette scales, colour roles, spacing, radius, motion | `app/globals.css` |
| Which palette the site uses | `PALETTE` in `app/layout.tsx` (`"palette-nature"` or `"palette-v1"`) |
| Tailwind names for every token and scale | `tailwind.config.ts` |
| Font | `app/layout.tsx` (Archivo, self-hosted from `app/fonts/Archivo.woff2`) |
| Headline width | `--display-stretch` in `app/globals.css` (100% normal, 125% widest) |
| All copy | `lib/content/site.ts`, `lib/content/projects.ts` |
| Logos | `public/brand/` (icon, horizontal, vertical; light and dark), paths in `lib/brand/logo-paths.ts` |
| Project images and blur previews | `public/work/<slug>/`, `lib/content/image-blur.ts` |

## How colour works

Three layers, so a change happens in one place:

1. **Scales.** Five nature colours, each a 50 to 950 scale generated in OKLCH so the steps look even. Each original hex sits exactly on one step. Use them in Tailwind as `bg-olive-800`, `text-moss-600`, `border-bone-300` and so on.
2. **Roles.** What components actually use: `--bg`, `--raised`, `--well`, `--rule`, `--fg`, `--fg-muted`, `--fg-faint`, `--brand`, `--on-brand`, `--brand-ink`, `--signal`, `--earth`. Each role points at a scale step, separately for light and dark.
3. **Components** read roles only (`bg-canvas`, `text-fg`, `btn-brand`, `bg-signal`), never a scale step. Swap the role mapping and the whole site follows.

### The scales

| Scale | Base | Sits at | Feel |
| --- | --- | --- | --- |
| `olive` | `#2F3A2E` Deep Olive | 800 | Ink, buttons, the dark ground |
| `sage` | `#8E9A86` Sage Gray | 500 | Secondary text |
| `bone` | `#ECE7DC` Bone White | 200 | The light ground |
| `moss` | `#BBC7A4` Soft Moss | 300 | The pop: dots, links, dark-mode buttons |
| `cocoa` | `#5D4538` Cocoa Brown | 800 | Warm secondary accent: quote marks, step numbers |

### The roles

| Role | Light | Dark |
| --- | --- | --- |
| `--bg` page | sage-100 | olive-950 |
| `--raised` panels | sage-50 | olive-900 |
| `--well` bands | sage-200 | below olive-950 |
| `--rule` hairlines | sage-300 | between olive-900 and 800 |
| `--fg` text | olive-900 | bone-200 |
| `--fg-muted` subtext | olive-700 | sage-400 |
| `--brand` main button | olive-800, bone-50 text | moss-300, olive-900 text |
| `--brand-ink` links | moss-700 | moss-300 |
| `--signal` dot, bullets, focus | moss-600 | moss-300 |
| `--earth` warm accent: underlines, quote marks, dots | cocoa-800 (#5D4538) | cocoa-800 (#5D4538) |
| `--earth-ink` brown text: links, step numbers | cocoa-800 | cocoa-500, so it reads at 5.8:1 on the dark page |

All text roles pass WCAG AA on their grounds.

### Forest bands

Add `class="forest"` to any section and everything inside it switches to the dark roles: olive-800 in light mode, a lifted olive-900 in dark. The hero, the contact panel and the Selected work mats use it (with the contour map), so the page opens and closes in forest green.

### Palette bands

`.band-sage`, `.band-moss`, `.band-cocoa` and `.band-olive` are swatch panels in the palette's own colours, the same in light and dark, with their own text colours. "What I build" stacks sage, moss and deep olive bands like the palette cards that inspired the site. Every project in "Selected work" sits on a forest-green mat with faint contour lines, matching the hero and contact panel.

### Where cocoa shows

Cocoa (`--earth`) is kept for accents only: project title underlines on hover, "Read the case study", "Launching" labels, quote marks, step numbers, the active testimonial marker and case study bullets.

### Corners

`--radius-shot` 3px for desktop screenshots, `--radius-phone` 9px for phone screenshots with a 1.5px bezel, `--radius-frame` 8px for mats and panels, `--radius-control` 6px for buttons and fields.

## Type

- **Archivo** (Omnibus-Type, SIL OFL), one variable file with weight and width axes.
- Headlines run wide (`--display-stretch: 118%`) at weight 650 with slight negative tracking: clean, utilitarian, like kit labels.
- Body runs at normal width, weight 400 and 500.
- Fluid scale: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small`, `text-caption`.
- No all-caps labels, no monospace, no middle-dot meta strings.

## Layout

- One container (`--container` 1280px) with fluid gutters, and one section rhythm (`--section-y`).
- Homepage order: forest hero (contour map, headline, platform logo strip), what I build (palette bands), process, selected work, testimonials, about (with a second logo strip), forest contact panel.
- Project order everywhere: Centrus AI (featured), JetNow Drainage, Imperial Build, Advanta Services, Excel Electrics, Hand Line, Gym Tours AI.
- Platform logos come from `lib/brand/tech-logos.ts` (Simple Icons, CC0), in order: languages and frameworks, front-end motion, databases, hosting and payments, AI and Google. Shown as icons only, one size, one colour.
- Layout grids always set `grid-cols-1` on phones and `min-w-0` on children, so nothing can push the page wider than the screen.

## Imagery

Every project shot is captured with one rig: desktop at 1440 × 900 and phone at 390 × 844, cookie banners removed. Desktop shots sit in a 16:10 frame and phone shots in a 390:844 frame. Sources are stored at display size (1600px desktop, 780px phone, WebP), Next serves AVIF at the exact size needed, and each frame shows a blurred preview from `image-blur.ts` while it loads.

## Motion and performance

- **Hero entrance** is pure CSS (`.hero-line`, `.hero-fade`, `.hero-map` in `globals.css`). It starts on first paint, before JavaScript loads, so it never stutters while the page hydrates on a phone.
- **The contour map** is one static file, `public/brand/topo.svg`, built by `node scripts/generate-topo.mjs`. Every forest panel uses the same cached image. The hero and contact maps sway slowly by moving the whole image layer (`.topo-drift`, transform only), so the curves are never repainted.
- **Scroll reveals:** add `data-reveal` (rise), `data-reveal="fade"` or `data-reveal="zoom"` to an element, and `style={stagger(i)}` from `lib/reveal.ts` to stagger siblings. One passive, frame-throttled scroll check in `components/website/motion/reveal-observer.tsx` adds `is-in` once; anything at or above the viewport counts, so anchor jumps never leave a section hidden. Content is visible until that script runs. Put `data-reveal` on wrappers that have no transform transitions of their own.
- **Anchor links** land exactly under the nav: `scroll-padding-top` on `html` equals the nav height. Don't add `scroll-margin` to sections as well.
- **Logo strips** use two identical groups that each carry their own trailing gap, slid by exactly -50%. Both strips are the same component at the same size.
- **No scroll library.** Native scrolling, with `scroll-behavior: smooth` for in-page links (off for reduced motion). GSAP and Lenis are gone.
- **No blur over moving content.** The nav and the contact form use near-solid backgrounds instead of `backdrop-filter`, which costs a full re-blur on every scroll frame.
- Hover-only images (the second screen on project cards) are `display: none` on phones, so they never download there.
- Toasts load only in the dashboard.
- Only `transform` and `opacity` animate. Everything stops for reduced motion.

## Copy

British English, sentence case, no em dashes, no "elevate", "seamless", "powerful" or "cutting-edge". Client names are written as the client writes them (Advanta Services, not ADVANTA). Quotes are paraphrased and must be signed off by each client before launch.
