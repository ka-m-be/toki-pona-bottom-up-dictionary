# Changelog

Notable changes to the web app. The dictionary version shown in the app footer (for example `v7`) is the
version of the generated data in `data/`.

## 2026-10-07

### Added
- Web app (PWA) for dictionary **v7**: search, filters, alphabetical and learning order, word pages with
  linked definitions, layers and back-references, reference data from pu, ku and Linku, interface in
  English, German and Spanish, light/dark theme, offline support.
- Tooltips on linked words (mouse/pen hover and keyboard focus): gloss in the current language, the other
  two languages below. They replace the former `title` attribute.
- Sources page (`#/sources`) with all sources and references, grouped by topic: Toki Pona, layered
  dictionaries and primitives (including NSM), ideas from Forth. Linked from the header, footer and About.
- Repository files: README, LICENSE (MIT), NOTICE, CONTRIBUTING, CI and GitHub Pages workflows.

### Changed
- Project name "toki pona bottom up dictionary" (title, manifest, package name; the same in all three
  interface languages). Copyright holder: Kai.
- The About page links to the Sources page instead of its own short list of links.
- Service worker cache `tp-primitives-v2` (new file `js/references.js`).
