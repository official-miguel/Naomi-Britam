import type { ReactNode } from "react";

/**
 * Original line-art scenes, one per product, drawn in the site palette
 * (electric blue ground, white linework, black accents). 400×175 viewBox.
 */
const W = "#fff";
const K = "#000";
const B = "#0000FF";

const Shield = ({ x, y, s = 1, fill = "none" }: { x: number; y: number; s?: number; fill?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -26 L22 -18 V4 Q22 22 0 32 Q-22 22 -22 4 V-18 Z" fill={fill} stroke={W} strokeWidth="4" strokeLinejoin="round" />
    <path d="M-9 3 L-2 10 L11 -8" fill="none" stroke={fill === "none" ? W : B} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

const Person = ({ x, h = 1, body = W }: { x: number; h?: number; body?: string }) => (
  <g transform={`translate(${x} 142) scale(${h})`}>
    <circle cx="0" cy="-48" r="9" fill={body} />
    <path d="M-12 0 V-26 Q-12 -37 0 -37 Q12 -37 12 -26 V0 Z" fill={body} />
  </g>
);

const scenes: Record<string, ReactNode> = {
  "motor-insurance": (
    <>
      <circle cx="62" cy="44" r="18" fill="none" stroke={W} strokeWidth="3" />
      <ellipse cx="120" cy="34" rx="26" ry="8" fill={W} opacity=".35" />
      <ellipse cx="330" cy="100" rx="30" ry="8" fill={W} opacity=".25" />
      <rect x="0" y="142" width="400" height="40" fill={K} />
      <line x1="0" y1="160" x2="400" y2="160" stroke={W} strokeWidth="3" strokeDasharray="20 16" />
      <path d="M96 140 V118 Q96 108 108 106 L138 100 L160 80 Q165 76 172 76 H236 Q244 76 249 82 L270 104 L296 108 Q308 110 308 122 V140 Z" fill={W} />
      <path d="M170 86 H186 V102 H152 Z M198 86 H234 L248 102 H198 Z" fill={B} />
      <circle cx="146" cy="142" r="17" fill={K} stroke={W} strokeWidth="4" />
      <circle cx="146" cy="142" r="6" fill={W} />
      <circle cx="266" cy="142" r="17" fill={K} stroke={W} strokeWidth="4" />
      <circle cx="266" cy="142" r="6" fill={W} />
      <Shield x={336} y={52} />
    </>
  ),
  "medical-insurance": (
    <>
      <path d="M200 134 C148 100 126 70 148 48 C166 30 192 40 200 58 C208 40 234 30 252 48 C274 70 252 100 200 134 Z" fill="none" stroke={W} strokeWidth="5" strokeLinejoin="round" />
      <polyline points="0,90 118,90 136,90 148,58 164,122 178,70 190,90 400,90" fill="none" stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="334" cy="52" r="26" fill={W} />
      <path d="M334 40 V64 M322 52 H346" stroke={B} strokeWidth="7" strokeLinecap="round" />
      <path d="M62 36 V54 M53 45 H71" stroke={W} strokeWidth="4" strokeLinecap="round" opacity=".7" />
      <path d="M76 132 V146 M69 139 H83" stroke={W} strokeWidth="4" strokeLinecap="round" opacity=".7" />
    </>
  ),
  "life-insurance": (
    <>
      <path d="M96 78 Q200 -14 304 78 Q282 66 252 78 Q226 66 200 78 Q174 66 148 78 Q118 66 96 78 Z" fill={W} />
      <path d="M200 78 Q192 40 200 14 M200 78 Q168 56 148 40 M200 78 Q232 56 252 40" stroke={B} strokeWidth="3" fill="none" />
      <line x1="200" y1="78" x2="200" y2="96" stroke={W} strokeWidth="4" />
      <Person x={160} h={1.05} body={K} />
      <Person x={240} h={1.05} body={K} />
      <Person x={200} h={0.7} body={K} />
      <line x1="0" y1="142" x2="400" y2="142" stroke={W} strokeWidth="3" />
    </>
  ),
  "personal-accident-insurance": (
    <>
      <path d="M200 20 L254 40 V88 Q254 128 200 150 Q146 128 146 88 V40 Z" fill={W} />
      <path d="M200 52 V114 M169 83 H231" stroke={B} strokeWidth="14" strokeLinecap="round" />
      <g transform="rotate(-28 332 70)">
        <rect x="296" y="56" width="72" height="28" rx="14" fill={W} />
        <rect x="320" y="56" width="24" height="28" fill={K} opacity=".85" />
        <circle cx="332" cy="70" r="2" fill={W} />
      </g>
      <circle cx="60" cy="50" r="20" fill="none" stroke={W} strokeWidth="3" />
      <path d="M60 40 V60 M50 50 H70" stroke={W} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  "travel-insurance": (
    <>
      <circle cx="282" cy="104" r="50" fill={W} fillOpacity=".12" stroke={W} strokeWidth="3" />
      <ellipse cx="282" cy="104" rx="22" ry="50" fill="none" stroke={W} strokeWidth="2.5" />
      <path d="M232 104 H332 M242 80 H322 M242 128 H322" stroke={W} strokeWidth="2.5" />
      <path d="M16 148 Q110 130 168 80" fill="none" stroke={W} strokeWidth="3" strokeDasharray="3 9" strokeLinecap="round" />
      <g transform="rotate(-32 186 62)">
        <ellipse cx="186" cy="62" rx="44" ry="8" fill={W} />
        <path d="M176 62 L152 104 H168 L204 64 Z" fill={W} />
        <path d="M176 62 L152 20 H168 L204 60 Z" fill={W} />
        <path d="M148 58 L136 40 H150 L164 58 Z" fill={W} />
      </g>
      <rect x="40" y="108" width="46" height="34" rx="6" fill={K} stroke={W} strokeWidth="3" />
      <path d="M54 108 V102 Q54 98 58 98 H68 Q72 98 72 102 V108" fill="none" stroke={W} strokeWidth="3" />
      <ellipse cx="90" cy="34" rx="28" ry="8" fill={W} opacity=".35" />
    </>
  ),
  "home-insurance": (
    <>
      <rect x="138" y="88" width="124" height="58" fill={W} />
      <polygon points="122,92 200,38 278,92" fill={K} stroke={W} strokeWidth="3" strokeLinejoin="round" />
      <rect x="236" y="48" width="14" height="30" fill={K} stroke={W} strokeWidth="2" />
      <rect x="188" y="110" width="26" height="36" rx="3" fill={B} />
      <rect x="148" y="102" width="28" height="24" fill={B} />
      <path d="M162 102 V126 M148 114 H176" stroke={W} strokeWidth="2" />
      <rect x="226" y="102" width="28" height="24" fill={B} />
      <path d="M240 102 V126 M226 114 H254" stroke={W} strokeWidth="2" />
      <circle cx="326" cy="96" r="26" fill={W} />
      <rect x="322" y="116" width="8" height="30" fill={K} />
      <Shield x={64} y={66} s={0.8} />
      <line x1="0" y1="146" x2="400" y2="146" stroke={W} strokeWidth="3" />
    </>
  ),
  "education-and-investment-plans": (
    <>
      <polygon points="200,22 292,54 200,86 108,54" fill={W} />
      <path d="M150 74 V98 Q200 122 250 98 V74 L200 90 Z" fill={W} opacity=".9" />
      <path d="M278 58 V100" stroke={W} strokeWidth="3" />
      <circle cx="278" cy="104" r="6" fill={W} />
      <rect x="130" y="124" width="140" height="14" rx="2" fill={W} />
      <rect x="140" y="138" width="120" height="12" rx="2" fill={K} stroke={W} strokeWidth="2" />
      <ellipse cx="62" cy="136" rx="22" ry="7" fill={W} />
      <ellipse cx="62" cy="126" rx="22" ry="7" fill={W} stroke={B} strokeWidth="2" />
      <ellipse cx="62" cy="116" rx="22" ry="7" fill={W} stroke={B} strokeWidth="2" />
      <path d="M338 146 V116 M338 124 Q320 122 316 106 Q334 108 338 124 M338 116 Q356 114 360 98 Q342 100 338 116" fill="none" stroke={W} strokeWidth="3.5" strokeLinecap="round" />
    </>
  ),
  "business-insurance": (
    <>
      <rect x="40" y="70" width="46" height="76" fill={W} fillOpacity=".9" />
      <rect x="92" y="44" width="52" height="102" fill={W} />
      <rect x="258" y="58" width="48" height="88" fill={W} fillOpacity=".9" />
      <rect x="312" y="84" width="44" height="62" fill={W} />
      {[56, 72, 88, 104].map((y) => (
        <rect key={y} x="104" y={y} width="10" height="8" fill={B} />
      ))}
      {[56, 72, 88, 104].map((y) => (
        <rect key={`b${y}`} x="122" y={y} width="10" height="8" fill={B} />
      ))}
      {[74, 94, 114].map((y) => (
        <rect key={`c${y}`} x="270" y={y} width="10" height="10" fill={B} />
      ))}
      <rect x="164" y="96" width="76" height="48" rx="7" fill={K} stroke={W} strokeWidth="3" />
      <path d="M186 96 V88 Q186 82 192 82 H212 Q218 82 218 88 V96" fill="none" stroke={W} strokeWidth="3.5" />
      <rect x="164" y="114" width="76" height="6" fill={W} />
      <rect x="196" y="110" width="12" height="14" rx="2" fill={B} stroke={W} strokeWidth="2" />
      <line x1="0" y1="146" x2="400" y2="146" stroke={W} strokeWidth="3" />
    </>
  ),
  "last-expense-cover": (
    <>
      <path d="M0 148 Q100 128 200 148 T400 148 V175 H0 Z" fill={K} opacity=".85" />
      {[-62, -31, 0, 31, 62].map((r) => (
        <ellipse key={r} cx="200" cy="82" rx="17" ry="46" fill={r === 0 ? W : W} fillOpacity={r === 0 ? 1 : 0.85} stroke={B} strokeWidth="2.5" transform={`rotate(${r} 200 128)`} />
      ))}
      <circle cx="200" cy="130" r="9" fill={B} stroke={W} strokeWidth="3" />
      <circle cx="70" cy="56" r="3" fill={W} />
      <circle cx="338" cy="44" r="4" fill={W} />
      <circle cx="320" cy="84" r="2.5" fill={W} />
      <circle cx="92" cy="96" r="2.5" fill={W} />
    </>
  ),
  "group-insurance": (
    <>
      <path d="M70 108 Q200 6 330 108" fill="none" stroke={W} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
      <Shield x={200} y={52} s={0.9} fill={W} />
      <Person x={84} h={1} />
      <Person x={142} h={1.12} />
      <Person x={200} h={1.2} body={K} />
      <Person x={258} h={1.12} />
      <Person x={316} h={1} />
      <line x1="0" y1="142" x2="400" y2="142" stroke={W} strokeWidth="3" />
    </>
  ),
  "retirement-and-pension": (
    <>
      <path d="M150 128 A50 50 0 0 1 250 128 Z" fill={W} />
      {[-70, -45, -20, 20, 45, 70].map((r) => (
        <line key={r} x1="200" y1="60" x2="200" y2="46" stroke={W} strokeWidth="4" strokeLinecap="round" transform={`rotate(${r} 200 128)`} />
      ))}
      <rect x="0" y="128" width="400" height="47" fill={K} opacity=".85" />
      <path d="M20 142 Q40 134 60 142 T100 142 T140 142 T180 142 T220 142 T260 142 T300 142 T340 142 T380 142" fill="none" stroke={W} strokeWidth="2.5" opacity=".8" />
      <path d="M40 158 Q60 150 80 158 T120 158 T160 158 T200 158 T240 158 T280 158" fill="none" stroke={W} strokeWidth="2.5" opacity=".5" />
      <path d="M270 128 L292 66" stroke={W} strokeWidth="4" strokeLinecap="round" />
      <path d="M250 86 Q290 40 334 86 Z" fill={K} stroke={W} strokeWidth="3" strokeLinejoin="round" />
      <path d="M270 86 Q290 50 312 86" fill="none" stroke={W} strokeWidth="2" opacity=".7" />
      <path d="M72 50 q8 -8 16 0 q8 -8 16 0" fill="none" stroke={W} strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  "investments-and-trust": (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={70 + i * 52} y={130 - (i + 1) * 18} width="34" height={(i + 1) * 18 + 12} rx="3" fill={i === 4 ? K : W} stroke={i === 4 ? W : "none"} strokeWidth="3" />
      ))}
      <polyline points="64,96 126,84 178,92 232,56 290,40" fill="none" stroke={W} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 0" />
      <circle cx="326" cy="34" r="16" fill={W} />
      <path d="M319 41 L333 27 M322 27 H333 V38" fill="none" stroke={B} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="44" cy="136" rx="20" ry="6" fill={W} />
      <ellipse cx="44" cy="127" rx="20" ry="6" fill={W} stroke={B} strokeWidth="2" />
      <line x1="0" y1="144" x2="400" y2="144" stroke={W} strokeWidth="3" />
    </>
  ),
};

export function ProductArt({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 175" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <rect width="400" height="175" fill={B} />
      <circle cx="372" cy="-6" r="86" fill={W} fillOpacity=".08" />
      <circle cx="12" cy="190" r="92" fill={K} fillOpacity=".14" />
      {scenes[slug] ?? null}
    </svg>
  );
}
