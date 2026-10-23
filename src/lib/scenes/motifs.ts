// Small animated compositions, one per project and per hobby.
// Each is drawn in a 400×300 design space, fitted to the canvas like object-fit: cover.
// `data-tone="deep"` turns the palette inside out for the coloured project headers.

import { clamp, hash, type Color, type Grid, type Scene } from './util';

type Ink = { a: Color; a2: Color; b: Color; faint: Color; hi: Color };

const LIGHT: Ink = { a: 'blue', a2: 'blueLight', b: 'green', faint: 'bluePale', hi: 'white' };
const DEEP: Ink = { a: 'white', a2: 'bluePale', b: 'greenPale', faint: 'blueLight', hi: 'cream' };
const DEEP_GREEN: Ink = { a: 'white', a2: 'greenPale', b: 'bluePale', faint: 'greenLight', hi: 'cream' };

type Cell = { x: number; y: number; u: number; v: number };
type Draw = (c: Cell, t: number, ink: Ink, put: (glyph: string, color: Color) => void) => void;

const dist = (u: number, v: number, x: number, y: number) => Math.hypot(u - x, v - y);
const inRect = (u: number, v: number, x0: number, y0: number, x1: number, y1: number) => u >= x0 && u <= x1 && v >= y0 && v <= y1;
function seg(u: number, v: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax, dy = by - ay;
  const k = clamp(((u - ax) * dx + (v - ay) * dy) / (dx * dx + dy * dy));
  return Math.hypot(u - ax - dx * k, v - ay - dy * k);
}

function motif(draw: Draw): Scene {
  return (g: Grid) => {
    const { W, H, cw, ch, cols, rows, t, el } = g;
    const tone = el.dataset.tone;
    const ink = tone === 'deep-green' ? DEEP_GREEN : tone === 'deep' ? DEEP : LIGHT;
    const s = Math.max(W / 400, H / 300);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const u = ((x + 0.5) * cw - W / 2) / s + 200;
        const v = ((y + 0.5) * ch - H / 2) / s + 150;
        let done = false;
        draw({ x, y, u, v }, t, ink, (glyph, color) => {
          if (done) return;
          done = true;
          g.put(x, y, glyph, color);
        });
        // a little dust in the empty space, so the plate never looks dead
        if (!done && hash(x, y, Math.floor(t * 0.7 + hash(x, y) * 5)) < 0.018) g.put(x, y, '·', ink.faint);
      }
    }
  };
}

const halftone = (k: number) => (k > 0.66 ? '●' : k > 0.33 ? '•' : '·');

export const motifs: Record<string, Scene> = {
  // a sweep across rings, and a find
  prospecting: motif(({ u, v }, t, ink, put) => {
    const cx = 170, cy = 236;
    const d = dist(u, v, cx, cy);
    const a = Math.atan2(cy - v, u - cx);
    const sweep = Math.PI / 2 + Math.sin(t * 0.8) * (Math.PI / 2 - 0.12);
    const bx = 290, by = 112;
    const blip = 6 + 3 * Math.sin(t * 4);
    if (dist(u, v, bx, by) < blip) return put('●', ink.b);
    if (dist(u, v, bx, by) < blip + 9 && Math.sin(t * 4) > 0.3) return put('·', ink.b);
    if (v > cy + 2) return Math.abs(v - cy - 6) < 3 && u > 30 && u < 370 ? put('─', ink.faint) : undefined;
    for (const r of [44, 80, 116, 152]) {
      if (Math.abs(d - r) < 6) return put(Math.abs(a - sweep) < 0.18 ? '●' : '•', r === 116 ? ink.b : ink.a);
    }
    if (d < 160 && Math.abs(a - sweep) < 0.05) return put('·', ink.a2);
  }),

  // a pitch, and a ball that won't stay still
  pitchdeck: motif(({ u, v }, t, ink, put) => {
    const ball = { x: 200 + 100 * Math.sin(t * 0.9), y: 145 + 50 * Math.sin(t * 1.7 + 1) };
    if (dist(u, v, ball.x, ball.y) < 11) return put('●', ink.a === 'white' ? 'cream' : 'blue');
    if (!inRect(u, v, 53, 63, 347, 227)) return;
    const w = 3;
    const line =
      Math.abs(u - 200) < w ||
      Math.abs(dist(u, v, 200, 145) - 32) < w ||
      Math.min(Math.abs(u - 56), Math.abs(u - 344), Math.abs(v - 66), Math.abs(v - 224)) < w ||
      (inRect(u, v, 52, 104, 98, 186) && (Math.abs(u - 96) < w || Math.abs(v - 106) < w || Math.abs(v - 184) < w)) ||
      (inRect(u, v, 302, 104, 348, 186) && (Math.abs(u - 304) < w || Math.abs(v - 106) < w || Math.abs(v - 184) < w));
    if (line) return put('█', 'white');
    // mowing stripes
    const stripe = Math.floor(u / 30) % 2 === 0;
    if (ink.a === 'white') put(stripe ? '●' : '•', stripe ? 'greenPale' : 'greenLight');
    else put('●', stripe ? 'green' : 'greenDark');
  }),

  // a stack of pages; a scan line reads the top one
  'eser-tarama': motif(({ u, v }, t, ink, put) => {
    const top = { x0: 198, y0: 106, x1: 348, y1: 296 };
    if (inRect(u, v, top.x0, top.y0, top.x1, top.y1 - 6)) {
      const scan = top.y0 + ((t * 40) % (top.y1 - top.y0));
      if (Math.abs(v - scan) < 3) return put('━', ink.hi === 'white' ? 'white' : 'cream');
      const row = Math.floor((v - top.y0 - 18) / 16);
      const inText = row >= 0 && row < 9 && (v - top.y0 - 18) % 16 < 5 && u > top.x0 + 16 && u < top.x1 - 16 - (row % 3) * 22;
      if (inText) return put(v < scan ? '=' : '-', v < scan ? ink.a : ink.a2);
      return put(v < scan ? '●' : '•', ink.b);
    }
    for (let p = 3; p >= 0; p--) {
      const ox = 110 + p * 22, oy = 50 + p * 14;
      if (inRect(u, v, ox, oy, ox + 150, oy + 190)) return put(p >= 2 ? '•' : '·', p >= 2 ? ink.a : ink.a2);
    }
  }),

  // an arch, with light moving inside it
  'e-door': motif(({ u, v }, t, ink, put) => {
    const inArch = (pad: number) =>
      (v >= 140 && v <= 268 && u >= 130 + pad && u <= 270 - pad) || (v < 140 && dist(u, v, 200, 140) < 70 - pad);
    if (dist(u, v, 228, 190) < 7) return put('●', ink.b);
    if (inArch(0) && !inArch(9)) return put('●', ink.a);
    if (inArch(9)) {
      const glow = 0.5 + 0.5 * Math.sin(v * 0.06 + t * 1.4 - Math.abs(u - 200) * 0.03);
      return put(halftone(glow * 0.8), ink.a2);
    }
    if (v > 268 && v < 278 && u > 50 && u < 350) return put('▒', ink.faint);
  }),

  // work passed along the line, from left to right
  'ajana-gonder': motif(({ u, v }, t, ink, put) => {
    const nodes: [number, number, Color][] = [
      [80, 150, ink.a2],
      [200, 150, ink.a],
      [320, 150, ink.b],
    ];
    for (const [i, [x, y, c]] of nodes.entries()) {
      const r = i === 1 ? 42 : 30;
      const pulse = Math.sin(t * 3 - i * 1.2) > 0.85 ? 4 : 0;
      if (dist(u, v, x, y) < r + pulse) return put(dist(u, v, x, y) > r - 6 ? '●' : '•', c);
    }
    for (let k = 0; k < 3; k++) {
      const px = 80 + (((t * 70 + k * 80) % 240) + 240) % 240;
      if (dist(u, v, px, 150) < 6) return put('●', px > 240 ? ink.b : ink.a);
    }
    if (Math.abs(v - 150) < 2.5 && u > 80 && u < 320) return put('─', ink.faint);
  }),

  // four machines, blinking
  'the-rack': motif(({ x, u, v }, t, ink, put) => {
    if (!inRect(u, v, 100, 54, 300, 248)) return;
    const i = Math.floor((v - 54) / 48);
    const local = (v - 54) % 48;
    if (local > 36) return;
    if (dist(u, v, 278, 54 + i * 48 + 18) < 6) {
      const on = hash(i, Math.floor(t * (3 + i)), 9) > 0.35;
      return put('●', on ? (i === 3 ? ink.b : ink.hi === 'white' ? 'white' : 'cream') : ink.a2);
    }
    if (u > 118 && u < 220 && Math.abs(local - 18) < 5) {
      const level = (Math.sin(t * 2 + i * 1.7) * 0.5 + 0.5) * 100;
      return put(u - 118 < level ? '▓' : '░', ink.a2);
    }
    put(x % 2 ? '●' : '•', ink.a);
  }),

  // hobbies ────────────────────────────────

  Cycling: motif(({ u, v }, t, ink, put) => {
    const wheels = [
      [118, 182],
      [282, 182],
    ];
    for (const [wx, wy] of wheels) {
      const d = dist(u, v, wx, wy);
      if (Math.abs(d - 58) < 6) return put('●', ink.a);
      if (d < 52) {
        const a = Math.atan2(v - wy, u - wx) + t * 3;
        if (Math.abs(Math.sin(a * 4)) < 0.12 && d > 6) return put('·', ink.a2);
        if (d < 6) return put('●', ink.a);
        return;
      }
    }
    const frame: [number, number, number, number][] = [
      [118, 182, 196, 182],
      [196, 182, 168, 110],
      [168, 110, 118, 182],
      [168, 110, 268, 112],
      [268, 112, 196, 182],
      [268, 112, 282, 182],
      [268, 112, 260, 90],
      [252, 90, 282, 90],
      [152, 102, 184, 102],
    ];
    for (const [ax, ay, bx, by] of frame) if (seg(u, v, ax, ay, bx, by) < 5) return put('●', ink.b);
    // the road moves under the bike
    if (v > 244 && v < 252 && Math.floor((u + t * 120) / 24) % 2 === 0) return put('─', ink.faint);
  }),

  Kickboxing: motif(({ u, v }, t, ink, put) => {
    const swing = Math.sin(t * 2.2) * 0.22;
    // rotate around the hook at (200, 30)
    const ru = 200 + (u - 200) * Math.cos(-swing) - (v - 30) * Math.sin(-swing);
    const rv = 30 + (u - 200) * Math.sin(-swing) + (v - 30) * Math.cos(-swing);
    if (Math.abs(ru - 200) < 2.5 && rv > 30 && rv < 92) return put('│', ink.a2);
    const inBag = inRect(ru, rv, 160, 112, 240, 252) || dist(ru, rv, 200, 112) < 40 || dist(ru, rv, 200, 252) < 40;
    if (inBag && rv > 72 && rv < 292) {
      if (rv > 150 && rv < 168) return put('●', ink.b);
      return put(Math.abs(ru - 182) < 8 ? '•' : '●', ink.a);
    }
    if (v > 286 && v < 292 && u > 140 && u < 260) return put('▒', ink.faint);
  }),

  Lego: motif(({ u, v }, t, ink, put) => {
    const cycle = t % 4;
    const drop = clamp(cycle / 1.2);
    const fall = 1 - Math.pow(1 - drop, 3);
    const brick = (x0: number, y0: number, c: Color, studC: Color) => {
      if (inRect(u, v, x0, y0, x0 + 200, y0 + 56)) return put('●', c), true;
      for (let k = 0; k < 4; k++) {
        if (inRect(u, v, x0 + 16 + k * 48, y0 - 18, x0 + 48 + k * 48, y0)) return put('●', studC), true;
      }
      return false;
    };
    if (cycle < 3.6 && brick(130, 104 - (1 - fall) * 140, ink.b, ink.b)) return;
    if (brick(100, 182, ink.a, ink.a)) return;
    if (v > 240 && v < 246 && u > 70 && u < 330) return put('▒', ink.faint);
  }),

  Games: motif(({ u, v }, t, ink, put) => {
    const body =
      inRect(u, v, 90, 96, 310, 196) ||
      dist(u, v, 96, 150) < 56 ||
      dist(u, v, 304, 150) < 56 ||
      dist(u, v, 110, 214) < 34 ||
      dist(u, v, 290, 214) < 34;
    if (!body) return;
    const pad = (inRect(u, v, 98, 140, 158, 160) || inRect(u, v, 118, 120, 138, 180)) && !inRect(u, v, 120, 142, 136, 158);
    if (pad) return put('█', ink.hi === 'white' ? 'white' : 'cream');
    const btns: [number, number][] = [
      [270, 122],
      [296, 148],
      [244, 148],
      [270, 174],
    ];
    const lit = Math.floor(t * 2.5) % 4;
    for (const [i, [bx, by]] of btns.entries()) {
      if (dist(u, v, bx, by) < 12) return put('●', i === lit ? ink.b : ink.hi === 'white' ? 'white' : 'cream');
    }
    put(hash(Math.floor(u / 6), Math.floor(v / 6)) < 0.5 ? '●' : '•', ink.a);
  }),
};
