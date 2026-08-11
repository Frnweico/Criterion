# Criterion Homes — Handover

Everything a new session needs to continue this build. Written 9 Aug 2026.

Read this with [TODO.md](TODO.md) (outstanding items) and
[docs/design-notes.md](docs/design-notes.md) (deliberate divergences from Figma).

---

## 1. The project

Marketing site for **Criterion Homes Ltd**, a property developer in Abuja,
Nigeria. Built from Figma designs supplied by the client, who is the sole
stakeholder and is hands-on — they edit CSS directly between sessions.

**Location:** `C:\Users\PC\Documents\Frnwei\Web\Criterion-Homes`

> The parent folder `Web/` is a *different* Next.js app. Don't confuse them.

### Stack

| | |
|---|---|
| Framework | Next.js 16.3.0, App Router, Turbopack |
| Language | TypeScript |
| Styling | **CSS Modules — no Tailwind** |
| React | 19.2.8 |
| Carousel | `embla-carousel-react` + `embla-carousel-autoplay` (8.6.0) |
| Font | Manrope via `next/font` |

**Tailwind was explicitly rejected.** The client knows HTML/CSS and some
JavaScript, not React or Tailwind, and wanted to be able to read and modify
their own site. The Figma MCP returns React + Tailwind — **always translate it
to CSS Modules, never paste Tailwind classes in.**

### Commands

```bash
npm run dev      # http://localhost:3000 · http://192.168.0.102:3000 on LAN
npm run build    # always run before claiming something works
npm run lint
```

---

## 2. Figma

**File key:** `omnmmbNeQSnKDTr2MBVsJv` (F & C Board)
**Account:** `oyenugaolaotan@gmail.com`, Full seat, Pro tier, team
`1115660683912035892`.

> There is a second account, `frnwei.co@gmail.com`, which only has a **View
> seat** and gets rate-limited almost immediately. If you hit
> "reached the Figma MCP tool call limit", check `whoami` first — it's a seat
> problem, not a plan problem.

### Node IDs

| Frame | Mobile | Desktop |
|---|---|---|
| Homepage | `9947-5572` | `8960-4787` |
| Hero carousel component set | `10837-6261` | `10865-7511` |
| About | `9954-6488` | `9835-5051` |
| Projects | `10435-8232` | `10380-5210` |
| News | `9954-5510` | `8681-4047` |
| Blog | `9954-6041` | `8740-4473` |
| Menu overlay | **`10812-6282`** | **`10804-6422`** |
| Midtown Terraces | `9942-5267` | `9342-4956` |
| Team info overlay | `10476-6637` | `10475-6587` |
| Why-buy reasons 2–5 | — | `10795-6480`, `10993-6743`, `10795-6518`, `10795-6537` |

> **The menu links are labelled backwards by the client.** `10804-6422` is the
> *desktop* frame (1440px, 64px nav items); `10812-6282` is *mobile* (393px,
> 40px items). Built the right way round.

### Working with the MCP

- Large frames exceed the token limit and get saved to a file. Parse with Node
  (`jq` and Python are **not** installed).
- `get_metadata` fails on large nodes — use `get_design_context`.
- Asset URLs expire after **7 days**. Re-pull the frame if they 404.
- Figma exports absolute pixel coordinates. **Rebuild as grid/flex** — a direct
  translation only holds at exactly 1440px.

---

## 3. What exists

### Routes

```
/                            homepage — 10 sections
/about                       hero, statements, core values, pact, team
/projects                    breadcrumb, 2 project rows, buyer checklist
/projects/midtown-terraces   14 sections, 3 bespoke interactions
/projects/the-urban-nest     same 14 sections, text-and-image replica — see §9
/news                        lead story + 5 press cards
/blog                        lead post hero + post grid
```

### Content (`src/lib/`) — single source of truth

| File | Holds |
|---|---|
| `site.ts` | Nav, socials, contact, address. Header, Menu and Footer all read this |
| `projects.ts` | Both projects: slug, price, completion, stage, description |
| `hero.ts` | 3 homepage hero slides + `SLIDE_DURATION_MS` |
| `services.ts` | 4 services accordion |
| `pact.ts` | 5 Criterion Pact commitments |
| `news.ts` | 6 press items + `FEATURED_NEWS` (first 3, homepage) |
| `blog.ts` | 3 posts + `formatPostDate` |
| `about.ts` | Statements, 6 core values, 3 team members |
| `midtown.ts` | All content for the Midtown Terraces page |
| `urban-nest.ts` | Same shape, Urban Nest's own copy — see §9 for how content conflicts in its Figma frame were resolved |

**Never hardcode prices or dates in a component.** Doing so is what let the
homepage and Projects page disagree earlier.

### Components (`src/components/`)

Shared: `Header` `Menu` `Footer` `Button` `SectionHeader` `Breadcrumb`
`ProjectCard`

Homepage: `Hero` `AboutSection` `DevelopmentsSection` `ServicesSection`
`ChecklistSection` `BenchmarkersSection` `PactSection` `ClaritySection`
`NewsSection` `BlogSection`

About: `PageHero` `StatementsSection` `ValuesSection` `TeamSection`

Projects — shared by both Midtown and Urban Nest, each fed its own data via
props (nothing here reads a lib file directly any more):
`BuyerChecklistBand` `ScrollStory` `LocationStory` `Gallery` `ReasonsList`
`FloorPlan` `PaymentPlan`

`ScrollPoint` (the id/title/body/image shape both `ScrollStory` and
`LocationStory` take) is exported from `ScrollStory.tsx`, not a lib file —
both `midtown.ts` and `urban-nest.ts` import it from there rather than from
each other, so the two projects' content stays independent.

---

## 4. Conventions — follow these

### Layout: one gutter, everywhere

```css
--gutter: 20px;   /* 40px at ≥1024 */
--page-max: 1440px;
```

Every section's inner wrapper uses `padding: <vertical> var(--gutter)`.
Section edges must line up vertically down the whole page. They previously
ranged from 40px to 371px; that was fixed and must not regress.

**Homepage and About** additionally cap at `var(--page-max)` and centre.
**Projects, News and Blog** are padding-only and stretch — the client asked for
this explicitly. The two groups therefore behave differently above 1440px.

### Breakpoints

`480` (footer columns) · `640` (card grids) · `768` (tablet) · `1024` (desktop)

Design only covers mobile and 1440. Everything between is a judgement call —
add a tablet step rather than letting type jump.

### Re-toning a shared component

Several pages need a shared section in a different colour. **Don't add variants
to the shared component** — re-tone from the page's own stylesheet:

```css
/* about.module.css */
.pactTaupe > section { background: var(--color-taupe-grey); }
```

This matters because **the client edits component CSS between sessions**.
Touching their files causes conflicts. See §7.

### Buttons

`secondary` (large filled) · `small` · `outline` (platinum ink, dark grounds) ·
`outlineDark` (carbon ink, light grounds)

Using the wrong outline variant makes the button invisible. This has happened.

### Content with no destination

Client's rule: **if it has copy but no destination, render it anyway and log
the destination in TODO.md.** Never invent a link or button label.

---

## 5. Bespoke interactions

### Hero carousel — `Hero.tsx`

Embla + autoplay. 4s per slide. The progress bars read `timeUntilNext()` from
the autoplay plugin in a rAF loop.

> Two earlier hand-rolled versions failed because the bar fill and the slide
> advance were separate timers that drifted. **The bars must be a readout of
> the engine's clock, never a second clock.** Don't reintroduce one.

Bar fill is `transform: scaleX()` written frame by frame, anchored
`transform-origin: left`. Deliberately *not* a CSS animation.

### ScrollStory — Design Philosophy + Location

Track is `points.length × 100svh` with a `position: sticky` child. Active index
comes from how far the track has passed the viewport top.

`pinOnMobile` — Location pins on mobile, Design Philosophy doesn't. Falls back
to a plain stack under `prefers-reduced-motion`.

### ReasonsList — Why Buy

Desktop reveals copy + image on hover; **mobile shows every reason expanded**,
since content behind a hover that can't happen is unreachable. Focus works too.

---

## 6. Verification — read this before claiming anything works

**The Browser pane does not composite.** `requestAnimationFrame` never fires,
`IntersectionObserver` never delivers, CSS transitions never advance, and
screenshots time out with *"the Browser pane is not displayed"*.

Consequences:

- `setTimeout` works, so DOM/layout/computed-style checks are reliable.
- **Anything rAF-driven cannot be verified here** — the hero carousel and both
  ScrollStory sections included.
- `document.documentElement.clientWidth`, `getBoundingClientRect`,
  `getComputedStyle` are all trustworthy. Use them.

**Verify by measuring the DOM, not by looking.** And when something can't be
verified, say so plainly rather than implying it works.

Two bugs were missed by trusting computed values alone:

- A bar animated its `transform` perfectly while having **zero height** — a
  percentage height on a `<button>`'s child doesn't resolve. *Check the
  rendered box, not just the property.*
- `.overlay { display: flex }` outranked `[hidden] { display: none }`, so the
  closed menu still occupied layout and caused horizontal scroll site-wide.

---

## 7. The client edits files between sessions

They work in VS Code in parallel. **Always `git status` before editing, and
re-read any file immediately before changing it** — never edit from memory.

Currently uncommitted (theirs, leave alone unless asked):

```
AboutSection · BenchmarkersSection (tsx + css) · ChecklistSection
Footer · Header · Menu · PactSection · ServicesSection
```

> `BenchmarkersSection.module.css` line ~92 has `font-weight: 00;` — invalid,
> silently dropped by the browser. Almost certainly meant to be `300`. Flagged;
> not fixed, because it's their file.

Commit only your own paths: `git add <specific paths>`, never `git add -A`.

---

## 8. Deliberate divergences from Figma

Recorded in `docs/design-notes.md`. Don't "fix" these back.

| Figma | Built | Why |
|---|---|---|
| "Properties" | **"Projects"** | Client decision, site-wide |
| Hero 789/900px | `100svh` | Fills viewport; `svh` so mobile toolbars can't hide the buttons |
| Desktop H1 88px | **80px** | Client request |
| Hero gradient scrim | **Removed** | Client request |
| Hero 2nd button "Join the Benchmarkers" | **"Get Buyer Checklist"** → `/#buyer-checklist` | Client confirmed |
| Checklist: 2 fields desktop, 1 mobile | **3 fields both** | What you collect shouldn't depend on screen size |
| Socials: Facebook, X, LinkedIn | **+ Instagram** | Added later |
| Poppins + Space Grotesk | **Manrope only** | Unintended in the file |
| Blog: 6 cards + pagination | **3 cards, no pagination** | 3 are placeholder text; only 3 real posts |
| Prices `From 55Million` / `80Million` | **`From ₦275M`** / **`₦498M`** | Superseded; frames are stale |

---

## 9. The Urban Nest page

Built 11 Aug 2026 as a text-and-image replica of the Midtown Terraces page —
same 14 sections, same components, same interactions. Sourced from Figma
frames `10163:5017` (desktop) and `10169:5553` (mobile).

**No real photography exists for this project yet.** Every image path in
`urban-nest.ts` and the page itself points at a `urban-nest-*.webp` file that
doesn't exist on disk — the boxes holding them are sized correctly regardless,
so dropping the real files in at those exact paths is the only step left once
you send them. Full list: hero, address, 5× philosophy, 5× gallery, 3×
location, 5× reason, 3× floor plan.

### The mobile frame is largely unedited

Urban Nest's desktop frame is properly customized. Its mobile frame is mostly
the Midtown Terraces mobile frame, duplicated and never updated — several
sections still read literal Midtown/Gwarinpa copy that doesn't apply to this
project. Wherever the two frames disagreed, **desktop's version was used for
both breakpoints**, matching how content already works elsewhere on this site
(one string, not one per breakpoint). What was actually found:

| Section | Mobile frame still says | Used instead |
|---|---|---|
| Design philosophy intro | "At **The Midtown Terraces**, architecture is guided by clarity of purpose…" | "At **The Urban Nest**…" (desktop) |
| Philosophy point 1 body | Midtown's own point-1 wording, verbatim | Desktop's rewritten body |
| Location quote | "Often described as 'it's own city' **Gwarinpa** offers easy access…" | Desktop's real quote about Wuse |
| Location point 1 | Title **"Gwarinpa, Abuja"**, Midtown's body verbatim | "Wuse, Zone 7, Abuja" + desktop's body |
| Location point 3 | Title **"Wide Boulevards"**, Midtown's body verbatim | "Quietly Central" (desktop; genuinely new to this project) |
| Location point 5 body | "…delivers a complete living experience…" ends in **"Gwarinpa"** | Ends in "Wuse, Zone 7" (desktop) |
| Proximity drive times | Wuse 2 / **Life Camp** / **the city centre** (Midtown's labels, new minute counts) | Wuse 2 / **Central Business District** / **Maitama** (desktop, fully updated) |
| Payment instalments | **₦70M** per instalment (Midtown's unit price ÷ 5) | **₦100M** ×4 + ₦98M (desktop; the real split of ₦498M) |

### Structural differences, not just text

These aren't content swaps — the frame itself is shaped differently here:

- **Six specification rows, not seven.** No "Area Size" row, on either
  breakpoint. Confirmed deliberate, not a copy-paste miss.
- **No Semi-Finished price tier.** Midtown's payment section has a second
  ruled box below the milestone table; Urban Nest's frame has no equivalent
  at all, on either breakpoint. `PaymentPlan`'s `semiFinished` field is now
  optional for exactly this reason — the box simply doesn't render when it's
  omitted.
- **One viewing button, not two.** No product paper exists for this project,
  and the frame only shows a single "Request viewing" button — matches what's
  actually available.
- **Floor plan captions carry "(Single Unit)"** — Midtown's read plain
  "Ground Floor" etc.

### One call made, not found

Urban Nest's own gallery frame is still on the **pre-redesign** layout
(full-width lead photo + a horizontally scrolling row of four thumbnails) —
the same pattern Midtown's gallery had before you sent the reference
screenshot that prompted its rebuild. Since the brief was a replica of the
page *as it stands today*, this page uses the current Midtown gallery
component (lead + clickable thumbnail column) rather than reproducing the
older pattern from Urban Nest's own frame.

### A gap this surfaced on Midtown's page too

Both projects' Figma frames carry body copy under "Explore Essentials" —
"Zone 7 stands at the heart of Wuse, one of Abuja's most connected and
central neighbourhoods." — that was never wired into either page (Midtown's
`Explore Essentials` section currently renders only a heading and the
category chips). Left as-is on both pages for now, rather than adding it to
one and not the other; flagging so it can be picked up deliberately.

---

## 10. Outstanding

### Blocked on the client

| Item | Detail |
|---|---|
| **Video** | Midtown "address" section should be video. MP4 not supplied. Still image stands in. Agreed approach: `preload="none"` + IntersectionObserver, skip on `saveData`/slow connection, autoplay muted → click to unmute. Cloudflare Stream if it exceeds ~15 MB |
| **Designs** | `/contact`, `/blog/[slug]`, `/projects/the-urban-nest`, Join the Benchmarker page, remaining team overlays |
| **Map** | "Nearby Essentials" is a location guide, not a photo: a map of the site, with the category buttons above it filtering to one essential at a time and showing its proximity. No provider chosen, no pin data — the dashed "Explore Essentials" placeholder with its 6 category chips is the slot. The Location scroll step of the same name now carries copy only |
| **News article URLs** | All 6 render non-clickable |
| **Blog content** | Markdown under `content/blog/` was the agreed approach; not yet set up |
| **Newsletter provider** | 3 forms submit nowhere |
| **Team overlays** | "Read more" on each member does nothing |

### Known issues

- **`public/` is 89.7 MB**, down from 132 MB — the client supplied compressed
  replacements for the whole Midtown set, which fell from ~52 MB to 10.4 MB.
  Heaviest remaining: `blog-hero.png` 10.8 MB, `hero-background.png` 8.3 MB
  (superseded). Git keeps every version of a binary forever — **compress before
  adding more**, because fixing it later means rewriting history.
- Safe to delete now: `hero-background.png`, `services-feature.png`,
  `navbar-scrim.png`, and the Next.js scaffold SVGs (`next/vercel/globe/
  file/window.svg`). ~9.5 MB. *The rest of the "unused" list is for pages not
  yet built — don't delete it.*
- The **floor plans render at 335 × 204 on a 375px viewport**, where the room
  annotation is too small to read. Inherent to a 1786px-wide technical drawing
  on a phone — needs a pinch/zoom or full-screen affordance, which is a design
  decision, not a bug.
- Menu viewport-height work (`height: 100svh`, flexing content) is built but
  **unverified at short viewports**.

### Not started

`/contact` · `/blog/[slug]` · `/projects/the-urban-nest` · Join the Benchmarker
· sitemap.xml · robots.txt · JSON-LD structured data · analytics

---

## 11. Git

Local only — **no remote**. 11 commits, `main`.

```
328b9e3  Midtown Terraces page: all sections, scroll story, hover reasons, floor tabs
6ebe5fa  Midtown Terraces: page content, scroll component and assets
da66817  Menu columns and gutter-only sections on the interior pages
f29e18c  Header: wordmark and scrim from the nav artwork; fix mobile overflow
2320be4  Blog page: lead post hero and the post grid
d7204b6  News page: lead story and the full press list
4acff72  Projects page: breadcrumb, project rows and buyer checklist band
7ef33e0  About page: hero, statements, core values, pact and team
c5866bc  Menu: build the real navigation overlay from the Figma frames
e1df23e  Align About to the Figma 1155px block; adjust Developments inner
f00c4d5  Homepage: Next.js scaffold and all sections
```

Identity is set **locally for this repo**: `Frnwei <hellofrnwei@gmail.com>`.

Nothing is pushed anywhere, so nothing survives a disk failure. Pushing to
GitHub is also the prerequisite for Vercel deploys.

---

## 12. SEO

The client cares about this — it drove the framework choice. Already in place:
semantic markup, one `<h1>` per page, per-page `title`/`description` via the
root layout's `%s | Criterion Homes` template, `alt` on every image.

**Do not add a second `<h1>`.** The hero carousel renders slide 1 as `<h1>` and
slides 2–3 as `<h2>` for exactly this reason.

Still missing: `sitemap.xml`, `robots.txt`, Open Graph images, JSON-LD
(`Organization`, `LocalBusiness` with the Wuse Zone 2 address, `Article` on
posts, `Residence` on projects).

---

## 13. Working with this client

- Terse and fast-moving. They correct in short messages — read them literally.
- They asked explicitly: **verify, don't guess.** State what was measured and
  what wasn't.
- They send screenshots of their render vs the Figma frame. Compare geometry
  numerically, not by eye.
- When they say a thing "doesn't work", measure before theorising. Two long
  debugging detours came from assuming rather than checking.
- The dev server dies with the session — restart it rather than telling them to.
