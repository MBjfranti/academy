export default {
  article: 'the-reused-bricks-of-babylon',
  rule: 'Photograph a working building site, not a monument or a ruin. The bricks are secondhand and the men handling them are indifferent to whose name is on them. Balāṭu never appears: the piece carries him in the first person and the only recurring body in frame is Arad-Ea.',
  frames: [
    {
      name: 'hero',
      mode: 'reportage',
      role: 'hero',
      claim: 'A new wall is going up out of old brick, fast, by men who bought it by the cartload.',
      preferredEvidence: 'A half-built wall with a crew passing brick up a line, a heap of salvaged brick of mismatched colours beside them, dust and wet mortar.',
      avoid: 'A ruin, a monument, a ziggurat, an archaeological trench, a romantic sunset, or anyone posing.',
    },
    {
      name: 'stamped-brick',
      mode: 'specimen',
      role: 'body',
      claim: 'A king stamped his name into a brick to outlast his building, and the brick outlasted the claim.',
      preferredEvidence: 'One brick held flat in two hands, its stamped panel sharp under raking light, corners chipped and one edge scarred where old mortar was knocked off. It has been lifted before.',
      avoid: 'A museum case, a display label, a pristine restored brick, gold, or legible real text.',
    },
    {
      name: 'brickyard',
      mode: 'landscape',
      role: 'body',
      claim: 'A brickyard is a field taken out of the year for the month the sun is best.',
      preferredEvidence: 'Ranks of drying brick across flat ground to the horizon, a few men turning them, barley strips running right up to the edge of the drying floor on a hard straight line.',
      avoid: 'A factory, a kiln stack, machinery, a picturesque village, or an empty vista with no work in it.',
    },
    {
      name: 'arad-ea',
      mode: 'portrait',
      role: 'body',
      claim: 'The foreman is right about the brick and uninterested in the kings.',
      preferredEvidence: 'Arad-Ea at about fifty-five, still, mortar dried to the wrist, sighting along his own course rather than at the camera.',
      avoid: 'A smile at the camera, a heroic pose, a supervisor with a scroll, a clean tunic, or an official.',
    },
    {
      name: 'the-crew-pot',
      mode: 'reportage',
      role: 'body',
      claim: 'The building crew is the harvest crew, and eats the harvest pot.',
      preferredEvidence: 'A dozen men eating standing in the narrow shade at the foot of the wall they built that morning, one large pot at the edge of a low fire behind them.',
      avoid: 'A banquet, a table, a styled food photograph, or a seated group arranged for the camera.',
    },
    {
      /* PAIR, first half. Runs at matched height against `wall-course`, which is the point:
         the deposit lies face up and the wall brick lies face down, and the two frames have
         to be read against each other for that to land. */
      name: 'foundation-box',
      mode: 'specimen',
      role: 'body',
      claim: 'A foundation deposit is a letter that expects to be dug up, and the proper answer is to lay it back face up with your own beside it.',
      preferredEvidence: 'Two clay tablets face up side by side in an opened foundation corner, one older and darker than the other, brick courses in section around them.',
      avoid: 'Modern excavation tools, a trowel, string grids, archaeologists, a museum display, or gold.',
    },
    {
      /* PAIR, second half. */
      name: 'wall-course',
      mode: 'specimen',
      role: 'body',
      claim: 'The stamp assumes the wall, so the wall does what it likes with the stamp.',
      preferredEvidence: 'A finished wall face with one brick obviously out of place, its stamped panel turned ninety degrees to the course and half covered by mortar.',
      avoid: 'A museum wall, a display label, restoration work, a clean new brick, or a studio backdrop.',
    },
    {
      /* The hinge of the piece since the rewrite. The fourth stamp is unreadable by eye
         because its face is in the wall, so he reads it by thumb at dusk and finds he
         miscounted. Added after the visual brief was first written. */
      name: 'face-inward',
      mode: 'specimen',
      role: 'body',
      claim: 'The fourth stamp had to be read by thumb, and reading it cost him a king.',
      preferredEvidence: 'A thumb flat against the narrow exposed edge of a brick set into a wall at dusk, the stamped face itself buried and invisible, one thin band of last light along the edge.',
      avoid: 'A museum object, a display label, a clean studio photograph, broad daylight, a torch, or a lamp.',
    },
  ],
}
