---
name: beautiful-prose
description: A hard-edged writing style contract for timeless, forceful English prose without modern AI tics. Use when writing or rewriting any prose that ships on this site — post bodies, standfirsts, captions, standing boxes, recipe notes, market verdicts, page copy — or when asked for prose that must be clean, exact, concrete, and free of AI cadence, filler, or therapeutic tone.
---

# Beautiful Prose

A style contract, not a vibe. Treat violations as failures.

Source: community skill, installed into this project verbatim below the
**Project binding** section. That section is this repo's own and takes precedence where the
two touch.

## What this skill does

When active, write prose that is:

- clean, exact, muscular
- readable at speed, rewarding on reread
- concrete, image-bearing, verb-forward
- confident without bombast
- free of modern content-marketing cadence

No filler. No "helpful assistant" tone. No therapy voice.

## Absolute prohibitions

**1) Em dashes.** Use periods, commas, colons, semicolons, or line breaks.

**2) "It's not X, it's Y" constructions.** Ban the pattern and its masked variants:

- "This isn't about X. It's about Y."
- "Not X but Y."
- "X is a symptom. Y is the cause." (as a cheap reversal)
- "The real story is Y." (when it is only a pivot)

**3) Filler transitions and scene-setting.** "At its core", "In today's world", "In a world
where", "That said", "Let's explore", "Ultimately", "What this means is", "It's important to
note", "On the one hand".

**4) Therapeutic or validating language.** "I hear you", "That sounds hard", "You're valid",
"Give yourself grace", "Be kind to yourself".

**5) AI tells and meta commentary.** "In this essay", "This piece explores", "As a writer",
"We will discuss", "Here are the key takeaways", apologies for style or capability.

**6) Symmetry padding.** No balancing sentences for the sake of balance. No three-part lists
unless earned. No "X, Y, and Z" as decoration.

## Positive constraints

**Sentence craft.** Prefer declarative sentences. Vary length aggressively. Use short
sentences as impact. Questions are allowed only when they cut.

**Word choice.** Prefer concrete nouns to abstractions. Prefer strong verbs to adverbs.
Prefer Anglo-Saxon weight where possible. Use Latinate precision only when it buys accuracy.

**Rhythm and structure.** Paragraphs should breathe. White space is intentional. Open with
substance, not a hook. Close cleanly without summary. Do not restate the thesis.

**Authority.** Write as if truth does not need permission. Avoid hedging unless the
uncertainty is essential and explicit. Do not posture. Do not moralize.

## Registers

- **founding_fathers** — formal, spare, civic gravity. Balanced syntax, never decorative.
  Moral clarity without sermon.
- **literary_modern** — vivid, lean imagery. Controlled heat, sharp observation. Minimal
  ornament.
- **cold_steel** — severe compression. Punchy, unsentimental. High signal, low warmth.
- **journalistic** — crisp, factual, narrative clarity. Clean momentum, no clickbait cadence.

Default to literary_modern.

## Quality bar

Before finalizing, check:

- Remove any line that sounds assembled from templates.
- Remove any sentence that merely repeats the previous one.
- Remove any sentence that exists to steer the reader's emotions.
- Ensure every paragraph advances meaning.

If quality is uncertain, write less. Silence beats slop.

## Lint checklist

Fail the output if any are true:

- Contains an em dash.
- Contains a reversal pivot ("not X, Y").
- Contains filler transitions from the banned list.
- Contains therapy language or validation.
- Contains meta writing talk ("this essay", "we will").
- Contains five consecutive sentences of similar length.

---

# Project binding

This repo ships prose in `src/data/*.js`, not in chat. Four rules bind the skill to it.

**1. Scope.** The contract governs SHIPPED PROSE: post bodies, standfirsts, image captions,
`standing` boxes, recipe notes, market verdicts, page copy. It does not govern source
comments, `docs/*.md`, or image prompts in `scripts/narrators.py`, all of which are
engineering documentation and keep their em dashes.

**2. The em dash ban is real here.** This site's prose used them at roughly one per
sentence. Run `npm run prose` and fix every hit in shipped strings.

**3. Register is per writer,** set in `docs/personas.md` and repeated here so it is one
lookup:

| Writer | REGISTER | DENSITY | HEAT |
| --- | --- | --- | --- |
| Yadinu of Ugarit | literary_modern | standard | warm |
| Henut of Set Maat | cold_steel | lean | warm |
| Balāṭu of Babylon | journalistic | dense | hot |
| Anniwiya of Millawanda | cold_steel | lean | warm |

Balāṭu is the only one who argues, so he alone gets `dense` and `hot`. Henut and Anniwiya share a register and both run warm. Henut’s prose is lean because she
is a foreman, but the woman is funny and full of appetite, and the terseness is competence
rather than coldness.

**4. Order of authority.** `docs/style.md` first, this skill second, `docs/voice.md` third,
`docs/personas.md` fourth. `style.md` carries two rules this skill does not: the **negation
counterweight** ban, and **one idea per sentence**. Both were written against faults found
in this corpus and neither is optional.
