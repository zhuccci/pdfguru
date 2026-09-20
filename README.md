# PDF Guru prototype

Two-page prototype based on the edited FORMA Figma layouts. The home page's Generate music link opens `music.html` directly, including on GitHub Pages.

- Live: https://zhuccci.github.io/pdfguru/
- Layout: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=17-2
- Design kit: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=34-212
- Music page: https://zhuccci.github.io/pdfguru/music.html
- Music design: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=43-154

## Run

Requires Node 22+. No package installation or build step.

```sh
npm start
npm test
```

Open http://127.0.0.1:4174. GitHub Pages serves the repository root.

## Structure

- `src/app.js`: composes the requested page with shared footer and preview dialog.
- `src/pages/`: HomePage and MusicPage composition; both use the same Header and Features components.
- `src/components/`: reusable Header, Footer, Features, Icon, MusicGenerator, Button, ToolCard, UploadZone and Dialog modules.
- `src/styles/tokens.css`: CSS variables exported from Figma; semantic roles alias primitives.
- `src/styles/components.css`: shared component states.
- `src/styles/page.css`: responsive composition matching the 1440px Figma frame.
- `src/styles/shared.css`: common header, footer, icon and feature-grid layout.
- `src/styles/music.css`: generator layout and control states from frame 43:154.
- `src/data/tools.js`: tool instance data and footer groups.
- `assets/`: exact Figma-exported SVG and PNG assets.
- `assets/icons/`: named UI icons; `Icon.js` provides the registry and 24px slot.
- `assets/brand/`: footer logo artwork. See `assets/README.md` for export provenance.
- `design-tokens.json`: token values, aliases, CSS names and Figma variable IDs.
- `docs/design-system.md`: component mapping, state contracts and design decisions.

## Prototype boundaries

File selection and drag/drop validate extension and the 100 MB size cap locally. Files are never uploaded. The music page supports editable prompts, shuffle suggestions and required-prompt validation. Custom mode adds optional vocals and lyrics, Male/Female voice, independently selectable styles, Format, and Duration, matching Figma 57:942. Entries persist when switching modes or collapsing sections. Audio and lyrics generation show explicit preview messages until a backend is connected. Login and other tool/footer destinations remain preview dialogs. No prompts, files, or credentials are sent to a server.

Latest Custom revision: section borders are #b1b1b1; Shuffle sits beside the prompt label without focusing the input; Lyrics Generate uses the original list-sparkle icon. Lyrics fields have 24px gaps. Styles toggle independently, allow all nine selections and are emitted as a styles array. Voice remains a single selection.
