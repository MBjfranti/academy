#!/usr/bin/env node
/* PROSE GUARD.
 *
 * The beautiful-prose skill kept getting skipped, and the prose linter kept getting run
 * only when somebody remembered. Both of those were a person's job and both failed. This
 * makes them the tool's job.
 *
 *   pre   Fires before a write to shipped prose. Injects the skill requirement and the
 *         writer's register, so the reminder arrives at the moment of writing rather than
 *         at the top of a session that has since moved on to a different writer.
 *
 *   post  Fires after the write. Runs `npm run prose` scoped to the touched article and
 *         feeds any hits back with exit code 2, whose stderr the agent reads. The write is
 *         NOT undone: this reports, it does not block.
 *
 * The hook never blocks on its own failure. Anything unexpected exits 0 silently, because
 * a broken guard must not become a broken editor.
 */
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const MODE = process.argv[2] === 'post' ? 'post' : 'pre'

/* Register per writer, mirrored from docs/personas.md and CLAUDE.md. Kept here so the
   reminder can name the exact arguments rather than telling the agent to go and look. */
const REGISTER = {
  yadinu: 'REGISTER: literary_modern DENSITY: standard HEAT: warm',
  henut: 'REGISTER: cold_steel DENSITY: lean HEAT: warm',
  balatu: 'REGISTER: journalistic DENSITY: dense HEAT: hot',
  anniwiya: 'REGISTER: cold_steel DENSITY: lean HEAT: warm',
}

const readStdin = async () => {
  const chunks = []
  for await (const c of process.stdin) chunks.push(c)
  return Buffer.concat(chunks).toString('utf8')
}

/* Shipped prose lives under src/data. Anything else (scripts, docs, components, config)
   is engineering and keeps its own conventions, including em dashes. */
const isShippedProse = (p) => {
  const n = p.replace(/\\/g, '/')
  if (!n.includes('/src/data/')) return false
  return n.endsWith('.js') && !n.endsWith('/index.js') && !n.includes('/visual-brief.js')
}

const slugOf = (p) => {
  const n = p.replace(/\\/g, '/')
  const m = n.match(/\/src\/data\/reports\/([^/]+)\/article\.js$/)
  return m ? m[1] : null
}

/* Best effort: read the author off the file we are about to touch, so the reminder can
   name the register instead of listing all four. */
const authorOf = async (p) => {
  try {
    const { readFileSync } = await import('node:fs')
    const m = readFileSync(p, 'utf8').match(/author:\s*'([a-z]+)'/)
    return m ? m[1] : null
  } catch {
    return null
  }
}

try {
  const raw = await readStdin()
  const evt = JSON.parse(raw || '{}')
  const file = evt?.tool_input?.file_path
  if (!file || !isShippedProse(file)) process.exit(0)

  if (MODE === 'pre') {
    const author = await authorOf(file)
    const args = REGISTER[author] ?? 'REGISTER: <see CLAUDE.md> DENSITY: <..> HEAT: <..>'
    const who = author ? ` (author: ${author})` : ''
    const msg =
      `SHIPPED PROSE: ${path.basename(path.dirname(file))}/${path.basename(file)}${who}\n` +
      `Per CLAUDE.md, the beautiful-prose skill is REQUIRED before writing or editing this ` +
      `file, including a one-line fix.\n` +
      `If it is not already loaded for THIS writer, invoke it now:\n` +
      `  Skill(skill="beautiful-prose", args="${args}")\n` +
      `Then check: no em dashes, no "not X but Y", no negation counterweights, one idea per ` +
      `sentence, no ", which is <wry tag>" endings.`
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg },
      }),
    )
    process.exit(0)
  }

  /* post: run the linter for the agent so it never has to remember to. */
  const slug = slugOf(file)
  const args = ['scripts/check_prose.mjs']
  if (slug) args.push(`--article=${slug}`)
  let out = ''
  try {
    out = execFileSync(process.execPath, args, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 30000,
    })
  } catch (e) {
    out = `${e.stdout ?? ''}${e.stderr ?? ''}`
  }
  const hits = out.split('\n').filter((l) => /\[[^\]]+\]/.test(l))
  if (!hits.length) process.exit(0)

  process.stderr.write(
    `npm run prose${slug ? ` -- --article=${slug}` : ''} reports ${hits.length} hit(s):\n` +
      hits.join('\n') +
      `\n\nFix each, or state in your reply why a specific one is deliberate. ` +
      `Agentless passives in a standing box are the usual legitimate exception.`,
  )
  process.exit(2)
} catch {
  process.exit(0)
}
