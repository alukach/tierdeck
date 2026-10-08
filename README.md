# tierdeck

A [Slidev](https://sli.dev) deck template for talks that rank things live. The deck hub is a drag-and-drop tier list (S–F). Each chip on it links to a detail slide, and each detail slide can show a live app in an iframe, with a recorded video as a fallback.

The format suits "here's everything we built this year, let's rank it" talks. You present each item, the audience reacts, and you drop it into a tier.

## Run

```sh
pnpm install
pnpm dev           # http://localhost:3030
```

`pnpm dev` passes `--remote`, so a phone or second screen on the same network can open `/presenter`.

## Presenting

- The tier list slide is the hub. Every concept starts in the **Unranked** drawer on its right edge. Hover over the drawer to open it, or pin it open with 📍.
- Click a chip to open its slide. Drag a chip between tiers (or back to the drawer) to rank it.
- On a concept slide, the tier badge in the top-right corner shows the current tier. Click it to pick a tier without going back.
- Press `T` from any slide to return to the tier list, `E` to jump to the closing slide, or `End` for the last slide. See [Hotkeys](#hotkeys).
- Laser pointer: toggle it with the scribble button in the nav bar, or hold `Shift` and drag. The trail fades out, and it mirrors between the presenter view and the audience view.
- Rankings and visited state are saved in `localStorage`, so a reload keeps them. **Reset** in the drawer moves everything back to Unranked. Clear rankings before you go on stage.

## Writing slides

All content lives in `slides.md`. The demo deck shows every feature below. Edit it into your talk.

### Add a concept

A slide becomes a chip on the tier list when its frontmatter has a `concept` key and a `routeAlias`:

```md
---
layout: concept
routeAlias: dark-mode          # unique id, also the slide's URL
concept:
  title: Dark Mode
  emoji: 🌙                     # optional
---

## Why

- ...
```

`concept: Dark Mode` is shorthand for a title with no emoji. Chips appear in the drawer in slide order. Adding, renaming or removing a concept is safe: saved rankings are reconciled with the current deck on load.

### Continue a concept over several slides

Set `conceptOf` instead of `concept`. The slide shares the parent's title and tier badge, and its heading says "(cont.)". It adds no chip.

```md
---
layout: concept
conceptOf: dark-mode
---
```

### Hotkeys

Any slide can claim a key that jumps to it from anywhere in the deck:

```md
---
hotkey: e
---
```

The demo deck uses `t` for the tier list and `e` for the thank-you slide. Avoid keys Slidev already uses, such as `d` (dark mode), `o` (overview) and `g` (go to). Hotkeys are read when the deck loads, so reload after adding one.

### Laser pointer

You can tune the laser in the headmatter at the top of `slides.md`:

```yaml
themeConfig:
  laserColor: '#ef4444'
  laserWidth: 6        # px
  laserFade: 900       # ms until the trail disappears
  laserEnabled: false  # true to start with the laser on
```

In presenter mode the trail follows Slidev's synced cursor, so turning the laser on also turns on the presenter cursor.

### Layouts

| Layout | Use |
| --- | --- |
| `concept` | Detail slide: title, emoji, tier badge. Add a `::right::` slot to split it into text (left) and code or media (right). |
| `intro` | Title and closing slides. Default slot at the top, `::bottom::` at the bottom, optional `::right::` filling the right half. |
| `full` + `<TierList />` | The hub. Give it `routeAlias: tiers` and `hotkey: t`. |

For a text-and-iframe split without `::right::`, use a grid: `<div class="grid grid-cols-[1fr_2fr] gap-6 h-full">`.

### Components

**`<LiveDemo>`** embeds a live page.

```md
<LiveDemo src="https://your.app/page" fallback="/media/page.mp4" :scale="0.6" url />
```

| Prop | Default | |
| --- | --- | --- |
| `src` | required | Page URL. Paths starting with `/` load from `public/`. |
| `fallback` | | Video to switch to via the "Use video" button if the live app fails. |
| `scale` | `1` | Render the page larger, then shrink it to fit. `0.5` shows twice as much page. |
| `crop` | `0` | Pixels to hide on every edge, e.g. Storybook's padding. |
| `bar` | `true` | Show the controls bar (status dot, Open ↗, video toggle). |
| `url` | `false` | Show the URL in the bar. |
| `lazy` | `true` | Load only when visible. Set `:lazy="false"` to preload. |

**`<DemoReel>`** puts several LiveDemos on one slide and shows one at a time. Each click advances to the next demo, and the bar has tabs to jump between them. All iframes stay loaded, so switching is instant.

```md
<DemoReel :demos="[
  { label: 'Viewer', src: 'https://…', scale: 0.6 },
  { label: 'Upload', src: 'https://…', fallback: '/media/upload.mp4' },
]" />
```

**`<StepFocus>`** shows every child block at once and highlights one per click. The others are dimmed. Use it for step-by-step code.

## Files

| File | Purpose |
| --- | --- |
| `slides.md` | Deck content |
| `store.ts` | Builds the concept list from slide frontmatter. Holds the shared tier state. Edit `TIERS` to change the tier names. |
| `components/TierList.vue` | Drag-and-drop tier list (`vuedraggable`). Tier colors are in `COLORS`. |
| `layouts/concept.vue` | Detail slide frame with the tier badge picker. Tier colors are in the `.t-*` classes. |
| `components/LiveDemo.vue`, `DemoReel.vue`, `StepFocus.vue` | See [Components](#components) |
| `setup/shortcuts.ts` | Registers each slide's `hotkey`, plus `End` |
| `laser.ts`, `global-top.vue`, `custom-nav-controls.vue` | Laser pointer: settings, drawing layer and nav-bar toggle. Ported from [developmentseed/ds-slidev-template](https://github.com/developmentseed/ds-slidev-template). |
| `public/demo-app/` | A stand-in app for the demo slides. `?feature=<id>` highlights part of its UI. Replace it with your app's URLs. |

If you rename the tiers, update the colors in both `TierList.vue` and `concept.vue`.

## Deploy

Pushing to `main` deploys to GitHub Pages using `.github/workflows/deploy.yml`. Enable it under **Settings → Pages → Source: GitHub Actions**.

To build by hand:

```sh
pnpm build                     # static SPA in dist/
pnpm build --base /<repo>/     # for a GitHub Pages project path
```

Any static host works. Slidev emits `_redirects` and `404.html` for SPA routing.

Embedded apps must allow framing from the deck's origin. Check that your app doesn't send `X-Frame-Options: DENY`, and that any CSP `frame-ancestors` includes the deck's domain.

`vite.config.ts` switches CSS minification to esbuild. This works around a Slidev 53 build failure in lightningcss.
