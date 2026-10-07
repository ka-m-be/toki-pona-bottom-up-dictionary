# toki pona bottom up dictionary

> **Not official.** This is an independent community project. It is **not** by Sonja Lang (jan Sonja),
> the creator of Toki Pona, and it is **not** part of or endorsed by Official Toki Pona
> ([tokipona.org](https://tokipona.org)). The definitions are drafts written by this project.

A Toki Pona dictionary in which every word is **defined in Toki Pona**, using only a small set of
**primitive words** and words that were defined before, as in the programming language Forth. The
primitives are mapped to the semantic primes of the Natural Semantic Metalanguage (NSM). Glosses are given
in **English, German and Spanish**.

This repository is the dictionary's **web app**: a static progressive web app (PWA) with no build step and
no dependencies. It works offline after the first visit.

```text
wawa¹  strong, powerful    ijo li ken pali¹ e ijo suli¹, li ken ala kama ante tan ijo ante
wawa²  energetic, intense  pali¹ mute¹, tawa mute¹, suli¹ mute¹
wawa³  confident           jan li pilin¹ e ni: mi ken, mi wawa¹, mi wawa²
```

`wawa³` may use `wawa¹` and `wawa²` because they are defined before it. In the app every word of a
definition links to its own entry, and pointing at it shows its translation.

## Status

Dictionary **v7**: 137 words (the 120 words of *pu* and the 17 *nimi ku suli*), 53 primitives,
167 defined readings, at most 5 definition layers.

- **Formally checked**: no cycles, every definition only uses primitives and earlier readings, all 137
  words are covered.
- **Not semantically verified**: a definition can be well-formed and still miss the meaning.
- The English and Spanish glosses are **AI-assisted translations** of the German project glosses and need
  review by speakers.

## Run it locally

```sh
python3 -m http.server 8000     # in this directory, then open http://localhost:8000
```

Any static file server works. Opening `index.html` directly from disk does not: browsers do not load
ES modules and JSON from `file://`.

## Features

- Search over Toki Pona words and glosses (ignores case and diacritics); filters for primitives, defined
  words, pu and ku suli
- Alphabetical view or **learning order**: the definition order, in which everything a definition uses
  comes first
- Word pages: every reading with its gloss, the Toki Pona definition with linked words, its layer, and
  "used in" back-references; primitives are highlighted and show their NSM prime
- **Hover and keyboard tooltips** on linked words: the gloss in the current language, the other two
  languages smaller below (not on touch screens, where a tap opens the entry)
- Reference block per word: pu wording, ku survey translations, Linku category, usage and definition, links
- **Sources** page (`#/sources`) with all sources and references, grouped by topic: Toki Pona, layered
  dictionaries and primitives (including NSM), ideas from Forth
- Interface in English, German and Spanish; light, dark or automatic theme; deep links such as
  `#/w/wawa@2`; keyboard shortcut `/` for search
- Expanded forms (definitions rewritten down to primitives, with brackets) are deliberately **not shown and
  not shipped**

## Files

| Path | Content |
|---|---|
| `index.html`, `css/style.css` | page and styles |
| `js/logic.js` | pure logic: routing, search, tokens (tested) |
| `js/render.js` | pure rendering to HTML strings (tested) |
| `js/i18n.js` | interface texts in English, German and Spanish |
| `js/references.js` | the list of sources and references shown on `#/sources` |
| `js/main.js` | DOM glue: loading, routing, events, tooltip |
| `sw.js`, `manifest.webmanifest` | offline support and installability |
| `data/dictionary.json` | generated, MIT: glosses, definitions, order, layers, back-references |
| `data/sources.json` | generated, **CC BY-SA 4.0** (adapted from Linku): reference data per word |
| `icons/`, `scripts/make_icons.py` | icons (SVG and PNG), generated without third-party libraries |
| `tests/` | `node --test` tests for logic, data and rendering |

When you add or rename an app file, update `SHELL` and bump `CACHE` in `sw.js`, and add the file to the
`check` script in `package.json`.

### About the data

`data/dictionary.json` and `data/sources.json` are **generated** from the dictionary's working files
(drafts, validator, Linku snapshot), which are maintained separately and are not part of this repository.
Please do not edit the JSON files by hand. To report a problem with a definition or a translation, open an
issue with the **reading id** (for example `lanpan@1` or `wawa@2`), the problem and, if possible, a proposal.
See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Tests

```sh
npm run check     # syntax check of all scripts
npm test          # logic, data consistency, rendering (Node.js 18+, no dependencies)
```

The tests also check the data: every definition only uses earlier readings, no expansions are shipped,
every reading has a gloss in all three languages, and every source on the Sources page has a link and
notes in all three languages.

## Deployment

Any static host works. The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs the
tests and publishes the app to GitHub Pages on every push to `main` (enable Pages with source
"GitHub Actions" in the repository settings). [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs
the tests on every push and pull request.

## Licence

The code and this project's own dictionary content are licensed under the [MIT licence](LICENSE).
Third-party material keeps its own licence; see [`NOTICE.md`](NOTICE.md). In short:

| Material | Licence |
|---|---|
| Code, definitions, glosses, icons (this project) | MIT |
| `data/sources.json` (adapted from sona Linku) | CC BY-SA 4.0 |
| pu dictionary wording (Sonja Lang, 2014), inside `data/sources.json` | public domain |
| ku data (Sonja Lang, 2021), inside `data/sources.json`; also at [tokipona.org/nimi_pu.txt](https://tokipona.org/nimi_pu.txt) | CC0 since 2026-01-12 |

Works that are only linked (on the word pages and the Sources page) are not part of this repository.
The name "Toki Pona" is used to describe the language this dictionary is about, as allowed by its creator
for purposes related to the language and its community.
