// ─────────────────────────────────────────────────────────────
// Four forest directions behind the hero. Each is a single
// xMidYMid-slice SVG (depth via lighten+blur for distance,
// blur on the nearest frame for depth-of-field) topped with the
// shared HeroOverlay so legibility is part of the comparison.
// ─────────────────────────────────────────────────────────────
const FC_VB = '0 0 1280 800';
const fcSvg = { position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' };

function FogRect({ id, y, h, className }) {
  return <rect x="-80" y={y} width="1440" height={h} fill={`url(#${id})`} className={className} />;
}

// ── A · The Whispering Forest — warm, bright, welcoming ─────────
function ConceptA() {
  const ns = 'a';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox={FC_VB} preserveAspectRatio="xMidYMid slice" style={fcSvg} aria-hidden>
        <FcDefs ns={ns}
          sky={[['0%', '#F8E8C0'], ['44%', '#F3D199'], ['76%', '#ECBC80'], ['100%', '#D9C99C']]}
          glow={['rgba(255,246,219,0.95)', 'rgba(245,196,124,0.5)', 'rgba(245,196,124,0)']}
          ray="rgba(252,238,206,0.85)" lantern="rgba(244,182,107,0.95)" blurFar={7} blurMid={2.4} blurNear={3} />
        <defs>
          <linearGradient id={`${ns}-fog1`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F6ECCF" stopOpacity="0" /><stop offset="100%" stopColor="#F6ECCF" stopOpacity="0.7" /></linearGradient>
          <linearGradient id={`${ns}-fog2`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EFE2C0" stopOpacity="0" /><stop offset="100%" stopColor="#EFE2C0" stopOpacity="0.85" /></linearGradient>
        </defs>

        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sky)`} />
        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sun)`} transform="translate(560 -120) scale(1.4)" opacity="0.9" style={{ transformOrigin: '560px 120px' }} />
        <GodRays ns={ns} sx={840} sy={120} maxOpacity={0.3} angles={[-20, -10, -2, 8, 18]} />

        {/* distant ridge — heavily lightened + blurred */}
        <Foliage w={1280} baseY={372} color="#D6DAB4" opacity={0.7} lumps={9} height={120} seed={3} filter={`url(#${ns}-blurFar)`} />
        <Foliage w={1280} baseY={430} color="#BCC793" opacity={0.85} lumps={11} height={130} seed={9} filter={`url(#${ns}-blurFar)`} />
        <FogRect id={`${ns}-fog1`} y={360} h={210} className="fc-fog fc-fog-a" />

        {/* midground */}
        <Foliage w={1280} baseY={540} color="#8FA169" opacity={0.96} lumps={13} height={140} seed={21} filter={`url(#${ns}-blurMid)`} />
        <Signpost x={336} y={566} s={1.15} color="#5a4126" />
        <TreasureMarker x={946} y={452} s={1} ns={ns} />
        <FogRect id={`${ns}-fog2`} y={520} h={210} className="fc-fog fc-fog-b" />

        {/* near framing trees + foreground */}
        <g filter={`url(#${ns}-blurNear)`} opacity="0.5">
          <RoundTree x={120} baseY={812} h={520} color="#2F3B22" trunk="#33271a" seed={2} />
          <RoundTree x={1180} baseY={820} h={560} color="#2A3520" trunk="#33271a" seed={5} />
        </g>
        <Foliage w={1280} baseY={712} color="#2E3826" opacity={1} lumps={12} height={120} seed={31} />

        {/* hanging lantern from a near branch, top-left */}
        <path d="M-10,70 C90,86 150,150 196,150" fill="none" stroke="#2b2114" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        <Lantern x={196} y={150} s={1.5} ns={ns} />

        <rect x="0" y="560" width="1280" height="240" fill={`url(#${ns}-fog2)`} opacity="0.5" />
        <rect x="0" y="0" width="1280" height="800" fill="url(#a-grade)" />
        <defs>
          <radialGradient id="a-grade" cx="42%" cy="46%" r="75%"><stop offset="55%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(28,20,8,0.42)" /></radialGradient>
        </defs>
      </svg>
      <HeroOverlay scrim="linear-gradient(100deg, rgba(20,24,14,0.6) 0%, rgba(20,24,14,0.32) 34%, rgba(20,24,14,0.05) 62%, transparent 82%)" />
    </div>
  );
}

// ── B · Adventure Valley — a path inviting you in ───────────────
function ConceptB() {
  const ns = 'b';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox={FC_VB} preserveAspectRatio="xMidYMid slice" style={fcSvg} aria-hidden>
        <FcDefs ns={ns}
          sky={[['0%', '#F7E7BE'], ['42%', '#F2CE93'], ['72%', '#E9BA86'], ['100%', '#CFC596']]}
          glow={['rgba(255,247,222,0.98)', 'rgba(245,193,120,0.5)', 'rgba(245,193,120,0)']}
          ray="rgba(252,238,206,0.85)" blurFar={7} blurMid={2.6} blurNear={3} />
        <defs>
          <linearGradient id={`${ns}-fog1`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F4E8CC" stopOpacity="0" /><stop offset="100%" stopColor="#F4E8CC" stopOpacity="0.78" /></linearGradient>
          <linearGradient id={`${ns}-path`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EAD3A0" /><stop offset="100%" stopColor="#D8B879" /></linearGradient>
          <radialGradient id={`${ns}-grade`} cx="50%" cy="42%" r="72%"><stop offset="58%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(28,20,8,0.4)" /></radialGradient>
        </defs>

        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sky)`} />
        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sun)`} transform="translate(700 -210) scale(1.2)" opacity="0.95" style={{ transformOrigin: '700px 210px' }} />
        <GodRays ns={ns} sx={712} sy={120} maxOpacity={0.28} angles={[-20, -10, -2, 8, 18]} />

        {/* far, hazy tree line at the horizon */}
        <Foliage w={1280} baseY={392} color="#D6DAB2" opacity={0.62} lumps={9} height={92} seed={4} filter={`url(#${ns}-blurFar)`} />
        <FogRect id={`${ns}-fog1`} y={372} h={150} className="fc-fog fc-fog-a" />

        {/* rolling open meadow — the corridor the trail runs through */}
        <path d="M-80,486 Q320,456 660,480 Q1000,504 1360,470 L1360,900 L-80,900 Z" fill="#AEBC83" opacity="0.92" />
        <path d="M-80,560 Q360,524 760,556 Q1060,580 1360,548 L1360,900 L-80,900 Z" fill="#8DA169" />

        {/* framing hills, kept to the sides so the trail stays open */}
        <g filter={`url(#${ns}-blurMid)`}>
          <g transform="translate(-360 0)"><Foliage w={900} baseY={520} color="#9CAE74" opacity={0.95} lumps={8} height={150} seed={22} /></g>
          <g transform="translate(940 0)"><Foliage w={700} baseY={500} color="#93A66E" opacity={0.95} lumps={7} height={165} seed={33} /></g>
        </g>
        <TreasureMarker x={1086} y={452} s={1} ns={ns} />

        {/* the trail leading into the distance */}
        <path d="M820,818 C790,700 700,640 716,452 L724,452 C742,640 940,700 1000,818 Z" fill={`url(#${ns}-path)`} opacity="0.92" />
        {[[905, 800, 40], [876, 740, 32], [846, 684, 25], [814, 628, 19], [786, 576, 14], [760, 528, 10], [740, 490, 7], [726, 460, 5]].map((s, i) =>
          <ellipse key={i} cx={s[0]} cy={s[1]} rx={s[2]} ry={s[2] * 0.3} fill="#C7A468" opacity="0.7" />)}
        <Bridge x={814} y={628} w={78} color="#5a4126" />
        <Signpost x={998} y={760} s={1.5} color="#5a4126" />

        {/* low near framing — corners only, never over the trail */}
        <g filter={`url(#${ns}-blurNear)`} opacity="0.5">
          <RoundTree x={70} baseY={820} h={560} color="#2C3720" trunk="#33271a" seed={6} />
          <RoundTree x={1238} baseY={830} h={560} color="#28331E" trunk="#33271a" seed={8} />
        </g>
        <Foliage w={620} baseY={772} color="#2E3826" opacity={1} lumps={6} height={120} seed={41} />
        <g transform="translate(1080 0)"><Foliage w={420} baseY={780} color="#2E3826" opacity={1} lumps={4} height={120} seed={43} /></g>
        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-grade)`} />
      </svg>
      <HeroOverlay scrim="linear-gradient(100deg, rgba(20,24,14,0.6) 0%, rgba(20,24,14,0.3) 36%, rgba(20,24,14,0.04) 64%, transparent 84%)" />
    </div>
  );
}

// ── C · Enchanted Forest — cinematic, fog, mystery, depth ───────
function TrunkRow({ baseY, topY, xs, color, wBot, filter, opacity = 1 }) {
  return (
    <g fill={color} filter={filter} opacity={opacity}>
      {xs.map((x, i) => {
        const wt = wBot * 0.5;
        return <path key={i} d={`M${x - wt / 2},${topY} L${x + wt / 2},${topY} L${x + wBot / 2},${baseY} L${x - wBot / 2},${baseY} Z`} />;
      })}
    </g>
  );
}

function ConceptC() {
  const ns = 'c';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox={FC_VB} preserveAspectRatio="xMidYMid slice" style={fcSvg} aria-hidden>
        <FcDefs ns={ns}
          sky={[['0%', '#CDBC8C'], ['34%', '#A9AE7C'], ['66%', '#76805A'], ['100%', '#3C472D']]}
          glow={['rgba(255,243,210,0.95)', 'rgba(244,182,107,0.45)', 'rgba(244,182,107,0)']}
          ray="rgba(253,240,206,0.98)" blurFar={8} blurMid={3} blurNear={4.5} />
        <defs>
          <radialGradient id={`${ns}-coreglow`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFF7DE" stopOpacity="0.95" /><stop offset="45%" stopColor="#F6E3B0" stopOpacity="0.5" /><stop offset="100%" stopColor="#F6E3B0" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${ns}-clearing`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#F6E6BC" stopOpacity="0.72" /><stop offset="100%" stopColor="#F6E6BC" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${ns}-fog1`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D9C99E" stopOpacity="0" /><stop offset="100%" stopColor="#D9C99E" stopOpacity="0.85" /></linearGradient>
          <linearGradient id={`${ns}-fog2`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#AEB489" stopOpacity="0" /><stop offset="100%" stopColor="#AEB489" stopOpacity="0.9" /></linearGradient>
          <linearGradient id={`${ns}-fog3`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8C9468" stopOpacity="0" /><stop offset="100%" stopColor="#7C8459" stopOpacity="0.92" /></linearGradient>
          <radialGradient id={`${ns}-grade`} cx="50%" cy="42%" r="76%"><stop offset="46%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(12,16,7,0.56)" /></radialGradient>
        </defs>

        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sky)`} />
        {/* the luminous clearing — a magical opening at the heart of the woods */}
        <circle cx="648" cy="404" r="300" fill={`url(#${ns}-coreglow)`} />
        <circle cx="648" cy="430" r="480" fill={`url(#${ns}-clearing)`} />

        {/* distant misty trees dissolving inside the opening */}
        <TrunkRow baseY={520} topY={214} xs={[470, 560, 648, 740, 830]} color="#D8CEA6" wBot={16} filter={`url(#${ns}-blurFar)`} opacity={0.42} />
        <FogRect id={`${ns}-fog1`} y={300} h={260} className="fc-fog fc-fog-a" />

        {/* god-rays pouring out of the clearing */}
        <GodRays ns={ns} sx={648} sy={150} maxOpacity={0.6} angles={[-26, -16, -7, 2, 11, 21]} />

        {/* mid trunks flanking the opening — centre stays luminous */}
        <TrunkRow baseY={660} topY={150} xs={[140, 300, 452, 858, 1010, 1160]} color="#46523A" wBot={40} filter={`url(#${ns}-blurMid)`} opacity={0.92} />
        <g className="fc-lantern">
          <circle cx="392" cy="392" r="60" fill={`url(#${ns}-lglow)`} opacity="0.85" />
          <circle cx="912" cy="372" r="50" fill={`url(#${ns}-lglow)`} opacity="0.8" />
        </g>
        <Lantern x={392} y={386} s={1.35} ns={ns} />
        <Lantern x={912} y={368} s={1.1} ns={ns} />

        {/* a glowing trail leading toward the light */}
        <path d="M560,800 C600,690 700,648 678,556 C662,500 700,486 690,452 L702,452 C712,488 752,506 730,564 C712,648 760,700 736,800 Z" fill="#E7D49C" opacity="0.5" />
        <FogRect id={`${ns}-fog2`} y={470} h={250} className="fc-fog fc-fog-b" />

        {/* near framing — dark silhouetted trunks + corner canopy, centre open */}
        <TrunkRow baseY={812} topY={20} xs={[60, 1224]} color="#161B10" wBot={130} filter={`url(#${ns}-blurNear)`} opacity={0.97} />
        <g filter={`url(#${ns}-blurNear)`} fill="#161B10" opacity="0.97">
          {[[30, 60, 130], [150, 30, 120], [250, 110, 110], [10, 150, 120]].map((c, i) => <circle key={'l' + i} cx={c[0]} cy={c[1]} r={c[2]} />)}
          {[[1250, 50, 140], [1130, 24, 120], [1030, 110, 110], [1270, 150, 120]].map((c, i) => <circle key={'r' + i} cx={c[0]} cy={c[1]} r={c[2]} />)}
        </g>
        <circle cx="206" cy="318" r="92" fill={`url(#${ns}-lglow)`} opacity="0.85" className="fc-lantern" />
        <Lantern x={206} y={318} s={1.9} ns={ns} />

        <FogRect id={`${ns}-fog3`} y={584} h={216} className="fc-fog fc-fog-a" />
        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-grade)`} />
      </svg>
      <HeroOverlay scrim="linear-gradient(100deg, rgba(14,18,8,0.62) 0%, rgba(14,18,8,0.38) 38%, rgba(14,18,8,0.12) 66%, rgba(14,18,8,0.05) 88%)" />
    </div>
  );
}

// ── D · Premium Storybook — minimal, elegant, sophisticated ─────
function ConceptD() {
  const ns = 'd';
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <svg viewBox={FC_VB} preserveAspectRatio="xMidYMid slice" style={fcSvg} aria-hidden>
        <FcDefs ns={ns}
          sky={[['0%', '#F4E8CE'], ['52%', '#EFDBB6'], ['100%', '#E6C99A']]}
          glow={['rgba(255,248,232,0.9)', 'rgba(244,200,140,0.32)', 'rgba(244,200,140,0)']}
          ray="rgba(252,242,218,0.7)" blurFar={6} blurMid={2.4} blurNear={2.6} />
        <defs>
          <linearGradient id={`${ns}-fog1`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F3E8D0" stopOpacity="0" /><stop offset="100%" stopColor="#F3E8D0" stopOpacity="0.75" /></linearGradient>
          <radialGradient id={`${ns}-grade`} cx="44%" cy="48%" r="78%"><stop offset="62%" stopColor="rgba(0,0,0,0)" /><stop offset="100%" stopColor="rgba(40,28,12,0.26)" /></radialGradient>
        </defs>

        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sky)`} />
        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-sun)`} transform="translate(360 -40) scale(1.1)" opacity="0.8" style={{ transformOrigin: '360px 40px' }} />
        <GodRays ns={ns} sx={360} sy={20} maxOpacity={0.18} angles={[-8, 2, 12]} />

        {/* a single, distant, whisper-soft tree-line — lots of open sky */}
        <Foliage w={1280} baseY={612} color="#D5D8B4" opacity={0.55} lumps={8} height={70} seed={14} filter={`url(#${ns}-blurFar)`} />
        <Signpost x={250} y={612} s={1} color="#8a7350" />
        <FogRect id={`${ns}-fog1`} y={560} h={240} className="fc-fog fc-fog-a" />

        {/* refined ground */}
        <path d="M-40,640 Q400,612 760,632 T1320,628 L1320,800 L-40,800 Z" fill="#C9C597" opacity="0.6" />
        <path d="M-40,672 Q420,648 820,664 T1320,660 L1320,800 L-40,800 Z" fill="#8FA169" opacity="0.85" />

        {/* the hero prop — one elegant old tree, right side */}
        <OldTree x={1058} baseY={732} h={520} color="#3C4A2C" trunk="#3a2c1c" />
        <path d="M898,452 C912,456 922,470 928,486" fill="none" stroke="#3a2c1c" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
        <Lantern x={928} y={490} s={1.35} ns={ns} />

        {/* a few drifting leaves implied as motes handled in CSS layer */}
        <rect x="0" y="0" width="1280" height="800" fill={`url(#${ns}-grade)`} />
      </svg>
      <HeroOverlay scrim="linear-gradient(100deg, rgba(30,26,14,0.5) 0%, rgba(30,26,14,0.24) 38%, rgba(30,26,14,0.02) 64%, transparent 84%)" />
    </div>
  );
}

Object.assign(window, { ConceptA, ConceptB, ConceptC, ConceptD });
