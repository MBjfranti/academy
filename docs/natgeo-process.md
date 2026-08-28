# Process for the three features

Derived from `natgeo-preregistration.md`. That file predicts nine ways my drafts will fail.
Every one of those failures happens because I draft prose first and measure afterwards, so
this file inverts the order: decide the numbers, build the raw material, then write to it.

---

## Rule 0: the Barley & Bronze rules do not apply here

This matters more than anything else in this file, and getting it wrong would guarantee
failure prediction 9.

`docs/style.md` and the `beautiful-prose` skill are tuned for a site whose writers run at
**ten-word sentences and cold compression**. That is close to the opposite of magazine
feature prose. Applying them here would sand a Geographic feature down into a Barley &
Bronze article and I would then congratulate myself on the lint score.

| Rule | Barley & Bronze | These three features |
| --- | --- | --- |
| Sentence length | ~10 words | **18–25 words** |
| Em dashes | banned | **allowed and expected** |
| Subordination | discouraged | **normal** |
| One idea per sentence | hard rule | **suspended** |
| Compression | a virtue | **a tic to be resisted** |
| Register | per-persona, fixed | reported journalism, wonder-forward |

What does carry over: no filler transitions, no therapy language, no AI tells, no symmetry
padding, no "not X but Y" reversal as a cheap pivot. Those are good-writing rules rather
than house rules.

**The `prose-guard` hook only fires on `src/data/**`, so it will not touch these drafts.
Do not run `npm run prose` against them.** Use `scripts/check_feature.mjs` instead.

---

## The order of work

Prose is the fifth step, not the first.

### Step 1: the peg and the nut graf, before anything else

Write two things as literal sentences and keep them at the top of the working file:

- **Why now.** The discovery, the threat, the anniversary, the change. If I cannot state it,
  I am about to write a timeless essay, which is failure prediction 8.
- **The nut graf.** One paragraph saying what this is about and why the reader should care.
  It will land between paragraphs 3 and 10 of the finished piece.

### Step 2: INVENT MANY PEOPLE. Not one. Many.

Written as an order because the instinct to be corrected is strong and quiet.

My default is **one** second voice, because a single well-drawn character feels sufficient
and disciplined. It is neither. It is the reason my pieces read thin against the form. A
feature is populated. People walk through it who get four lines and never return, and their
presence is what makes the place feel inhabited rather than staged.

**Build a cast of 8–14 before writing a word of prose.** Each one gets:

- name, age, occupation
- village, institution, or boat
- one thing they want
- one thing they are wrong about
- one physical detail that is theirs alone

Required in every cast:

- **A local expert** who ranks with the credentialled one and is right where the scientist
  is wrong.
- **Two people who disagree** about something the article never resolves. Cast this
  deliberately. I will not add it later, and without it I produce failure predictions 4
  and 5 every time.
- **Three or four walk-ons.** A boat driver, a cook, somebody's daughter, a customs officer.
  They appear once, do one thing, and go. Do not give them arcs. Their job is population.
- **Somebody who does not want to talk to me.** Reluctance is real and it reports well.

If the cast list has fewer than eight names, stop and add names. Do not begin drafting.

### Step 3: the quote bank, before any prose

Write **the actual quoted speech first**, twenty to forty lines of it, before a word of
narration. Target is 20–35% of finished paragraphs carrying direct quotation.

This is the single most important process change. Failure prediction 3 says I paraphrase
people instead of letting them talk, and that happens because I write narration and then
look for places to insert quotes. Reversing it makes the people real before the prose
exists.

Quotes must sound like speech: interrupted, qualified, repetitive, occasionally
inarticulate. A quote that reads like written prose is one I wrote for them.

### Step 3b: AMASS FACTS. Far more than the piece can hold.

The other reason my drafts read thin. I gather roughly what I need and then write, so the
prose runs at the edge of its own knowledge and thins out into observation and opinion.
Feature density comes from a reporter who returned with ten times the usable material.

**Build a dossier of 60–100 discrete facts before drafting.** Aim to use about a third. The
unused two thirds are what make the used third sound authoritative, because they set the
level of specificity I am willing to accept.

Collect across all of these, and count them:

| Kind | Examples |
| --- | --- |
| Measurements | depths, weights, temperatures, distances, durations |
| Counts | population, colony size, catch, yield, price, wage |
| Taxonomy | Latin binomials, subspecies, the difference between two lookalikes |
| Mechanism | how the process physically works, step by step |
| Chronology | dates, seasons, how long each stage takes |
| History | when this started, who started it, what it replaced |
| Deep time | the geological or evolutionary frame behind the human scene |
| Local practice | tools, terms of art, rules of thumb, superstition |
| Economics | what it costs, who pays, what the margin is |
| Failure modes | what goes wrong, how often, what it costs when it does |
| Sensory | what it smells like, sounds like, feels like underfoot |
| Institutions | agencies, permits, laws, quotas, the paperwork |

**Rules for the dossier.**

- A fact is not a fact until it has a number, a name, or a mechanism attached. "The fishery
  is in decline" is not a fact. "The catch fell from 4,000 tonnes to 380 between 1994 and
  2019" is.
- Prefer the specific over the representative. One boat's numbers beat an industry average.
- Write down the things that complicate the story, not just the ones that carry it.
- Terms of art are gold. Every trade has words outsiders do not know, and each one is a
  paragraph.

Then build the article **around** the dossier. Sections exist because there is material to
fill them, rather than material being hunted to fill a section I already decided on.

### Step 4: the chain and the altitude map, before any prose

Per `article-structure.md`:

- State the chain aloud in one breath. Each fact forces the next.
- Sketch the **G/A map** as a planned sequence with runs of uneven length.
- **Budget words per section**, summing to the target. Deciding length after the fact is
  exactly how I produce 1,800 words when the form wants 4,000.

**Target is 3,500–4,500 words, and I will want to stop at 2,000.** That urge is the single
most reliable failure in the set. When a section feels finished at 300 words, the honest
question is what I left out, and the answer is usually the mechanism, the history, and two
people.

Write the per-section budget down before drafting and treat a short section as a defect
rather than as economy. Ways to earn length that are not padding:

- Follow a process all the way through instead of summarising it.
- Give a second person's account of the same event.
- Put in the history of how the practice arrived here.
- Explain the thing the expert assumes everybody knows.
- Describe the place at the hour it is actually happening.
- Report the failure case as well as the working one.

### Step 5: the photo edit, on paper only

**NOTHING IS GENERATED FOR THIS EXERCISE.** No `gpt-image-2` calls, no candidates, no webp,
no spending. The photo edit is a written document describing frames that would be shot. It
is a deliverable in its own right and it is judged as one.

The reason it still matters: commitment 1 of the pre-registration says the photographer is a
co-author rather than an illustrator. If I write the prose and then bolt a picture list onto
it, I have disproved my own claim about the form before the comparison even starts.

**8–12 frames.** Each one gets four things:

1. **The assignment.** What is in the frame, at what hour, in what weather.
2. **The technique.** What makes it hard to get: the remote trigger, the eleven months, the
   rebreather, the 600mm from a blind, the strobe under ice. Geographic pictures are
   frequently ones an ordinary photographer could not have taken, and naming the difficulty
   is part of describing the frame honestly.
3. **The job.** What it does that the text does not. A frame that repeats a paragraph is
   cut. Say plainly what a reader learns from this image alone.
4. **The caption**, carrying at least one fact absent from the body.

Mark the opener and the closer. Note which frames run as a full-bleed spread, which as a
half, and which as a small inset, because the edit has a rhythm the same way the prose does.

### Step 6: draft

Two deliberate reversals of instinct while writing:

- **Lengthen.** Reach for the subordinate clause. Let a sentence carry three facts. The
  instinct that says "end the thought" is correct for Barley & Bronze and wrong here.
- **Describe place.** Budget real passages of landscape and weather. Failure prediction 6.

### Step 7: the aphorism sweep

Read only the **final sentence of every paragraph**. Any that lands a beat rather than
delivering a fact gets replaced with the explanation it was standing in for. This is a
separate pass because I cannot see it while writing.

### Step 8: measure, then fix

    node scripts/check_feature.mjs <draft.md>

It reports against P1–P12 from the pre-registration. Anything failing gets fixed before I
look at a single real article, so the comparison tests the writing rather than my ability to
correct it after seeing the answer.

---

## The manual checks the script cannot do

- Opening 150 words: a named person, a physical action, and **no thesis**.
- Nut graf present between paragraphs 3 and 10.
- Two sources disagree, and the article declines to settle it.
- At least one passage of pure mechanism over 100 words.
- Deep time set against a human scene at least once.
- The close returns to a person or place from the opening third, and leaves something open.
- Wonder, not argument. Read it and ask what the dominant emotion is.

---

## Working layout

    natgeo-exercise/
      <slug>/
        00-assignment.md   peg, nut graf, cast, quote bank, chain, G/A map, word budget
        feature.md         the draft
        photo-edit.md      the frames
        notes.md           which commitments I fought, filled in after drafting
