// The active publication registry.
//
// Each article owns a directory under ./reports. Its article, evidence spine, and visual
// brief travel together. This file keeps only shared display helpers and public indexes.

import { check } from './authors.js'
import reports from './reports/index.js'

const EPOCH = 3252
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function bcDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return `${day} ${MONTHS[month - 1]} ${EPOCH - year} BC`
}

/** Writer portraits and the legacy writer-based image library. Article images will live
    under /img/reports/<slug>/ once their briefs have produced approved frames. */
export const img = (name, thumb, writer = 'yadinu') =>
  `/img/writers/${writer}/${name}${thumb ? '-thumb' : ''}.webp`

export const reportImg = (post, name, thumb = false) =>
  `/img/reports/${post.slug}/${name}${thumb ? '-thumb' : ''}.webp`

export const fieldReports = reports
export const posts = [...fieldReports].sort((a, b) => b.date.localeCompare(a.date))
export const reportBySlug = Object.fromEntries(fieldReports.map((report) => [report.slug, report]))

if (import.meta.env?.DEV) {
  const problems = check(fieldReports)
  if (problems.length) console.error('Post attribution:\n  ' + problems.join('\n  '))
}
