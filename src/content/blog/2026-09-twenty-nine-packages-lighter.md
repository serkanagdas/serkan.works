---
title: twenty-nine packages lighter
description: debloating an old Xiaomi Mi Box over adb, ten packages at a time, with a way back for every single one
date: 2026-09-01
tag: hardware
---

The Mi Box in the living room is a 2 GB Android TV box from another era. It still plays
everything fine. It just takes its time getting there, because it also runs ambient
screensavers, a recommendations service, telemetry, ANT+ sensor plugins and a print
spooler, for a TV that has never printed anything.

## the rules

I did this with an agent driving `adb`, which made the rules matter more than usual:

1. **Disable, never uninstall.** Only `pm disable-user --user 0`. No `pm uninstall`.
2. **Every change has an undo.** Each package is logged next to its `pm enable` line.
3. **Batches of at most ten.** After every batch: remote, Netflix, YouTube, sound and
   keyboard all get tested by a human on the sofa before the next one.

The agent was fast at the boring part: listing packages, sorting them into "definitely
junk", "your call" and "do not touch", and keeping the log. I made the calls in the middle
group. Google Play Services, the remote service and the system UI never left the "do not
touch" list.

## the batches

- **batch 1**: recommendations, screensavers, Xiaomi analytics, feedback and bug report
  senders, ANT+, print spooler.
- **batch 2**: camera (there is no camera), HTML viewer, factory auto-installers, a dead
  movie store, calendar and contact sync.
- **batch 3**: one-time setup wizards, Mi screen mirroring, TalkBack, Play Games and the
  Xiaomi content row.

Every batch passed the sofa test.

## the launcher

The last step was replacing the stock launcher with FLauncher, a plain grid of apps
without ads. Setting it as the home activity reported `Success` and then quietly did
nothing, because the stock launcher is pinned as the default. Disabling the stock one
left FLauncher as the only candidate, and that settled it.

Animation scales went to `0.5`, caches were trimmed, the box was rebooted, and it came
back on the new home screen. Twenty-nine packages are off. The box feels like it got
a second life, and every one of those changes can be undone with a single loop.

```sh
for p in $(grep -v '^#' disabled.txt); do adb shell pm enable $p; done
```

One note for future me: re-enable the setup wizards before ever doing a factory reset.
