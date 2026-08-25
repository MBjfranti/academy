// The evidence apparatus. Every ingredient, step and dish in the collection
// carries one of these four grades. Nothing is published ungraded.

export const GRADES = {
  attested: {
    key: 'attested',
    label: 'Attested',
    mark: 'I',
    short: 'Named in a primary text, or physically recovered.',
    long: 'The item is written on a tablet, painted or carved on a wall, or has been recovered from the ground and identified by archaeobotany, zooarchaeology or residue chemistry. This is the only grade that carries no editorial hand.',
  },
  inferred: {
    key: 'inferred',
    label: 'Inferred',
    mark: 'II',
    short: 'Required by the attested materials and equipment.',
    long: 'The source does not state it, but the dish cannot be produced without it. Hulled emmer must be parched and pounded before it can be milled; no text says so, because no cook needed telling.',
  },
  reconstructed: {
    key: 'reconstructed',
    label: 'Reconstructed',
    mark: 'III',
    short: 'An editorial bridge across a gap in the source.',
    long: 'The source breaks off, gives no quantity, or names a pantry without naming a dish. We have built the crossing and we are telling you where it starts and ends. Every quantity in this collection is grade III — no Bronze Age culinary text states a measure.',
  },
  unidentified: {
    key: 'unidentified',
    label: 'Unidentified',
    mark: 'IV',
    short: 'The word survives. The referent does not.',
    long: 'We can read the sign and we cannot tell you what it was. samidu, suhutinnu, po-ni-ki-jo. Where a dish depends on a grade IV term, we say so and we cook the dish twice.',
  },
}

export const GRADE_ORDER = ['attested', 'inferred', 'reconstructed', 'unidentified']

export function gradeCounts(recipe) {
  const counts = { attested: 0, inferred: 0, reconstructed: 0, unidentified: 0 }
  for (const group of recipe.ingredientGroups) {
    for (const item of group.items) counts[item.grade] = (counts[item.grade] || 0) + 1
  }
  return counts
}

export function attestedShare(recipe) {
  const counts = gradeCounts(recipe)
  const total = GRADE_ORDER.reduce((sum, key) => sum + counts[key], 0)
  return total ? Math.round((counts.attested / total) * 100) : 0
}
