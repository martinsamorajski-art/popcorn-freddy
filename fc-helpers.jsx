// ─────────────────────────────────────────────────────────────
// Forest-concept shared helpers. Pure SVG so each direction stays
// one self-contained, GPU-cheap layer (transforms + opacity only).
// Atmospheric perspective is faked by lightening + blurring far
// layers toward the sky colour; depth-of-field by blurring the
// nearest framing layer. Everything namespaced (ns) so the four
// concepts can live on one page without id collisions.
// ─────────────────────────────────────────────────────────────

// seeded PRNG — stable foliage between renders
function fcRng(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// Soft organic canopy mass — overlapping circles read as storybook
// foliage rather than a repeating triangular-pine pattern.
function Foliage({ w = 1280, baseY = 500, color, lumps = 13, height = 130, seed = 1, opacity = 1, filter }) {
  const r = fcRng(seed);
  const blobs = [];
  for (let i = 0; i < lumps; i++) {
    const cx = (i / (lumps - 1)) * w + (r() - 0.5) * (w / lumps) * 0.8;
    const rad = height * (0.55 + r() * 0.7);
    const cy = baseY + (r() - 0.5) * height * 0.5;
    blobs.push([cx, cy, rad]);
    // satellite bumps for an irregular, hand-built crown
    blobs.push([cx + (r() - 0.5) * rad, cy - rad * (0.35 + r() * 0.4), rad * (0.4 + r() * 0.35)]);
    blobs.push([cx + (r() - 0.5) * rad * 1.4, cy - rad * 0.1, rad * (0.3 + r() * 0.3)]);
  }
  return (
    <g opacity={opacity} fill={color} filter={filter}>
      <rect x={-80} y={baseY} width={w + 160} height={1200} />
      {blobs.map((b, i) => <circle key={i} cx={b[0]} cy={b[1]} r={b[2]} />)}
    </g>
  );
}

// A single rounded storybook tree (trunk + layered crown)
function RoundTree({ x, baseY, h = 240, color, trunk, seed = 1, filter }) {
  const r = fcRng(seed);
  const cw = h * 0.62;
  return (
    <g filter={filter}>
      <path d={`M${x - h * 0.045},${baseY} Q${x - h * 0.02},${baseY - h * 0.5} ${x},${baseY - h * 0.55} Q${x + h * 0.02},${baseY - h * 0.5} ${x + h * 0.045},${baseY} Z`} fill={trunk} />
      <g fill={color}>
        <circle cx={x} cy={baseY - h * 0.72} r={cw * 0.5} />
        <circle cx={x - cw * 0.34} cy={baseY - h * 0.55} r={cw * 0.4} />
        <circle cx={x + cw * 0.34} cy={baseY - h * 0.56} r={cw * 0.42} />
        <circle cx={x - cw * 0.12} cy={baseY - h * 0.86} r={cw * 0.38} />
        <circle cx={x + cw * 0.18} cy={baseY - h * 0.84} r={cw * 0.36} />
      </g>
    </g>
  );
}

// Volumetric god-rays fanning from the sun. Warm, low opacity, blurred,
// slow shimmer. Reads strongest over darker scenes (concept C/E).
function GodRays({ ns, sx, sy, color = 'rgba(248,232,196,0.5)', angles = [-24, -14, -6, 4, 14, 24], maxOpacity = 0.5 }) {
  return (
    <g className="fc-rays" style={{ ['--ray-max']: maxOpacity }}>
      {angles.map((a, i) => {
        const wTop = 26 + (i % 3) * 10;
        const wBot = wTop * 4.2;
        return (
          <g key={i} transform={`translate(${sx} ${sy}) rotate(${a})`}>
            <path d={`M${-wTop / 2},0 L${wTop / 2},0 L${wBot / 2},1000 L${-wBot / 2},1000 Z`} fill={`url(#${ns}-ray)`} filter={`url(#${ns}-rayblur)`} />
          </g>
        );
      })}
    </g>
  );
}

// ── tiny, deliberately subtle story props ──────────────────────
function Lantern({ x, y, s = 1, ns, glow = true }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="fc-lantern">
      {glow && <circle cx="0" cy="6" r="34" fill={`url(#${ns}-lglow)`} />}
      <line x1="0" y1="-14" x2="0" y2="-7" stroke="#3a2c1c" strokeWidth="1.4" />
      <path d="M-6,-7 h12 v2 h-12 Z" fill="#4a3722" />
      <rect x="-5.5" y="-5" width="11" height="15" rx="2.5" fill="#F4B66B" stroke="#8a5a28" strokeWidth="1.1" />
      <rect x="-3" y="-2" width="6" height="10" rx="1.5" fill="#FBE6BC" />
      <path d="M-6,10 h12 v2.5 h-12 Z" fill="#4a3722" />
    </g>
  );
}

function Signpost({ x, y, s = 1, color = '#5a4126' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity="0.92">
      <rect x="-2" y="-30" width="4" height="42" rx="1.5" fill={color} />
      <path d="M-2,-28 L26,-28 L32,-23 L26,-18 L-2,-18 Z" fill={color} />
      <path d="M2,-14 L-24,-14 L-30,-9 L-24,-4 L2,-4 Z" fill={color} opacity="0.85" />
    </g>
  );
}

function Bridge({ x, y, w = 90, color = '#4a3722' }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity="0.85">
      <path d={`M${-w / 2},6 Q0,${-w * 0.22} ${w / 2},6`} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${-w / 2},14 Q0,${-w * 0.22 + 8} ${w / 2},14`} fill="none" stroke={color} strokeWidth="3" opacity="0.7" />
      {[-0.42, -0.21, 0, 0.21, 0.42].map((t, i) => {
        const px = t * w;
        const py = 6 - (w * 0.22) * (1 - (2 * t) * (2 * t));
        return <line key={i} x1={px} y1={py} x2={px} y2={py + 9} stroke={color} strokeWidth="2.2" />;
      })}
    </g>
  );
}

function TreasureMarker({ x, y, s = 1, ns }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="fc-twinkle">
      <line x1="0" y1="0" x2="0" y2="-22" stroke="#6e4c2e" strokeWidth="1.6" />
      <path d="M0,-22 L16,-18 L0,-13 Z" fill="#B25E2A" />
      <circle cx="0" cy="2" r="2.4" fill="#6e4c2e" />
    </g>
  );
}

// A gnarled old tree — hero prop for the minimal "storybook" concept
function OldTree({ x, baseY, h = 460, color = '#2E3826', trunk = '#3a2c1c', filter }) {
  return (
    <g filter={filter}>
      <path d={`M${x - 22},${baseY}
        C${x - 16},${baseY - h * 0.4} ${x - 30},${baseY - h * 0.55} ${x - 20},${baseY - h * 0.7}
        C${x - 12},${baseY - h * 0.82} ${x - 4},${baseY - h * 0.8} ${x},${baseY - h * 0.86}
        C${x + 4},${baseY - h * 0.8} ${x + 14},${baseY - h * 0.82} ${x + 22},${baseY - h * 0.7}
        C${x + 30},${baseY - h * 0.55} ${x + 16},${baseY - h * 0.4} ${x + 22},${baseY} Z`} fill={trunk} />
      {/* arching branch */}
      <path d={`M${x},${baseY - h * 0.66} C${x - 60},${baseY - h * 0.78} ${x - 130},${baseY - h * 0.7} ${x - 180},${baseY - h * 0.84}`} fill="none" stroke={trunk} strokeWidth="7" strokeLinecap="round" />
      <path d={`M${x},${baseY - h * 0.7} C${x + 70},${baseY - h * 0.86} ${x + 150},${baseY - h * 0.82} ${x + 205},${baseY - h * 0.96}`} fill="none" stroke={trunk} strokeWidth="6" strokeLinecap="round" />
      <g fill={color}>
        <circle cx={x} cy={baseY - h * 0.92} r={h * 0.2} />
        <circle cx={x - 150} cy={baseY - h * 0.86} r={h * 0.13} />
        <circle cx={x - 185} cy={baseY - h * 0.9} r={h * 0.1} />
        <circle cx={x + 180} cy={baseY - h * 0.98} r={h * 0.15} />
        <circle cx={x + 215} cy={baseY - h} r={h * 0.1} />
        <circle cx={x - 60} cy={baseY - h * 1.0} r={h * 0.15} />
        <circle cx={x + 70} cy={baseY - h * 1.02} r={h * 0.14} />
      </g>
    </g>
  );
}

// Shared <defs>: gradients + blur filters, namespaced per concept.
function FcDefs({ ns, sky, glow, ray, lantern, blurFar = 7, blurMid = 2.6, blurNear = 3.2 }) {
  return (
    <defs>
      <linearGradient id={`${ns}-sky`} x1="0" y1="0" x2="0" y2="1">
        {sky.map((s, i) => <stop key={i} offset={s[0]} stopColor={s[1]} />)}
      </linearGradient>
      <radialGradient id={`${ns}-sun`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={glow[0]} />
        <stop offset="45%" stopColor={glow[1]} />
        <stop offset="100%" stopColor={glow[2]} />
      </radialGradient>
      <linearGradient id={`${ns}-ray`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={ray} stopOpacity="0" />
        <stop offset="14%" stopColor={ray} stopOpacity="0.9" />
        <stop offset="100%" stopColor={ray} stopOpacity="0" />
      </linearGradient>
      <radialGradient id={`${ns}-lglow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={lantern || 'rgba(244,182,107,0.9)'} />
        <stop offset="100%" stopColor="rgba(244,182,107,0)" />
      </radialGradient>
      <filter id={`${ns}-blurFar`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={blurFar} /></filter>
      <filter id={`${ns}-blurMid`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={blurMid} /></filter>
      <filter id={`${ns}-blurNear`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation={blurNear} /></filter>
      <filter id={`${ns}-rayblur`} x="-60%" y="-30%" width="220%" height="160%"><feGaussianBlur stdDeviation="9" /></filter>
    </defs>
  );
}

// Hero content overlay — mirrors the real hero-a layout so each
// direction is judged for legibility, not just as wallpaper.
function HeroOverlay({ scrim }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
      <div style={{ position: 'absolute', inset: 0, background: scrim, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 clamp(40px,6%,96px)' }}>
        <div style={{ maxWidth: 600 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 999, background: 'rgba(20,24,16,0.42)', border: '1px solid rgba(242,233,217,0.24)', backdropFilter: 'blur(8px)', marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F4B66B', boxShadow: '0 0 12px #F4B66B' }} />
            <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#F2E9D9' }}>Die große Schatzsuche</span>
          </div>
          <h1 style={{ fontFamily: 'Gloock, serif', fontSize: 'clamp(34px,4.4vw,60px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: '#FAF4E8', margin: 0, textShadow: '0 4px 30px rgba(0,0,0,0.45), 0 1px 2px rgba(0,0,0,0.4)' }}>
            Das Kinderbuch, in dem dein Kind zur <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: '#F4B66B' }}>Hauptfigur</span> wird.
          </h1>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(17px,1.5vw,21px)', color: 'rgba(242,233,217,0.92)', lineHeight: 1.55, marginTop: 20, maxWidth: 480, textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}>
            Eine personalisierte Schatzsuche mit echten Holzspielzeugen zum Bauen, Bemalen und Entdecken.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
            <span style={{ padding: '13px 24px', borderRadius: 999, background: '#B25E2A', color: '#FAF4E8', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 700, fontSize: 14, boxShadow: '0 14px 30px -12px rgba(178,94,42,0.7)' }}>Kapitel 1 entdecken →</span>
            <span style={{ padding: '13px 24px', borderRadius: 999, border: '1px solid rgba(242,233,217,0.5)', color: '#F2E9D9', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 700, fontSize: 14, backdropFilter: 'blur(4px)' }}>So funktioniert's</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', marginTop: 30, paddingTop: 22, borderTop: '1px solid rgba(242,233,217,0.18)' }}>
            {[['⭐', 'Name deines Kindes im Buch'], ['🧩', 'Echte Holzspielzeuge'], ['❤️', 'Familienzeit statt Bildschirm']].map((p, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'Nunito Sans, sans-serif', fontSize: 12.5, fontWeight: 500, color: 'rgba(247,240,227,0.92)', textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}>
                <span style={{ fontSize: 15 }}>{p[0]}</span>{p[1]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { fcRng, Foliage, RoundTree, GodRays, Lantern, Signpost, Bridge, TreasureMarker, OldTree, FcDefs, HeroOverlay });
