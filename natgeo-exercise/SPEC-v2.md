# Spec v2

Round one is in `COMPARISON.md`: ten predictions, four right. This replaces
`natgeo-preregistration.md` and `natgeo-process.md` for rounds two and three. It is
deliberately shorter than they were. The elaborate version produced its own failures.

Everything below was corrected against three real articles, not reasoned out in advance.

---

## The six corrections

**1. The reporter is in the piece.** This was the round-one disaster: I predicted the
writer's "I" would be absent, then wrote three features at 0% first person. All three real
articles have the reporter audible — *"told me", "I asked", "We awoke", "I notice"*.

Use it sparingly and use it for one specific job: **carrying the access.** The flight that
did not go, the second refusal, the permission that took a season, the thing I could not get
close enough to see. That is what the first person is for, and without it the difficulty of
reporting cannot be reported.

**2. Occupation and institution, not age.** Round one was studded with "Bobby Tavares, 63".
Real features give the job and the affiliation and mostly skip the age. Ages on no more than
about a third of the cast, and only where the age is doing work.

**3. Less mechanism.** I committed to explaining mechanism in full and then wrote long
passages on heat exchange, cation exchange capacity and last-return filtering. The real
articles are people-and-policy first, with science threaded in: Mosquitia gives lidar about
300 words, the Cape Cod piece is thin on biology.

**Cap total mechanism at roughly 400 words across the piece**, in two or three placements
rather than one lecture. If a subject genuinely needs more, that is a science feature and it
should be called one.

**4. Subheads are signposts, not titles.** Real: RARE BUT INEVITABLE, WHAT TO DO?, THE NEW
NORMAL. Mine: "Why the works sit on the shingle and smell so bad." **Five words or fewer.**

**5. One aphorism per piece, at the end if anywhere.** They do land beats — the Tut feature
closes on *"The shadows move but the dark is never quite uplifted."* They do it once. I was
doing it once a section.

**6. Sentence length: measure narration only.** The old 18-25 target was too high, and the
mixed figure is dragged down by quotes regardless. Real narration runs about 17-22, which is
where my round-one drafts already were. Stop chasing this.

---

## Which Barley & Bronze rules are suspended here, and which are not

The `beautiful-prose` skill now carries eleven rules, and they are two different kinds of
thing. Suspending all of them here would throw away the craft along with the house style.

**Suspended: rules 1-4, the house rules.** Scope, the em dash ban, the per-writer register
table, and the order of authority pointing at `docs/style.md`. These are tuned for a site
whose writers run at ten-word sentences and cold compression, which is close to the opposite
of magazine feature prose. Do not run `npm run prose` on these drafts.

**In force: rules 5-11, the craft rules.** Explanation over aphorism. Chain not tour.
Changing altitude on purpose. Answering the question the reader is actually asking. Short
means dropped reporting. The which-tag. The second voice wanting something the article does
not. None of those is house style. Every one was written against a fault found by reading
real work, and they apply to any reported piece.

## Kept deliberately, against the model

**The unresolved disagreement stays.** Mosquitia has minimal scepticism; the Cape Cod piece
never discusses its own terminology. I cast a live fight into all three round-one pieces and
left it unsettled. That is a deviation from the form and I think it is an improvement, so it
stays — but it is now a declared choice rather than an imitation.

**Openings are free.** My rule that a feature opens on a named person mid-action was wrong.
Mosquitia opens on three myth fragments and no person at all. Open however the story wants.

---

## Round-two predictions

Falsifiable, and narrower than last time.

| # | Prediction |
| --- | --- |
| Q1 | 3,000–5,500 words |
| Q2 | 20–35% of paragraphs carry a direct quote |
| Q3 | 6–13 named people; ages on ≤35% of them |
| Q4 | Writer's first person present in **5–20%** of paragraphs |
| Q5 | Narration-only mean sentence length 17–22 |
| Q6 | Every subhead ≤5 words |
| Q7 | Total mechanism ≤400 words |
| Q8 | At most one aphoristic closing beat in the whole piece |

## The length rule, which I deleted and had to put back

Round one's process document carried a section headed *"target 3,500-4,500 words, and I will
want to stop at 2,000"*, with concrete ways to earn length. Condensing this spec, I cut it as
ceremony. The next feature came in at **2,333 words**, and "too short" did not even appear in
the round-two failure predictions despite being the most reliable failure in round one.

So it goes back, with a better diagnosis than it had before.

**The length is never the problem. The unused cast is the problem.** The 2,333-word draft
cast eleven people and used seven. The three dropped were the reluctant dealer, the heritage
official and the CT specialist, which is to say the three hardest to get and the three most
interesting. A short feature is not a terse feature. It is a feature that left its reporting
in the notebook.

**The check, before anything else:** list every name in the cast table and find it in the
draft. Every absence is either 300 words you have not written or a person you should not have
cast. `check_feature.mjs` now does this automatically when an `00-assignment.md` sits beside
the draft.

Ways to earn length that are not padding, in rough order of how much they repay:

- Use the source who was hardest to get. That is the one with the material nobody else has.
- Follow one process all the way through instead of summarising it.
- Give a second person's account of the same event.
- Explain the thing the expert assumes everyone knows.
- Report the failure case as well as the working one.
- Describe the place at the hour it is actually happening.

## Predicted failures, round two

1. I will write short again, because I have done it in every draft so far, and I will
   discover it is because I dropped people rather than because I wrote tightly.
2. I will overshoot the mechanism cap, because explaining things is the part I enjoy.
3. My subheads will creep past five words.
4. I will under-use numerals. Round one and two both ran thin on them where the real
   articles are dense with counts, dates and measurements.

---

## Process, condensed

Same order as before, less ceremony.

1. **Peg + nut graf**, written as literal sentences before anything else.
2. **Cast of 8-12.** Occupation and institution. Two who disagree and are not reconciled.
   One local expert who outranks the credentialled one. Two or three walk-ons. One reluctant.
3. **Quote bank first** — 20-30 lines of speech before any narration.
4. **Fact dossier, 50-70 items**, marked `[soft]` where unverified. Use about a third.
5. **Chain**, sayable in one breath, and a word budget per section.
6. **Photo edit on paper. Nothing generated.** 8-11 frames: assignment, technique, the job it
   does that the text does not, caption carrying a fact absent from the body.
7. **Draft**, with the reporter present.
8. **Two sweeps**: paragraph-final sentences for aphorism; subheads for length.
9. `node scripts/check_feature.mjs <draft.md>`, fix, then compare.

## Standing rules

- Barley & Bronze style rules stay suspended. Do not run `npm run prose` on these.
- All quotes and named sources are invented; the README stamp goes on every file.
- **Never site an invented incident at the location of a real death.** Round one did this by
  accident and it had to be fixed.
- Real people appear as documented public record only, never quoted.
