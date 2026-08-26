import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

/* Dev-only endpoint that writes a locked crop back into the article data.
 *
 * WHY A SERVER ROUND TRIP rather than copy-and-paste. The crop tool exists because framing
 * a photograph is eyeball work; making the last step "now go and paste six numbers into a
 * data file" puts the twenty-second round trip back in, just at the other end. Locking a
 * crop should be one click, and then it is done.
 *
 * TWO THINGS THIS GETS WRONG IF YOU ARE NOT CAREFUL, both learned the hard way:
 *
 * 1. LINE ENDINGS. This repo checks out CRLF on Windows. Splitting on '\n' leaves a
 *    trailing '\r' on every existing line, which `/^[ \t]*crop:.*$/` then fails to match —
 *    '.' will not cross a carriage return and '$' sits after it. The first version
 *    therefore recognised only the lines IT had written (no '\r') and never the ones
 *    already in the file, so every save added a line instead of replacing one. Split on
 *    either ending; write back whichever the file was using.
 *
 * 2. REPLACE VS INSERT. Looking only at the line below the name and inserting when it is
 *    not a crop line means any hiccup leaves TWO crop lines, and which one wins is down to
 *    object key order. Instead: clear every crop line in the figure's block, then write
 *    exactly one. Saving four times lands where saving once does.
 *
 * It only ever rewrites lines inside the named figure, and refuses rather than guesses if
 * that name does not appear exactly once. Registered `apply: 'serve'`, so it does not
 * exist in a production build.
 */
// `crop: '4 / 5', pan: [12, -4], zoom: 1.9,` — its own line inside a figure object.
// Anchored with \s at the end so it matches whether or not a '\r' survived the split.
const CROP_LINE = /^\s*crop:.*,\s*$/
const BLOCK_END = /^\s*\},?\s*$/

export default function cropPlugin() {
  return {
    name: 'barley-crop-writer',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__crop', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end('POST only')
        }
        let body = ''
        req.on('data', (c) => (body += c))
        req.on('end', () => {
          try {
            const { postSlug, name, crop, zoom, pan } = JSON.parse(body)
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(postSlug ?? '') ||
                !name || !crop || !Array.isArray(pan) || pan.length !== 2 || typeof zoom !== 'number') {
              throw new Error('need a safe postSlug, name, crop, pan[2] and zoom')
            }

            const path = resolve(server.config.root, 'src', 'data', 'reports', postSlug, 'article.js')
            const raw = readFileSync(path, 'utf8')
            const eol = raw.includes('\r\n') ? '\r\n' : '\n'
            const lines = raw.split(/\r?\n/)

            const marker = `name: '${name}',`
            const hits = lines.reduce((acc, l, i) => (l.includes(marker) ? [...acc, i] : acc), [])
            if (hits.length !== 1) {
              throw new Error(`expected 1 figure named '${name}', found ${hits.length}`)
            }

            const at = hits[0]
            const indent = (lines[at].match(/^[ \t]*/) || [''])[0]
            const line = `${indent}crop: '${crop}', pan: [${pan.join(', ')}], zoom: ${zoom},`

            let end = at + 1
            while (end < lines.length && !BLOCK_END.test(lines[end])) end++
            let removed = 0
            for (let i = end - 1; i > at; i--) {
              if (CROP_LINE.test(lines[i])) {
                lines.splice(i, 1)
                removed++
              }
            }
            lines.splice(at + 1, 0, line)

            writeFileSync(path, lines.join(eol), 'utf8')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true, name, removed, line: line.trim() }))
          } catch (err) {
            res.statusCode = 400
            res.end(String(err.message || err))
          }
        })
      })
    },
  }
}
