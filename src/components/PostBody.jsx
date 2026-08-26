import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { img, bcDate } from '../data/fieldReports'
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
      <img className="byline__face" src={img(a.portrait, true, a.id)} alt="" loading="lazy"
           onError={hideBroken} />
      <div>
        <p className="byline__who">
          {byline(a.id)} <span>{a.trade}</span>
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

      {post.hero && (
        <figure className="fig fig--wide">
          <img src={img(post.hero.name, false, post.author)} alt={post.hero.alt}
               loading="eager" decoding="async" onError={hideBroken} />
          <figcaption>{post.hero.caption}</figcaption>
        </figure>
      )}

      {/* FLAT, not a div per paragraph. Wrapping each paragraph and its figure in a block
          made every block a new formatting context, which meant a floated inset could only
          wrap the one paragraph it was boxed with — so a short paragraph beside a tall
          photograph left a column of dead paper underneath it. Emitted flat, the float does
          what a float is for and the prose runs past it. */}
      <div className="prose">
        {post.body.map((para, i) => {
          const here = figures.filter((f) => f.at === i)
          return (
            <Fragment key={i}>
              <p>{para}</p>
              {/* The map belongs to one paragraph in one post: the one that opens on the
                  sea and says everything else follows from it. */}
              {post.showMapAfter === i && <WorldMap />}
              {here.map((f) => {
                // Insets alternate sides down the article. Counting the insets themselves
                // rather than using the paragraph index keeps the alternation regular
                // however unevenly they are spaced through the text.
                const nth = figures.filter((g) => g.size === 'inset').indexOf(f)
                const side = f.size === 'inset' ? (nth % 2 ? ' fig--right' : ' fig--left') : ''
                /* CROP IS EDITORIAL, so it lives on the figure rather than in the CSS.
                   These photographs are wide scenes with a lot going on, and shown whole
                   at inset width they all reduce to the same busy brown rectangle.

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
                  <figure className={`fig fig--${f.size ?? 'col'}${side}`} key={f.name}>
                    {f.crop ? (
                      <span
                        className={`fig__crop${editable ? ' fig--editable' : ''}`}
                        style={{ aspectRatio: f.crop }}
                        onClick={editable ? () => setEditing(f) : undefined}
                      >
                        <img
                          src={img(f.name, false, post.author)}
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
                        src={img(f.name, false, post.author)}
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
      {editing && <CropTool figure={editing} onClose={() => setEditing(null)} />}
    </article>
  )
}
