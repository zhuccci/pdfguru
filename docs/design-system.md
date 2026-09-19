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

The footer logo slot is empty in the edited Figma frame; its spacing is preserved. Existing unusual icon assignments (for example Excel to PDF) are retained from the source rather than silently corrected.

## Accessibility and responsive behavior

Native buttons and dialogs provide keyboard interaction. Focus uses the existing purple link color. Layout reflows at 1200, 800 and 520px; the supplied design defines desktop only. Touch-friendly controls and reduced-motion handling are included.

Source contrast: white on primary default is 5.11:1. White on primary hover is 3.98:1, below the 4.5:1 target for 16px text. The exact source color is retained and needs a design decision before production. Focus/disabled/loading are not presented as existing Figma variants.

## Mapping

Figma IDs and code paths above form an explicit handoff mapping. Native Figma Code Connect has not been published; this dependency-free static project has no Code Connect integration.
