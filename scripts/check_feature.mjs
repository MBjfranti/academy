#!/usr/bin/env node
/* Measure a feature draft against natgeo-exercise/SPEC-v2.md.
 *
 * Round one used predictions P1-P12, written before reading any real article. Two of them
 * were not merely wrong but measured the wrong thing:
 *
 *   P4  predicted the writer's first person would be absent. The reverse is true, in all
 *       three real articles. The check now fails a draft with NO reporter in it.
 *   P12 used a mixed sentence-length figure that quoted speech drags down regardless of how
 *       the narration is written. Q5 measures narration only.
 *
 * It is deliberately NOT check_prose.mjs. That enforces Barley & Bronze house style, whose
 * ten-word sentences and em-dash ban would wreck a magazine feature.
 *
 *   node scripts/check_feature.mjs natgeo-exercise/<slug>/feature.md
 */
import { readFileSync } from 'node:fs'

const path = process.argv[2]
if (!path) {
  console.error('usage: node scripts/check_feature.mjs <draft.md>')
  process.exit(1)
}

const raw = readFileSync(path, 'utf8')

/* Drop headings, bullets, blockquote scaffolding, tables and horizontal rules. A bare `---`
   surviving the filter silently welds two paragraphs together and invents 70-word
   sentences. */
const body = raw
  .replace(/^---[\s\S]*?\n---\n/, '')
  .split('\n')
  .filter(
    (l) =>
      !/^\s*#{1,6}\s/.test(l) &&
      !/^\s*[-*+]\s/.test(l) &&
      !/^\s*>/.test(l) &&
      !/^\s*\|/.test(l) &&
      !/^\s*([-*_]\s*){3,}\s*$/.test(l),
  )
  .join('\n')

const paras = body.split(/\n\s*\n/).map((p) => p.trim().replace(/\s+/g, ' ')).filter(Boolean)
const text = paras.join(' ')
const words = text.split(/\s+/).filter(Boolean)
const mean = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0)
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0)

/* A paragraph carries a quote if it holds a run of speech long enough to be speech rather
   than a scare-quoted term. */
const QUOTED = /[“"][^”"]{18,}[”"]/
const quoteParas = paras.filter((p) => QUOTED.test(p)).length

const withAge = [...text.matchAll(/\b([A-Z][a-zà-ÿ]+(?:\s[A-Z][a-zà-ÿ]+){1,2}),\s*(\d{1,3})\b/g)]
const nameLike = new Set([...text.matchAll(/\b[A-Z][a-zà-ÿ]{2,}\s[A-Z][a-zà-ÿ]{2,}\b/g)].map((m) => m[0]))

/* Q4 counts the WRITER's first person. A source quoted saying "I" is not the writer
   speaking, so quoted spans are stripped before testing. */
const unquoted = (p) => p.replace(/[“"][^”"]*[”"]/g, ' ')
const firstPersonParas = paras.filter((p) => /\b(I|I'm|I've|my|me|we|us|our)\b/.test(unquoted(p))).length

/* Narration-only sentence length: the fair test of the writer's own construction. */
const narration = text.replace(/[“"][^”"]*[”"]/g, ' ')
const nLens = narration
  .split(/(?<=[.!?])\s+(?=[A-Z])/)
  .filter((s) => s.trim().split(/\s+/).length > 2)
  .map((s) => s.trim().split(/\s+/).length)
const nAvg = mean(nLens)

/* The deck (the standfirst under the title) is also an h3 and is SUPPOSED to be a
   sentence. Only headings that appear after body prose has begun count as subheads. */
const lines = raw.split('\n')
const firstProseLine = lines.findIndex(
  (l, i) => i > 0 && l.trim().length > 80 && !/^\s*[#>|-]/.test(l),
)
const subheads = lines
  .filter((l, i) => /^\s*#{2,4}\s/.test(l) && i > firstProseLine && firstProseLine > -1)
  .map((l) => l.replace(/^\s*#+\s*/, '').replace(/[*_`]/g, '').trim())
  .filter((s) => s && !/^Imagined|^Assignment|^Photo edit/i.test(s))
const longSubheads = subheads.filter((s) => s.split(/\s+/).length > 5)

/* Candidate aphorisms: a paragraph-final sentence that is short, carries no number and no
   quotation, and follows a longer one. That is the shape of a landed beat standing where an
   explanation should be. Spec v2 allows exactly one, at the end. */
const aphorisms = []
for (const p of paras) {
  const ss = p.split(/(?<=[.!?][”"']?)\s+/).filter((s) => s.trim())
  if (ss.length < 2) continue
  const last = ss[ss.length - 1]
  const n = last.split(/\s+/).length
  if (n <= 12 && !/\d/.test(last) && !QUOTED.test(last) && ss[ss.length - 2].split(/\s+/).length > n) {
    aphorisms.push(last.trim())
  }
}

const qp = pct(quoteParas, paras.length)
const fp = pct(firstPersonParas, paras.length)
const namedTotal = Math.max(nameLike.size, withAge.length)
const agePct = pct(withAge.length, namedTotal)

const row = (id, label, actual, ok, target) =>
  `${ok ? ' PASS' : '*FAIL'}  ${id.padEnd(4)} ${label.padEnd(34)} ${String(actual).padStart(9)}   want ${target}`

console.log(`\n${path}\n${'='.repeat(78)}`)
;[
  row('Q1', 'words', words.length, words.length >= 3000 && words.length <= 5500, '3000-5500'),
  row('Q2', 'paragraphs carrying a quote', `${qp}%`, qp >= 20 && qp <= 35, '20-35%'),
  row('Q3', 'distinct named people', namedTotal, namedTotal >= 6, '6-13ish'),
  row('Q3b', 'share of cast given an age', `${agePct}%`, agePct <= 35, '<=35%'),
  row('Q4', "writer's first person", `${fp}%`, fp >= 5 && fp <= 20, '5-20%'),
  row('Q5', 'narration sentence length', nAvg.toFixed(1), nAvg >= 17 && nAvg <= 22, '17-22'),
  row('Q6', 'subheads over 5 words', longSubheads.length, longSubheads.length === 0, '0'),
].forEach((c) => console.log(c))

console.log(`\n${'-'.repeat(78)}\nSignals`)
console.log(`  attribution verbs                     ${(text.match(/\b(says|said|told me|according to|recalls|explains|adds)\b/gi) || []).length}`)
console.log(`  numerals in body                      ${(text.match(/\b\d[\d,.]*\b/g) || []).length}`)
console.log(`  paragraphs                            ${paras.length}`)
console.log(`  subheads                              ${subheads.length}`)
if (longSubheads.length) longSubheads.forEach((s) => console.log(`    over-long: ${s}`))

if (aphorisms.length) {
  console.log(`\n${'-'.repeat(78)}\nCandidate aphorisms: ${aphorisms.length}. Spec v2 allows ONE, at the end.`)
  aphorisms.slice(0, 15).forEach((a) => console.log(`  · ${a}`))
  if (aphorisms.length > 15) console.log(`  ... and ${aphorisms.length - 15} more`)
}

/* CAST COVERAGE. The single most useful check in the file.
 *
 * Every short draft so far has been short for the same reason: a cast was built and then
 * only two thirds of it was used, and the people dropped were the hardest to get. A missing
 * name is either ~300 words not written or a person who should not have been cast. Either
 * way it wants a decision, not silence. */
const assignmentPath = path.replace(/[^/\\]+$/, '00-assignment.md')
try {
  const assign = readFileSync(assignmentPath, 'utf8')
  const cast = [...assign.matchAll(/\|\s*\*\*([^*|]+)\*\*\s*\|/g)].map((m) => m[1].trim())
  if (cast.length) {
    const surname = (n) => n.split(/\s+/).filter((w) => w.length > 2).pop() || n
    const unused = cast.filter((n) => !text.includes(n) && !text.includes(surname(n)))
    console.log(`\n${'-'.repeat(78)}\nCast coverage: ${cast.length - unused.length}/${cast.length} used`)
    if (unused.length) {
      console.log('  NOT IN THE DRAFT. Each is ~300 words unwritten, or a miscast:')
      unused.forEach((n) => console.log(`    · ${n}`))
    }
  }
} catch {
  /* no assignment sheet beside the draft; skip silently */
}

console.log(`\n${'-'.repeat(78)}\nManual, and the script cannot see any of it:`)
;[
  'Q7  Total mechanism under ~400 words, split across two or three placements.',
  'Q8  At most ONE aphoristic beat in the piece, at the end if anywhere.',
  'First person is doing the ACCESS job: waiting, refusal, permission, what could not be seen.',
  'Nut graf early, stating why now.',
  'Two sources disagree and the piece declines to settle it.',
  'Close returns to a person or place from the opening third.',
  'No invented incident sited at the location of a real death.',
].forEach((l) => console.log(`  [ ] ${l}`))
console.log()
