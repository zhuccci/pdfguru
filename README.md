# PDF Guru prototype

Four-page prototype based on the edited FORMA Figma layouts. The home page opens `music.html`; submitting the music form opens `results.html` and simulates track generation before showing two previews. The mock login reveals the download state, which opens `plans.html`.

- Live: https://zhuccci.github.io/pdfguru/
- Layout: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=17-2
- Design kit: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=34-212
- Music page: https://zhuccci.github.io/pdfguru/music.html
- Music design: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=43-154
- Results design: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=105-330
- Plans design: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=130-1659

## Run

Requires Node 22+. No package installation or build step.

```sh
npm start
npm test
```

Open http://127.0.0.1:4174. GitHub Pages serves the repository root.

## Structure

- `src/app.js`: composes the requested page with shared footer and preview dialog.
- `src/pages/`: HomePage, MusicPage, TrackResultsPage and PlansPage composition; all pages reuse Header and Footer.
- `src/components/`: reusable Header, Footer, Features, Icon, MusicGenerator, TrackGeneration, TrackCard, PlanCard, WaveformProgress, Button, ToolCard, UploadZone and Dialog modules.
- `src/styles/tokens.css`: CSS variables exported from Figma; semantic roles alias primitives.
- `src/styles/components.css`: shared component states.
- `src/styles/page.css`: responsive composition matching the 1440px Figma frame.
- `src/styles/shared.css`: common header, footer, icon and feature-grid layout.
- `src/styles/music.css`: generator layout and control states from frame 43:154.
- `src/styles/results.css`: loading and ready variants from frames 105:789 and 105:791.
- `src/styles/plans.css`: responsive plan selection from frame 130:1659.
- `src/data/tools.js`: tool instance data and footer groups.
- `assets/`: Figma-exported SVG/PNG assets and the supplied Version 1 and Version 2 MP3 previews.
- `assets/icons/`: named UI icons; `Icon.js` provides the registry and 24px slot.
- `assets/brand/`: footer logo artwork. See `assets/README.md` for export provenance.
- `design-tokens.json`: token values, aliases, CSS names and Figma variable IDs.
- `docs/design-system.md`: component mapping, state contracts and design decisions.

## Prototype boundaries

File selection and drag/drop validate extension and the 100 MB size cap locally. Files are never uploaded. The music page supports an optional editable prompt and shuffle suggestions, including the Emerald Sky prompt. Shuffle goes through all suggestions before repeating. Custom mode adds optional vocals and lyrics, Male/Female voice, independently selectable styles, Format, and Duration, matching Figma 57:942. The Lyrics Generate button inserts the user-provided Emerald Sky lyrics, which remain editable. Entries persist when switching modes or collapsing sections. Submitting either mode opens the results page, which shows the fixed Emerald Sky loading text. TrackGeneration animates a semantic waveform progress indicator, then crossfades layered loading and ready views after 3.8 seconds while preserving the card's height. Reduced-motion users get an opacity-only transition. Both preview cards play their supplied MP3s through the artwork button. Unlocking opens a visual login popup; either login action sets a session-only mock state and reveals Download full songs. That action opens the plan selection page. Plans are native radio options with the Figma Full Access plan selected initially. The legal text changes with the plan: both 7-day plans show the $49.99/month post-trial notice, while Annual keeps the $299 annual notice. Continue shows a prototype notice; no checkout or payment occurs. Back to files returns directly to the ready preview state. No prompts, files, credentials, or payment details are sent to a server.

Latest Custom revision: section borders are #b1b1b1; Shuffle sits beside the prompt label without focusing the input; Lyrics Generate uses the original list-sparkle icon. Lyrics fields have 24px gaps. Styles toggle independently, allow all nine selections and are emitted as a styles array. Voice remains a single selection.
