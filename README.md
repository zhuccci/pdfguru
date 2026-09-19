# PDF Guru prototype

Single-page prototype based on the edited FORMA Figma layout, including the AI music entry point.

- Live: https://zhuccci.github.io/pdfguru/
- Layout: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=17-2
- Design kit: https://www.figma.com/design/7PuiN52bUs4UnIIlfcx6RD/FORMA?node-id=34-212

## Run

Requires Node 22+. No package installation or build step.

```sh
npm start
npm test
```

Open http://127.0.0.1:4174. GitHub Pages serves the repository root.

## Structure

- `src/components/`: reusable Button, ToolCard, UploadZone and Dialog modules.
- `src/styles/tokens.css`: CSS variables exported from Figma; semantic roles alias primitives.
- `src/styles/components.css`: shared component states.
- `src/styles/page.css`: responsive composition matching the 1440px Figma frame.
- `src/data/tools.js`: tool instance data and footer groups.
- `assets/`: exact Figma-exported SVG and PNG assets.
- `design-tokens.json`: token values, aliases, CSS names and Figma variable IDs.
- `docs/design-system.md`: component mapping, state contracts and design decisions.

## Prototype boundaries

File selection and drag/drop validate extension and the 100 MB size cap locally. Files are never uploaded. Login, tool destinations and Generate music show an explicit preview message. There is no authentication, PDF conversion, AI audio generation, or credential collection. Only the requested page is implemented.
