#!/usr/bin/env node
/**
 * THE STYLE CHECKER. docs/style.md, made executable.
 *
 *     node scripts/check_prose.mjs            # everything
 *     node scripts/check_prose.mjs --slop     # rule 3 only
 *     node scripts/check_prose.mjs --para     # rule 2 only
 *     node scripts/check_prose.mjs --passive  # rule 1 only (noisy on purpose)
 *
 * WHY A SCRIPT AND NOT A DOCUMENT. The old corpus drifted into 82 instances of one tic
 * across eleven reports, and nobody noticed, because a tic is invisible sentence by
 * sentence and only exists as a distribution. A grep in a markdown file gets run once,
 * on the day it is written. This gets run every time.
 *
 * IT REPORTS, IT DOES NOT REFUSE. Exit code is 1 when anything is found so CI can gate on
 * it, but every hit is printed with its file, line and matched text, because the judgement
 * that matters — does this reveal the writer or the machinery — is not one a regex makes.
 * The passive check especially: it will flag `is dried` and `were fed` and it is meant to,
 * because a human reading the list takes two seconds per line and a regex that tried to be
 * clever would miss the ones that count.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATA = join(ROOT, 'src', 'data')

/* Rule 3, docs/style.md. Every entry is a construction that has never revealed a person.
   `why` is printed with the hit, because a bare regex name tells a writer what matched and
   not what to do about it. */
const SLOP = [
  [/\b(?:not|isn't|isn’t|is not|wasn't|wasn’t)\s+just\b|\bmore than just\b|\bnot merely\b/gi,
    'false-antithesis pivot — state the thing'],

  /* THE NEGATION COUNTERWEIGHT — the heaviest entry here, and the one that got past a
     review it should not have. The first four posts written under this file carried 31 of
     them, about one per paragraph, and the piece therefore landed on the same seesaw every
     time. It slips through a false-antithesis check because nothing is being denied: the
     second clause is true. The shape is still doing the work the content should do.

     Deliberately several narrow patterns rather than one broad one. A single regex for
     "negation" would flag every honest negative sentence on the site, and the standing
     boxes are full of those by design ("the tablet gives no quantities"). These target the
     RHYTHM: a mirrored negative used as a closing beat. */
  [/[.!?]["'”’]?\s+(Not one|Not a|Nor |Neither |Nobody |No one |None of)/g,
    'negation counterweight — say what IS the case (docs/style.md)'],
  [/\bnot one of (them|us|those|these|whom)\b|\bnever once\b/gi,
    'negation counterweight — say what IS the case'],
  [/\b(can|could|would|will|does|did|has|have|is|are)\b[^.!?]{6,90}?\b\1 not\b/gi,
    'negation counterweight — a modal answered by its own negative'],
  [/,\s+and\s+(I|we|he|she|it|they|nobody|neither)\s+(?:have|has|had|do|does|did|will|would|could|can|am|is|are|was|were)\s+n[o']?t\b/gi,
    'negation counterweight — the “, and I have not” tag'],
  [/,\s+(creating|making|ensuring|allowing|cementing|leaving|highlighting|reflecting|offering|underscoring|showcasing)\s/gi,
    'trailing participial clause — cut it or give it a subject'],
  [/\b(tapestry|testament|cornerstone|lifeblood|backbone|steeped in|nestled|dotted with|window into|lens through which|interplay|rich in history)\b/gi,
    'elevated abstract noun'],
  [/\b(showcase[sd]?|highlight[sd]?|underscore[sd]?|boasts?|serves as|stands as|speaks to|embodies|delve[sd]? into|offers? a glimpse)\b/gi,
    'reviewer’s verb'],
  [/\b(truly|genuinely|actually|simply|merely|arguably|remarkably|strikingly|fascinatingly|crucially|importantly|notably|essentially|fundamentally|ultimately)\b/gi,
    'flourish adverb or hedge — carries no fact'],
  [/\b(it'?s worth noting|it'?s important to (?:note|remember)|here'?s the thing|make no mistake|let'?s be clear|what'?s striking|in a world where|picture this|enter the)\b/gi,
    'throat-clearing — voice.md §8'],
  [/\bat its core\b|\btherein lies\b|\btells us everything\b|\bwhat makes it special\b/gi,
    'the invitation — nothing ever tells us everything'],
  [/(^|['"“\s])From [A-Z][a-z]+ to [A-Z][a-z]+,/g,
    '“From X to Y” opener — performs range, delivers a truism'],
]

/* Rule 1. Deliberately crude: `be`-verb followed by a participle. It over-reports, and
   docs/style.md says so. The instruction to the reader is one question per line — who did
   this? — which is faster than any regex that tried to answer it. */
const PASSIVE =
  /\b(?:was|were|is|are|has been|have been|had been|being|be)\s+(?:[a-z]+ly\s+)?[a-z]+(?:ed|en)\b(?!\s+(?:to|by\s+hand))/g

const EXPLETIVE = /\bThere (?:is|are|was|were)\b/g

const PARA_FAULT = 110
const PARA_DEFECT = 140

/* Rule 3, and the beautiful-prose lint list. These run on the DATA rather than on source
   lines, because a sentence is the unit and JS string literals wrap across lines. */
const SENTENCE_WORDS = 32 // one sentence carrying one complex idea can pass this; read it
const JOINS = /,\s+(and|but|so|which|because|while|though|although|since)\b/gi
const SIMILAR_RUN = 5 // consecutive sentences within ±3 words of each other
const EM_DASH = /—/g

const splitSentences = (s) =>
  s.split(/(?<=[.!?])["'”’]?\s+/).map((x) => x.trim()).filter(Boolean)

const files = readdirSync(DATA).filter((f) => f.endsWith('.js')).map((f) => join(DATA, f))

let hits = 0
const say = (file, line, kind, text) => {
  hits++
  console.log(`${relative(ROOT, file)}:${line}  [${kind}]  ${text.trim().slice(0, 100)}`)
}

const want = process.argv.slice(2)
const run = (flag) => want.length === 0 || want.includes(flag)

// ── rule 3, and rule 1's line-level half ─────────────────────────────────────────────
for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    // Comments are the file's own documentation and are held to the prose rules only
    // where they are prose. Skipping them keeps the report about what ships.
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return

    if (run('--slop')) {
      for (const [re, why] of SLOP) {
        for (const m of line.matchAll(re)) say(file, i + 1, why, m[0])
      }
    }
    if (run('--passive')) {
      for (const m of line.matchAll(PASSIVE)) say(file, i + 1, 'passive — who did this?', m[0])
      for (const m of line.matchAll(EXPLETIVE)) say(file, i + 1, 'expletive opener', m[0])
    }
  })
}

/* ── rules 2 and 3, measured on the real data rather than on source lines ──
 *
 * Every shipped string a reader sees, not only `body`. The standfirst is the second thing
 * anybody reads and the captions are the third, so holding only the bodies to the contract
 * would leave the tics exactly where they are most visible. */
if (run('--para')) {
  const { fieldReports } = await import(new URL('../src/data/fieldReports.js', import.meta.url))

  for (const post of fieldReports) {
    const where = (label) => `${post.slug} ${label}`
    const shipped = [
      ...(post.body ?? []).map((x, i) => [x, `body[${i}]`]),
      [post.standfirst, 'standfirst'],
      [post.hero?.caption, 'hero caption'],
      ...(post.figures ?? []).map((f, i) => [f.caption, `fig[${i}] caption`]),
      ...(post.pulls ?? []).map((q, i) => [q.text, `pull[${i}]`]),
      ...[post.standing].flat().filter(Boolean).map((x) => [x, 'standing']),
    ].filter(([x]) => typeof x === 'string')

    for (const [text, label] of shipped) {
      // Em dash. The beautiful-prose skill bans it outright in shipped prose.
      for (const m of text.matchAll(EM_DASH)) say(DATA, 0, 'em dash (beautiful-prose)', where(label))

      const sentences = splitSentences(text)
      const lengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length)

      sentences.forEach((s, i) => {
        if (lengths[i] > SENTENCE_WORDS) {
          say(DATA, 0, `sentence ${lengths[i]}w — how many facts?`, where(`${label} s${i}`))
        }
        // Two or more clause joins is the "afraid to end a thought" shape.
        const joins = [...s.matchAll(JOINS)].length
        if (joins >= 2) say(DATA, 0, `${joins} clause joins — end the thought`, where(`${label} s${i}`))
      })

      // Five consecutive sentences of near-identical length reads as a machine metronome,
      // and it is the failure mode of over-correcting the rule above.
      let run_ = 1
      for (let i = 1; i < lengths.length; i++) {
        run_ = Math.abs(lengths[i] - lengths[i - 1]) <= 3 ? run_ + 1 : 1
        if (run_ === SIMILAR_RUN) say(DATA, 0, 'five same-length sentences', where(label))
      }
    }

    post.body?.forEach((para, i) => {
      const words = para.split(/\s+/).filter(Boolean).length
      if (words > PARA_DEFECT) say(DATA, 0, `paragraph DEFECT ${words}w`, where(`body[${i}]`))
      else if (words > PARA_FAULT) say(DATA, 0, `paragraph fault ${words}w`, where(`body[${i}]`))
    })
  }
}

console.log(hits ? `\n${hits} to look at. docs/style.md has the fix for each.` : 'Clean.')
process.exit(hits ? 1 : 0)
