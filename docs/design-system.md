# Design system contract

All Figma kit content lives on **components** (34:212). Original Page 1 and Page 2 are preserved. The user's edited Page 2 is the visual source of truth.

## Foundations

76 variables: 27 exact color primitives, 32 semantic aliases, 17 dimensions. Three collections each have one source-based mode. Sixteen text styles cover 12 product treatments and 4 research treatments. One effect style preserves the source upload-symbol shadow.

Nunito Sans is the product family. Geist and Inter belong to research. The palette includes mixed text link purple, source icon colors, research colors, and the clearly labeled Figma component-outline utility. Raster screenshots are references and their pixel colors are not product tokens.

## Components

| Figma | ID | Code | Contract |
|---|---|---|---|
| Button | 27:979 | src/components/Button.js | Primary/Secondary × Default/Hover. Label and Secondary label preserve distinct source labels. |
| ToolIcon | 25:714 | assets/*.svg | Six editable source icons; five used by this page. 64px grid. |
| ToolCard | 25:717 | src/components/ToolCard.js | Default/Hover, editable Label, swappable Icon. 195 × 130px. |
| Upload area | 17:42 | src/components/UploadZone.js | idle → dragging → selected/error → reset. Local-only validation. |
| Header | 43:160 | src/components/Header.js | Shared on both pages; Tools menu open/closed, Escape and outside-click dismissal. |
| Footer | 43:234 | src/components/Footer.js | Shared white logo, five link groups and copyright. |
| Features | 43:502 | src/components/Features.js | Shared heading and ten ToolCard instances. |
| Generation block | 51:712 | src/components/MusicGenerator.js | Prompt input, selected mode, shuffle and validation. Generation callback is a prototype boundary. |
| Generate button | 43:463 / 43:460 | Button with generate variant | Purple default/hover, white sparkle icon, 52px height and 12px radius. |
| UI icons | 51:780 and frame 43:154 exports | src/components/Icon.js | Named registry, dedicated assets/icons directory, 24px decorative slot. |

The header Log in control is 44px high in the source layout; the reusable Button set is 52px high. A documented `header-login` modifier preserves this source distinction.

## Assets

| File | Source slot |
|---|---|
| 3c567.svg + 4f93f.svg | Header logo artwork and mask, 24:645 |
| 8709f.svg | Music illustration background, 20:244 |
| 35d1a.png | Music artwork with source crop, 29:94 |
| d945b.svg | Word tool icon |
| f991d.svg | Image tool icon |
| 9b8a4.svg | PNG tool icon |
| 50bee.svg | Excel tool icon |
| 42bac.svg | HTML tool icon |

The footer was updated from frame 43:234 to include the white logo and is now the same component on both pages. Existing unusual icon assignments (for example Excel to PDF) are retained from the source rather than silently corrected.

The original `design-tokens.json` records the first kit export. Music-specific colors and the updated shared card radius are recorded in `tokens.css`; these additions are read from frame 43:154 and are not a claim that new variables were published to Figma. The old home primary-button color is preserved. The new generator button uses a separate purple variant. Header Log in retains its explicit 14px radius from the new frame.

## Page boundaries

`index.html` and `music.html` share one application entry point, CSS foundations, header, footer and features. Native links support browser Back, opening in a new tab and direct GitHub Pages refresh. The home music promotion remains aligned to the feature modules (1040px maximum, 16px inset on narrower screens).

The music component emits `{ prompt, mode }` through `onGenerate`. The app currently opens a preview dialog; it does not call an AI service or pretend to generate audio. CustomMusicFields.js implements frame 57:942 with title, lyrics, voice and styles controls. Both sections start expanded, matching the source. Custom entries persist across mode switches; only Custom submissions include them. Lyrics Generate opens a prototype notice. Shuffle rotates through local example prompts and never repeats immediately. Prompt state lasts for the current page visit and is not stored remotely.

## Accessibility and responsive behavior

Native buttons and dialogs provide keyboard interaction. Focus uses the existing purple link color. Layout reflows at 1200, 800 and 520px; the supplied design defines desktop only. Touch-friendly controls and reduced-motion handling are included.

Source contrast: white on primary default is 5.11:1. White on primary hover is 3.98:1, below the 4.5:1 target for 16px text. The exact source color is retained and needs a design decision before production. Focus/disabled/loading are not presented as existing Figma variants.

## Mapping

Figma IDs and code paths above form an explicit handoff mapping. Native Figma Code Connect has not been published; this dependency-free static project has no Code Connect integration.

Custom update: the generator is 647px wide, fields use 8px corners, section padding and gaps are 16px, labels have an 8px field gap, and lyrics input is 102px tall. The prompt remains 150px tall. Source: 57:942. Style chips wrap to the available content width rather than reproducing the Figma fixed-width overflow.

Latest Custom revision: section borders are #b1b1b1; Shuffle sits beside the prompt label without focusing the input; Lyrics Generate uses the original list-sparkle icon. Lyrics fields have 24px gaps. Styles toggle independently, allow all nine selections and are emitted as a styles array. Voice remains a single selection.
