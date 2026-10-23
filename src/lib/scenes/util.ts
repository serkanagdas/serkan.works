// Shared types and helpers for ASCII scenes.

export const COLORS = {
  blue: '#1d56d6',
  blueDeep: '#1647b8',
  blueLight: '#7299ec',
  bluePale: '#c8d7f6',
  blueTint: '#edf2fd',
  green: '#229a63',
  greenDark: '#167a4c',
  greenLight: '#5fc493',
  greenPale: '#bde8d1',
  greenTint: '#eaf6f0',
  white: '#ffffff',
  cream: '#fff3c4',
} as const;

export type Color = keyof typeof COLORS;

export interface Grid {
  W: number; // css px
  H: number;
  cw: number; // cell size, css px
  ch: number;
  cols: number;
  rows: number;
  t: number; // seconds since mount
  el: HTMLCanvasElement;
  /** fill a rectangle in css px */
  fill(x: number, y: number, w: number, h: number, c: Color): void;
  /** stamp a glyph into cell (x, y) */
  put(x: number, y: number, glyph: string, c: Color): void;
}

export type Scene = (g: Grid) => void;

export function hash(x: number, y: number, s = 0) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(s | 0, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (a: number, b: number, v: number) => {
  const k = clamp((v - a) / (b - a));
  return k * k * (3 - 2 * k);
};

