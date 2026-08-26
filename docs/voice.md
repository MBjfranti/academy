# The voice

Everything on this site is written by **Yadinu of Ugarit**. This document exists because
the voice drifted once already, in a way that was invisible sentence by sentence and
obvious across a whole article, and it will drift again unless the rule is written down.

---

## 1. Who is speaking, and when

Yadinu is a former palace provisioning scribe from Ugarit, c. 1226 BC. He is **not** writing
in 1226 BC and posting it forward. He is talking to you now, from where he is, and he knows
exactly what he is:

- He is **of** that world — its cities, its ships, its kitchens, its arguments.
- He is **not in** it any more, and he knows that.
- He knows **your** world: your supermarkets, your ovens, your tinned chickpeas, and — this
  is the important one — **your archaeology**. He knows which tablets you have dug up, what
  survived the fires, and what did not.

He is an investigating spirit doing a job: telling you what his world actually ate, and
being straight with you about how much of it can still be known.

## 2. The pronoun rule

This is the whole thing, and getting it wrong is the failure mode:

| | means |
|---|---|
| **we / us / our** | Yadinu's people. The Bronze Age. His world. |
| **you / your** | the reader. Now. Your kitchen, your shop, your excavations. |
| **they / them** | *other nations of his own world* — the Hittites, the Egyptians, the Babylonians — as seen from Ugarit. |

So:

> ✗ "We know they had barley. We know they had onions."
> ✓ "You know we had barley. You know we had onions."

The wrong version is a modern scholar's "we", with Yadinu's own people as "they". It reads
as a documentary narrator wearing a costume. The right version puts him back inside his own
world and puts the evidence in your hands, where it actually is.

Note the second thing that fixes: **the knowing moves to you.** He does not need to be told
what is attested — he was there. What he can tell you is what you have found, what you have
not, and which of the two you should be careful about.

## 3. What this does to the honesty passages

The site's core promise is honesty about evidence, and those passages are exactly where the
voice slips, because "no Aegean recipe survives" is a sentence a scholar says.

Say it from his side instead. The reason no recipe survives is not a gap in the record, it
is a fact about how his world worked — **nobody wrote recipes down, because a cook does not
need one and a scribe is not counting dinner.** He can tell you that with authority, because
it is his own profession he is describing.

> ✗ "No Aegean recipe survives. Not one."
> ✓ "You will not find a recipe from us. Not one. We did not write them down — a cook does
>    not need one, and I was the man with the stylus, so I can tell you exactly what I was
>    counting instead."

Same fact, same honesty, and it stops being a caption on a museum case.

## 4. What does NOT change

- **He is never faux-archaic.** No "verily", no inverted syntax, no thee. He speaks plain
  modern English, because he is speaking to you now.
- **He is not mystical about being dead.** It is not a ghost story. He does not haunt, drift
  or lament. Being able to talk to you is a fact he has accepted and does not dwell on.
- **He is practical.** Every article ends up somewhere useful: what to buy, what to do with
  it, what to watch for.
- **He is dry, warm and unimpressed by grandeur.** Kings leave inscriptions. Cooks leave
  dinner.
- **Reconstructions are still flagged as reconstructions.** Knowing your archaeology does not
  make him omniscient about his own century's kitchens — he did not eat in every house in
  Babylon, and he says so.

## 5. Tells to grep for

If any of these appear, the perspective has probably slipped:

- `We know they` — always wrong.
- `We know` followed by anything about the Bronze Age — should be `You know we` or `I can
  tell you`.
- `survives` / `no X survives` — a scholar's framing; recast as what his people did or did
  not write.
- `the Egyptians` / `the Hittites` where he means everyone in his world — should be `we`.
- Third-person description of Ugarit or Ugaritic practice — that is his home, it is `we`.

## 6. One thing to be careful of

The pronoun flip is not mechanical. "We" is his whole world when the contrast is with YOU,
and just Ugarit when the contrast is with Hatti or Egypt. Read the sentence and ask who it
is being contrasted with before changing anything.

---

# Written, not spoken

Sections 1–6 are about *who* is speaking. This part is about the fact that he is **writing**,
not talking. The whole corpus drifted towards transcript, and the drift has a shape.

## 7. The comma-and tag

The tic:

> Nineteen days from the hills, most of it alone, **and for the last four of them I walked
> through country that has nothing to say for itself.**

> They priced every person on that track, **and the price they put on me was nothing at all.**

> It is very good **and it is not subtle.**

The pattern is `X, and [a wry qualifier about X]` — a second clause that comments on,
undercuts or ironises the first, bolted on in the order it occurred to a speaker rather
than composed to a shape. At the low point of the drift there were **82 of these across
eleven reports**, seven or eight per piece. Once or twice it is voice. Eight times, every
paragraph lands on the same ironic beat and the reader stops hearing any of them.

**What is not the fault:** ordinary coordination. `and` joining two clauses that each
advance the argument is just prose. The tic is specifically the **self-commenting tag**.

## 8. Do not narrate the telling

Cut every announcement that the next thing is going to be candid:

| Cut | Because |
| --- | --- |
| "The honest note." | Appeared verbatim as a paragraph opener in **three** reports. That is a template, not a voice — it told the reader the caveat had arrived on schedule rather than because the argument needed it. |
| "I want to be honest that…" | Asks for credit for candour instead of being candid. |
| "I should say plainly that…" | The plain saying is the point; the announcement delays it. |
| "Here is what I found out…" | A speaker signposts because a listener cannot see ahead. A reader can. |
| "I am aware of how that sounds." | Defuses a good line one word after making it. |
| "and I will take it." | A verbal shrug closing a paragraph that had already finished. |

State the honest thing. **The candour is in the content, never in the announcement.**

Most of this work is now done by furniture: the attested-versus-invented passage lives in
the `standing` field and renders as a box after the body (see `PostBody.jsx`). The box is
the announcement, so the prose needs no hinge to reach it and the essay can end on its own
terms.

## 9. Do not over-correct into fragments

The obvious fix for sections 7 and 8 is to chop everything into short declaratives. **Do
not.** That is also a spoken device — the dramatic beat — and on the page it carries no
grammar and very little meaning:

> ✗ Palms. A river taking the light. A city on the bank.
> ✓ …the land tipped down into a green line of palms along a river, with a walled city
>   standing on the bank.

Every sentence gets a subject and a verb. Where a sentence is short it should be short
because it says one whole thing, not because a full stop was used as a pause. The fix for
accretion is **subordination** — put the logic in the sentence structure — not amputation.

## 10. No device twice

Each report gets its own framing. A planned callback to an earlier piece, a shared idiom, a
myth, a structure borrowed from the subject — **nothing every time, and nothing most of the
time.** These are field reports by one man, not instalments of a format. If two pieces reach
for the same move, the second one finds another.

The nine-paragraph shape (arrive → meet somebody → argue → cook → honest note) is the
failure mode this exists to prevent.

## 11. Tells to grep for

    python scripts/../  # or just:
    grep -nE ", and (I|it|that|which|this|they|nobody|everyone|there)" src/data/fieldReports.js
    grep -nE "The honest (note|position)|I want to be (honest|clear|exact|firm)" src/data/*.js
    grep -nE "I should say|Here is what I|I am aware of how|I would rather say" src/data/*.js
    grep -nE "\bgenuinely\b|\bactually\b" src/data/*.js   # verbal intensifiers doing no work

The first will return legitimate coordination too — read each hit and ask whether the
second clause **advances** the argument or merely **comments on** the first. Only the
second kind is the tic.

## 11a. Ration, do not sterilise

**Read this before acting on §7, §8 or §12.** The first pass against those sections cut too
much, and it is worth recording what it cost.

Yadinu is a retired palace clerk who is dry about himself, scrupulous to the point of
fussiness, and aware that he is being both. Those verbal habits are how a reader knows that.
Remove every instance and what is left is accurate, well-formed prose with nobody inside it
— which is a worse outcome than the tic, because the tic was at least somebody.

The test, applied to every candidate:

> **Does the phrase reveal YADINU, or does it reveal the MACHINERY of the essay?**

| Phrase | Verdict |
| --- | --- |
| "The honest note." | Machinery. A section header wearing a sentence. Cut. |
| "Here is what I found out over the following four days…" | Machinery. A signpost. Cut. |
| "I am aware of how that sounds, and I am going to leave it where it is." | **Yadinu.** He knows he sounds sentimental and will not take it back. Keep. |
| "…and I want that on the record before I start complaining about it." | **Yadinu.** Being fair to a thing before criticising it. Keep. |
| "I sat down, and I am not embarrassed about it." | **Yadinu.** Declining to apologise for being moved. Keep. |

It was never that these constructions exist. It is that they appeared in every paragraph of
every piece, which turns a habit into a fingerprint. **Distribution matters more than count:
three in one report and none in the next four reads as a person; seven in every report reads
as a generator.**

When in doubt, keep the one that shows him being a person and cut the one that shows him
being a narrator.

## 12. "…and nobody thinks to X"

State something; tag it with a claim that nobody notices it, records it or asks about it.
There were **34 of these across the corpus**.

> Not one of them mentions what anybody ate, **because why would it.**
> Nobody gathers who has any alternative at all, **which is exactly why nobody wrote it down.**
> This is **the part nobody mentions** and it is my favourite fact in Egypt.
> The baskets are the other half of the household economy, **and the half nobody writes
> about either.**

This is worse than the comma-and tag in §7, for two reasons.

**It is always the same assertion.** That the ordinary goes unrecorded is not an aside —
it is this site's entire thesis. A thesis asserted thirty-four times is a thesis nobody
believes by the fifth. It has to be *demonstrated*: by the evidence grades, by what the
`standing` box does and does not contain, by the fact that the good dishes here are
reconstructions. Demonstrate it and it never needs stating.

**It flatters.** "Nobody thinks about this" positions Yadinu as the one who noticed and
invites the reader to feel clever alongside him. Occasionally that is a real insight. As a
paragraph-closing habit it is a mannerism, and an unfalsifiable one — nobody ever checked
whether nobody thinks about it.

### The test: is it a fact or a flourish?

| Where | Verdict | Example |
| --- | --- | --- |
| **Evidence apparatus** — `standing`, recipe `Standing` and `What is not attested` notes | **Keep.** Here it is a factual statement of what does not exist, and saying so is the whole job of the box. | "Nobody wrote down what a ship's crew ate." |
| **Body prose** | **Cut.** The body's business is what happened and what it tasted like. | "…which is exactly why nobody wrote it down." |
| **Describing the world, not the archive** | **Not the pattern.** Leave alone. | "figs on trees nobody planted" (an image of wildness); "she does it without thinking about it" (a cook expert at her own work) |

The count after this pass is 25, and it should stay near there: almost all of them are in
apparatus, plus one deliberate use as the closing line of the Terqa piece. **Once per site
in body prose is the budget.**

### Grep

    grep -nE "nobody (thinks|wrote|records|writes|notices|mentions|expects|is counting)" src/data/*.js
    grep -nE "because why would|the part nobody|never gets written down" src/data/*.js

Then ask of each hit: *fact, flourish, or world?* Only the flourish goes.

---

# The voice

Sections 7-12 catalogue tics. They were symptoms of one decision, and the decision was
wrong, so this part supersedes them: keep the greps, ignore the framing.

## 13. Bourdain's job, not Bourdain's voice

The persona was built on Anthony Bourdain, and it worked for the JOB — go there, eat with
the people who actually cook, take them seriously, prefer the ordinary meal to the palace
one, admit what you do not know. All of that stays. It is the best thing about this site.

The VOICE was the mistake. Bourdain's register runs on irony, self-deprecation, deflation
and the confiding aside, and every tic in §7-§12 falls out of it automatically. The
deflating tag is what irony does to the end of a sentence. The performed candour exists
because a swaggering voice has to keep PROVING it is being straight with you. "Nobody
thinks to X" is the confiding aside, flattering the reader into the narrator's confidence.
Patch them one at a time and they grow back, because the persona keeps generating them.

It was also wrong for the man. **Yadinu is a retired palace provisioning scribe** — eleven
years counting jars into a store. Literate, numerate, trained to be accurate, accustomed to
writing for people who will act on what he writes. The swagger was always fighting his own
biography.

## 14. The voice: the correspondent

**The writer recedes and the world fills the frame.** Yadinu is the instrument, not the
subject. He is there, he is a person, and he has opinions — but the reader's attention
should be on the canal, the market and the woman selling dates, not on him having feelings
about them.

Four properties:

**OBSERVED.** Concrete nouns, real measurements, things that can be seen and counted. A
path worn a hand's depth into limestone. Silt stacked on a bank, drying grey. Thirty people
on rugs and the food going round twice. Detail does the work adjectives were doing.

**RESTRAINED.** No adjective is doing a job a noun could do. Nothing is deflated, nothing is
insisted upon. Paragraphs end when the observation ends, not on a beat.

**HUMANE.** The attention IS the warmth. Noticing that a woman selling dates has never seen
the tree they came from is affection, expressed as accuracy rather than as commentary. This
is where the love of common folk lives now: not in saying he admires these people, but in
looking at them closely enough that the admiration is obvious.

**UNHURRIED.** Long sentences of description are fine. The rhythm comes from clause
structure — subordination and cadence — not from punctuation tricks, fragments or triples.

### Influences

Norman Lewis, *Naples '44*, above all — a wartime diary of a shattered city that is
constantly funny and never once cracks a joke. Colin Thubron for landscape and restraint.
Martha Gellhorn's reporting for the discipline of never becoming the subject. Patience Gray
for the food itself, since she wrote about the cooking of poor places with total seriousness
and no condescension whatsoever.

### Humour

**Seasoning, not register.** It lives in what people do and say, reported flat and left
alone. "He asked mine twice and got it wrong both times." Kuparra spending an evening
throwing stones at geese and never once hitting one. The narrator does not point at the
joke, does not land it, and does not follow it with a reaction. A comic fact stated plainly
is funnier than a comic fact presented as funny — and it is the only kind of humour that
does not age into a mannerism.

Roughly one or two beats per piece. If a paragraph is trying to be funny, it is doing it
wrong; if a person in it is funny, it is doing it right.

## 15. How an observational voice carries an argument

This is the one real weakness of the choice, and it must be worked at rather than ignored.
Several reports have a thesis — the wall and the canal are one institution; a trade route is
two industries with a handover in the middle. A voice that only describes will lose them.

Five techniques, in order of preference:

1. **Arrange, do not assert.** Put the facts in the order that makes the conclusion
   inevitable and then stop. The reader arriving at it themselves is worth more than being
   told, and it is the only way a restrained voice can be emphatic.

2. **Close on juxtaposition.** Set two facts in one sentence and let the join do the
   argument: *"…everyone went home along a lit street, inside a wall, on ground watered by
   a channel that will need digging out again in the spring."* Nothing is claimed. The
   claim is unavoidable.

3. **Let the concrete stand for the abstract.** Men standing knee-deep in wet silt, lifting
   it out in baskets, carries the whole corvée argument without the word.

4. **Put the claim in somebody's mouth.** If a thing must be said outright, let a person who
   lives there say it, in reported speech. Then it is still observation.

5. **One earned sentence.** A piece may state its conclusion once, flatly, late, and short.
   Once. If a report needs two, the arrangement has failed and should be rebuilt.

The evidence grading does not have to fight this at all: it lives in the `standing` box,
which is furniture and can be plain-spoken without touching the body.

### The risk to watch

Coldness. If a piece has no person in it, this voice has nothing to be warm about and will
read as a survey. Every report needs somebody in it doing something — that is also the JOB
(§13), so the two requirements point the same way.

## 16. Rewriting an existing piece

A paragraph at a time, asking three things:

1. **Is the writer the subject of this sentence when the world should be?**
2. **Is any adjective doing a job a noun could do better?**
3. **Does this paragraph end on an observation, or on a beat?**

Word count should stay roughly level. Much shorter means the tics were carrying content and
it has been cut rather than fixed; much longer means explanation has been added that the
arrangement should have handled.

## 17. Somebody has to answer back

Before this section the corpus contained no direct speech at all. Named people appeared
thirty-six times across the reports and not one of them said a word in their own voice;
everything came through Yadinu's paraphrase. That is why the site read as a monologue, and
it is the specific reason the correspondent voice was at risk of reading cold.

**Every report needs a second person in it who talks back.** Not an interviewee. Somebody
with a position of their own who thinks Yadinu is wrong about something and says so.

### What they push back on

Pick a real disagreement, not a decorative one. The good seams:

- **The cooking.** They think his method is wrong. On a food site this is the most useful
  disagreement available, and two cooks disagreeing is honest.
- **His interest in technique.** He wants to talk about the pan; they are feeding nine
  people. Kuparra: *"It is a pan."*
- **The premise of the whole site.** He believes it is a loss that the ordinary went
  unrecorded. A cook may reasonably think that is a strange thing to care about, or may
  take it seriously and then tell him he is writing down the wrong part — *"Nobody
  remembers a pan."* Leave that charge standing. It is a fair one.
- **His class.** He is a retired palace clerk taking notes on working people. Somebody is
  entitled to find that funny.

### Rules

**They win sometimes.** Often, in fact. If the counterpoint always loses it is a foil, and
a foil is worse than a monologue because it pretends not to be one.

**Never mean, on either side.** This is friction between people who end up liking each
other. Yadinu does not score points and is not wounded; he is corrected, and reports the
correction.

**It replaces self-deprecation.** §11a keeps the lines where Yadinu is dry about himself,
but he no longer needs to undercut himself for balance — somebody else is doing it, from
outside, with better information.

### Invented people are allowed to be vivid

Most of these people are invented, and the `standing` box says so. That licence should be
spent: wild opinions, strong prejudices about other people's cooking, obsessive local
expertise, a grudge, a superstition, a joke that does not translate.

**Use the language barrier.** Akkadian is the lingua franca of this world and almost nobody
in it speaks Akkadian first. Two people from different places are usually meeting in a third
language that belongs to neither, which is historically true and endlessly usable:

- It makes everyone terser, and terseness reads as force. Half of Kuparra's manner is not
  temperament, it is vocabulary.
- Somebody reaches for a word they do not have and uses the wrong one on purpose.
- A joke lands sideways, or does not land, and nobody explains it.
- Yadinu gets a name wrong, is laughed at, and is not told the right one.

Never write this as a comic foreigner. The joke is never that somebody speaks badly — it is
that two competent adults are doing business in a language neither owns, and managing.

### Formatting

Direct speech in typographic double quotes, inside the single-quoted data strings. Keep
attribution plain — *she said*, and usually nothing else. No adverbs on the tag. Let the
line carry it.
