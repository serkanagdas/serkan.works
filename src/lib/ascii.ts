// A tiny ASCII scene renderer.
// A scene is a function of time that paints a grid of coloured characters.
// Glyphs are pre-rendered once into an atlas (one row per colour), then stamped with drawImage,
// which keeps a full-screen scene at ~10k cells cheap enough to run at 24 fps.

import { landscape } from './scenes/landscape';
import { motifs } from './scenes/motifs';
import { COLORS, clamp, type Color, type Grid, type Scene } from './scenes/util';

const GLYPHS = ' ·•●.,:;\'"`-_~=+*^/\\|()[]<>#%@&█▓▒░─━│┃✿❀✦✧○◦≈';
const COLOR_KEYS = Object.keys(COLORS) as Color[];
const glyphIndex = new Map([...GLYPHS].map((g, i) => [g, i]));
const colorIndex = new Map(COLOR_KEYS.map((c, i) => [c, i]));

const scenes: Record<string, Scene> = { ...landscape, ...motifs };

// ── atlas ──
const atlases = new Map<string, HTMLCanvasElement>();

function atlas(cw: number, ch: number) {
  const key = `${cw}x${ch}`;
  let a = atlases.get(key);
  if (a) return a;
  a = document.createElement('canvas');
  a.width = GLYPHS.length * cw;
  a.height = COLOR_KEYS.length * ch;
  const g = a.getContext('2d')!;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `${Math.round(ch * 0.8)}px ui-monospace, Menlo, Consolas, "DejaVu Sans Mono", "Noto Sans Mono", monospace`;
  COLOR_KEYS.forEach((c, row) => {
    g.fillStyle = COLORS[c];
    [...GLYPHS].forEach((glyph, col) => {
      const x = col * cw, y = row * ch;
      if (glyph === '█') g.fillRect(x, y, cw, ch);
      else if (glyph === '●' || glyph === '•' || glyph === '·') {
        // draw dots ourselves so they are round and centred whatever the font
        const r = Math.min(cw, ch) * (glyph === '●' ? 0.44 : glyph === '•' ? 0.3 : 0.14);
        g.beginPath();
        g.arc(x + cw / 2, y + ch / 2, r, 0, Math.PI * 2);
        g.fill();
      } else g.fillText(glyph, x + cw / 2, y + ch / 2 + ch * 0.04);
    });
  });
  atlases.set(key, a);
  return a;
}

// ── mounting ──
type Mount = {
  el: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  scene: Scene;
  grid: Grid;
  start: number;
  last: number;
  visible: boolean;
};

const mounts: Mount[] = [];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FPS = 24;

function layout(m: Mount) {
  const { el } = m;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = el.clientWidth, H = el.clientHeight;
  const want = el.dataset.cell === 'auto' ? clamp(W / 150, 6, 11) : Number(el.dataset.cell) || 8;
  // snap cells to whole device pixels so glyphs and fills line up exactly
  const cwD = Math.max(4, Math.round(want * dpr));
  const chD = Math.round(cwD * 1.5);
  const cw = cwD / dpr, ch = chD / dpr;
  el.width = Math.round(W * dpr);
  el.height = Math.round(H * dpr);
  const sheet = atlas(cwD, chD);
  const ctx = m.ctx;
  ctx.imageSmoothingEnabled = false;

  m.grid = {
    W, H, cw, ch, el,
    cols: Math.ceil(W / cw),
    rows: Math.ceil(H / ch),
    t: 0,
    fill(x, y, w, h, c) {
      ctx.fillStyle = COLORS[c];
      ctx.fillRect(Math.round(x * dpr), Math.round(y * dpr), Math.round(w * dpr), Math.round(h * dpr));
    },
    put(x, y, glyph, c) {
      if (glyph === ' ') return;
      const gi = glyphIndex.get(glyph), ci = colorIndex.get(c);
      if (gi === undefined || ci === undefined) return;
      ctx.drawImage(sheet, gi * cwD, ci * chD, cwD, chD, x * cwD, y * chD, cwD, chD);
    },
  };
}

function draw(m: Mount, now: number) {
  m.grid.t = reduce ? Number(m.el.dataset.still ?? 6) : (now - m.start) / 1000;
  m.ctx.clearRect(0, 0, m.el.width, m.el.height);
  m.scene(m.grid);
}

function loop(now: number) {
  for (const m of mounts) {
    if (!m.visible || now - m.last < 1000 / FPS) continue;
    m.last = now;
    draw(m, now);
  }
  requestAnimationFrame(loop);
}

export function mountAll(root: ParentNode = document) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const m = mounts.find((m) => m.el === e.target);
      if (m) m.visible = e.isIntersecting;
    }
  });
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const m = mounts.find((m) => m.el === e.target);
      if (m) {
        layout(m);
        draw(m, performance.now());
      }
    }
  });

  root.querySelectorAll<HTMLCanvasElement>('canvas[data-scene]').forEach((el) => {
    const scene = scenes[el.dataset.scene!];
    const ctx = el.getContext('2d');
    if (!scene || !ctx) return;
    const m: Mount = { el, ctx, scene, grid: null as unknown as Grid, start: performance.now(), last: 0, visible: false };
    mounts.push(m);
    layout(m);
    draw(m, performance.now());
    ro.observe(el);
    if (!reduce) io.observe(el);
  });

  if (!reduce && mounts.length) requestAnimationFrame(loop);
}
