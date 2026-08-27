import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { img, reportImg, bcDate } from '../data/fieldReports'
import { byId, byline } from '../data/authors'
import WorldMap from './WorldMap'
import CropTool from './CropTool'
import hideBroken from './hideBroken'

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
          {post.place} · {bcDate(post.date)}
        </p>
      </div>
    </div>
  )
}

export default function PostBody({ post }) {
  const figures = post.figures ?? []
  const pulls = post.pulls ?? []

  /* THE CROP TOOL IS DEV-ONLY. Framing a photograph is eyeball work and editing numbers in
     a data file to do it is a twenty-second round trip per guess, so in dev a figure is
     clickable and opens an editor that writes the result straight back to the data. The
     whole thing — component, stylesheet, click handler — drops out of a production build,
     because `import.meta.env.DEV` is a compile-time constant. */
  const editable = import.meta.env.DEV
  const [editing, setEditing] = useState(null)

  return (
    <article className="postbody">
      <p className="postbody__kicker">{post.kind === 'letter' ? 'Introduction' : 'Field report'}</p>
      <h1 className="postbody__title">{post.title}</h1>
      <p className="postbody__stand">{post.standfirst}</p>
      <Byline post={post} />
      {post.dateline && <p className="postbody__dateline">{post.dateline}</p>}

      {post.hero && (
        <figure className="fig fig--wide">
          <img src={reportImg(post, post.hero.name)} alt={post.hero.alt}
               loading="eager" decoding="async" onError={hideBroken} />
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
                // Reports use only two scales. Unknown legacy values fall back to the
                // reading column instead of reviving the old floated inset treatment.
                const size = f.size === 'wide' ? 'wide' : 'col'
                /* CROP IS EDITORIAL, so it lives on the figure rather than in the CSS.
                   THREE VALUES, and they map onto what a hand does: `crop` is the shape of
                   the window, `zoom` is how close, `pan` is where — in percent of the
                   FRAME, which is what makes the drag in CropTool one-to-one. An earlier
                   model used object-position for framing and transform-origin for zoom;
                   two mechanisms both shifted the picture and neither could be driven
                   straight from a pointer delta.

                   THE RATIO GOES ON A WRAPPER, NOT ON THE <img>. Setting `aspect-ratio`
                   directly on the image alongside the sheet's `height: auto` produced a
                   box of exactly the right size containing nothing at all — the element
                   laid out and the replaced content never painted. */
                const [px, py] = f.pan ?? [0, 0]
                return (
                  <figure className={`fig fig--${size}`} key={f.name}>
                    {f.crop ? (
                      <span
                        className={`fig__crop${editable ? ' fig--editable' : ''}`}
                        style={{ aspectRatio: f.crop }}
                        onClick={editable ? () => setEditing(f) : undefined}
                      >
                        <img
                          src={reportImg(post, f.name)}
                          alt={f.alt}
                          style={{
                            transform: `translate(${px}%, ${py}%) scale(${f.zoom ?? 1})`,
                          }}
                          loading="lazy"
                          decoding="async"
                          onError={hideBroken}
                        />
                      </span>
                    ) : (
                      <img
                        className={editable ? 'fig--editable' : undefined}
                        src={reportImg(post, f.name)}
                        alt={f.alt}
                        onClick={editable ? () => setEditing(f) : undefined}
                        loading="lazy"
                        decoding="async"
                        onError={hideBroken}
                      />
                    )}
                    <figcaption>{f.caption}</figcaption>
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
      {editing && <CropTool figure={editing} postSlug={post.slug} onClose={() => setEditing(null)} />}
    </article>
  )
}
