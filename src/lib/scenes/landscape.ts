// A blue halftone sun over a plain green field, with slow clouds in the sky.

import { clamp, hash, noise, smooth, type Grid, type Scene } from './util';

type Layout = {
  hy: number; // horizon, px
  sx: number; // sun centre, px
  sy: number;
  sr: number; // sun radius, px
  clouds: number;
  rise: boolean;
};

// Mirrors the poster layout in index.astro so the sun sits exactly where the CSS one used to.
function poster({ W, H }: Grid): Layout {
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
    clouds: 1,
    rise: true,
  };
}

function meadow({ W, H }: Grid): Layout {
  const hy = H * 0.45;
  const sr = Math.min(H * 0.36, 80);
  return {
    hy,
    sx: W / 2,
    sy: hy + sr * 0.1,
    sr,
    clouds: 0.7,
    rise: false,
  };
}

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

  // ── field: a plain green bar, the sun sets into it ──
  g.fill(0, L.hy, W, H - L.hy, 'green');
}

export const landscape: Record<string, Scene> = {
  poster: (g) => paint(g, poster(g)),
  meadow: (g) => paint(g, meadow(g)),
};
