/* A picture that has not been made yet should read as a piece without one, rather than as a
 * piece with a broken one.
 *
 * WHY THIS EXISTS AT ALL. The writers' photographs are generated from the articles: a post
 * declares an image with a `scene`, `npm run frames` turns that into a work order, and the
 * pipeline fills it. Between writing the piece and running the pipeline the file is legitimately
 * absent, and that gap is a normal working state rather than an error.
 *
 * THE ALTERNATIVE WAS A FLAG. A `photos: true` per author, or a manifest of what exists,
 * either of which is a second source of truth that somebody has to remember to update on
 * the day the files land. This needs nothing: the moment an image exists it stops firing.
 *
 * IT HIDES THE FRAME, NOT THE IMAGE. Dropping just the `img` leaves the wrapper holding its
 * aspect-ratio, so a card keeps a grey rectangle where the picture would be, which looks
 * more broken than the broken image did. So it walks up to whichever container is actually
 * doing the layout: a real `figure` in an article, or a `__fig` wrapper on the front page.
 */
export default function hideBroken(e) {
  const img = e.currentTarget
  const frame = img.closest('figure') ?? img.closest('[class*="__fig"]') ?? img
  frame.style.display = 'none'
}
