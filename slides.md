---
theme: default
title: Tierdeck Demo
colorSchema: dark
transition: fade
mdc: true
layout: intro
---

# Tierdeck Demo

Rank your features live, with the audience

::bottom::

Your Event · Date · Place

::right::

<LiveDemo src="/demo-app/index.html" :bar="false" :lazy="false" />

<!-- Press `T` anytime to jump to the tier list -->

---
layout: default
---

# How this deck works

1. The next slide is a **tier list**. Every feature in this deck starts in the **Unranked** drawer on its right edge.
2. Click a chip to open that feature's slide. Visited chips are marked.
3. Rank it: drag the chip into a tier, or click the badge in the slide's top-right corner.
4. Press **T** to return to the tier list, or **E** to jump to the end.

Press the laser button in the nav bar, or hold **Shift** and drag, to draw a fading laser trail. It mirrors between presenter and audience windows.

Rankings are saved in the browser, so a reload keeps them. **Reset** in the drawer clears them.

---
layout: full
routeAlias: tiers
hotkey: t
class: '!p-1'
---

<TierList />

<!--
Start with everything in the Unranked drawer. Drag each topic into its tier as you present it.
-->

---
layout: concept
routeAlias: search
concept:
  title: Search
  emoji: 🔎
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## What

Filter the site list as you type

## Why

- Users scroll through long lists today
- No server round-trip needed

</div>

<LiveDemo src="/demo-app/index.html?feature=search" url />

</div>

<!-- Basic concept slide: text on the left, a live iframe on the right via a grid. -->

---
layout: concept
routeAlias: dark-mode
concept:
  title: Dark Mode
  emoji: 🌙
---

## Why

- Requested in 40% of feedback
- Easier on the eyes in the field at night

## How

- CSS custom properties, toggled by one class

::right::

```css
:root { --bg: #f7f7f8; --fg: #18181b; }
.dark { --bg: #18181b; --fg: #f4f4f5; }
body  { background: var(--bg); color: var(--fg); }
```

<!-- The `::right::` slot splits the concept layout into text + code/media. -->

---
layout: concept
routeAlias: export
concept:
  title: CSV Export
  emoji: 📤
---

## Why

- Users copy-paste into spreadsheets

## How

Four steps, highlighted one per click:

::right::

<StepFocus>

```js
// 1. Collect the rows
const rows = sites.map(s => [s])
```

```js
// 2. Serialize
const csv = ['site', ...rows].join('\n')
```

```js
// 3. Wrap in a Blob
const blob = new Blob([csv], { type: 'text/csv' })
```

```js
// 4. Trigger the download
a.href = URL.createObjectURL(blob); a.click()
```

</StepFocus>

<!-- StepFocus: each → highlights the next block, ← goes back. -->

---
layout: concept
routeAlias: map-tiles
concept:
  title: PMTiles Basemap
  emoji: 🗺️
---

## What

- Replace the tile server with a single PMTiles file on object storage

## Why

- One less server to run
- Tiles served straight from a CDN

---
layout: concept
conceptOf: map-tiles
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## Outcome

- Hosting cost down
- Cold-start latency gone

The heading says **(cont.)** and the tier badge is shared: `conceptOf` adds a slide without adding a chip.

</div>

<LiveDemo src="/demo-app/index.html?feature=map-tiles" fallback="/media/demo-fallback.mp4" />

</div>

<!-- LiveDemo `fallback`: the "Use video" button swaps to a recording if the live app is down. -->

---
layout: concept
routeAlias: offline
concept:
  title: Offline Sync
  emoji: 📶
---

<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">
<div>

## What

Queue edits while offline, sync on reconnect

## Demo

Each → switches to the next tab. Click a tab to jump.

</div>

<DemoReel :demos="[
  { label: 'Status', src: '/demo-app/index.html?feature=offline-sync' },
  { label: 'Zoomed out', src: '/demo-app/index.html?feature=offline-sync', scale: 0.6 },
  { label: 'Sign in', src: '/demo-app/index.html?feature=auth' },
]" />

</div>

<!-- DemoReel: several LiveDemos on one slide, one per click. -->

---
layout: concept
routeAlias: auth
concept: Single Sign-On
---

## Why

- One login across all our tools

## Note

This slide's frontmatter is just `concept: Single Sign-On`. The emoji is optional.

---
layout: intro
hotkey: e
---

# Thank You

::bottom::

Questions?
