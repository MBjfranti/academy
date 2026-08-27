# The style rules

`voice.md` is about who is speaking. `personas.md` is about which of the four it is. This
file is about the sentences, and unlike the other two it is not advisory. **Every rule here
is a hard constraint on every piece of prose that ships**: post bodies, standfirsts,
captions, `standing` boxes, recipe notes, market verdicts, page copy.

Three rules, in order of how often they are broken.

---

## 1. Active voice

**The thing that acts is the subject of the sentence.** Passive is permitted only when the
actor is genuinely unknown or genuinely irrelevant, and that is rarer than it feels while
writing.

| ✗ | ✓ |
| --- | --- |
| The grain was carried in by donkey. | Donkeys carried the grain in. |
| The canal is dug out every spring. | They dig the canal out every spring. |
| It was decided that the ration would be cut. | The vizier cut the ration. |
| The dish is finished with sumac. | Scatter sumac over it. |
| Beer was brewed by the same women who baked. | The women who baked also brewed. |
| No recipe has been preserved from the Aegean. | Nobody in the Aegean wrote a recipe down. |

That last pair matters most, because the passive is how a writer hides an absent actor. "No
recipe has been preserved" invites the reader to imagine a loss. "Nobody wrote one down" is
the actual fact, it names who did not do the thing, and it is the site's whole argument.

**The related ban: no nominalisation.** Do not turn a verb into a noun and then need a
second, weaker verb to carry it.

> ✗ The making of the broth takes place over two days.
> ✓ The broth takes two days.

> ✗ There is a reliance on dried fish for protein.
> ✓ They eat dried fish because there is nothing else.

**And: no expletive openers.** `There is`, `There are`, `It is`, `What is X is Y`. Almost
every one hides a real subject one clause to the right. Find it and put it first.

### Grep

    grep -nE "\b(was|were|is|are|been|being|be) [a-z]+(ed|en)\b" src/data/*.js
    grep -nE "\bThere (is|are|was|were)\b" src/data/*.js
    grep -nE "the (making|cooking|preparation|addition|inclusion) of" src/data/*.js

The first returns false positives — `is dried`, `were fed`, and every legitimate description
of a state rather than an action. Read each hit and ask **who did this**. If the answer is a
person and they are not the subject, rewrite.

---

## 2. Shorter paragraphs

The old corpus averaged around 150 words a paragraph and its worst ran past 200. On a phone
that is four full screens without a break, and a reader scrolling one of those is not
reading it.

**Three or four sentences. Around 37 words. One idea.** A paragraph carries a single
observation, a single argument or a single step, and it stops when that is done. Sentences
average **ten words**, and the longest in a piece should stay under thirty.

> **These numbers were measured, not guessed.** This file originally asked for 80-word
> paragraphs, written before a single article existed. The eight published pieces run at
> half that: 37-word paragraphs of ten-word sentences. See `docs/article-pattern.md`, which
> holds the full measured shape and wins wherever it disagrees with this file.

A one-sentence paragraph is allowed and effective when it turns the piece. Twice a piece at
most, or it becomes a drumbeat.

**This is not permission to write in fragments.** `voice.md` §9 stands and is the more
important rule: every sentence gets a subject and a verb, and long sentences are still
welcome. The fix is where the paragraph breaks, not how the sentences are built. A
five-sentence paragraph of properly subordinated prose is exactly right. Five verbless
thumps are worse than the 200-word slab.

Where to break:

- When the subject changes — from the canal to the market, from the person to the dish.
- When the piece moves in time.
- Before and after direct speech.
- Before a step in a method, and between steps.
- When a paragraph starts arguing after it has finished describing.

`body` is an array of strings, and that structure is the discipline made visible. A long
entry in it looks long.

### Check

    npm run prose

Over 110 words in one paragraph is a fault. Over 140 is a defect.

---

## 3. One idea per sentence. End the thought.

The default register is afraid to stop. Every sentence picks up a trailing clause carrying
one more fact, so the reader never gets a place to put anything down:

> ✗ For eleven years I sat in a storeroom at Ugarit writing down what came off the ships,
> and for all eleven of them I thought geography was a list of names attached to jars.

> ✗ He walked out at twenty-six and has spent the five years since on the road, which
> matters to how he reads, because he is no longer a clerk on an adventure but a competent
> traveller who knows what a driver charges.

Each is grammatical. Each is also three facts wearing one sentence, and after four of them
in a row the reader has stopped tracking which clause modifies what.

**The rule.** A sentence makes ONE assertion. When you reach for `, and` / `, which` /
`, so` / `, because` to bolt on a second fact, use a full stop instead. At most one
subordinate clause per sentence; a second only when it is short and genuinely dependent.

> ✓ For eleven years I sat in a storeroom at Ugarit and wrote down what came off the ships.
> Emmer arrived from the Delta. Copper came from Alašiya. I could price all of it to the
> shekel. My picture of the Delta was a number and the shape of a jar.

**Vary the length on purpose.** Five short sentences of identical shape is its own
monotony. Mix a six-word sentence against a twenty-word one, and let the long one earn its
length by carrying a genuinely complex idea rather than three simple ones.

**This is not permission to write in fragments**, and that distinction is the whole
difficulty. `voice.md` §9 still stands: every sentence takes a subject and a verb. *"Emmer
from the Delta. Copper from Alašiya."* is the wrong fix. *"Emmer arrived from the Delta."*
is the right one. Short and verbless are different things.

### This supersedes voice.md on one point

`voice.md` §14 asks for prose that is UNHURRIED, where "the rhythm comes from clause
structure — subordination and cadence". §9 says "the fix for accretion is **subordination**
— put the logic in the sentence structure — not amputation." Followed literally, those two
instructions produce exactly the fault above, and they did.

Read them now as advice about **paragraph** rhythm rather than sentence construction. A
paragraph may still be unhurried and a description may still run long. The logic goes into
the order of the sentences, not into a chain of clauses inside one of them.

### Check

    npm run prose

It flags any sentence carrying two or more clause joins, and any sentence over 32 words.
Both are reports rather than verdicts: a long sentence doing one complex job is fine, and
the checker cannot tell. Read the hit and ask **how many facts is this carrying?**

---

## 4. No AI slop

The failure mode is not a bad sentence. It is a sentence *shape* that appears everywhere,
carries a rhythm instead of a fact, and reads as machine-written on sight. Everything below
is banned outright. There is no dose at which these are acceptable.

**The false-antithesis pivot.** *"It's not just a canal — it's a promise."* *"This isn't
about bread. It's about power."* *"Not a meal so much as a statement."* The shape claims
depth by denying a reading nobody held. State the thing.

**The negation counterweight.** *"Ninety-one people eat what comes out of my yard. Not one
of them has ever seen the king."* *"A ship can touch all of it in one season. A man walking
cannot."* *"The poem gives those women names. Our tablets do not."* *"He would not recognise
the king, and he would recognise the pot."*

A statement, followed by its own negative mirror, as the closing beat. This is the worst one
on the list and it earned its place: the first four posts written under these rules carried
**thirty-one of them across roughly three thousand words**, roughly one per paragraph, and
every paragraph therefore landed on the same seesaw. It survives a false-antithesis check
because nothing is being denied — the second clause is a genuine fact. It is still a tic,
because the shape is doing the work instead of the content.

The tells: a sentence opening `Not` / `Nor` / `Neither` / `Nobody` / `None` straight after a
full stop; `not one of`; `never once`; a modal answered by its own negative (`can` … `cannot`,
`would` … `would not`); and `, and I have not` / `, and she does not` tags.

**The cure is almost always to say what IS the case.** The negative half nearly always
contains a better fact than the negation of the positive half:

| ✗ | ✓ |
| --- | --- |
| The poem gives those women names. Our tablets do not. | The poem gives those women names. Our tablets give a number and a place of origin. |
| Ninety-one people eat here. Not one has seen the king. | Ninety-one people eat here, and the king pays for every loaf. I know him the way I know the flood: by what arrives. |
| A ship touches all of it in one season. A man walking cannot. | A ship touches all of it in one season. Walking, you would still be in the Amuq at harvest. |
| He is not a prince and nobody sings about him. | He holds a piece of land and owes the palace flax. |

A real contrast set out as two positive facts is **arrangement**, which `voice.md` §15 asks
for. Keep those. It is the mirrored negative that goes.

**The rule of three as rhythm.** *"Cheap, filling and endlessly adaptable."* Three items
because three sounds finished, rather than because there are three. If there are four, write
four. If there are two, write two.

**The em-dash restatement.** *"The canal — the thing that makes any of this possible —
silts every year."* One appositive in a paragraph is prose. Repeated, it is the loudest tell
in the file. Budget roughly one em-dash per paragraph across a piece.

**The trailing participial clause.** *"…, creating a dish that…"*, *"…, making it one
of…"*, *"…, ensuring that…"*, *"…, allowing them to…"*, *"…, cementing its place as…"*.
Each glues a conclusion onto a sentence that had already finished. Cut it, or give it a real
subject and a full stop.

**The summarising close.** A last paragraph that restates the piece. The reader has just
read it. `voice.md` §15 explains why this is a symptom rather than a habit: arrangement
carries the argument, so a piece that needs summarising failed earlier.

**The elevated abstract noun.** `journey`, `tapestry`, `testament`, `cornerstone`,
`backbone`, `lifeblood`, `heart of`, `soul of`, `window into`, `lens through which`,
`interplay`, `narrative`, `realm`, and `landscape` or `world of` used figuratively.

**The reviewer's verb.** `showcases`, `highlights`, `underscores`, `boasts`, `serves as`,
`stands as`, `speaks to`, `embodies`, `captures`, `offers a glimpse`, `delves into`,
`explores` (of an inanimate thing), `nestled`, `dotted with`, `steeped in`, `rich in
history`, and figurative `reflects`.

**The flourish adverb and the hedge.** `truly`, `genuinely`, `actually`, `simply`, `merely`,
`quite literally`, `arguably`, `remarkably`, `strikingly`, `fascinatingly`, `crucially`,
`importantly`, `notably`, `essentially`, `fundamentally`, `at its core`, `ultimately`,
`perhaps unsurprisingly`.

**The narrator clearing their throat.** `It's worth noting that`, `It's important to
remember`, `Here's the thing`, `Make no mistake`, `Let's be clear`, `What's striking is`,
`The truth is`, `In a world where`, `Imagine`, `Picture this`, `Enter the`. `voice.md` §8
banned this site's own versions. The list is longer now.

**`From X to Y` as an opener.** *"From the Delta to the cataract, Egyptians ate bread."* It
performs range and delivers a truism.

**The invitation.** *"…and that is what makes it special."* *"…and therein lies the
beauty."* *"…which tells us everything we need to know."* Nothing ever tells us everything.

**Bold-lead bullet lists inside prose.** Article bodies get paragraphs. Lists belong in the
apparatus — ingredients, method steps, market verdicts — where a reader scans rather than
reads.

### Check

    npm run prose

It greps every banned construction above across `src/data/*.js` and prints file, line and
what it matched.

---

## Why these three and not a longer list

`voice.md` §7–§12 catalogues four tics the old corpus generated, and §11a records the
important lesson: **the first pass against those sections cut too much, and what was left
was accurate, well-formed prose with nobody inside it.**

The test that governed there governs here.

> **Does the phrase reveal the WRITER, or does it reveal the MACHINERY?**

Rules 1 and 2 admit no judgement. Active voice and paragraph length are not personality,
they are legibility. Rule 3 is a ban list, and a ban list is safe precisely because
everything on it is machinery by definition. None of these constructions has ever revealed a
person, which is why every one of them reads as generated.

What is **not** on the list, and must survive: Balāṭu insisting on a point he has already
made, Henut opening on a number, Yadinu being dry about himself, Anniwiya setting two facts
side by side and declining to explain the join. Those are people. Keep all of it.

## The order of authority

1. **This file.** Mechanical, non-negotiable.
2. **`voice.md`.** The tics, the pronoun rule, the register sliders.
3. **`personas.md`.** Who is writing, and how that one differs.

Where they conflict the lower number wins. They should not conflict, and if a persona's
voice appears to require a banned construction, the persona has been misread.
