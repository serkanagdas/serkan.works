// The meadow: a blue sun over a green field, grass moving in the wind, daisies,
// and a stream running down from the horizon with light on it.

import { clamp, hash, noise, smooth, type Grid, type Scene } from './util';

type Layout = {
  hy: number; // horizon, px
  sx: number; // sun centre, px
  sy: number;
  sr: number; // sun radius, px
  riverX: [number, number]; // stream centre at the horizon and at the bottom edge
  riverW: [number, number]; // stream width at the horizon and at the bottom edge
  clouds: number;
  rise: boolean;
};

// Mirrors the poster layout in index.astro so the sun sits exactly where the CSS one used to.
function poster({ W, H, cw }: Grid): Layout {
  const narrow = W < 720;
  const h = narrow ? 0.26 : 0.3;
  const s = narrow ? 0.78 * W : Math.min(0.64 * H, 0.46 * W);
  const right = (narrow ? 0.11 : 0.09) * W;
  const hy = H * (1 - h);
  const sx = W - right - s / 2;
  return {
    hy,
    sx,
    sy: hy - 0.22 * s,
    sr: s / 2,
    riverX: [sx, narrow ? W * 0.74 : W * 0.68],
    riverW: [cw * 2, narrow ? W * 0.24 : W * 0.15],
    clouds: 1,
    rise: true,
  };
}

function meadow({ W, H, cw }: Grid): Layout {
  const hy = H * 0.45;
  const sr = Math.min(H * 0.36, 80);
  return {
    hy,
    sx: W / 2,
    sy: hy + sr * 0.1,
    sr,
    riverX: [W / 2, W / 2 + Math.min(W * 0.12, 160)],
    riverW: [cw * 1.5, Math.min(W * 0.2, 260)],
    clouds: 0.7,
    rise: false,
  };
}

const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

function paint(g: Grid, L: Layout) {
  const { W, H, cw, ch, cols, rows, t, put } = g;

  // the sun comes up once, when the page opens
  const rise = L.rise ? 1 - Math.pow(1 - clamp(t / 2.8), 3) : 1;
  const sy = L.sy + (1 - rise) * L.sr * 0.84;
  const corona = cw * 4.5;

  // ── sky ──
  for (let y = 0; y < rows; y++) {
    const py = (y + 0.5) * ch;
    if (py > L.hy) break;
    const hk = py / L.hy;
    for (let x = 0; x < cols; x++) {
      const px = (x + 0.5) * cw;
      const dx = px - L.sx;
      const dy = py - sy;
      const d = Math.hypot(dx, dy);

      if (d < L.sr) {
        // halftone body; slow bands of light drift across it
        const band = Math.sin(d * 0.05 - t * 1.6) * 0.5 + Math.sin(dx * 0.018 + dy * 0.026 + t * 0.7) * 0.5;
        const edge = L.sr - d < cw * 1.2;
        put(x, y, edge || band < -0.55 ? '•' : '●', band > 0.55 ? 'blueDeep' : 'blue');
        continue;
      }

      if (d < L.sr + corona) {
        // a ring of twinkles turning slowly around the sun
        const a = Math.atan2(dy, dx);
        const fall = 1 - (d - L.sr) / corona;
        const ray = Math.sin(a * 16 + t * 0.5) + Math.sin(a * 7 - t * 0.3) * 0.5;
        const tw = hash(x, y, Math.floor(t * 5));
        if (ray > 0.4 && tw < 0.6 * fall) {
          put(x, y, tw < 0.1 * fall ? '✦' : fall > 0.55 ? '•' : '·', fall > 0.5 ? 'blueLight' : 'bluePale');
        }
        continue;
      }

      // clouds: a few soft drifts, kept clear of the name in the top-left
      const sideText = smooth(W - 330, W - 290, px) * (1 - smooth(200, 250, py));
      const clear = L.rise ? smooth(0.32, 0.5, px / W) * (1 - sideText) : 1;
      const weight = smooth(0.06, 0.22, hk) * (1 - smooth(0.42, 0.7, hk)) * L.clouds * (0.25 + 0.75 * clear);
      if (weight <= 0) continue;
      const n = noise(px * 0.0055 - t * 0.06, py * 0.02) * 0.65 + noise(px * 0.018 - t * 0.1, py * 0.05) * 0.35;
      const v = n * weight;
      if (v > 0.5) put(x, y, v > 0.62 ? '•' : v > 0.56 ? ':' : '·', v > 0.6 ? 'blueLight' : 'bluePale');
    }
  }

  // ── field ──
  g.fill(0, L.hy, W, H - L.hy, 'green');
  const daisies: [number, number, number][] = [];

  for (let y = Math.floor(L.hy / ch); y < rows; y++) {
    const top = Math.max(y * ch, L.hy);
    const py = (y + 0.5) * ch;
    const p = clamp((py - L.hy) / (H - L.hy));
    const pk = smooth(0, 1, p);
    const cx = lerp(L.riverX[0], L.riverX[1], pk) + Math.sin(p * 6.5 + 0.8) * W * 0.035 * p;
    const hw = lerp(L.riverW[0], L.riverW[1], Math.pow(p, 1.25)) / 2;

    g.fill(cx - hw, top, hw * 2, (y + 1) * ch - top, 'blue');
    if (py < L.hy) continue;

    for (let x = 0; x < cols; x++) {
      const px = (x + 0.5) * cw;
      const off = Math.abs(px - cx);

      if (off < hw) {
        // light on the water travels downstream; the sun's reflection sits near the horizon
        const flow = Math.sin(px * 0.05 * (1.5 - p) + y * 0.9 - t * 3);
        const spark = hash(x, Math.floor(y - t * (3 + 6 * p)), 7);
        const glare = p < 0.35 && Math.abs(px - L.sx) < L.sr * 0.45 * (1 - p) && hash(x, y, Math.floor(t * 6)) < 0.35;
        if (spark < 0.035 || glare) put(x, y, spark < 0.015 ? '✦' : glare ? '-' : '•', 'white');
        else if (spark < 0.085) put(x, y, '·', 'white');
        else if (flow > 0.55) put(x, y, '~', 'bluePale');
        else if (flow < -0.75) put(x, y, '-', 'blueLight');
        continue;
      }
      if (off < hw + cw * 0.8) continue; // a clean bank

      const wind = Math.sin(px * 0.01 - t * 1.4 + py * 0.004) * 0.7 + Math.sin(px * 0.034 - t * 2.2) * 0.3;
      const r = hash(x, y, 1);

      if (hash(x, y, 4) < 0.022 * (0.35 + p)) {
        daisies.push([x, y, wind]);
        continue;
      }

      if (r < 0.26 + 0.5 * p) {
        let glyph: string;
        if (p < 0.12) glyph = r < 0.2 ? '.' : ',';
        else if (hash(x, y, 2) < 0.28) glyph = wind > 0 ? ',' : "'";
        else glyph = wind > 0.42 ? '/' : wind < -0.42 ? '\\' : '|';
        put(x, y, glyph, hash(x, y, 3) < 0.45 + 0.2 * p ? 'greenLight' : 'greenDark');
      }
    }
  }

  // daisies nod in the same wind as the grass
  for (const [x, y, wind] of daisies) {
    const near = (y * ch - L.hy) / (H - L.hy) > 0.45;
    const glyph = Math.abs(wind) > 0.6 ? '*' : near ? '❀' : '✿';
    put(x, y, glyph, hash(x, y, 5) < 0.2 ? 'cream' : 'white');
  }
}

export const landscape: Record<string, Scene> = {
  poster: (g) => paint(g, poster(g)),
  meadow: (g) => paint(g, meadow(g)),
};
