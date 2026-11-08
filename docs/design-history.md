# Design history

A record of each look the site has had, so any of them can be put back.

## v1: Obsidian, ice and sky (07/11/2026)

Saved in the commit "Redesign v1: obsidian, ice and sky" on `feat/redesign-2026`. To see it again: `git log --oneline` and check out that commit, or copy the files listed below back from it.

- **Colours:** obsidian `#111217`, ice `#DFE5EB`, sky `#0593C6`. Light page `#EEF1F4`, light panels `#F7F8FA`, dark panels `#181A21`. Sky used for the main button, logo dot and focus.
- **Fonts:** Funnel Display (headlines) and Funnel Sans (body), self-hosted in `app/fonts/`.
- **Logo:** heavy lowercase "j" with a sky dot, wordmark "jackoliver dev" in Funnel Display. Files in `public/brand/`, paths in `lib/brand/logo-paths.ts`.
- **Homepage order:** hero with a drifting work reel, selected work (three feature rows and a grid of four), what I build, process, testimonials, about, contact with booking.
- **Jack's feedback that led to v2:** the reel under the hero made no sense, images were slow, the page felt too long, the services and process sections should come before the work, the testimonial quote floated, the form was far too long, ADVANTA should read "Advanta Services", and the font was wrong.

Files that carried the v1 look: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `app/fonts/`, `public/brand/`, `lib/brand/logo-paths.ts`, `components/website/home/*`.

## v2: Nature (07/11/2026)

The current look: Soft Moss, Deep Olive, Sage Gray, Bone White and Cocoa Brown, each as a 50 to 950 scale; Archivo with wide headlines; a compact, reordered homepage. See `docs/DESIGN.md`. To switch back to v1 colours only, set `PALETTE = "palette-v1"` in `app/layout.tsx`. To get the whole v1 site back, check out the `design-v1` tag.
