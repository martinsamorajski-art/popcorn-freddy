// ────────────────────────────────────────────────────────────────
// Cinematic atmosphere components — forest layers, fog, embers,
// hand-drawn arrows, story interlude.
// ────────────────────────────────────────────────────────────────

// Multi-layer pine silhouette — used as a forest backdrop. The SVG keeps its
// aspect ratio (xMidYMax slice) so trees never get squished, and is wider than
// the container so the sides are gracefully cropped at any viewport.
function PineSilhouette({ color = '#2E3826', opacity = 1, jitter = 0, style }) {
  const VBW = 1800, VBH = 360, GROUND = 340;
  // Procedurally generate tree positions
  const trees = [];
  const count = 30;
  for (let i = 0; i < count; i++) {
    const x = (i + 0.5) * (VBW / count) + (Math.sin(i * 7.1 + jitter) * 16);
    const s = 0.7 + ((Math.sin(i * 3.7 + jitter) + 1) * 0.45); // 0.7..1.6
    const yOff = Math.sin(i * 5.3 + jitter * 2) * 6;
    trees.push({ x, s, yOff });
  }
  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      preserveAspectRatio="xMidYMax slice"
      style={{ width: '100%', height: '100%', display: 'block', ...style }}
      aria-hidden
    >
      {/* Soft rolling ground band so trees plant cleanly */}
      <path
        d={`M0,${GROUND - 8} Q450,${GROUND - 22} 900,${GROUND - 10} T1800,${GROUND - 12} L1800,${VBH} L0,${VBH} Z`}
        fill={color}
        opacity={opacity}
      />
      {trees.map((t, i) => {
        const baseY = GROUND + t.yOff;
        const h = 150 * t.s;
        const w = 32 * t.s;
        // Stylized triangular pine (3 stacked tiers)
        const d = `
          M${t.x},${baseY - h}
          L${t.x - w * 0.45},${baseY - h * 0.65}
          L${t.x - w * 0.25},${baseY - h * 0.65}
          L${t.x - w * 0.7},${baseY - h * 0.35}
          L${t.x - w * 0.4},${baseY - h * 0.35}
          L${t.x - w},${baseY}
          L${t.x + w},${baseY}
          L${t.x + w * 0.4},${baseY - h * 0.35}
          L${t.x + w * 0.7},${baseY - h * 0.35}
          L${t.x + w * 0.25},${baseY - h * 0.65}
          L${t.x + w * 0.45},${baseY - h * 0.65}
          Z`;
        return <path key={i} d={d} fill={color} opacity={opacity} />;
      })}
    </svg>
  );
}

// Full parallax forest backdrop. Three pine layers + soft sky + mist.
// Cleaned up: no diagonal beams, no mix-blend-mode artifacts, smoother glow.
function ForestBackdrop({ scrollY = 0, variant = 'dusk', motion = 'statisch' }) {
  const palette = variant === 'dawn'
    ? { skyTop: '#F8E7C3', skyBottom: '#F2C58A', glow: 'rgba(244, 182, 107, 0.55)', mist: 'rgba(248, 231, 195, 0.55)', far: '#9AA683', mid: '#5C6948', near: '#33402A', ground: 'rgba(15, 18, 12, 0.32)' }
    : variant === 'night'
    ? { skyTop: '#1A2018', skyBottom: '#2E3826', glow: 'rgba(244, 182, 107, 0.32)', mist: 'rgba(80, 70, 50, 0.45)', far: '#3E4A33', mid: '#2A3422', near: '#141810', ground: 'rgba(0, 0, 0, 0.45)' }
    : /* dusk */ { skyTop: '#F4D9A8', skyBottom: '#E2A772', glow: 'rgba(244, 182, 107, 0.6)', mist: 'rgba(228, 195, 145, 0.5)', far: '#8A9573', mid: '#5C6948', near: '#2E3826', ground: 'rgba(15, 18, 12, 0.35)' };

  // Motion presets. The hero's scroll parallax was reading as restless, so the
  // default is now a much gentler factor. `sway` swaps scroll-driven motion for a
  // slow ambient drift that is independent of scrolling.
  const presets = {
    original: { f: 1,    sway: false },
    sanft:    { f: 0.3,  sway: false },
    statisch: { f: 0,    sway: false },
    wiegen:   { f: 0,    sway: true  },
  };
  const m = presets[motion] || presets.sanft;
  const py = (mult, cap) => `translateY(${Math.min(scrollY * mult * m.f, cap * m.f)}px)`;
  const swayClass = (n) => (m.sway ? `tree-sway tree-sway-${n}` : undefined);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Sky gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, ${palette.skyTop} 0%, ${palette.skyBottom} 55%, ${palette.far} 100%)`,
      }} />

      {/* Soft sun glow — large radial, no blur filter needed */}
      <div style={{
        position: 'absolute', left: '50%', top: '34%',
        width: 'min(110%, 1200px)', height: 800,
        transform: `translate(-50%, -50%) translateY(${scrollY * 0.04 * m.f}px)`,
        background: `radial-gradient(ellipse at center, ${palette.glow} 0%, transparent 60%)`,
        opacity: 0.9,
      }} />

      {/* Far pines */}
      <div style={{
        position: 'absolute', left: '-2%', right: '-2%', bottom: '28%', height: '34%',
        transform: py(0.08, 60),
        willChange: 'transform',
      }}>
        <div className={swayClass(1)} style={{ height: '100%' }}>
          <PineSilhouette color={palette.far} opacity={0.72} jitter={1} />
        </div>
      </div>

      {/* Mid pines */}
      <div style={{
        position: 'absolute', left: '-2%', right: '-2%', bottom: '12%', height: '46%',
        transform: py(0.18, 140),
        willChange: 'transform',
      }}>
        <div className={swayClass(2)} style={{ height: '100%' }}>
          <PineSilhouette color={palette.mid} opacity={0.92} jitter={2} />
        </div>
      </div>

      {/* Soft mist band — pure opacity, no blend modes */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: '10%', height: '28%',
        background: `linear-gradient(to top, ${palette.mist} 0%, transparent 85%)`,
        opacity: 0.7,
      }} />

      {/* Near pines */}
      <div style={{
        position: 'absolute', left: '-2%', right: '-2%', bottom: 0, height: '40%',
        transform: py(0.3, 240),
        willChange: 'transform',
      }}>
        <div className={swayClass(3)} style={{ height: '100%' }}>
          <PineSilhouette color={palette.near} opacity={1} jitter={3} />
        </div>
      </div>

      {/* Gentle bottom vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 92%, transparent 45%, ${palette.ground} 100%)`,
      }} />
    </div>
  );
}

// Floating embers/dust motes that drift upward — used inside hero & magical scenes
function FloatingEmbers({ count = 14, color = 'rgba(244, 182, 107, 0.85)' }) {
  const embers = Array.from({ length: count }, (_, i) => {
    const left = (i * 13 + 7) % 100;
    const delay = (i * 1.7) % 18;
    const dur = 14 + (i % 5) * 3;
    const size = 3 + (i % 4);
    const dx = (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 12);
    return { left, delay, dur, size, dx, i };
  });
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {embers.map((e) => (
        <div key={e.i} style={{
          position: 'absolute', bottom: -10, left: `${e.left}%`,
          width: e.size, height: e.size, borderRadius: '50%',
          background: color,
          boxShadow: `0 0 ${e.size * 4}px ${color}`,
          animation: `ember-rise ${e.dur}s ${e.delay}s linear infinite`,
          '--dx': `${e.dx}px`,
        }} />
      ))}
    </div>
  );
}

// Drifting fog band — overlay a soft horizontal fog inside a section
function FogBand({ color = 'rgba(244, 230, 200, 0.55)', height = '40%', from = 'bottom' }) {
  const pos = from === 'bottom' ? { bottom: 0 } : { top: 0 };
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, height,
      background: `linear-gradient(${from === 'bottom' ? 'to top' : 'to bottom'}, ${color} 0%, transparent 100%)`,
      pointerEvents: 'none', filter: 'blur(8px)', mixBlendMode: 'screen',
      ...pos,
    }} />
  );
}

// Falling leaves cluster (used in non-hero magical areas)
function FallingLeaves({ count = 7, palette = ['#708054', '#B25E2A', '#D88840', '#A88864', '#5C6948'] }) {
  const leaves = Array.from({ length: count }, (_, i) => i);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {leaves.map((i) => {
        const left = (i * 17 + 9) % 100;
        const delay = i * 2.4;
        const dur = 18 + (i % 3) * 4;
        const color = palette[i % palette.length];
        return (
          <Leaf key={i} size={22 + (i % 3) * 6} color={color}
            style={{ position: 'absolute', top: 0, left: left + '%', animation: `leaf-fall ${dur}s ${delay}s linear infinite`, opacity: 0.4 }} />
        );
      })}
    </div>
  );
}

// Hand-drawn squiggly arrow connecting sections (vertical)
function HandArrow({ height = 90, color = 'currentColor', style }) {
  return (
    <svg width="60" height={height} viewBox="0 0 60 120" fill="none" className="arrow-down" style={style} aria-hidden>
      <path
        d="M30 4 C 36 24, 18 44, 32 64 C 42 78, 22 96, 30 114"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none"
        strokeDasharray="2 4"
        opacity="0.7"
      />
      <path
        d="M22 104 L30 116 L40 106"
        stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

// A small ornament/dot divider — three dots with a leaf
function Ornament({ color = 'var(--rust)' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color, opacity: 0.55 }} aria-hidden>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1 Q3 5 3 9 Q3 13 7 13 Q11 13 11 9 Q11 5 7 1Z" fill="currentColor" /></svg>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
    </div>
  );
}

// Story interlude — italic quote between sections
function Interlude({ children, attribution }) {
  return (
    <section className="interlude reveal">
      <div className="ornament" />
      <blockquote className="quote">{children}</blockquote>
      {attribution && (
        <div className="eyebrow" style={{ marginTop: 24, color: 'var(--ink-mute)' }}>{attribution}</div>
      )}
    </section>
  );
}

// Scroll progress bar
function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: w + '%' }} />;
}

// Hook: track window scroll Y (throttled via rAF)
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setY(window.scrollY);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return y;
}

// Global drifting dust motes — fixed across viewport, low opacity, very slow.
// Gives the page subtle persistent atmosphere as you scroll through it.
function GlobalAtmosphere() {
  // 10 motes, randomized positions/speeds — fixed-position so they persist on scroll
  const motes = [
    { x: 6, y: 18, size: 3, dur: 38, delay: 0 },
    { x: 22, y: 72, size: 4, dur: 46, delay: 6 },
    { x: 34, y: 12, size: 2.5, dur: 52, delay: 12 },
    { x: 48, y: 58, size: 3.5, dur: 42, delay: 4 },
    { x: 62, y: 32, size: 3, dur: 50, delay: 18 },
    { x: 71, y: 84, size: 4.5, dur: 36, delay: 9 },
    { x: 85, y: 22, size: 2.5, dur: 48, delay: 22 },
    { x: 92, y: 64, size: 3, dur: 44, delay: 15 },
    { x: 14, y: 46, size: 3.5, dur: 56, delay: 7 },
    { x: 56, y: 88, size: 2.5, dur: 40, delay: 20 },
  ];
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 3,
      mixBlendMode: 'normal',
    }}>
      {motes.map((m, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${m.x}%`, top: `${m.y}%`,
          width: m.size, height: m.size,
          borderRadius: '50%',
          background: 'rgba(244, 215, 170, 0.6)',
          boxShadow: '0 0 8px rgba(244, 215, 170, 0.5)',
          animation: `mote-drift ${m.dur}s ${m.delay}s ease-in-out infinite`,
          opacity: 0.5,
          willChange: 'transform, opacity',
        }} />
      ))}
      <style>{`
        @keyframes mote-drift {
          0%, 100% { transform: translate(0, 0); opacity: 0.15; }
          25% { transform: translate(18px, -22px); opacity: 0.5; }
          50% { transform: translate(-12px, -36px); opacity: 0.3; }
          75% { transform: translate(22px, -14px); opacity: 0.45; }
        }
      `}</style>
    </div>
  );
}

// LightLeak — a soft warm corner glow used to make sections feel lit.
// Place inside a relative-positioned section. corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
function LightLeak({ corner = 'top-right', color = 'rgba(244, 182, 107, 0.32)', size = 720, opacity = 1 }) {
  const pos = {
    'top-left': { left: -size * 0.3, top: -size * 0.3 },
    'top-right': { right: -size * 0.3, top: -size * 0.3 },
    'bottom-left': { left: -size * 0.3, bottom: -size * 0.3 },
    'bottom-right': { right: -size * 0.3, bottom: -size * 0.3 },
  }[corner];
  return (
    <div aria-hidden style={{
      position: 'absolute', width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      pointerEvents: 'none', zIndex: 0, opacity,
      ...pos,
    }} />
  );
}

// SectionFog — a soft horizontal fog band overlay drifting slowly.
// Used at the bottom or top of sections to make transitions feel atmospheric.
function SectionFog({ from = 'bottom', color = 'rgba(244, 230, 200, 0.4)', height = '34%' }) {
  const isBottom = from === 'bottom';
  return (
    <div aria-hidden style={{
      position: 'absolute', left: 0, right: 0, height,
      [isBottom ? 'bottom' : 'top']: 0,
      background: `linear-gradient(${isBottom ? 'to top' : 'to bottom'}, ${color} 0%, transparent 92%)`,
      pointerEvents: 'none', zIndex: 1,
      animation: 'fog-drift 18s ease-in-out infinite',
    }} />
  );
}

// TornEdge — a hand-torn paper edge SVG to use as a section divider.
// Sits at the top of a section (pointing up) to overlap the previous section.
function TornEdge({ color = 'var(--paper)', position = 'top', height = 40 }) {
  const isTop = position === 'top';
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: -1,
        left: 0, right: 0,
        width: '100%', height,
        display: 'block',
        zIndex: 2,
        transform: isTop ? 'none' : 'scaleY(-1)',
      }}
    >
      <path
        d="M0,40 L0,22 Q90,6 180,18 Q270,30 360,14 Q450,2 540,16 Q620,28 720,12 Q820,2 920,18 Q1020,30 1120,14 Q1220,2 1320,18 Q1400,30 1440,16 L1440,40 Z"
        fill={color}
      />
    </svg>
  );
}

// AnimatedCompass — a slowly rotating compass rose for the treasure-map section
function AnimatedCompass({ size = 110, color = 'rgba(244, 182, 107, 0.92)' }) {
  return (
    <svg
      aria-hidden
      width={size} height={size} viewBox="0 0 120 120"
      style={{
        animation: 'compass-spin 90s linear infinite',
        filter: `drop-shadow(0 0 12px ${color})`,
      }}
    >
      <circle cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="60" cy="60" r="42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" strokeDasharray="3 5" />
      {/* Cardinal markers */}
      {[0, 90, 180, 270].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 60 60)`}>
          <line x1="60" y1="8" x2="60" y2="18" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
          <text x="60" y="6" textAnchor="middle" fill={color} fontSize="8" fontFamily="Cormorant Garamond, serif" fontStyle="italic" opacity="0.9">
            {['N', 'E', 'S', 'W'][i]}
          </text>
        </g>
      ))}
      {/* Inner cardinal lines */}
      {[45, 135, 225, 315].map((deg, i) => (
        <line key={i} transform={`rotate(${deg} 60 60)`} x1="60" y1="22" x2="60" y2="28" stroke={color} strokeWidth="0.8" opacity="0.5" />
      ))}
      {/* Arrow */}
      <path d="M60 18 L66 60 L60 56 L54 60 Z" fill={color} opacity="0.92" />
      <path d="M60 102 L66 60 L60 64 L54 60 Z" fill={color} opacity="0.45" />
      <circle cx="60" cy="60" r="3" fill={color} />
      <style>{`@keyframes compass-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

// PaperGrain — a subtle paper texture overlay you can place inside specific
// sections to add tactility on top of the global grain.
function PaperGrain({ opacity = 0.18 }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
      opacity, mixBlendMode: 'multiply',
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.42  0 0 0 0 0.31  0 0 0 0 0.19  0 0 0 0 0.09 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>\")",
    }} />
  );
}

// TransitionForest — a tree-silhouette bridge between a light and a dark
// section. Place inside the LIGHT section, anchored to the bottom, with
// `color` set to the DARK neighbor's color. The trees grow up into the
// next section, dissolving the boundary.
//
// Direction:
//   'down' (default): trees stand at the bottom of the current section.
//                     Use at the bottom of a light section before a dark one.
//   'up':             trees hang from the top (inverted) — at the top of
//                     a light section coming up out of a dark one.
function TransitionForest({ color = '#1A2018', height = 240, opacity = 1, direction = 'down', jitter = 5, fadeColor = null }) {
  const isUp = direction === 'up';
  return (
    <div aria-hidden style={{
      position: 'absolute', left: '-2%', right: '-2%',
      [isUp ? 'top' : 'bottom']: 0,
      height,
      pointerEvents: 'none',
      zIndex: 1,
      transform: isUp ? 'scaleY(-1)' : 'none',
    }}>
      {/* Soft fog band fading toward the dark color */}
      {fadeColor && (
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%',
          background: `linear-gradient(to top, ${fadeColor} 0%, transparent 100%)`,
        }} />
      )}
      <div style={{ position: 'absolute', inset: 0 }}>
        <PineSilhouette color={color} opacity={opacity * 0.55} jitter={jitter + 2} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '85%' }}>
        <PineSilhouette color={color} opacity={opacity} jitter={jitter} />
      </div>
    </div>
  );
}

Object.assign(window, {
  PineSilhouette, ForestBackdrop, FloatingEmbers, FogBand, FallingLeaves,
  HandArrow, Ornament, Interlude, ScrollProgress, useScrollY,
  GlobalAtmosphere, LightLeak, SectionFog, TornEdge, AnimatedCompass, PaperGrain,
  TransitionForest,
});
