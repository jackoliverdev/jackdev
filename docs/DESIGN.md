# Jack Oliver Dev design system

The single source of truth for how jackodev.co.uk looks and moves. Written 07/11/2026 for the redesign on `feat/redesign-2026`. If this file and the code disagree, the code wins: fix this file in the same change.

## Where to change things

| What | File |
| --- | --- |
| Every colour, radius, shadow, easing and spacing token | `app/globals.css` (`:root` and `.dark`) |
| Tailwind names for those tokens | `tailwind.config.ts` |
| Fonts | `app/layout.tsx` (self-hosted from `@fontsource-variable`) |
| All copy | `lib/content/site.ts` and `lib/content/projects.ts` |
| Logos | `public/brand/` (icon, horizontal, vertical; light and dark) |
| Project imagery | `public/work/<slug>/` |

Change a colour once in `globals.css` and both modes and every component follow.

## The idea

A developer's portfolio should be judged on the work, so the work is the hero. The page opens with one sentence and then puts real client sites on screen straight away, in identical frames, so seven very different businesses read as one body of work. Everything else stays quiet.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#EEF1F4` ice, lifted | `#111217` obsidian | Page ground |
| `--surface` | `#F7F8FA` | `#181A21` | Raised panels, form, frames |
| `--sunken` | `#DFE5EB` ice | `#0C0D11` | Bands, wells, image mats |
| `--line` | `#CDD4DC` | `#262932` | Hairlines and borders |
| `--fg` | `#111217` | `#DFE5EB` | Text |
| `--fg-muted` | `#4F5864` | `#98A2AE` | Subtext only |
| `--sky` | `#0593C6` | `#0593C6` | Brand fill: buttons, the logo dot, focus |
| `--sky-ink` | `#036E94` | `#38B6E8` | Sky as text, so it passes AA |
| `--on-sky` | `#111217` | `#111217` | Text on a sky fill (5.3:1) |

Light mode is not dark mode inverted: light sits on a lifted ice with obsidian ink, dark sits on obsidian with ice ink, and each has its own surfaces. Sky is the only colour. It marks the one action per view, the logo dot and focus rings. Nothing else is coloured.

No glow, no gradient text, no blurred blobs. Depth comes from the frames, hairlines and one soft shadow token.

## Type

- **Funnel Display** (NORD ID and Kristian Möller, OFL) for headlines. Its shifted stems give movement without animation. Weight 600, tracking `-0.035em`, tight leading.
- **Funnel Sans** for everything else. Weight 400 and 500.
- One family, two cuts. No monospace labels, no all-caps eyebrows, no middle-dot meta strings.
- Fluid scale with `clamp()`: `display` (hero), `h1`, `h2`, `h3`, `lead`, `body`, `small`. Defined as `text-*` utilities in `tailwind.config.ts`.

## Layout and spacing

- One container: `max-width 1320px`, gutters `clamp(1rem, 4vw, 2.5rem)`.
- Section rhythm from one token: `--section-y: clamp(5rem, 11vw, 9rem)`.
- Left-aligned throughout. Nothing centred except the logo lockup in the footer.
- Radii by hierarchy: frames `14px`, controls `10px`, chips `999px`. Not one radius on everything.

## Imagery

Every project shot is captured from the live site with the same rig: desktop at 1440 × 900 (2x) and phone at 390 × 844 (3x), cookie banners removed. Desktop shots sit in a 16:10 frame; phone shots sit in a 390:844 frame. Never crop a shot to a different ratio.

## Motion

- One orchestrated moment: the hero line and work reel arrive together on load.
- The work reel drifts slowly and stops on hover, focus or drag. It's static for reduced motion.
- Everything else moves only in answer to the visitor: hover on project frames, the form's selected states, the menu.
- Easing `cubic-bezier(0.2, 0.8, 0.2, 1)`, 180 to 600ms. Only `transform` and `opacity` animate.
- Lenis smooth scroll stays, synced to GSAP, off for reduced motion.

## Copy

British English, sentence case, no em dashes, no "elevate", "seamless", "powerful" or "cutting-edge". Say what was built and what changed for the client. Quotes are paraphrased from clients and must be signed off by them before launch.
