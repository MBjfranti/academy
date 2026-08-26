import { useEffect, useRef, useState } from 'react'
import './croptool.css'

/* THE CROP TOOL — a dev-only editor for framing article photographs.
 *
 * WHY IT EXISTS. Choosing which part of a photograph to show is eyeball work. Doing it by
 * editing numbers in a data file and reloading is a twenty-second round trip per guess,
 * and the guesses are never right first time — so in practice the crops stayed wherever
 * they first landed. This makes it a drag.
 *
 * THE MODEL. Three values fully describe a crop, and they map onto what a hand does:
 *   crop  the shape of the window, as an aspect ratio
 *   zoom  how close, as a multiplier on cover-fit
 *   pan   where, as a percentage of the FRAME's own width and height
 *
 * `pan` is in frame units on purpose: it makes the drag one-to-one, so moving the mouse
 * 40px moves the picture 40px. An earlier model used `object-position` for framing and a
 * separate `transform-origin` for zoom, which meant two mechanisms both shifted the image
 * and neither could be driven straight from a pointer delta.
 *
 * IT NEVER SHIPS. Gated on `import.meta.env.DEV` at the call site, so the whole component
 * and its stylesheet drop out of the production bundle.
 */

const RATIOS = ['4 / 5', '3 / 4', '1 / 1', '3 / 2', '16 / 9', '5 / 4']

/** How far the picture can travel before a gap shows, in percent of the frame. */
function panLimit(frameW, frameH, natW, natH, zoom) {
  if (!natW || !natH || !frameW || !frameH) return { x: 0, y: 0 }
  // Cover-fit first, then zoom on top of it.
  const cover = Math.max(frameW / natW, frameH / natH)
  const w = natW * cover * zoom
  const h = natH * cover * zoom
  return {
    x: Math.max(0, ((w - frameW) / 2 / frameW) * 100),
    y: Math.max(0, ((h - frameH) / 2 / frameH) * 100),
  }
}

const clamp = (v, lim) => Math.max(-lim, Math.min(lim, v))

export default function CropTool({ figure, onClose }) {
  const [crop, setCrop] = useState(figure.crop ?? '4 / 5')
  const [zoom, setZoom] = useState(figure.zoom ?? 1)
  const [pan, setPan] = useState(figure.pan ?? [0, 0])
  const [saved, setSaved] = useState(null)
  const frameRef = useRef(null)
  const imgRef = useRef(null)
  const drag = useRef(null)

  // Re-clamp whenever the window changes shape or the picture moves closer, so the frame
  // can never be left showing background it was not showing a moment ago.
  useEffect(() => {
    const f = frameRef.current
    const i = imgRef.current
    if (!f || !i?.naturalWidth) return
    const lim = panLimit(f.clientWidth, f.clientHeight, i.naturalWidth, i.naturalHeight, zoom)
    setPan(([x, y]) => [clamp(x, lim.x), clamp(y, lim.y)])
  }, [crop, zoom])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function onPointerDown(e) {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, y: e.clientY, pan }
  }

  function onPointerMove(e) {
    if (!drag.current) return
    const f = frameRef.current
    const i = imgRef.current
    const lim = panLimit(f.clientWidth, f.clientHeight, i.naturalWidth, i.naturalHeight, zoom)
    // One-to-one: the picture keeps up with the pointer exactly.
    const dx = ((e.clientX - drag.current.x) / f.clientWidth) * 100
    const dy = ((e.clientY - drag.current.y) / f.clientHeight) * 100
    setPan([clamp(drag.current.pan[0] + dx, lim.x), clamp(drag.current.pan[1] + dy, lim.y)])
  }

  const onPointerUp = () => {
    drag.current = null
  }

  function onWheel(e) {
    e.preventDefault()
    setZoom((z) => Math.min(4, Math.max(1, +(z - e.deltaY * 0.0015).toFixed(3))))
  }

  const values = { crop, zoom: +zoom.toFixed(3), pan: pan.map((n) => +n.toFixed(1)) }
  const snippet =
    `crop: '${values.crop}', pan: [${values.pan.join(', ')}], zoom: ${values.zoom},`

  async function lockIt() {
    setSaved('saving')
    try {
      const res = await fetch('/__crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: figure.name, ...values }),
      })
      setSaved(res.ok ? 'saved' : `failed: ${await res.text()}`)
    } catch (err) {
      setSaved(`failed: ${err.message}`)
    }
  }

  return (
    <div className="croptool" role="dialog" aria-label={`Crop ${figure.name}`}>
      <header>
        <b>{figure.name}</b>
        <button onClick={onClose} aria-label="Close">
          ✕
        </button>
      </header>

      <div
        className="croptool__frame"
        style={{ aspectRatio: crop }}
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        <img
          ref={imgRef}
          src={`/img/writers/${figure.writer ?? 'yadinu'}/${figure.name}.webp`}
          alt=""
          draggable="false"
          style={{ transform: `translate(${pan[0]}%, ${pan[1]}%) scale(${zoom})` }}
        />
        {/* Thirds, to frame against. Pointer-events off so they never eat a drag. */}
        <span className="croptool__thirds" aria-hidden="true" />
      </div>

      <div className="croptool__rows">
        <label>
          <span>Shape</span>
          <select value={crop} onChange={(e) => setCrop(e.target.value)}>
            {RATIOS.map((r) => (
              <option key={r} value={r}>
                {r.replace(/ /g, '')}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Zoom</span>
          <input
            type="range"
            min="1"
            max="4"
            step="0.01"
            value={zoom}
            onChange={(e) => setZoom(+e.target.value)}
          />
          <i>{zoom.toFixed(2)}×</i>
        </label>

        <p className="croptool__hint">Drag the picture to move it · scroll to zoom</p>
      </div>

      <footer>
        <button className="croptool__lock" onClick={lockIt}>
          {saved === 'saving' ? 'Saving…' : saved === 'saved' ? 'Locked ✓' : 'Lock this crop'}
        </button>
        <button onClick={() => navigator.clipboard?.writeText(snippet)}>Copy</button>
      </footer>

      <code className="croptool__snippet">{snippet}</code>
      {saved && saved.startsWith('failed') && <p className="croptool__err">{saved}</p>}
    </div>
  )
}
