# Barley & Bronze

A site about Late Bronze Age food, c. 1226 BC, written by four in-world personas. The
writers live in 1226 BC, know nothing of the future, and never address a modern reader.

---

## THE PROSE RULE (non-negotiable)

**Before writing or editing ANY shipped prose, invoke the `beautiful-prose` skill.**

    Skill(skill="beautiful-prose", args="REGISTER: <r> DENSITY: <d> HEAT: <h> — <writer>, <what>")

This applies to **every one** of these, whether creating or revising:

- article `body`, `standfirst`, `title`
- image `caption` text
- `standing` boxes and `glossary` glosses
- recipe `intro`, `summary`, step `text`, substitution `text`
- any page copy under `src/data/`

It applies when the change is one sentence. It applies when you are only fixing a lint hit.
It applies when you are rewriting something you wrote earlier in the same session. Invoking
it once at the top of a session does **not** cover a later article by a different writer,
because the register argument changes per writer.

Do not wait to be asked. The user should never have to say "use the beautiful prose skill."

### Skills are cached for the whole session

Established by testing, twice, in one session: **an edited skill does not reload, and a newly
created skill is not discoverable.** The registry is enumerated once at session start. Editing
`SKILL.md` mid-session leaves the old text in context while the disk copy says something else,
which is a silent trap: you can believe you are writing against a rule that was never loaded.

If a skill needs to change during a session, apply the new rules by hand from the file and say
so. They take effect next session.

**Use `beautiful-prose-v3`.** It supersedes v1 and v2 and is split into four parts, which
matters: Part 3 is universal craft and **applies to the 1226 BC personas**; Part 4 is reported
features only and must not be applied to them. The universal rules that bite hardest on this
site are U1 (one landed beat per piece), U4 (answer the reader's obvious question), U5 (put
the numbers in), U6 (a short piece dropped its reporting) and U9 (consider giving the last
word to a source, which no article here has ever done).

### Register per writer

Pass these verbatim as the skill's arguments.

| Writer | REGISTER | DENSITY | HEAT |
| --- | --- | --- | --- |
| Yadinu of Ugarit | `literary_modern` | standard | warm |
| Henut of Set Maat | `cold_steel` | lean | warm |
| Balāṭu of Babylon | `journalistic` | dense | hot |
| Anniwiya of Millawanda | `cold_steel` | lean | warm |

### Then lint, always

    npm run prose -- --article=<slug>

A `PostToolUse` hook runs this for you on every write to shipped prose and feeds the hits
back. Fix every hit or say in your reply why a specific one is deliberate. The usual
legitimate exceptions are agentless passives in `standing` boxes (`are invented`) and a
passive that is itself the point (`I was given purple twice`).

### The three rules the linter cannot see

`docs/style.md` is the first authority and carries these:

1. **No negation counterweights.** Say what IS the case. `nobody thinks about`,
   `left out of every account`, `it is not difficult` are all failures.
2. **One idea per sentence.** When you reach for `, and` / `, which` / `, so` / `, because`
   to bolt on a second fact, use a full stop.
3. **No em dashes** in shipped prose. Source comments, `docs/*.md` and image prompts in
   `scripts/narrators.py` keep theirs.

Watch also for the `, which is <wry tag>` sentence ending. It is the house tic and it
arrives in clusters.

---

## How to write one

**`docs/article-structure.md` is the craft document. Read it before drafting an article and
before any substantial revision.** It covers the zoom between ground level and altitude, the
chain-not-tour test, why explanation beats aphorism, and the anti-pattern table.

Numbers are a check on a sound piece, never a route to one. Structure first, counts second.

## Order of authority

`docs/style.md` → `beautiful-prose` skill → `docs/voice.md` → `docs/personas.md`.
`docs/article-structure.md` governs shape and argument; `docs/article-pattern.md` governs
measurements.
`docs/article-pattern.md` holds the measured shape and wins wherever it disagrees.

## Article shape

1,500–2,000 words, 40–52 paragraphs, ~37 words per paragraph, ~10 words per sentence,
longest sentence under 30. Eight to ten images at roughly 150 words each. Articles must
EXPLAIN the cultural thing they are about, in the writer's voice.

## Images

`docs/article-pattern.md` holds the nine-field prompt template and the five photography
modes. Two rules that have cost real money:

- **Print the assembled prompt before spending.** Assert that no `{PLACEHOLDER}` survives.
- **Wrap every frame in try/except** so one moderation block does not kill the run.

`gpt-image-2` rejects `input_fidelity`. Do not send it.

## Facts fixed across the corpus

Change these in one place and the rest follows.

- The year is **1226 BC**.
- Anniwiya is **28**, landed at Pylos at sixteen, **eight years at the quern and four
  weighing oil**. The single constant is `ANNIWIYA_YEARS_AT_PYLOS` in `src/data/calendars.js`;
  her age also appears in `src/data/authors.js` and twice in `scripts/narrators.py`.
