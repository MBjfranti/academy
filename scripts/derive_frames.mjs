#!/usr/bin/env node
/**
 * THE ARTICLE DECIDES WHAT GETS PHOTOGRAPHED.
 *
 *     npm run frames        # src/data/fieldReports.js  ->  scripts/frames.json
 *
 * THE ORDER MATTERS AND IT USED TO BE BACKWARDS. narrators.py carried a hand-written list
 * of frames, so the pictures were commissioned before the writing existed and every piece
 * then had to be steered towards the shots somebody had already imagined. Now a writer
 * places an image where the prose needs one, describes it in a `scene`, and this script
 * collects those into the work order.
 *
 * WHAT MAKES AN IMAGE A JOB. A `scene`. An image without one is an existing frame already
 * on disk — Yadinu has a library of 220 — and this script leaves it alone. So adding a
 * picture to a post costs a `scene` field, and re-using one costs nothing.
 *
 * `who` NAMES THE PERSON IN THE FRAME, and it is the field that matters most:
 *
 *     who: 'henut'   the writer is in the picture. The prompt gets her full face and dress
 *                    block, because a narrator the reader cannot recognise is not a
 *                    narrator and a set that drifts is the failure mode.
 *     who: null      nobody is in it. A bowl, a storeroom, a cut through a city mound. The
 *                    prompt gets the world and the period and NO person description, which
 *                    is the whole point — a still life with a face wedged into it because
 *                    the prompt insisted on one is worse than no picture.
 *
 * The FOLDER is always the article slug. Portrait identity remains writer-owned, while a
 * commissioned scene belongs to the argument that earned it.
 *
 * Output is JSON rather than Python because subjects.py and generate_images.py are Python
 * and fieldReports.js is JavaScript, and this is the same bridge scripts/generated.json
 * already uses between the two halves of the image pipeline. One file, one direction.
 */

import { writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { fieldReports } from '../src/data/fieldReports.js'
import { byId } from '../src/data/authors.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'scripts', 'frames.json')

/* Shape follows the slot the picture is going into, because a portrait forced into a wide
   hero loses the head and a landscape squeezed into an inset loses the room. `hero` renders
   full width and `col`/`wide` fill the measure, so those are landscape; an `inset` floats at
   about half the column, where a standing figure reads far better. An image may override it
   with an explicit `shape`. */
const shapeFor = (im, slot) => im.shape ?? (slot === 'inset' ? 'portrait' : 'landscape')

const rows = []
const problems = []

for (const post of fieldReports) {
  const author = byId[post.author]
  if (!author) {
    problems.push(`${post.slug}: unknown author ${JSON.stringify(post.author)}`)
    continue
  }

  const images = [
    ...(post.hero ? [[post.hero, 'hero']] : []),
    ...(post.figures ?? []).map((f) => [f, f.size ?? 'col']),
  ]

  for (const [im, slot] of images) {
    if (!im.scene) continue // an existing frame; nothing to commission

    const slug = `${post.slug}-${im.name}`

    if (im.who !== null && im.who !== undefined && !byId[im.who]) {
      problems.push(`${post.slug} / ${im.name}: who is ${JSON.stringify(im.who)}, not a writer id`)
    }

    rows.push({
      slug,
      writer: author.id, // whose face and regional visual rules apply
      folder: post.slug, // the article directory under public/img/reports
      name: im.name, // the filename inside that article directory
      who: im.who ?? null, // whose face goes in the prompt, or nobody
      // `people: true` on a writer-less image asks for a populated scene rather than
      // a still life: a crowded hall with nobody in particular as the subject.
      people: im.people === true,
      shape: shapeFor(im, slot),
      scene: im.scene,
      post: post.slug,
      alt: im.alt,
    })
  }
}

const dupes = rows.map((r) => r.slug).filter((s, i, a) => a.indexOf(s) !== i)
if (dupes.length) problems.push(`duplicate slug(s): ${[...new Set(dupes)].join(', ')}`)

if (problems.length) {
  console.error('Cannot write frames.json:\n  ' + problems.join('\n  '))
  process.exit(1)
}

rows.sort((a, b) => a.slug.localeCompare(b.slug))
writeFileSync(OUT, JSON.stringify(rows, null, 1) + '\n')

const withWriter = rows.filter((r) => r.who).length
console.log(`wrote ${relative(ROOT, OUT)}  (${rows.length} frame(s): ` +
  `${withWriter} with a writer in shot, ${rows.length - withWriter} without)`)
for (const r of rows) {
  console.log(`  ${r.slug.padEnd(20)} ${r.shape.padEnd(9)} ${(r.who ?? '—').padEnd(9)} <- ${r.post}`)
}
