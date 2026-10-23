---
title: five versions of this website
description: I redesigned my homepage once, then four more times, and kept every one of them on its own branch
date: 2026-10-22
tag: software
---

The old version of this site worked, but it looked like everyone else's. It had a hero,
some cards and a lot of gradients. So I started again, and then I kept going.

Every direction got its own git branch, and none of them get deleted:

- **ascii-sea**: everything drawn in characters, a sea under a liquid-glass lens.
- **plein-air**: a painted landscape, a serif and a small cyclist riding across.
- **horizon**: a Swiss poster with a blue sun over a green field.
- **figure**: a bicycle drawn like an old patent, with "plates" for the projects.
- **horizon-ascii**: the poster again, but the sun is made of live ASCII.

The last one is what you are looking at. The sun is a canvas of halftone dots, about ten
thousand cells redrawn 24 times a second. Each glyph is rendered once into an atlas, one
row per colour, and stamped with `drawImage`. Every scene is a pure function of time:

```ts
type Scene = (g: Grid) => void; // g.t is seconds since the page opened
```

That makes the reduced-motion version free. It is just the same scene drawn at `t = 6`.

Keeping every version on a branch turned out to be the best decision. Designing stopped
being a choice I had to get right the first time. It became a walk where I could always
turn back, and that made it a lot easier to try the strange ideas.
