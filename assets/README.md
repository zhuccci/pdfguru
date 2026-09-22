# Figma assets

Original artwork exported from FORMA (`7PuiN52bUs4UnIIlfcx6RD`). SVG content and intrinsic dimensions are preserved. UI icons occupy 24 × 24px slots via `src/components/Icon.js`.

| Repository asset | Figma source |
|---|---|
| icons/tools-grid.png | Component 51:780; exact 24px PNG export (no SVG asset returned by Figma) |
| icons/shuffle.svg | Frame 43:154 export c77dc.svg; shuffle artwork |
| icons/sparkles.svg | Frame 43:154 export 15aa4.svg; Generate music artwork |
| icons/chevron-down.svg | Frame 43:154 export 34bb0.svg; Tools dropdown |
| icons/chevron-down-light.svg | Frame 43:154 export e3dd5.svg; language dropdown |
| brand/logo-light.svg | Frame 43:154 export dfb60.svg; footer logo |
| icons/google-pay-g.png | Frame 137:813 export 4ca32.png; Google Pay mark |
| icons/apple-pay.svg | Frame 137:813 export 979c8.svg; Apple Pay mark |
| payment-success-illustration.png | Frame 137:1086 image 14; cropped and optimized for the 226 × 170px illustration slot |

Earlier header, music illustration and tool-card exports remain at the assets root; their mappings are in `docs/design-system.md`. No runtime dependency on temporary Figma URLs is required.

Custom component 57:942 adds icons/chevron-right.svg (Figma export a7306.svg), preserved at 24 × 24px.

icons/list-sparkle.svg is the exact 24px Figma export 8b473.svg from component 57:942, used for Lyrics Generate. Both section headers now use chevron-down.svg.

icons/audio.svg is the exact 24px Figma export a5965.svg from component 57:942, used by the Custom “Create my song” action.

`audio/emerald-sky-ver-2.mp3` is the user-supplied Version 2 preview, copied from `Comp 1.mp3` without modification. It plays locally in the results card; it is not a Figma export.

`audio/emerald-sky-ver-1.mp3` is the user-supplied Version 1 preview, copied from `Comp 1_1.mp3` without modification.
