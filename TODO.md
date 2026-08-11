# TODO — outstanding items

Everything the build is waiting on. Grouped by who has to act.

---

## Blocked on you

### Designs not yet available

| Item | Notes |
|---|---|
| Contact page | Mobile + desktop |
| Individual blog post page | Template, not a one-off — drives `/blog/[slug]` |
| Join the Benchmarker page | New page, route not yet decided |
| ~~Project detail pages~~ | ✅ Urban Nest built 11 Aug 2026 as a text/image replica of Midtown's page — same sections, same components. See [HANDOVER.md §9](HANDOVER.md) for how content conflicts in its Figma frame were resolved. Still needs its own photography — see the image list below |
| About page overlays | Team info overlay received — [mobile](https://www.figma.com/design/omnmmbNeQSnKDTr2MBVsJv/F---C-Board?node-id=10476-6637) · [desktop](https://www.figma.com/design/omnmmbNeQSnKDTr2MBVsJv/F---C-Board?node-id=10475-6587). Still needs the remaining overlays, plus the images and descriptions for each |

### Copy still reading "BUTTON" in Figma

Verified against live Figma, not cache — these genuinely carry the placeholder:

- Outlined buttons on **Projects**, **Blog** and the **lead-capture** sections.
  The outlined `Button` variant now exists, so each is a one-line change once
  you have the wording.

### Destinations needed — button renders, but goes nowhere

Per your rule: has content, no destination, so it ships and the destination
gets logged here.

| Button | Where | Needs |
|---|---|---|
| ~~Get Buyer Checklist~~ | Desktop hero, all 3 slides | ✅ Resolved — links to `/#buyer-checklist`, the checklist band on the homepage |
| ~~Download Product Paper~~ | Midtown "Request a Private Viewing" | ✅ Resolved — PDF supplied 10 Aug 2026, served from `/midtown-terraces-product-paper.pdf` (3.94 MB, 41pp) |

### Content gaps found in the designs

- **Blog posts are placeholders.** Several cards read "Main text goes here" /
  "Subtext goes here" / "01, Jan, 2026". Real posts needed.
- **Only one team member exists** — Hakeem Bakare. The About page implies more
  overlays.
- **Pagination shows 4 pages** on the blog with no content behind pages 2–4.

### Decisions and content

| Item | Why it matters | Current assumption |
|---|---|---|
| **Newsletter provider** | Both signup forms submit nowhere until this exists. Mailchimp / ConvertKit / Resend / other | Forms render but do nothing |
| **Domain** | Drives canonical URLs and Open Graph tags | `https://criterionhomesltd.com`, inferred from your email |
| **Project slugs** | These become permanent URLs | `midtown-terraces`, `the-urban-nest` |
| **News article URLs** | Three press pieces on the homepage | Rendering non-clickable until real URLs exist |
| **Blog post content** | Markdown files with frontmatter — I'll set up the format | Three posts exist in the design |
| **Contact form destination** | Where enquiries go — email inbox or a CRM | Not built yet |
| ~~Project prices and dates conflict~~ | ✅ Resolved — Projects-page figures win. Now in `src/lib/projects.ts` | Midtown: From NGN 275M, Q4 2026. Urban Nest: NGN 498M (no "From"), Q4 2027 |

### Nice to have

- **Google Business Profile** — for "property developer Abuja" searches this likely matters more than anything on the site itself.
- **Analytics** — Vercel Analytics, Plausible, or GA4. Worth deciding before launch, not after.
- **Re-export the large images.** `hero-background.png` is 8.5MB and `project-urban-nest.png` is 7MB. `next/image` compresses them on delivery so the site stays fast, but the repo carries the full weight.

---

## Blocked on Figma

**Seat type, not plan tier.** The team was upgraded to Professional, but the
limit is attached to the seat: the account holds a **View seat** on team
`1115660683912035892`, which owns the F & C Board file. View seats get a small
MCP allowance regardless of plan.

**Fix:** change the seat on that team to **Full** (or Dev). Upgrading the plan
again will not help.

Working practice regardless: one extraction per page, cached to disk, build
entirely from cache.

### ✅ Resolved

Seat corrected — the Figma connection now authenticates as
`oyenugaolaotan@gmail.com`, Full seat on the Pro-tier team that owns the file.
**All fourteen frames have been extracted.** See [design-notes.md](docs/design-notes.md).

---

## Known divergences from the Figma file

Deliberate. Don't "fix" these back.

- The site says **Projects** everywhere; the Figma footer still says "Properties".
- **Instagram** is in the footer; the Figma footer lists only Facebook, X and LinkedIn.
- **Manrope only.** The About page carried Poppins ("Body 1") and Space Grotesk ("H2 Numbers"); both were unintended, so those styles keep their metrics but render in Manrope.
- The **menu overlay** currently in code is a placeholder of my own design, pending the frames above.

---

## Built so far

- Next.js 16 + TypeScript + CSS Modules scaffold
- Design tokens and mobile-first type scale (`src/app/globals.css`)
- `Button`, `SectionHeader`, `Header` (with menu), `Footer`
- `src/lib/site.ts` — nav, socials, contact as one source of truth
- 17 Figma assets in `public/`

### Next up

Homepage sections from the cached extraction — hero, Services accordion, project cards, Criterion Pact, news cards, blog section — then the page assembly.
