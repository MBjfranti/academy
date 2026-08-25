# Barley & Bronze

The kitchens of the Late Bronze Age eastern Mediterranean and Near East, c. 1750–1150 BC,
built for someone standing in an ordinary supermarket.

Barley for what everyone actually ate, every day, in every one of these kitchens.
Bronze for the trade that moved it — and for the copper that gives these pages
their colour.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

React 19 + Vite + React Router. Plain CSS, no framework. No dependencies
beyond those.

## The two pages

**Pantry** (`/`) — four tabbed sections, no long scroll:

- *Keep in stock* — the twelve staples, each opening a Buy / Used in / Keeps sheet
- *Six habits* — the structural moves all five kitchens shared
- *Four bases* — real recipes with quantities (pottage, flatbread, allium base, strained yoghurt)
- *The five kitchens* — a comparison table of what actually differs between them

**Market** (`/market`) — the shopping tool:

- Search first. Any query resolves to a full-width **Yes / Careful / No** card
  with the reason and, for every No, a **Buy instead** substitution.
- Results are ranked so a No can never hide beneath a Yes (search `pepper`).
- Search deliberately **ignores the kitchen filter** — you are holding the
  thing; the answer must not depend on a setting made last week.
- Aisle browsing as the fallback: seven aisles, dense tile grid, one screen.
- **Never buy** panel — everything excluded, grouped by aisle, with substitutions.

## The kitchen / table setting

One pill, one sheet. Five cultures (Babylon, Egypt, Mycenae, Hatti, Canaan)
and two tables (Commoner, Elite). Persists in `localStorage`.

It narrows the aisles you browse and annotates staples for that culture. Most
of the pantry is genuinely shared — grain, pulse, allium, salt — so only ~57
of ~160 market items carry culture tags at all. Untagged means everyone.

## The one rule

Every substitute must be something the same region grew, herded or traded in
the same period. The site will send you to a supermarket. It will not send you
out of the Bronze Age. Where an ordinary shop has nothing legal — bog myrtle,
tiger nuts — it says *leave it out* rather than inventing a swap.

Excluded throughout: tomato, potato, chilli and peppers, maize, all New World
beans, courgette and squash, citrus, cane sugar, aubergine, spinach, rice,
pasta, couscous, black pepper as a cooking spice, chicken as a staple, hops,
distilled spirits, coffee, tea, vanilla, seed oils.

## Source layout

```
src/
  pages/       Pantry.jsx  Market.jsx
  components/  Layout.jsx  Profile.jsx      (profile context + pill + sheet)
  data/
    market.js       ~160 supermarket items: verdict, reason, substitution,
                    culture and table tags, search aliases
    fundamentals.js 12 staples, 6 building blocks, 4 base recipes
    tags.js         the five cultures and their signature grain/fat/sour/sweet
    recipes.js      21 full dishes  ─┐
    regions.js      8 regions        │  research from the earlier build.
    corpus.js       18 sources       ├─ still live, currently unrouted.
    methods.js      technique essays │
    fieldReports.js test-kitchen logs│
    kitchen.js      flavour + nutrition per dish
    sourcing.js     3-tier substitution engine
    grades.js       evidence grading
  _parked/     the earlier archive pages — see _parked/README.md
```

## Theme

Light by default; `☾` toggles dark. Both are defined as CSS custom property
sets on `:root` and `:root[data-theme='dark']`. The palette is copper
chemistry — native copper (warm), verdigris (green), Egyptian blue — with
green and rust carrying the buy / leave verdicts.

## Accuracy

Content follows published work on the Yale Babylonian culinary tablets
(YBC 4644 / 8958 / 4648), Linear B commodity tablets from Pylos and Knossos,
Egyptian tomb reliefs and ration ostraca, Hittite festival texts, the Tel
Kabri palace wine cellar residue study, the Uluburun wreck cargo, and the
Egtved birch-bark bucket residue analysis. Contested identifications are
marked *Careful* rather than asserted.
