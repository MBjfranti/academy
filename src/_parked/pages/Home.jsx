import { Link } from 'react-router-dom'
import { recipes, featuredRecipes } from '../data/recipes'
import { corpus } from '../data/corpus'
import { coreRegions, admittedRegions } from '../data/regions'
import { fieldReports } from '../data/fieldReports'
import { LEVELS, LEVEL_ORDER } from '../data/sourcing'
import { names } from '../data/kitchen'
import { Eyebrow, Diamond } from '../components/Apparatus'

export default function Home() {
  return (
    <>
      {/* ── The thesis. A real dish name, 3,750 years old, at the size it earns. ── */}
      <section className="hero">
        <div className="shell hero__grid">
          <div>
            <Eyebrow>
              The Oxhide Kitchen <Diamond /> Cooking the Bronze Age
            </Eyebrow>

            <span className="hero__dish">tuḫ&rsquo;u</span>

            <p className="hero__gloss">Lamb and beet, seared in tail fat and stewed in beer.</p>
            <p className="hero__claim">
              The oldest written recipe on earth that you can still cook tonight.
            </p>

            <p className="hero__stamp">
              YBC 4644 <Diamond /> Old Babylonian <Diamond /> c. 1730 BC
              <br />
              Fourteen ingredients. Not one quantity.
            </p>

            <div className="hero__actions">
              <Link className="btn btn--solid" to="/recipes/lamb-and-beet-stew-tuhu">
                Cook it
              </Link>
              <Link className="btn btn--ghost" to="/recipes">
                The collection
              </Link>
            </div>
          </div>

          <aside>
            <div className="hero__side">
              <h3>A kitchen, not a seminar</h3>
              <p>
                A cooking school that happens to work three thousand years back. Every dish here is one you
                can put on a fire this week, from a pantry you can actually assemble.
              </p>
              <p>
                Tell us what your shop stocks and the recipes rewrite themselves to match — without ever
                leaving the region or the period.
              </p>
              <Link className="backlink" to="/kitchen">
                Set up your kitchen →
              </Link>
            </div>

            <div className="hero__pantry">
              <p className="srcswitch__label">The pantry, whole</p>
              <p>
                Barley · emmer · lentils · lamb · goat · leek · garlic · cumin · coriander · dill · honey ·
                dates · figs · olive oil · sheep fat · butter · soured milk · beer · wine · sesame · salt
              </p>
              <p className="hero__pantry-no">
                No tomato · no chilli · no potato · no lemon · no sugar · no hops
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Food first ── */}
      <section className="section">
        <div className="shell">
          <div className="section__head">
            <Eyebrow>From the collection</Eyebrow>
            <h2>Four dishes, four kinds of evidence</h2>
            <p>
              A tablet that names a foreign dish. A bread we can still hold. A wine read out of a jar by
              mass spectrometry. A drink recovered from a bucket in a coffin. None of them reached us the
              same way, and all four are dinner.
            </p>
          </div>

          <div className="grid grid--2">
            {featuredRecipes.slice(1, 5).map((r) => (
              <Link className="card" to={`/recipes/${r.slug}`} key={r.slug}>
                <p className="card__meta">
                  {r.serves}
                  <Diamond />
                  {r.time}
                </p>
                <h3>{names[r.slug]?.common || r.title}</h3>
                <p className="card__ancient">{r.ancient}</p>
                <p>{r.summary}</p>
                <div className="card__foot">
                  <p className="card__meta">{r.date}</p>
                </div>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link className="btn btn--ghost" to="/recipes">
              All {recipes.length} dishes
            </Link>
          </p>
        </div>
      </section>

      {/* ── Why this is hard ── */}
      <section className="section section--sunk">
        <div className="shell">
          <div className="section__head">
            <Eyebrow tone="blue">Why this is hard</Eyebrow>
            <h2>The Bronze Age had a globalised kitchen. It just didn&rsquo;t write much down.</h2>
          </div>

          <div className="grid grid--3">
            <div className="card">
              <p className="card__ancient">The problem</p>
              <h3>Three tablets, and then silence</h3>
              <p>
                Every recipe surviving from the Bronze Age fits on three clay tablets in one collection at
                Yale. Everything else — Egypt, the Aegean, Hatti, the Levant, the north — left pantries,
                pictures, pots and residues, and no instructions at all.
              </p>
            </div>
            <div className="card">
              <p className="card__ancient">What we do</p>
              <h3>Cook it anyway, and show the seams</h3>
              <p>
                We reconstruct, because the alternative is to cook almost nothing. What we do not do is hide
                the joins. Where the tablet stops and the kitchen starts is marked on the page, beside the
                ingredient, where you will actually see it.
              </p>
            </div>
            <div className="card">
              <p className="card__ancient">The one rule</p>
              <h3>No fusion without contact</h3>
              <p>
                Cross-regional cooking is attested — a Babylonian scribe wrote down an Elamite broth and
                said so. What we will not serve is invented fusion between cultures that never met, or in
                some cases never overlapped by a single day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Regions ── */}
      <section className="section">
        <div className="shell">
          <div className="section__head">
            <Eyebrow>The map</Eyebrow>
            <h2>Eight pantries, and what each one can give you</h2>
            <p>
              Five core regions that demonstrably traded with each other, and three admitted on evidence of
              their own. Each has a different fat, a different sour, a different sweet — which is most of
              what makes them taste unlike each other.
            </p>
          </div>

          <div className="grid grid--4">
            {[...coreRegions, ...admittedRegions].map((region) => (
              <Link className="card" to={`/regions#${region.slug}`} key={region.slug}>
                <span className={`standing standing--${region.standing}`}>{region.standing}</span>
                <h3>{region.name}</h3>
                <p className="card__meta">{region.span}</p>
                <p>{region.line}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Field reports ── */}
      <section className="section section--sunk">
        <div className="shell">
          <div className="section__head">
            <Eyebrow>From the test kitchen</Eyebrow>
            <h2>What we cooked, and what went wrong</h2>
            <p>
              Failed bakes, split broths and fermentation logs. A reconstruction that cannot show its own
              history of being wrong is not a reconstruction — it is a claim.
            </p>
          </div>

          {fieldReports.slice(0, 3).map((report) => (
            <Link className="report" to={`/field-reports/${report.slug}`} key={report.slug}>
              <div className="report__stamp">
                {report.date}
                <br />
                {report.place}
              </div>
              <div>
                <h3>{report.title}</h3>
                <p>{report.standfirst}</p>
              </div>
            </Link>
          ))}

          <p style={{ marginTop: '2rem' }}>
            <Link className="btn btn--ghost" to="/field-reports">
              All field reports
            </Link>
          </p>
        </div>
      </section>

      {/* ── The sourcing feature, given its own section ── */}
      <section className="section">
        <div className="shell">
          <div className="section__head">
            <Eyebrow>Your kitchen</Eyebrow>
            <h2>Tell us what your shop actually stocks</h2>
            <p>
              Pick a level once and every ingredient list on the site rewrites itself. The rule it obeys:
              a substitute has to be something the same region grew, herded or traded in the same period.
              We will send you to a supermarket. We will not send you out of the Bronze Age.
            </p>
          </div>

          <div className="grid grid--3">
            {LEVEL_ORDER.map((key) => (
              <div className="card" key={key}>
                <p className="card__ancient">{LEVELS[key].label}</p>
                <h3 style={{ fontSize: '1.14rem' }}>{LEVELS[key].blurb}</h3>
                <p>{LEVELS[key].detail}</p>
              </div>
            ))}
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link className="btn btn--solid" to="/kitchen">
              Set your level
            </Link>
          </p>

          <div className="stats" style={{ marginTop: '3rem' }}>
            <div>
              <div className="stats__n">{recipes.length}</div>
              <div className="stats__l">Dishes you can cook</div>
            </div>
            <div>
              <div className="stats__n">{coreRegions.length + admittedRegions.length}</div>
              <div className="stats__l">Regions, five core &amp; three admitted</div>
            </div>
            <div>
              <div className="stats__n">{corpus.length}</div>
              <div className="stats__l">Sources behind them</div>
            </div>
            <div>
              <div className="stats__n">3</div>
              <div className="stats__l">Tablets in existence that carry recipes</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
