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

---

# Craft rules, measured

> ## PROVISIONAL. The test that produced these is still running.
>
> These rules come from **round one only**: three features compared against three real
> articles. Round two is half written and its comparison has not happened. Anything below may
> be revised or withdrawn when it does, and rules 12 and 13 have never been tested against
> professional work at all.
>
> This section has already been rewritten once, because the first version drew six of its
> seven examples from my own uncorrected drafts rather than from the comparison. That is the
> hazard of writing conclusions into a permanent spec while the experiment is still open.
>
> **The B&B skill gets updated once, from the finished test.** Until then, treat this as a
> working note that happens to live in the right file.

Rules 1 to 4 above bind this skill to the repo. The rules below are craft, and they come
from one specific exercise: three features written blind to a written-down theory of the
form, then compared against real National Geographic articles on the same three subjects.

**Ten predictions were made in advance. Four were right.** The ones held with most confidence
were the most wrong. That is why each rule below carries its measurement rather than its
reasoning, and it is the reason to distrust any rule here that does not.

Full working: `natgeo-exercise/COMPARISON.md`.

**5. The reporter is in the piece.**

*Measured:* I predicted the writer's first person would be sparse or absent and wrote three
features at **0%**. All three real articles have the reporter audible throughout: *"told me",
"I asked", "We awoke", "I notice that Zagloul signed his name next to Carter's and wonder if
they conversed."*

Use it sparingly, and use it for one job: **carrying the access.** The permission that took
four months, the source who refused twice, the specimen I was allowed to see and not
photograph, the thing I could not see that somebody else could. Without a narrator, the
difficulty of getting the material cannot be reported, and the difficulty is frequently the
story.

The failure mode this rule exists against is subtle. My drafts contained *"which is somehow
worse"* and *"briefly humiliating for everybody else present"* — a narrator plainly present,
having reactions, while grammatically forbidden from existing.

**6. One landed beat per piece, at the end if anywhere.**

*Measured:* the Tutankhamun feature closes on *"The shadows move but the dark is never quite
uplifted."* They do land beats. They do it **once**. My drafts ran seven to nine, roughly one
per section.

The failure shape is a paragraph ending on something short and quotable where the explanation
should be: *"Here is where the sums close." "That is the whole function, and the function
works."* Each gestures at an insight and leaves the reader to reconstruct it, which most will
not do, so the prose sounds confident and transmits nothing.

**Sweep for it separately.** Read only the final sentence of every paragraph. It cannot be
seen while writing. `npm run prose` now reports aphorism creep with a threshold that scales
to the length of the piece.

**7. Occupation and institution, not age.**

*Measured:* the Mosquitia feature names thirteen people, gives an occupation for essentially
all of them, and an age for essentially none. My drafts were studded with "Bobby Tavares, 63"
at a rate of 38 to 64 percent of the cast.

Name-comma-age is a newspaper convention. Give the job, the affiliation, and the thing they
are responsible for. Age only where the age is doing work.

**8. Thread the mechanism. Do not lecture it.**

*Measured:* I committed in advance to explaining mechanism "in full" and predicted the form
would carry a long science passage. The Cape Cod feature is thin on shark biology and heavily
people-and-policy; the Mosquitia feature gives lidar about 300 words. I wrote long passages on
countercurrent heat exchange, cation exchange capacity and last-return filtering.

**Roughly 400 words of mechanism across a whole piece, in two or three placements.** If the
subject genuinely needs more, it is a science feature, and it should be called one rather than
smuggled in.

**9. Put the numbers in.**

*Measured:* a draft of mine carried **6** numerals. Real features are dense with counts,
dates, distances, prices and durations. Rewriting the same reporting with the measurements
present took it to 32 and the piece got better, not longer-winded.

Specificity reads as having gone. Vagueness reads as not having gone.

**10. A short piece dropped its reporting. It is not tight.**

*Measured:* a draft came in at 2,333 words against a 3,000 floor. The cause was not
compression. **Eleven people were cast and seven were used**, and the four dropped were the
reluctant dealer, the enforcement official and the technical specialist, which is to say the
hardest to get and the most interesting. Restoring three of them took the piece to 3,218
words with no padding whatsoever.

When a piece is short, audit the people before you audit the prose. A character introduced and
then unused is several hundred words that were never written.

**11. Subheads are signposts, not titles.**

*Measured:* real subheads run RARE BUT INEVITABLE, WHAT TO DO?, RETURN OF THE SEALS, THE NEW
NORMAL. Mine ran "Why the works sit on the shingle and smell so bad." **Five words or fewer.**

**12. Chain, not tour.**

A tour presents eight true things in a row and the reader finishes holding facts and no
mechanism. A chain makes each fact force the next. Shuffle the sections: if the piece
survives, it was a tour. Between consecutive sections try to insert *and therefore*; if only
*also* fits, the chain is broken there.

*Provenance note:* this one is not from the comparison. It came out of rewriting a Barley &
Bronze article after a reader said the details "don't add up to understanding", and it has not
been tested against professional work.

**13. Answer the question the reader is actually asking.**

If the subject is costly, they want the cost. Withholding the number for elegance is a
failure and not restraint. One draft had a source say *"nobody counts snails"* and moved on,
which felt graceful and was the article declining its own job.

Same fault, second occurrence, in a later draft: a fossil dealer "declined to specify" what a
farmer gets paid, and I let it stand. The reader wants the price. Get the price, or say
plainly why it could not be got.

*Provenance note:* also not from the comparison. Reader-caught, twice.
