---
name: beautiful-prose-v3
description: Writing style contract plus craft rules measured against professional feature journalism across two test rounds. Use when writing or rewriting any prose that ships on this site (article bodies, standfirsts, captions, standing boxes, recipe notes, page copy) and for reported features. Supersedes beautiful-prose and beautiful-prose-v2. Split into universal craft rules, Barley & Bronze house rules, and reported-feature rules, so it is clear which apply to a 1226 BC persona and which do not.
---

# Beautiful Prose v3

A style contract, not a vibe. Treat violations as failures.

**Provenance.** Part 1 is a community skill, kept verbatim. Parts 2 to 4 are this repo's own.
Part 3 was measured: ten features were written blind to a written-down theory of magazine
craft, then compared against real National Geographic articles on the same subjects, across
two rounds. **Of seventeen predictions made in advance, seven were right.** The ones held
with most confidence were the most wrong. That is why every rule in Part 3 carries its
measurement, and it is a reason to distrust any rule that does not.

Working: `natgeo-exercise/COMPARISON.md` and `COMPARISON-2.md`.

**Skills cache for the whole session.** Editing a skill mid-session does nothing, and a new
skill is not discoverable until the next session. That is why this is a new file rather than
an edit.

---

# PART 1: The style contract

## Absolute prohibitions

**1) Em dashes** in shipped Barley & Bronze prose. Use periods, commas, colons, semicolons,
or line breaks. (Suspended for reported features; see Part 4.)

**2) "It's not X, it's Y" constructions.** Ban the pattern and its masked variants: "This
isn't about X. It's about Y." / "Not X but Y." / "X is a symptom. Y is the cause." as a cheap
reversal / "The real story is Y" when it is only a pivot.

**3) Filler transitions and scene-setting.** "At its core", "In today's world", "That said",
"Let's explore", "Ultimately", "What this means is", "It's important to note".

**4) Therapeutic or validating language.**

**5) AI tells and meta commentary.** "In this essay", "This piece explores", "As a writer".

**6) Symmetry padding.** No balancing sentences for balance. No three-part lists unless
earned.

## Positive constraints

**Sentence craft.** Prefer declarative sentences. Vary length aggressively.

**Word choice.** Concrete nouns over abstractions. Strong verbs over adverbs. Anglo-Saxon
weight where possible; Latinate precision only when it buys accuracy.

**Rhythm.** Paragraphs breathe. Open with substance. Close without summary and without
restating the thesis.

**Authority.** Write as if truth does not need permission. Avoid hedging unless the
uncertainty is essential. Do not posture. Do not moralize.

---

# PART 2: Barley & Bronze house rules

These bind the skill to the site and apply to shipped prose in `src/data/*.js`: article
bodies, standfirsts, captions, `standing` boxes, recipe notes, page copy. They do not govern
source comments, `docs/*.md`, or image prompts.

**Register is per writer.**

| Writer | REGISTER | DENSITY | HEAT |
| --- | --- | --- | --- |
| Yadinu of Ugarit | literary_modern | standard | warm |
| Henut of Set Maat | cold_steel | lean | warm |
| Balāṭu of Babylon | journalistic | dense | hot |
| Anniwiya of Millawanda | cold_steel | lean | warm |

Balāṭu is the only one who argues, so he alone gets `dense` and `hot`. Henut is lean because
she is a foreman, and the terseness is competence rather than coldness.

**Order of authority.** `docs/style.md` first, this skill second, `docs/voice.md` third,
`docs/personas.md` fourth. `docs/style.md` carries the **negation counterweight** ban and
**one idea per sentence**; neither is optional. `docs/article-structure.md` governs shape.

**Shape.** 1,500-2,000 words, 40-52 paragraphs, sentences averaging about ten words. Articles
must EXPLAIN the cultural thing they are about, in the writer's voice.

**The writers live in 1226 BC.** They know nothing of the future and never address a modern
reader.

---

# PART 3: Universal craft rules

**These apply to everything, including the 1226 BC personas.** Measured against professional
work, and the reason each is here is given.

## U1. Explanation over aphorism. One landed beat per piece, at the end if anywhere.

*Measured:* the Tutankhamun feature closes on *"The shadows move but the dark is never quite
uplifted."* They land beats. They do it **once**. My drafts ran seven to nine, roughly one per
section, and a reader had to catch it twice by hand before it was noticed.

The failure shape is a paragraph ending on something short and quotable where the explanation
should be:

> ✗ Here is where the sums close.
> ✗ That is the whole function, and the function works.

Each gestures at an insight and leaves the reader to reconstruct it, which most will not do,
so the prose sounds confident and transmits nothing. Replace the beat with the thing it stood
in for, even when that is longer and plainer.

**Sweep for it separately.** Read only the final sentence of every paragraph. It cannot be
seen while writing. `npm run prose` reports **aphorism creep** with a threshold that scales to
length.

## U2. Chain, not tour.

A tour presents eight true things in a row and the reader finishes holding facts and no
mechanism. A chain makes each fact force the next.

**Two tests.** Shuffle the sections: if the piece survives, it was a tour. Between consecutive
sections try to insert *and therefore*; if only *also* fits, the chain is broken there.

## U3. Change altitude on purpose.

Ground level is a person, an object, a thing happening now. Altitude is the explanation, the
history, the numbers, the system. Neither survives alone: a long run on the ground is a
travelogue, a long run at altitude is an encyclopaedia entry.

Go **up** only when the ground has raised a question. Explanation arriving ahead of its
question is a lecture and gets skimmed. Come **down** when the explanation reaches a
consequence you can point at.

## U4. Answer the question the reader is actually asking.

If the subject is costly they want the cost; if dangerous, the odds; if slow, the duration.
Withholding the number for elegance is a failure and not restraint.

*Twice caught:* a source said *"nobody counts snails"* and the piece moved on, which felt
graceful and was the article declining its own job. Later, a fossil dealer "declined to
specify" what a farmer is paid and that was allowed to stand. Get the number, or say plainly
why it could not be got.

## U5. Put the numbers in.

*Measured:* a draft of mine carried **6** numerals; the real features are dense with counts,
dates, distances, prices and durations. Rewriting the same reporting with measurements present
took it to 44 and improved it.

Specificity reads as having gone. Vagueness reads as not having gone.

## U6. A short piece dropped its reporting. It is not tight.

*Measured:* a draft came in at 2,333 words against a 3,000 floor. The cause was not
compression. **Eleven people were cast and seven were used**, and the dropped four were the
hardest to get and the most interesting. Restoring three took it to 3,218 with no padding.

A later draft passed the cast check and was still short, and the real gap was worse: **nothing
in it had been damaged.** A feature about protecting heritage in a war with no struck building
weighs every measure against a danger the reader is told about and never shown.

**When a piece is short, audit the material before the prose.** In order: is anybody cast and
unused; is the central thing shown or only described; is a process summarised where it could
be followed; is the failure case reported as well as the working one.

## U7. Subheads are signposts, not titles.

*Measured:* real subheads run RARE BUT INEVITABLE, THE TOUGHER QUESTION, BACK ON THE RIM, and
sometimes just a place name: Kurdistan. Mine ran "Why the works sit on the shingle and smell
so bad." **Five words or fewer.**

## U8. The second voice wants something the article does not.

Arad-Ea is buying cheap brick. Kuwatta is paid whether the cloak means anything or not. The
moment the second voice starts agreeing with the thesis they have become a puppet, and a
reader can feel it.

## U9. Consider giving the last word to a source.

*Measured:* three of the five real articles examined end on somebody speaking. All five of
mine ended on narration, across two rounds, without my noticing.

> "It's almost like they're knitted together," she said. "No one ever tells the past without
> telling the present."

Not mandatory. But it hands the ending to the person the story is about, and it is plainly a
house move that I have never once reached for.

---

# PART 4: Reported features only

Do not apply these to a 1226 BC persona. A Bronze Age writer has no institutions to cite, no
ages to withhold and no aeroplane to miss.

**Suspended for features:** the em dash ban, the per-writer register table, ten-word
sentences, one-idea-per-sentence, and the 1,500-2,000 word shape. Do not run `npm run prose`
on a feature draft. Use `node scripts/check_feature.mjs`.

## F1. The reporter is in the piece, at 10-25% of paragraphs.

*Measured:* I predicted the writer's first person would be sparse or absent and wrote three
features at **0%**. Every real article has the reporter audible. Round two set a band of
5-20% and both real comparisons were still described as heavy or prominent, so the band
moves up.

Use it for one job: **carrying the access.** The archives feature is the model, documenting
meetings "granted conditionally", reluctant elders, negotiations "lasting hours with minimal
results", and a source refusing to disclose the size of his own collection.

## F2. Go somewhere else.

*Measured, and missed in both rounds.* Real features are built as circuits. The dinosaur
feature runs Yucatán, Los Angeles, Wyoming, back to the Yucatán. The archives feature is three
countries and uses the place names as its subheads.

Both of my round-two pieces stayed in one place and imported the second site as testimony, by
phone. **The form goes there.** Build two or three separated locations doing versions of the
same thing, cut against each other, with the reporter physically moving between them.

## F3. Occupation and institution. Ages at about a quarter.

*Measured:* Mosquitia names thirteen people with occupations and essentially no ages, and I
over-corrected to zero. The archives feature gives ages for roughly a quarter of its cast.
Give the job and the affiliation always; the age where it does work.

## F4. Thread the mechanism, do not lecture it.

*Measured:* the Cape Cod feature is thin on shark biology; Mosquitia gives lidar about 300
words. I wrote long passages on heat exchange, cation exchange capacity and last-return
filtering. **Roughly 400 words across a whole piece, in two or three placements.**

## F5. Length: 4,000-5,500 words.

*Measured:* real features run 3,200 to 5,500, clustering at 4,500 plus. **I have now written
five features at or near the bottom of whatever range I set**, which is a fact about me rather
than about the form. Set the floor high.

## Declared deviations

Two places where I depart from the model deliberately, recorded so they are choices rather
than failures.

**The unresolved disagreement.** I cast a live, unsettled dispute into every feature. Three of
five real articles have none. Round two found one that does, so this is available in the form
and used sometimes; my insistence remains a deviation and I think it is an improvement.

**Institutional machinery.** The archives feature discusses no conventions or legal frameworks
at all, in a story about saving archives. I build on them. I reach for the system where they
reach for the person, and I am keeping it where the system is genuinely the subject.
