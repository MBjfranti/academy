/* THE MAP.

   A CLAY TABLET, and that is the whole point. Three earlier attempts — two painted, one
   drawn as SVG from real coordinates — failed the same test in different ways: they were
   maps ABOUT this world rather than maps FROM it. The SVG was the most accurate object on
   the site and still read as a modern atlas wearing period colours.

   So the brief became diegetic: something Yadinu could own. The precedent is not in doubt.
   The Babylonian Map of the World is a clay tablet with the coasts scored into it by a
   stylus. In this world a map is not a document, it is a thing.

   THE MARKS ARE NOT LEGIBLE, AND THAT IS THE TRADE. A version of this tablet exists with
   the names cut in Latin capitals — readable, and it made the figure self-explanatory. It
   was rejected because Latin lettering on Bronze Age clay reads as a diagram of an object
   rather than the object, and this figure is carrying the weight of being the one artefact
   in the piece.

   What is on it instead is impressionistic: clusters of wedges and tally strokes beside
   each feature. They deliberately do NOT spell anything. That distinction is the whole
   defence — this site ships real cuneiform, Linear B and Ugaritic verified sign by sign
   against the shipped font, so a forged transcription of an actual word would be its one
   dishonest asset. Marks that say 'there is writing here' are not the same claim. Nothing
   in the alt text or the caption asserts that they read as anything.

   THE COST is that the map cannot explain itself, so the paragraph beside it has to. That
   paragraph was once 250 words of naming features in sequence, which asked a reader to
   hold nine facts while scrolling away from the picture. It is short now and it is about
   the names rather than the lines, which is the argument of the article anyway.

   The labelled variant is kept in images/_custom/_maps if this call is ever revisited. */
export default function WorldMap() {
  return (
    <figure className="worldmap">
      <img
        src="/img/map-eastern-mediterranean.webp"
        alt={
          'A clay tablet, chipped along one edge, with a chart cut into it by a stylus. Long ' +
          'wavy scored lines fill the left half for open water, holding two islands. A coast ' +
          'runs down the middle, with a ringed circle on it for the home port and a dashed ' +
          'line running east from it past a second ringed circle to a third. To the right, ' +
          'fields of small triangles for mountains and two long rivers running to the lower ' +
          'edge. At the bottom left a river opens into a fan of channels. Short groups of ' +
          'wedge marks sit beside each feature.'
        }
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        My own chart, in my own hand. Not to scale and not to be navigated by.
      </figcaption>
    </figure>
  )
}
