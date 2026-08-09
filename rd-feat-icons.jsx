// ────────────────────────────────────────────────────────────────
// Hero feature icons — hand-drawn vector set (book, build, puzzle, map, chest)
// Stroke-based, currentColor, slight wobble for the storybook ink feel.
// ────────────────────────────────────────────────────────────────

function RdFeatIcon({ name, className }) {
  const S = { fill: "none", stroke: "currentColor", strokeWidth: 4.4, strokeLinecap: "round", strokeLinejoin: "round" };
  const T = { ...S, strokeWidth: 3 };
  const paths = {
    book: (
      <g {...S}>
        <path d="M50 30.5C41.4 24.6 28.6 22.4 15.5 25.8L15.5 68.4C28.4 65.2 41.2 67.2 50 73.2" />
        <path d="M50 30.5C58.6 24.6 71.6 22.4 84.6 25.8L84.6 68.4C71.7 65.2 58.9 67.2 50 73.2" />
        <path d="M50 30.8L50 73.2" />
        <path d="M15.5 68.4C28.4 65.2 41.2 67.2 50 73.2C58.9 67.2 71.7 65.2 84.6 68.4L84.6 73.4C71.7 70.3 58.9 72.3 50 78.4C41.2 72.3 28.4 70.3 15.5 73.4Z" />
        <g {...T}>
          <path d="M23.5 35.4C29.6 35.9 35.8 37.2 41.6 39.2" />
          <path d="M23.5 43.6C29.6 44.1 35.8 45.4 41.6 47.4" />
          <path d="M23.5 51.8C29.6 52.3 35.8 53.6 41.6 55.6" />
          <path d="M58.6 39.2C64.4 37.2 70.6 35.9 76.7 35.4" />
          <path d="M58.6 47.4C64.4 45.4 70.6 44.1 76.7 43.6" />
          <path d="M58.6 55.6C64.4 53.6 70.6 52.3 76.7 51.8" />
        </g>
      </g>
    ),
    build: (
      <g {...S}>
        {/* wrench — open jaw up-right, shaft down-left */}
        <path d="M80.3 32.2A10.5 10.5 0 1 1 71.8 23.7" />
        <path d="M62.6 41.4L31.2 74.6" />
        {/* screwdriver — grip bottom-right, blade up-left */}
        <path d="M66.6 66.2L77.8 77.4" strokeWidth="11" />
        <path d="M27.4 27L66.6 66.2" />
        <path d="M21.4 21L27.4 27L23.2 31.2Z" strokeWidth="3.4" />
      </g>
    ),
    puzzle: (
      <g {...S}>
        <path d="M24 24H41.6A9 9 0 1 1 58.4 24H76V41.6A9 9 0 1 1 76 58.4V76H58.4A9 9 0 1 0 41.6 76H24V58.4A9 9 0 1 0 24 41.6Z" />
      </g>
    ),
    map: (
      <g {...S}>
        <path d="M13.6 29.4L36.4 21.6L64 31.4L86.6 22.2L86.6 70.6L64 79.8L36.4 70L13.6 78.2Z" />
        <path d="M36.4 21.6L36.4 70" />
        <path d="M64 31.4L64 79.8" />
        <path d="M25 63.6C31.8 53.2 38.6 55.4 43.8 49.6C48.2 44.6 46.6 39.2 52.4 36.6C57.6 34.2 62.2 37 66.6 33.4" strokeWidth="3" strokeDasharray="1.5 6.5" />
        <circle cx="25.4" cy="64" r="2.6" strokeWidth="3" />
        <path d="M63 28.6L74.4 39.6M74.4 28.6L63 39.6" stroke="var(--rd-terra, #B0623C)" strokeWidth="5" />
      </g>
    ),
    chest: (
      <g {...S}>
        <path d="M16.6 51.2C16.6 33.6 30 24.4 50 24.4C70 24.4 83.4 33.6 83.4 51.2Z" />
        <path d="M14.4 51.2L85.6 51.2L85.6 58.4L14.4 58.4Z" />
        <path d="M18.4 58.4L18.4 76.6C18.4 79.2 20.4 81.2 23 81.2L77 81.2C79.6 81.2 81.6 79.2 81.6 76.6L81.6 58.4" />
        <path d="M31.8 26.8L31.8 51.2M68.2 26.8L68.2 51.2" strokeWidth="3" />
        <path d="M43.8 58.4L43.8 70.4L56.2 70.4L56.2 58.4" />
        <path d="M50 45.6L50 51.2" strokeWidth="3" />
        <circle cx="50" cy="63.4" r="2.8" strokeWidth="3" />
      </g>
    ),
  };
  return (
    <svg className={className} viewBox="0 0 100 100" width="100%" height="100%" role="presentation" aria-hidden="true" focusable="false">
      {paths[name] || null}
    </svg>
  );
}

Object.assign(window, { RdFeatIcon });
