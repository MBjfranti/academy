# Imagery plan — where all 53 go

> **STATUS, added by the layout/navigation redesign.** This brief was written against a
> tree that no longer exists: the swipe deck, `.bcard__head`, the `.panel` slide-over and
> the `calc(100dvh - 19rem)` height budgets it costs everything against have all been
> removed. Read it as reasoning, not as instructions.
>
> **Adopted:** the aisle-cutout row beside the Market blurb (§2.3, at 54px not 52px); the
> three ambient moderns and the argument for them (§3, "the three ambient placements") —
> empty search, the foot of the never-buy list, the foot of "What this isn't"; the
> alt-text policy (§2.6) verbatim; the separate `.plate` / `.square` / `.fresco` classes
> and the warning about aspect-ratio mismatch (§5, correctness notes); the refusal to
> preload anything (§6); the additive-only shape for `imagery.js` (§7).
>
> **Modified:** the staple squares are the whole card, not a 62px chip in the left column
> of a tile — the tile was the thing the owner objected to. The 33 squares' thumbnails
> already existed by the time this landed, so §6's "one pipeline ask" was already paid.
> The dark-theme fix is the brightness knock-back `cards.css` already shipped, not the
> `.plated` multiply wrapper of §5 — one filter, no wrapper element, no new stacking
> contexts, and it matches the treatment the dish squares were verified with.
>
> **Rejected:** The Wall (§3). Nine moderns stay unplaced. A twelve-card gallery reached
> from a footer link is a magazine feature on a tool whose owner keeps saying it has too
> much magazine in it, it re-introduces the swipe deck this redesign just removed
> everywhere else, and it is 841 KB. The three ambient placements are the ones that pay
> for themselves; the rest are available in `/img` whenever there is a reason.


Written against the tree at 2026-08-24. Nothing in this document has been implemented; it is
a brief for whoever does. No dev server was running when this was written, so **every pixel
figure below is derived from the CSS, not measured in a browser.** Two of the changes spend
real page height and must be verified at 1280×760, 1366×768 and 390×844 before they land.
They are flagged.

---

## 1. The recommendation in five sentences

The twelve moderns get **one home of their own — a full-screen overlay called The Wall, opened
by a single inline link in the footer that already exists on every page** — plus three ambient
appearances in places where the tool has already vacated the screen (an empty search, the
bottom of the Never-buy panel, the caveats view); they do **not** get a fifth nav tab, a page
header, or a hero. The 33 square plates go **inside furniture that already exists at the right
height**: each staple plate becomes a 62px square in the left column of its own Pantry tile,
each dish plate becomes an 80px square in the left column of `.bcard__head`, and the full-size
version of each appears only in the slide-over panel, which is already a scroll region.
The 7 aisle cutouts get a 52px slot beside the Market aisle blurb and a full-size repeat inside
the Never-buy panel; `accent-canaanite` is already built and wired and needs nothing.
The governing rule for the whole plan is that **every image is paid for out of an internal
scroll region, never out of the page** — the only place that is not literally true is the
Market aisle row, which costs 34px and is paid back by shrinking the tiles scroller by exactly
that much. The pipeline needs one thing from the other agent: a **160px `@thumb` derivative of
each of the 33 squares**, without which the Pantry home page ships 624 KB of images to render
them at 62px.

---

## 2. Asset-by-asset placement

Alt-text rule codes, defined properly in §2.4:

- **D** — decorative. `alt=""`. Adjacent text already names the thing.
- **C** — captioned figure. `<figure><img alt=""><figcaption>…` — the description is visible,
  so the image must not repeat it to a screen reader.
- **F** — full description on the `img`. The image is the only content on the surface and there
  is no visible caption.

### 2.1 The 12 staples — `staple-*.webp`, 1:1

Map to `fundamentals.js :: staples[].slug`. **Two placements each**, one file, two sizes.

| slug | page | component | size | load | alt |
|---|---|---|---|---|---|
| `staple-pearl-barley` | Pantry › Keep in stock | `.tile` left column | 62px sq (`@160` src) | eager, `fetchpriority=low` | D |
| — same asset — | Pantry › staple panel | `.panel__plate` | 100% of panel body, 1:1 | lazy, on open | F |
| `staple-brown-lentils` | ″ | ″ | ″ | ″ | ″ |
| `staple-wholemeal-flour` | ″ | ″ | ″ | ″ | ″ |
| `staple-olive-oil` | ″ | ″ | ″ | ″ | ″ |
| `staple-onions-and-garlic` | ″ | ″ | ″ | ″ | ″ |
| `staple-cumin-and-coriander-seed` | ″ | ″ | ″ | ″ | ″ |
| `staple-sheep-or-goat-yoghurt` | ″ | ″ | ″ | ″ | ″ |
| `staple-brined-sheep-cheese` | ″ | ″ | ″ | ″ | ″ |
| `staple-lamb-shoulder` | ″ | ″ | ″ | ″ | ″ |
| `staple-dates` | ″ | ″ | ″ | ″ | ″ |
| `staple-honey` | ″ | ″ | ″ | ″ | ″ |
| `staple-salt` | ″ | ″ | ″ | ″ | ″ |

Tile thumbnails are suppressed below a **212px tile container width** by container query, which
means they never render on a 390px phone. Details in §4.

### 2.2 The 21 dishes — `dish-*.webp`, 1:1

Map to `recipes.js :: recipes[].slug` **and** `fundamentals.js :: basics[].slug`, one flat map.
`hot-pan-flatbread` exists in both files; `Recipes.jsx` filters it out via `alreadyABase`, so it
has exactly one home (the bases deck). All twenty-one go in the **left column of
`.bcard__head`** on their deck card, at 80px desktop / 64px phone.

**Four bases — Pantry › Four bases deck:**

| slug | component | size | load | alt |
|---|---|---|---|---|
| `dish-lentil-and-barley-pottage` | `.bcard__head` sq | 80 / 64px (`@160`) | lazy | D |
| `dish-hot-pan-flatbread` | ″ | ″ | ″ | D |
| `dish-allium-and-seed-base` | ″ | ″ | ″ | D |
| `dish-strained-yoghurt` | ″ | ″ | ″ | D |

**Seventeen recipes — Recipes › deck:**

| slug | component | size | load | alt |
|---|---|---|---|---|
| `dish-lamb-and-beet-stew-tuhu` | `.bcard__head` sq | 80 / 64px (`@160`) | lazy | D |
| `dish-unwinding-broth-pasrutum` | ″ | ″ | ″ | D |
| `dish-elamite-broth-me-elamutim` | ″ | ″ | ″ | D |
| `dish-pigeon-in-broth-amursanu` | ″ | ″ | ″ | D |
| `dish-date-and-sesame-confection-mersu` | ″ | ″ | ″ | D |
| `dish-emmer-loaves-in-conical-moulds` | ″ | ″ | ″ | D |
| `dish-tiger-nut-and-honey-cones` | ″ | ″ | ″ | D |
| `dish-split-and-salted-nile-fish` | ″ | ″ | ″ | D |
| `dish-emmer-beer-heneqet` | ″ | ″ | ″ | D |
| `dish-thick-loaf-for-the-hearth-harsi` | ″ | ″ | ″ | D |
| `dish-sheep-on-the-huprushi` | ″ | ″ | ″ | D |
| `dish-kabri-palace-wine` | ″ | ″ | ″ | D |
| `dish-lentils-with-oil-and-cumin-ugarit` | ″ | ″ | ″ | D |
| `dish-kid-in-the-tripod-cauldron` | ″ | ″ | ″ | D |
| `dish-barley-and-fig-feast-porridge` | ″ | ″ | ″ | D |
| `dish-honeyed-pork-chops-with-dates` | ″ | ″ | ″ | D |
| `dish-leek-lentil-and-barley-pottage` | ″ | ″ | ″ | D |

The full 880px dish plate is **never shipped.** These are only ever seen at 80px, so only the
`@160` derivative is referenced. The 880px originals stay in `public/img` as the source for the
derivative and as a reserve, but no route loads one. That is the single biggest byte saving in
the plan (1,269 KB never leaves the server).

*Do not* put a dish plate in the Recipes "Where it comes from" panel. That panel already carries
the regional accent plate, and the split is meaningful: the card is the dish, the panel is the
place. One image per surface.

### 2.3 The 7 aisle icons — `aisle-*.png`, transparent, 160px tall

Map to `market.js :: AISLES[].key`. **Two placements each.**

| slug | page | component | size | load | alt |
|---|---|---|---|---|---|
| `aisle-produce` | Market › aisle head | new `.aislehead` row, left cell | 52px tall / 40px phone | eager (default aisle) | D |
| `aisle-drygoods` | ″ | ″ | ″ | lazy, on tab press | D |
| `aisle-meat` | ″ | ″ | ″ | ″ | D |
| `aisle-dairy` | ″ | ″ | ″ | ″ | D |
| `aisle-fats` | ″ | ″ | ″ | ″ | D |
| `aisle-seasoning` | ″ | ″ | ″ | ″ | D |
| `aisle-drinks` | ″ | ″ | ″ | ″ | D |
| all seven, repeat | Market › Never-buy panel | inline before `.panel__aisle` h3 | 40px tall | lazy, on open | D |

**Do not put these in the aisle tab buttons.** The buttons are 34px tall; I opened
`aisle-meat.png` and it is a ram's head with crossed knives carved in low relief. At 34px it is
a smudge. At 52px it reads. That is the whole reason the row exists.

### 2.4 The accent — `accent-canaanite`

**Already built and already wired.** `public/img/accent-canaanite.webp` (880×660, 79 KB) and
`accent-canaanite-cut.png` (273×340, 29 KB) exist, and `imagery.js` already keys both under
`canaanite`, which means the accent tile on Pantry and the accent panel already pick it up.
Nothing to do. It is listed here only so the count reaches 53.

### 2.5 The 12 moderns — `modern-*.webp`, 16:10

All twelve live in **The Wall** (§3). Three also appear ambiently.

| slug | register | The Wall order | ambient placement | load | alt |
|---|---|---|---|---|---|
| `modern-a-woman-in-the-pantry` | Minoan | 1 | — | lazy (gallery) | C |
| `modern-a-woman-shopping` | Minoan | 2 | — | lazy | C |
| `modern-family-at-the-produce-aisle` | Minoan | 3 | — | lazy | C |
| `modern-weighing-the-produce` | Egyptian | 4 | — | lazy | C |
| `modern-the-chill-cabinet` | Egyptian | 5 | — | lazy | C |
| `modern-pushing-the-trolley` | Egyptian | 6 | — | lazy | C |
| `modern-at-the-checkout` | Egyptian | 7 | Market › Never-buy panel, after the last aisle | lazy, on open | D (ambient) / C (Wall) |
| `modern-carrying-it-home` | Egyptian | 8 | — | lazy | C |
| `modern-too-many-bags` | Assyrian | 9 | — | lazy | C |
| `modern-too-many-bags-hittite` | Hittite | 10 | — | lazy | C |
| `modern-a-man-hunting` | Egyptian | 11 | Market › empty search result | lazy | F (ambient) / C (Wall) |
| `modern-the-weighing-of-the-heart` | Egyptian | 12 | Nutrition › "What this isn't" | lazy | C (both) |

The Wall order is the argument, not an accident: it is one shopping trip, from checking the
pantry to being judged at the scales. Keep it. It is why `moderns` is an ordered array in
`imagery.js` and not a map (§7).

### 2.6 Alt-text policy

The rule, stated once so it does not drift:

> **An image describes itself in `alt` only when nothing else on the screen already does.**

That resolves to three cases, and there are no others on this site:

1. **Adjacent text names the thing → `alt=""`.** This covers 40 of the 53 placements. A staple
   tile has an `<h3>` reading "Pearl barley" directly beside the picture of pearl barley; an
   aisle icon sits next to a tab that says Produce and a blurb about produce. Describing the
   fresco again is noise, not access. Note that this is already the codebase's convention —
   `Pantry.jsx` passes `alt=""` for `tile__cut` and `rcard__fig` today, for exactly this reason.
2. **A visible caption exists → `alt=""` on the `img`, description in `<figcaption>`.** This is
   The Wall. The caption is the joke's punchline; it must be visible to everyone and announced
   once, not twice. Use `<figure>` + `<figcaption>`, not `aria-label`.
3. **The image is the only content and has no caption → full `alt`.** Two placements:
   the accent plates in the accent/source panels (already correct in `imagery.js`, leave them),
   and `modern-a-man-hunting` in the Market empty state, where the paragraph is about the search
   term and the picture is the site making a joke at you. That one gets, roughly:
   *"An Egyptian tomb painting of a man in a kilt striding through the reeds with a shopping
   basket on his hip, holding up a pomegranate, two ducks flying off a supermarket shelf."*

**`imagery.js` carries a full description for every asset regardless of placement.** The call
site chooses `alt={a.alt}` or `alt=""`. That is already the file's documented policy in its
header comment; extend the comment rather than changing the convention.

---

## 3. The moderns

### The recommendation

**One full-screen overlay — "The Wall" — reached by an inline link in the footer, plus three
ambient placements in vacated space.**

The overlay reuses `Deck` (it already does scroll-snap, arrows, dots and keyboard) with one
`<figure>` per card: the fresco at up to 900px wide, a short bold title, one sentence of
caption, and a small mono label naming the art register ("Egyptian painted plaster", "Assyrian
carved gypsum"). It closes on Escape, on scrim click, and on a close button. It is
`React.lazy`-loaded so its code and its 841 KB of pictures never touch a route that does not
open it.

The trigger is a single `.linkish` button appended to the sentence the footer already renders on
every page. Concretely: shorten the existing footer sentence from

> "The kitchens of the Late Bronze Age eastern Mediterranean and Near East, c. 1750–1150 BC.
> Nothing here is recommended that the region did not have in the period."

to

> "The Late Bronze Age eastern Mediterranean and Near East, c. 1750–1150 BC. Nothing here is
> recommended that the region did not have. **The wall →**"

which is 22 characters shorter than what it replaces, so on desktop it costs zero and on a
390px phone the footer paragraph gets shorter, not longer.

### Why this and not the alternatives

**A fifth nav tab. Rejected on two grounds.** The four tabs are four jobs — what to keep, what
to buy, what to cook, what it does to you. A fifth tab that is a joke reframes the other four as
a magazine rather than a tool, and the repeated feedback on this project is the opposite
direction. Second, it does not fit: at 390px the header is already `mark | 4 tabs | theme` with
the wordmark down to 0.82rem and the tabs to 0.74rem. A fifth 60px target either overflows or
forces another type reduction across the whole nav. The gallery would cost the tool something
every single session in exchange for a thing most sessions do not want.

**Page headers — one modern at the top of each route. Rejected on the hard constraint.** A
16:10 image wide enough to read the joke (I looked; `family-at-the-produce-aisle` needs about
400px of width before the child holding the courgette resolves) is 250px tall. On four pages
that already fight for 456px of tiles region inside 760px, that is not a trade, it is a
redesign, and the no-scroll rule has already forced several. This is the most expensive option
available and it buys the least, because a header image becomes invisible by the third visit.

**A rotating hero on Pantry. Rejected.** Pantry is the page you open standing in a kitchen with
a list. It is the one surface where "instantly useful" is the entire requirement. A hero also
only ever homes one image at a time, so it does not actually solve the problem it is proposed
for.

**Empty-state art only. Rejected as insufficient, adopted as a supplement.** The site has
exactly three genuine vacancies (below). That homes three of twelve. Nine charming pictures
would stay dark, which is the thing this brief was written to prevent.

**Footer strip of thumbnails. Rejected.** The footer is 34px tall at desktop. A useful thumbnail
strip is 60px minimum, which more than doubles the footer on every route — a permanent tax paid
on all four pages. Worse, at 60px these images are unreadable, so it costs height and delivers
nothing.

**A `/moderns` route rather than an overlay. Rejected.** A route needs a way in, which lands you
back at the nav-tab problem, and it puts a browser Back press between the reader and the tool.
An overlay closes with Escape.

### The three ambient placements

Each occupies space the tool has already given up. None adds a pixel.

1. **Market, no search results → `modern-a-man-hunting`.** When `found.length === 0` the entire
   tiles grid is not rendered and about 450px of page is empty under one short paragraph. The
   picture is a supermarket hunt staged as a Nebamun fowling scene. It turns the site's only
   frustrating moment into its funniest one, and it costs nothing because the region was already
   empty. This is the single best image placement on the site.
2. **Market, Never-buy panel, after the last aisle group → `modern-at-the-checkout`.** The panel
   body is `overflow-y: auto`. A sign-off image at the bottom of "here is everything you cannot
   buy" is free height and a good closing beat.
3. **Nutrition › "What this isn't" → `modern-the-weighing-of-the-heart`.** A man judged on his
   groceries, at the foot of the section that says what this analysis is not. Place it *inside*
   the third `<section>` ("Two numbers not to trust"), not as a fourth grid child — `.caveats` is
   `repeat(auto-fit, minmax(260px, 1fr))` and a fourth child would start a new row on a
   three-column layout. Inside the third section it fills a column that is already shorter than
   its neighbours.

---

## 4. Height budget

**Reference figures, all derived from CSS, `1rem = 16px` (the root is unset; `body` is 18.5px
but that does not change `rem`).** Desktop reference is 1280×760, which is the viewport the
existing `index.css` comment says the last compression pass was measured at. Phone reference is
390×844.

Chrome, desktop, ≥641px:

| part | height | source |
|---|---|---|
| `.top` header | 53px | the author's own figure — `.seek { top: 53px }` |
| `.aisles` bar | 41px | 34px button + 2×0.2rem + 1px border |
| `.shop__note`, one line | 32px | 0.8rem × 1.4 + 0.4rem + 0.45rem margins |
| `.seek` (Market only) | 65px | 2×0.5rem pad + 47.5px `.ask` + 1px border |
| `.foot` | 34px | 2×0.45rem + 0.72rem × 1.62 + 1px |
| `.shop` padding-bottom | 24px | 1.5rem |

### Pantry › Keep in stock — **cost 0**

Chrome = 53 + 41 + 32 + 34 + 24 = **184px**. Free at 760px = 576px. The CSS budget for `.tiles`
is `calc(100dvh - 19rem)` = 456px, i.e. 120px of deliberate slack.

Change: a new modifier on the staples grid only, `.tiles--plated`.

- grid track `minmax(142px, 1fr)` → `minmax(212px, 1fr)`
- `.tile__open` becomes `display:grid; grid-template-columns: 62px minmax(0,1fr); gap:0.6rem`
- the square is 62×62 with a 1px `--line` hairline

| | now | after |
|---|---|---|
| columns at 1240px content | 8 | 5 |
| rows for 12 staples | 2 | 3 |
| tile height | ~78px | 80px (62 + 2×0.5rem pad + 2px) |
| grid height | 156px | 242px |

**+86px inside the tiles region.** Paid entirely out of the region's existing 456px budget —
242px still fits with 214px spare. **The page does not change height at all**, because `.tiles`
has been a scroll container on this breakpoint since the last compression pass. Nothing shrinks
because nothing needs to.

Phone 390px: two columns at 158px min gives ~170px tiles, which is below the 212px container-query
threshold, so the square is `display:none` and the view is byte-for-byte what it is today.
**Cost 0.**

### Pantry › Four bases, and Recipes — **cost 0 desktop**

`.bcard__head` becomes `display:grid; grid-template-columns: 80px minmax(0,1fr); gap:0.85rem`,
with the h3/line/meta stack in the right cell.

Current head height: h3 1.22rem × 1.1 ≈ 22px, `.bcard__line` 0.88rem × 1.62 ≈ 23px,
`.bcard__meta` 0.72rem × 1.62 ≈ 19px, plus 0.2/0.3rem gaps, 0.5rem padding-bottom and a 1px
border ≈ **81px**. An 80px square fits inside the block that already exists. **+0px.**

Worst case is a recipe title that wraps one line further because the text column lost 89px:
"Barley and fig feast porridge" plus a `.rcp__anc` ancient name. That is +22px, inside
`.deck__card { max-height: 60vh; overflow-y: auto }` — an internal scroller. **Page cost 0.**

Phone ≤640px: square drops to 64px, leaving 279px of a 355px card for the title. `.deck__card`
is `max-height: none; overflow-y: visible` below 641px, so this view page-scrolls today by the
codebase's own stated policy ("Below 641px the page scrolls normally — a phone has no other
option"). A 22px worst case on a card that is already 900px tall changes nothing about that.

### Market — **cost 34px, paid back exactly**

This is the one change that spends page height. **Verify in a browser.**

Chrome = 53 + 65 + 41 + 32 + 34 + 24 = **249px**. Free at 760px = 511px against a 456px cap:
55px of slack.

Change: `.shop__note` on the aisle view is wrapped in `.aislehead`,
`display:grid; grid-template-columns:52px minmax(0,1fr); gap:0.7rem; align-items:center;
min-height:52px`, keeping the existing 0.4/0.45rem margins.

| | now | after |
|---|---|---|
| note row | 32px | 66px |

**+34px.** Payment: `.tiles { max-height: calc(100dvh - 19rem) }` → `calc(100dvh - 21.2rem)`.
2.2rem = 35px, so headroom is preserved by construction (before: `chrome + cap = 100dvh − 55px`;
after: `100dvh − 56px`). **What visibly shrinks: the Produce aisle's internal tile scroller loses
about half a row.** Produce is the only aisle that reaches the cap at all — it shows 36 tiles;
the next largest (Seasoning, Dry goods) show ~20–26 and do not touch it. So the cost is borne by
one aisle, invisibly, inside a region that already scrolls.

Phone ≤640px: the icon drops to 40px and the aisle blurb already runs to 2–3 lines at 390px
(~60px), so the grid row does not grow. **Cost 0 to +8px.**

Empty-search modern: constrain to `max-height: min(46vh, 340px); width: auto; margin-inline:auto`
so it can never exceed the region it is filling. **Cost 0.**

### Nutrition — **cost 0**

The `day`, `panel` and `three` views are untouched and ship no images. `caveats` gains one image
inside its third section, `max-height: 30vh; width:auto`. If that view then exceeds the viewport
at 1366×768 (the shortest common desktop), give `.caveats` the same treatment `.tiles` already
has — `max-height: calc(100dvh - 15rem); overflow-y: auto` at ≥641px — which is the payment.
That is a one-line addition and it follows the pattern the file already establishes.

### The Wall — **outside the budget entirely**

It is `position: fixed; inset: 0`, so it does not participate in page layout. It must set
`document.body.style.overflow = 'hidden'` on open, exactly as `Market.jsx` already does for its
panels, and restore on close.

---

## 5. Dark theme

### The problem

Every one of the 33 squares and 12 moderns is painted on chalky cream plaster, roughly
`#EDE0C4`. On `--paper: #FAF6EC` that is invisible — the plate and the page are the same
material, which is why the accent plates already work with nothing but a 1px hairline. On
`--paper: #161D1B` it is a lamp. Contrast against the dark ground is about 11:1, which is more
than the body text has. Twelve 62px cream chips scattered across a dark Pantry grid will read as
holes punched in the page, and a full-width fresco in The Wall will be genuinely unpleasant.

The existing rule `:root[data-theme='dark'] .plate { filter: brightness(0.88) saturate(0.92) }`
takes `#EDE0C4` to about `#D1C5AC`. Still a lamp. Brightness alone cannot fix this, because
pushing it far enough to settle the ground (≈0.55) also crushes the dark ink outlines that carry
the drawing.

### The fix

**A multiply overlay of the page's own paper colour, on a wrapper, dark theme only.**

Wrap every square and every fresco in a `<span class="plated">` (the `img` stays as-is) and give
it an `::after` covering the image:

- `background: var(--paper)` — so it follows the theme token, not a hardcoded value
- `mix-blend-mode: multiply`
- `opacity: 0` in light theme, `0.34` in dark for painted plaster, `0.22` for the stone reliefs

Multiply is the right operator specifically because it is proportional: it takes the cream
ground down hard and leaves the near-black outlines almost untouched, so the drawing survives
while the glare does not. Brightness scales everything equally and cannot do this.

Two supporting rules:

- **Keep a hairline and a `--card` backing in both themes.** A square with a `1px solid var(--line)`
  border reads as an object placed on the page — a painted tile on a wall, which is literally
  what it is — rather than a hole. In dark theme add `box-shadow: inset 0 0 0 1px var(--line)`.
- **Two tones, not one.** `modern-too-many-bags` (Assyrian gypsum) and
  `modern-too-many-bags-hittite` (Hittite basalt) and all 7 aisle cutouts are monochrome carved
  stone at a mid-tan value, not painted plaster. They need materially less knock-back — 0.34
  makes them muddy. Hence the `tone: 'painted' | 'stone'` field in §7 and two opacity values.
  The 7 aisle PNGs are transparent cutouts with no ground at all, so they keep the existing
  `.cutout` treatment (`brightness(0.94)`) and get no overlay.

Three correctness notes for the implementer:

- **`mix-blend-mode` creates a stacking context.** Do not put a `.plated` wrapper inside
  `.tile--accent`, whose `.tile__cut` is absolutely positioned. The accent tiles are unchanged by
  this plan; keep them that way.
- **`.plate` is `aspect-ratio: 4/3` with `object-fit: cover`.** The file header in `imagery.css`
  warns about exactly this: a ratio mismatch silently crops the art a second time. The squares
  are 1:1 and the moderns are 880×550 = 16:10. **Three classes, not one:** `.plate` (4/3,
  accents, unchanged), `.square` (1/1), `.fresco` (16/10). Reusing `.plate` for a modern would
  shave 30% off the picture and the only symptom would be that it "looks badly framed".
- **The Wall's scrim should be `var(--paper-2)` at ~0.96, not black.** A black scrim behind a
  cream fresco is jarring in light theme and does nothing useful in dark. Let the overlay be the
  page's own ground in both.

### What I rejected

**Generating dark-theme variants in the pipeline.** It doubles the asset count to 90+, doubles
the byte budget, doubles the failure modes, and means every future re-roll is two jobs. The
multiply overlay costs six lines of CSS and follows the theme token automatically.

---

## 6. Loading and weight

### The one pipeline ask

**Emit a 160px WebP derivative for each of the 33 squares** — `staple-*@160.webp`,
`dish-*@160.webp`. At this art's flatness that is 5–9 KB each, ~230 KB of new files on disk.
Without it, Pantry renders twelve 880px files (624 KB) at 62px and Recipes puts seventeen
880px files (1,269 KB) in the DOM at 80px. This is the only thing in this plan that requires the
other agent's file.

The moderns need only one size (880×550 is exactly the size The Wall displays them at). The
aisle PNGs need only one size (160px tall serves both the 52px row and the 40px panel heading).

### Per-route first-paint budget

| route / state | images | bytes |
|---|---|---|
| **Pantry › Keep in stock** (default landing) | 12 × `staple@160` | **~84 KB** |
| Pantry › Six rules | 6 dealt cutouts, ≥820px only | +199 KB, lazy |
| Pantry › Four bases | 4 × `dish@160`, deck-lazy | +28 KB |
| Pantry › Accents | `kitchen-shared` + 5 accent cutouts | +199 KB |
| Pantry › staple panel open | 1 × `staple` full 880 | +26–93 KB |
| Pantry › accent panel open | 1 × accent plate | +53–89 KB |
| **Market › Produce** (default) | 1 aisle icon | **~11 KB** |
| Market, all 7 aisles visited | 7 aisle icons | 71 KB total |
| Market › empty search | + `modern-a-man-hunting` | +55 KB |
| Market › Never-buy panel | + `modern-at-the-checkout` | +54 KB |
| **Recipes** (first card visible) | 1 × `dish@160` | **~8 KB** |
| Recipes, all 17 swiped | 17 × `dish@160` | ~120 KB |
| Recipes › source panel | 1 accent plate | +53–89 KB |
| **Nutrition** › day / panel / three | none | **0 KB** |
| Nutrition › caveats | 1 modern | +52 KB |
| **The Wall** closed | none — code-split | **0 KB** |
| The Wall, first card | 1 modern | 74 KB |
| The Wall, all 12 swiped | 12 moderns | 841 KB |

A visitor who uses all four pages properly and never opens The Wall pays roughly
**370–500 KB of imagery across the whole session**, most of it after first paint.

### Eager / lazy / preload

- **Eager**: the 12 staple thumbnails on Pantry (all above the fold, all tiny) with
  `fetchpriority="low"`, and the current aisle icon on Market. Nothing else.
- **Lazy** (`loading="lazy" decoding="async"`): everything else, without exception. This matters
  most in the decks — `Deck` renders *every* card into the DOM, so Recipes has 17 images
  mounted at once. Native lazy-loading does defer horizontally-offscreen images inside a
  scroll container, so this works; dropping the attribute would turn an 8 KB first paint into a
  120 KB one.
- **Preload**: **none.** Deliberate. `index.html` already blocks first render on three Google
  Font families from a third-party origin, and those matter more than any picture on a text-first
  tool. The only plausible candidate — the current Market aisle icon — changes on every tab press,
  so a static preload would be wrong six times out of seven. Say no and move on.
- **Prefetch**: one worthwhile touch. On the first keystroke into the Market search box,
  `new Image().src = moderns.hunting.src`. It costs nothing if the search finds something, and
  makes the empty state instant if it does not. Optional; defer it.
- **Never shipped**: the twenty-one 880px `dish-*.webp` originals (1,269 KB) are referenced by no
  route under this plan.
- **Code-split**: The Wall via `React.lazy` + `Suspense`, so its JSX and its manifest slice stay
  out of the main bundle.

---

## 7. `imagery.js` shape

Additive only. The other agent is in this file; nothing existing is renamed or removed.

**Keep** `accentImages`, `accentCutouts`, `images`, `byKey` exactly as they are.

**Add four collections**, each keyed by the slug the data files already use, so no component ever
constructs a path or a key:

- `staplePlates` — object keyed by `fundamentals.js :: staples[].slug`
- `dishPlates` — object keyed by recipe/base slug, one flat map. `hot-pan-flatbread` is in both
  source files but is filtered out of Recipes by `alreadyABase`, so it has exactly one consumer
  and a flat map is safe.
- `aisleIcons` — object keyed by `market.js :: AISLES[].key`
- `moderns` — an **ordered array**, not a map. The Wall's sequence is a narrative (see §2.5) and
  order is content. Each entry still carries its `slug`, so `byKey` can flatten it.

**Extend the per-asset record.** Existing fields (`src`, `alt`, `w`, `h`, `kind`) stay; `kind`
gains two members and three fields are added:

- `kind: 'plate' | 'cutout' | 'icon' | 'square' | 'fresco'` — `'plate'` keeps meaning the 4:3
  accent scenes, so nothing existing changes meaning. `'square'` is 1:1, `'fresco'` is 16:10.
  This is what drives the CSS class, and §5 explains why a single class would silently crop art.
- `thumb: { src, w, h } | null` — the `@160` derivative. Components read `asset.thumb ?? asset`
  and never know whether the pipeline built it. That single expression is what makes the missing-
  derivative failure mode a byte problem rather than a broken layout.
- `tone: 'painted' | 'stone'` — drives the dark-theme overlay strength. Painted plaster for the
  squares and the Egyptian/Minoan moderns; stone for `too-many-bags`, `too-many-bags-hittite`,
  the 7 aisle cutouts and `kitchen-shared`.
- `alt` — always the full description, on every asset, whatever the placement. Call sites pass
  `alt=""` per §2.4. The file's header comment already says this; extend it rather than change it.

**Moderns carry three extra fields** because The Wall renders them as captioned figures:

- `title` — the caption's bold lead, three or four words: "At the checkout".
- `caption` — one sentence, the visible `<figcaption>` body. This is the joke; write it well.
- `register` — `'egyptian' | 'minoan' | 'assyrian' | 'hittite'`, rendered as a small mono label.
  It is also a natural grouping key if The Wall ever wants section breaks.

**Do not add** size constants, breakpoint hints, or class names to this file. Sizing belongs to
`imagery.css`; the manifest owns paths, intrinsic dimensions and words. That separation is why
this file has survived so far, and it is what lets §4's height numbers live in one place.

**Extend `byKey`** with all four new collections (flattening `moderns` by its `slug` field) so
the existing escape hatch keeps covering everything.

---

## 8. Sequencing

Ordered so that each step is independently shippable and the risky one is last-but-one.

1. **Pipeline: the `@160` derivatives.** Blocking for steps 3 and 4, and it belongs to whoever
   owns `process_images.py`. 33 files, ~230 KB.
2. **`imagery.js`: the four collections and the extended record.** Pure data, zero risk, unblocks
   everything. Write the twelve modern captions here; they are the most valuable words in the
   plan and the easiest to leave until too late.
3. **Dish squares in `.bcard__head`.** Highest value per line of code in the whole plan: one CSS
   rule and one JSX element, applied in two files, lands 21 of 53 assets, costs zero height, and
   makes the recipe deck look finished. Do this first among the visual changes.
4. **Staple squares: `.tiles--plated`, the container query, and the panel plate.** Twelve more
   assets, zero height cost, changes the home page most visibly.
5. **Dark theme: the `.plated` wrapper and the multiply overlay**, plus splitting `.plate` into
   `.plate` / `.square` / `.fresco`. Do this immediately after 4, not later — 33 cream chips on a
   dark page is the sort of thing that gets shipped and then lived with.
6. **Aisle icons and the Market row.** The only change that spends page height. Land it alone,
   with a browser open, and check 1280×760, 1366×768 and 390×844 before and after.
7. **The Wall.** Self-contained: one lazy component, one footer link, one CSS block. It touches
   nothing else, so it can be built in parallel with 3–6 and merged whenever.
8. **The three ambient moderns.** Five lines each, fully independent, safe to defer indefinitely.
   Order of value if you only do one: Market empty search.

Safe to defer without loss: 8, the search prefetch, and the aisle-icon repeat inside the
Never-buy panel.

---

## 9. Risks

**Threatening the no-scroll rule:**

- **The Market row is the only real exposure.** +34px against ~55px of derived slack. If my chrome
  arithmetic is off by 20px — and it is arithmetic, not measurement — Produce page-scrolls at
  1280×760. Mitigation: the `19rem → 21.2rem` change is what makes it safe by construction, so
  it must land in the same commit as the row, never after. Verify at three viewports.
- **`.caveats` on Nutrition.** I have not measured that view. Adding a `max-height: 30vh` image
  inside the third section should be free on a three-column grid, but if the view is already at
  the edge at 1366×768 it will tip. The fix is pre-decided (§4) but is an extra change.
- **Recipe titles wrapping.** Losing 89px from the title column pushes a couple of long titles to
  a third line. Contained by `.deck__card`'s internal scroller at ≥641px, uncontained at ≤640 —
  where the page already scrolls by policy. Acceptable, but it is a real regression on phone for
  anyone who thought that view was tight.
- **Container-query and `:has()` support.** `.tile--accent:has(.tile__cut)` already ships, so the
  baseline is modern. If either is missing the square is simply never displayed and the tile is
  what it is today — a safe failure, worth confirming rather than assuming.

**Byte and pipeline:**

- **The `@160` derivatives do not get built.** Components read `thumb ?? full`, so the layout is
  correct and Pantry ships 624 KB instead of 84 KB. Degrades in bytes, not in pixels — but it is
  a 7× regression on the home page and nothing will visibly complain. Add a build-time assertion
  or at minimum a console warning when `thumb` is null on a tile-sized placement.
- **`modern-too-many-bags-hittite` is 134 KB**, 54% of the 250 KB cap and by far the largest
  asset. Any re-roll of that one needs a size check.

**Correctness and quality:**

- **`dish-lentil-and-barley-pottage` and `dish-leek-lentil-and-barley-pottage` are different
  dishes with near-identical slugs**, and one is a base while the other is a recipe. A
  copy-paste error here is silent and produces a plausible-looking wrong picture. Worth an eye.
- **Alt-text drift.** If an implementer writes `alt={a.alt}` uniformly, the Pantry home page
  announces twelve paragraphs of fresco description before a screen-reader user reaches the first
  staple name. §2.4 exists to prevent exactly this; put the rule in a comment at each call site,
  not only in this document.
- **The moderns need width to be funny.** I opened six of them. `family-at-the-produce-aisle`
  needs roughly 400px before the child holding the courgette resolves; below about 320px every
  one of them is an abstract ochre smear. The Wall must not cap its figure below ~360px on a
  390px phone, which means near-zero horizontal padding on the card at that size.
- **`mix-blend-mode` and stacking contexts.** Keep `.plated` out of `.tile--accent` and out of any
  element with absolutely positioned children (§5).
- **Concurrent edits.** `imagery.css`, `index.css` and `imagery.js` are being changed by another
  agent as this is written — `imagery.css` changed on disk mid-analysis, and the accent-tile
  figure sizing has already moved once. Every line number and several of the exact values in §4
  should be re-read against the tree before anything is edited.

**Open, and what would resolve it:** the six pixel figures in §4's chrome table are computed from
CSS, not measured. Fifteen minutes with a dev server at 1280×760, 1366×768 and 390×844 —
`getBoundingClientRect()` on `.top`, `.seek`, `.aisles`, `.shop__note`, `.foot` on each of the
four routes — would replace every estimate in this document with a number, and is the first thing
I would do before implementing step 6.
