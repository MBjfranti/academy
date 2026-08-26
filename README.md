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
    fieldReports.js the posts       │  EMPTY — see below
    kitchen.js      flavour + nutrition per dish
    sourcing.js     3-tier substitution engine
    grades.js       evidence grading
  _parked/     the earlier archive pages — see _parked/README.md
```

## The writing

The home page is a grid of posts, and **there are currently none**. The site ran thirteen
articles by a single narrator, they had drifted into being a journal about him rather than
writing about places, and they were scrapped. `git log` has every word if one is wanted back.

What replaces them is four writers, each with one part of the map:

| | Beat |
| --- | --- |
| **Yadinu** of Ugarit, 31, a provisioning scribe | The Levant and eastern Anatolia |
| **Henut** of Set Maat, 46, bread and beer for the tomb crew | Egypt |
| **Balāṭu** of Babylon, 54, a temple cook | Mesopotamia and Elam |
| **Anniwiya** of Millawanda, 32, ground grain at Pylos and now weighs oil | The Aegean and western Anatolia |

Every post names its writer and every post arrives at a recipe. The beat is enforced rather
than trusted: a post filed under `aegean` and signed by the Babylonian cook fails at import.

Four documents govern the prose, in this order of authority:

- **`docs/style.md`** — active voice, three-to-five-sentence paragraphs, and a ban list of
  AI-slop constructions. Mechanical and non-negotiable. Run `npm run prose`.
- **`docs/voice.md`** — the spirit conceit, the pronoun rule, four catalogued tics.
- **`docs/personas.md`** — the four writers: backstory, physical description, voice, and
  what each of them is wrong about.
- **`.claude/skills/beautiful-prose/SKILL.md`** — the installed style contract the
  first three enforce. Bans em dashes, reversal pivots and filler; sets a register per writer.
- **`scripts/narrators.py`** — the image half of the same brief.

## The pictures of the writers

Everything else on this site is drawn. The writers are photographs, and the contrast is the
point: the drawings are diagrams, the writers are people.

**The article commissions its own pictures, in that order.** A post places an image where
the prose needs one and describes it in a `scene`, plus a `who` naming which writer stands
in it (or `null` for a still life, which drops the face and dress blocks from the prompt).
`npm run frames` collects those into `scripts/frames.json`, which is the work order the
generator and the processor both read. An image with no `scene` is an existing frame already
on disk and nothing tries to remake it.

They generate through the existing OpenAI pipeline as their own tier — National Geographic
register, available light, real skin and hand-woven cloth, with the period research written
into the prompt as hard negatives, because most Bronze Age image error is a first-millennium
beard or a rotary quern rather than anything exotic.

```bash
python scripts/generate_images.py --tier writers               # plan, spend nothing
python scripts/generate_images.py --show henut-face            # one full prompt
python scripts/generate_images.py --tier writers --execute --budget 4.40
npm run frames                                                 # posts -> frames.json
python scripts/process_writers.py --write                      # then the back half
```

Generate the four `*-face` frames first and judge the rest of each set against them. A
drifted set is much cheaper to prevent than to reroll.

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
