import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { img, reportImg, bcDate } from '../data/fieldReports'
import { byId, byline } from '../data/authors'
import { culturalDate } from '../data/calendars'
import WorldMap from './WorldMap'
import hideBroken from './hideBroken'
import EndMark from './EndMark'

/* ONE ARTICLE, RENDERED ONCE.
 *
 * This lived inside Reports.jsx while the front page was the only thing that drew a post.
 * Now every post also has a URL of its own at /reports/:slug, and an article body that
 * exists in two files is an article body that will drift between them.
 *
 * HOW A POST IS LAID OUT. Figures and pull quotes are placed BY HAND — each carries `at`,
 * the index of the paragraph it follows — so a picture sits next to the words it belongs
 * to. The version before this divided body length by photo count and dropped pictures at
 * the quotient, which is why a kitchen scene could turn up beside a paragraph about
 * shipping lanes. */

/* Who wrote it, from where, when. A byline is how a reader decides whether to trust the
   next thousand words, so it gets a face and a line of standing rather than a bare date
   stamp.

   THIS USED TO BE HARDCODED to Yadinu, his trade and one specific photograph, which was
   correct while there was one writer and became a silent lie the moment there were four:
   the region label and the byline sit in opposite corners of the layout, so a piece by
   Henut wearing Yadinu's face would have looked entirely normal. It reads from authors.js
   now, and a post with no valid `author` renders no byline at all rather than guessing. */
/* WHEN, AS THE WRITER WOULD HAVE SAID IT.
 *
 * "27 August 1226 BC" is a modern convention end to end: a Julian month name and a year
 * counted back from an event none of these four had heard of. Each of them had a real way of
 * dating a thing, and the four ways are not equivalent — Egypt counts a regnal year, Babylon
 * a lunar month and a king's year, Ugarit borrows Babylon's months, and Mycenaean Greece can
 * name a month and cannot name a year at all. See `calendars.js`.
 *
 * The modern date stays on the element as a title, because it is the only handle a reader has
 * for placing the piece against anything else they know. */
function WhenLine({ post }) {
  const when = culturalDate(post.region, post.date)
  if (!when) return <>{bcDate(post.date)}</>
  return (
    <span title={`${when.note} In our reckoning, about ${bcDate(post.date)}.`} className="byline__when-cal">
      {when.text}
    </span>
  )
}

export function Byline({ post }) {
  const a = byId[post.author]
  if (!a) return null
  return (
    <div className="byline">
      <Link className="byline__face-link" to={`/writers/${a.id}`} aria-label={`Profile of ${byline(a.id)}`}>
        <img className="byline__face" src={img(a.portrait, false, a.id)} alt="" loading="lazy"
             onError={hideBroken} />
      </Link>
      <div>
        <p className="byline__who">
          <Link to={`/writers/${a.id}`}>{byline(a.id)}</Link> <span>{a.trade}</span>
        </p>
        <p className="byline__when">
          {post.place} · <WhenLine post={post} />
        </p>
      </div>
    </div>
  )
}

/* A SINGLE FIGURE'S PICTURE, or the box where one is going to be.

   PLANNED FRAMES RENDER AS EMPTY BOXES. An article is laid out before its photographs
   exist, and a missing picture that simply collapses tells you nothing about whether the
   spacing works. So a figure marked `placeholder` draws its own hole at the right aspect
   ratio, and the layout can be judged with the pictures still unmade. */
function Frame({ img: f, post }) {
  const ratio = f.ratio ?? f.crop ?? '3 / 2'

  if (f.placeholder) {
    return (
      <span className="fig__hole" style={{ aspectRatio: ratio }} aria-hidden="true">
        <span className="fig__holeLabel">{f.name}</span>
      </span>
    )
  }

  const [px, py] = f.pan ?? [0, 0]
  if (f.crop) {
    return (
      <span className="fig__crop" style={{ aspectRatio: f.crop }}>
        <img src={reportImg(post, f.name)} alt={f.alt}
             style={{ transform: `translate(${px}%, ${py}%) scale(${f.zoom ?? 1})` }}
             loading="lazy" decoding="async" onError={hideBroken} />
      </span>
    )
  }
  return (
    <img src={reportImg(post, f.name)} alt={f.alt}
         loading="lazy" decoding="async" onError={hideBroken} />
  )
}

export default function PostBody({ post }) {
  const figures = post.figures ?? []
  const pulls = post.pulls ?? []

  return (
    <article className="postbody">
      <p className="postbody__kicker">{post.kind === 'letter' ? 'Introduction' : 'Field report'}</p>
      <h1 className="postbody__title">{post.title}</h1>
      <p className="postbody__stand">{post.standfirst}</p>
      <Byline post={post} />
      {post.dateline && <p className="postbody__dateline">{post.dateline}</p>}

      {post.hero && (
        <figure className="fig fig--wide">
          <Frame img={post.hero} post={post} />
          <figcaption>{post.hero.caption}</figcaption>
        </figure>
      )}

      {/* Keep the body flat so headings, figures and pull quotes share one editorial flow. */}
      <div className="prose">
        {post.body.map((para, i) => {
          const here = figures.filter((f) => f.at === i)
          /* A BODY ENTRY IS USUALLY A PARAGRAPH AND SOMETIMES NOT.
             Strings stayed plain for a long time on purpose: no markup in the prose meant
             no way to smuggle a link into a sentence, and the discipline was worth keeping.
             Long pieces broke it. At two thousand words a reader needs section breaks, and
             an article that quotes a ration tablet needs to set it apart from the argument.
             So an entry may also be {h} for a section heading or {quote} for a set-off
             block. Anything else is still just a paragraph. */
          const block =
            typeof para === 'string' ? <p>{para}</p>
            : para.h ? <h2 className="prose__h">{para.h}</h2>
            : para.quote ? <blockquote className="prose__quote">{para.quote}</blockquote>
            : null
          return (
            <Fragment key={i}>
              {block}
              {/* The map belongs to one paragraph in one post: the one that opens on the
                  sea and says everything else follows from it. */}
              {post.showMapAfter === i && <WorldMap />}
              {here.map((f) => {
                /* THREE SHAPES. `col` sits in the reading measure. `wide` runs the full
                   width of the article. `pair` is the National Geographic move: two
                   photographs set to a MATCHED HEIGHT with their widths left alone, so each
                   keeps its own aspect ratio, in a band that breaks outside the measure.
                   Normalising the height rather than the width is the whole trick — it is
                   what stops a portrait and a landscape beside each other looking like an
                   accident.

                   CROP IS EDITORIAL, so it lives on the figure rather than in the CSS.
                   `crop` is the shape of the window, `zoom` is how close, `pan` is where, in
                   percent of the frame. The ratio goes on a wrapper and never on the <img>:
                   setting `aspect-ratio` on the image alongside `height: auto` laid out a
                   box of exactly the right size containing nothing at all. */
                if (f.pair) {
                  return (
                    <figure className="fig fig--pair" key={f.name ?? f.pair[0].name}>
                      <span className="fig__pairrow">
                        {f.pair.map((p) => <Frame img={p} post={post} key={p.name} />)}
                      </span>
                      {f.caption && <figcaption>{f.caption}</figcaption>}
                    </figure>
                  )
                }
                const size = f.size === 'wide' ? 'wide' : 'col'
                return (
                  <figure className={`fig fig--${size}`} key={f.name}>
                    <Frame img={f} post={post} />
                    {f.caption && <figcaption>{f.caption}</figcaption>}
                  </figure>
                )
              })}
              {pulls
                .filter((q) => q.at === i)
                .map((q) => (
                  <blockquote className="pull" key={q.text}>
                    {q.text}
                  </blockquote>
                ))}
            </Fragment>
          )
        })}
      </div>

      <EndMark author={post.author} />

      {/* WHAT IS ATTESTED AND WHAT IS INVENTED, pulled out of the body and set at the end.
          It used to run as an ordinary paragraph, which cost the piece twice: the essay
          had to stop and turn round to deliver it, and it needed a spoken hinge to get
          there — "The honest note." opened that paragraph verbatim in three separate
          reports, which is a template rather than a voice.

          As furniture it needs no hinge at all. The box IS the announcement, the body is
          free to end on its own terms, and a reader who wants to know how much of this is
          guesswork can go straight to one place and find it in every piece. */}
      {post.standing && (
        <aside className="standing" aria-label="What is attested and what is invented">
          <p className="standing__label">Attested, and invented</p>
          {(Array.isArray(post.standing) ? post.standing : [post.standing]).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </aside>
      )}

      {/* THE NAMES. A reader who has just met Alašiya, Wilusa and Set Maat in one piece
          needs somewhere to put them, and the prose should not stop four times to say
          "which you call Cyprus".

          SO THE PROSE TEACHES AND THIS CATCHES. The writers explain the load-bearing
          things themselves, at length, in voice — that is the interesting half and it is
          where the reader learns why the flood matters or why bronze needs two metals.
          This list carries only the flat lookup: what a place is called on a modern map.
          Set at the foot of the piece rather than as tooltips, because a hover is invisible
          on a phone and a reader who wants the names wants them all at once. */}
      {post.glossary?.length > 0 && (
        <aside className="gloss" aria-label="The names in this piece">
          <p className="gloss__label">The names in this piece</p>
          <dl>
            {post.glossary.map((g) => (
              <Fragment key={g.term}>
                <dt>{g.term}</dt>
                <dd>{g.gloss}</dd>
              </Fragment>
            ))}
          </dl>
        </aside>
      )}

      {(post.recipe || post.related?.length > 0) && (
        <nav className="postbody__next" aria-label="Read next">
          {post.recipe && (
            <Link to={`/recipes/${post.recipe}`}>Cook the dish this came out of →</Link>
          )}
          {post.related?.map((r) => (
            <Link to={r.to} key={r.to}>
              {r.label} →
            </Link>
          ))}
        </nav>
      )}
    </article>
  )
}
