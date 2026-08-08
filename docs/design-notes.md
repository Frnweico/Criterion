# Design notes

Extracted from Figma "F & C Board" (`omnmmbNeQSnKDTr2MBVsJv`). Every frame has now
been read. Large extractions are cached as JSON under the session tool-results
directory; frames that returned inline are written up here in full.

**Desktop design width is 1440px** (confirmed across Projects, Blog and Menu).
Mobile is 393px.

---

## Frame index

| Page | Mobile | Desktop |
|---|---|---|
| Home | `9947:5572` | `8960:4787` |
| About | `9954:6488` | `9835:5051` |
| Projects | `10435:8232` | `10380:5210` |
| News | `9954:5510` | `8681:4047` |
| Blog | `9954:6041` | `8740:4473` |
| Menu overlay | `10812:6282` | `10804:6422` |
| Team overlay | `10476:6637` | `10475:6587` |

---

## Hero — deliberate divergences from Figma

Client-directed. Don't "correct" these back to the frames.

| Figma | Built | Note |
|---|---|---|
| Fixed 789px / 900px | `100svh` — fills any viewport | `svh` not `vh`/`dvh`, so mobile toolbars can't hide the buttons or shift the content mid-scroll |
| Desktop H1 88px | **80px** | `clamp(3.5rem, 5.56vw, 5rem)` — hits 80px exactly at 1440 |
| Gradient scrim + 25% wash on every slide | **Removed** | Photography carries the frame unaided. Watch contrast on the interior shot |
| — | Slide 1 `object-position: right center` on mobile, `center` on desktop | Slides 2 and 3 stay centred throughout |
| Second button reads "Join the Benchmarkers" | **"Get Buyer Checklist"** → `/#buyer-checklist` | Client-confirmed. Drives the checklist capture, not the Benchmarkers signup |
| Slides 1–3 all put the paragraph right | Right column on **slide 1 only** | Slides 2 and 3 stack it under the title, above their facts row |
| Checklist form: 2 fields (desktop), 1 (mobile) | Name, Email, **Phone (WhatsApp)** at both | What you collect shouldn't depend on screen size |

Images are `object-fit: cover` throughout: fills the frame, preserves aspect
ratio, crops but never stretches. Landscape viewports are width-driven,
portrait ones height-driven, from that single rule.

---

## Hero carousel (homepage)

**Three slides that auto-advance.** A progress bar fills for the current slide,
and the change happens once it completes.

Component set variant naming is `State=Empty, Slide=1` — so the set has both a
`State` and a `Slide` property.

### Progress bars — `10837:6534`

- Group 352px wide, positioned at y≈756 (near the bottom of the 789px hero).
- Three bars, each **109.333 × 5.25px**, with **12px gaps**.
- Track `#88807a`; fill `#fcfbff` grows left-to-right.
- Implementation: animate the fill width 0→100% over the slide duration, then
  advance. Bars for already-seen slides stay full; upcoming bars stay empty.

### Slide 1 — `10837:6525`

- Background image with a 25% black overlay, plus a bottom-up black gradient
  (489px tall, 50% opacity).
- Title 48px Medium white, tracking -1.2, line-height 0.9:
  "Homes, Built With A Clear Standard"
- Body 16px, `--color-platinum`:
  "We guide buyers to well-considered homes, with no compromise on detail or
  long-term value. Because home is not just where your heart is, it is also
  where your money is."
- Content block at left 21px, top 376px, 348.43px wide, 36px gap.
- Overlaid navbar: logo 27.196 × 27.427 at left, white hamburger at right,
  padding 20px / 14px.

### Slide 2 — The Midtown Terraces

- Image `hero-slide-2.png`, bottom-up black gradient.
- Title "The Midtown Terraces" — 48px mobile / **88px** desktop, Medium.
- Body: "A limited collection of 4-bedroom terrace duplexes designed for light,
  structure, and long-term value."
- Meta row, pipe-separated, **Bold** — 12px mobile / 16px desktop:
  `Gwarinpa, Abuja | 4 Units of 4-Bedroom Terrace Duplexes | From ₦275M | Q4 2026`
- Button "View details".

### Slide 3 — The Urban Nest

- Image `hero-slide-3.png`, same gradient.
- Title "The Urban Nest".
- Body: "A considered approach to modern terrace living, built for location,
  structure, and return."
- Meta row: `Wuse Zone 7, Abuja | 4-Bedroom Terrace Duplex | ₦498M | Q4 2027`
- Button "View details".

### Desktop differences — `10865:7511`, 1440 × 900

- Title **88px** Medium, tracking -4.4.
- Slide 1 body sits **right**, 384px wide, 20px. Slides 2–3 body at left 995px.
- Content block at left 44px; slide 1 anchored bottom 100px.
- **Two buttons** on every slide: the filled `#96cad9` primary, plus an
  outlined one with a `#8697a9` border and white text.
- Progress bars: three **418px** bars, 48px gaps, 1350px total, bottom 47px.
- Navbar carries a background scrim image (`navbar-scrim.png`) and the full
  logo wordmark, with the 61.671px white hamburger.

### ⚠ Fonts to normalise

The desktop hero uses **Inter** (`Inter:Regular`, `Inter:Semi_Bold`) for slide
2–3 body copy and the pipe separators. Per the standing decision, all fonts
render in **Manrope** — Inter is treated the same way Poppins and Space Grotesk
were.

### Also noted

The mobile hero contains a **hidden** nav frame (`10837:6548`) with About Us ·
The Team · Careers · Contact Us. Hidden in this variant, and "The Team" and
"Careers" are not in the agreed navigation. Ignored unless you say otherwise.

### New colour

`#8697a9` — outlined button border on the desktop hero only. Added as
`--color-outline` in `globals.css`.

---

## Menu overlay

Background is **light** — `--color-platinum` `#fcfbff`, black text. Both
breakpoints carry an 18px `--color-taupe-grey` `#554744` strip pinned to the
bottom edge.

**Nav order (both):** Home → Projects → News → Blog → About Us → Contact.
Differs from the footer's order. **"Contact" is not a link** in either frame.

**Socials order in the menu:** Instagram · LinkedIn · Facebook · X (Twitter),
underlined. The footer uses a different order again.

### Desktop `10804:6422`

- Padding 50px 40px, two columns, 301px gap.
- Left column 764px tall, space-between:
  - "LATEST PROJECT" 16px SemiBold uppercase
  - Image 533 × 426.4
  - "Gwarimpa, Abuja, Nigeria." 16px Light · "The Midtown Terraces" 28px Medium
  - Bottom: "FOLLOW US" + socials, 16px Light, 40px gap
- Right column: "NAVIGATE" label, nav items **64px Regular**, capitalize,
  tracking -3.2, 16px vertical padding, 1px black bottom border, 388px wide.
- Close button top-right, 61.67px box; X is two 39.9 × 2.7px bars at ±45°.

### Mobile `10812:6282`

- 817px tall, padding 104px top / 64px bottom, content 355px wide.
- Sticky navbar: logo + X close (22.169 × 1.512px bars).
- Nav items **40px Regular**, capitalize, tracking -1.2, 8px vertical padding.
- "Latest project" card: background `#f1f1f1`, 10px padding, space-between.
  Left "LATEST PROJECT" 12px SemiBold · location 12px · title 16px.
  Right image 142 × 113.6.
- "FOLLOW US" 12px SemiBold + socials 12px underlined, space-between.

---

## Projects page

### Mobile `10435:8232`

- Sticky navbar, platinum, `rgba(0,0,0,0.1)` bottom border.
- Heading "Projects" 48px Medium, tracking -1.2.
- Two cards, 354px wide: image, location 12px @40% opacity, title 20px Medium,
  description 16px Light, then a pipe-separated meta row at 12px.
- Dark section (`--color-carbon`): "Start with the right questions", **two**
  inputs (Name, Email), outlined button.
- Footer is **white with black text**.

### Desktop `10380:5210`

- Navbar: platinum, `rgba(0,0,0,0.2)` bottom border, padding 32px 40px, full
  logo wordmark 173.7 × 49.8, black hamburger 61.671px.
- **Breadcrumb** below navbar: `Home / Projects`, 16px Light, current page Bold.
- Heading "Projects" **88px** Medium, tracking -4.4.
- Cards are two-column: image 670 × 514 + text column, 24px gap, 40px between
  cards. Title 36px Medium. Description 16px Light @50% opacity.
- Dark section: `SectionHeader` **White variant** "BUYER CHECKLIST", heading
  64px "A practical guide for serious homebuyers.", single Email input.
- Footer white, 608px tall.

### Intro copy (both)

> Every Criterion development is engineered with a distinct lifestyle in mind,
> creating a curated portfolio united by our signature architecture of restraint.

---

## Blog page

### Mobile `9954:6041`

- Hero 789px with background image and gradient; navbar overlays it with a
  gradient scrim and a **white** hamburger.
- Featured post: date 16px SemiBold @40%, title 40px, excerpt 16px, outlined
  white button.
- "Our Blogs" 40px, then a single-column card list.
- Card: image at aspect 220/176, title 20px Medium `#191c1c`, excerpt 16px
  `#3f4948`, date 12px SemiBold @40% uppercase.
- **Pagination**: chevron, pages 1–4, chevron. Active page has `#eee`
  background, 18px radius, text `#133332`.
- Dark lead-capture section (Name + Email).
- Footer is **taupe grey** `#554744` with white text.

### Desktop `8740:4473`

- Hero 798px on `#2a3d44`, breadcrumb `Home / Blog` at 16px Light.
- Featured post: date 16px SemiBold @40%, title **64px**, excerpt 28px Medium,
  outlined black button.
- "Our Blogs" **64px**.
- Cards in a wrapping row, 440px wide, 496px tall, image aspect 500/400.
  Title **24px** Regular (`Homepage/H6`), excerpt 16px Light, date 16px
  SemiBold @40%.
- Same pagination component.
- Footer taupe grey, 608px tall.

**Note:** several blog cards are placeholders — "Main text goes here" /
"Subtext goes here" / "01, Jan, 2026". Real posts are needed.

---

## Team overlay

Opens from the About page. Background platinum, close button top-right.
The portrait uses an SVG **mask** rather than a plain crop.

| | Mobile `10476:6637` | Desktop `10475:6587` |
|---|---|---|
| Layout | Single column, 393px, 88px vertical padding | Two column, 24px gap, 614px tall |
| Portrait | Masked, full width | Masked, 247 × 679 |
| Name | 20px Medium | 28px Medium |
| Role | 12px Regular | 16px Light |
| Bio | 16px Regular | 20px Regular |

Content is Hakeem Bakare, Managing Director/CEO, with a seven-paragraph
biography. Only this one team member exists so far.

---

## ✅ Resolved — project figures

The homepage and Projects page carried conflicting prices and dates. Settled in
favour of the Projects-page figures, with one wording change:

| | Agreed | Superseded (homepage) |
|---|---|---|
| Midtown Terraces | **From NGN 275M** · Q4 2026 | ~~From 55Million · Q4 2027~~ |
| Urban Nest | **NGN 498M** · Q4 2027 | ~~From 80Million · Q2 2028~~ |

**Urban Nest deliberately omits "From"** — Midtown Terraces keeps it.
Prices use the naira symbol **₦**, not "NGN": `From ₦275M` and `₦498M`.

### Standing rule — quarters, not months

Completion dates are always written as **quarters** (`Q4 2026`), never as months
(`November 2026`). If a month-form date appears on any frame still to be built,
convert it. This does not apply to blog publish dates, which stay as full dates.

Stage values (`Stage 4/5`, `Stage 2/5`) appear on the homepage card only and
were not part of the conflict, so they carry over unchanged.

These now live in `src/lib/projects.ts`. **Do not hardcode them anywhere else** —
that is what allowed the drift in the first place. The Figma frames still show
the old homepage figures.

Project descriptions (Projects page, consistent across breakpoints):

- **Midtown Terraces** — Gwarimpa, Abuja. 4-Bedroom Terrace Duplexes.
  "Set within Abuja's established Gwarinpa II Estate, The Midtown Terraces
  introduces Criterion Homes' signature architecture of restraint. Anchored by a
  foundational central atrium, these four highly individualized residences
  deliver continuous natural aeration and deliberate, light-filled living spaces
  over generic layouts."
- **Urban Nest** — Wuse Zone 7, Abuja. 4-Bedroom Terrace Duplexes.
  "Located in the highly connected district of Wuse Zone 7, The Urban Nest
  provides a secure, low-density residential base. The design prioritizes a
  deliberately quiet way of living without sacrificing citywide access."

---

## Component variants

- **`NavbarIconMobile`** (34.262px) — `Cancel | Hamburger` × `Black | White`.
  Bars 22.169 × 1.512px, 5.038px gap.
- **`NavbarIcon`** (desktop, 61.671px) — same variants. Bars 39.905 × 2.721px,
  9.069px gap.
- **`Button`** — `Secondary | Small`. Fill `#96cad9`. Secondary 40/20px padding
  with the diamond icon; Small 28/12px, usually no icon. There is also an
  **outlined** treatment used on dark sections (1px `#fcfbff` border, no fill)
  that the Figma component does not expose as a variant.
- **`SectionHeader`** — `Black | White`.
- **`InlineButton`** (About) — 14px Medium uppercase, 1px bottom border only.
- **Footer** — **three** colour treatments: carbon `#191919` (Home), white
  (Projects, News), taupe grey `#554744` (Blog).
- **Navbar** — transparent-over-hero on Home and Blog; solid platinum with a
  bottom border on inner pages.

### Confirmed copy

- Newsletter button reads **"SIGN UP"**.
- Footer newsletter heading "Stay One Step Ahead" is **24px SemiBold uppercase**.

---

## Additional type token

`Homepage/H6` — Manrope Regular 24, line-height 1.2, letter-spacing -1%.
Used for desktop blog card titles. Added to `globals.css` as `.type-h6`.
