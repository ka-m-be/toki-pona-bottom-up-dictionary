# Contributing

Thank you for helping! Please keep in mind: this is **not** Official Toki Pona, and nothing here should be
presented as such.

## Ways to help

- **Review translations.** The English and Spanish glosses are AI-assisted translations of the German
  project glosses. Corrections by speakers, especially of Spanish, are very welcome.
- **Review definitions.** Does a Toki Pona definition capture the reading? Is it grammatical?
- **Improve the app**: accessibility, layout, performance, bugs.
- **Suggest sources** for the Sources page, with a link and a short note on why they matter for this project.

## Reporting a problem with a definition or a gloss

The files in `data/` are **generated** from the dictionary's working files, which are maintained separately.
Please do not change `data/*.json` in a pull request. Open an issue instead, with:

1. the **reading id**, for example `lanpan@1` or `wawa@2` (it is in the address bar: `#/w/wawa@2`);
2. the language, if it is about a gloss (`en`, `de`, `es`);
3. what is wrong and, if possible, a proposal.

Accepted changes go into the next dictionary version, and the data here is regenerated. A definition may
only use primitives and readings that come earlier in the learning order, so a small change can move other
entries; that is checked automatically before the data is updated.

## Working on the app

No build step and no dependencies: plain HTML, CSS and JavaScript modules.

```sh
python3 -m http.server 8000     # then open http://localhost:8000
npm run check && npm test       # Node.js 18+
```

- Keep `js/logic.js` and `js/render.js` free of DOM access, so they stay testable with `node --test`.
  DOM code belongs in `js/main.js`.
- Escape every value from data with `esc()` before it goes into HTML.
- Interface texts live in `js/i18n.js`. Every key must exist in English, German and Spanish (a test checks
  this). Keep the "not official" notice visible on every page.
- Sources and references live in `js/references.js`. Every entry needs a working `http(s)` link and a note in
  all three languages (a test checks this). Keep titles of works in their original language. Do not add
  sources you have not checked, and state the licence when it matters.
- When you add or rename a file the app loads, update `SHELL` and bump `CACHE` in `sw.js`, and add the file
  to the `check` script in `package.json`.
- Expanded forms of definitions (rewritten down to primitives) are deliberately not shown in the app.
- Formatting follows [`.editorconfig`](.editorconfig). Project language: English (code, comments,
  documentation, commit messages).

## Licence of contributions

By contributing you agree that your contribution is licensed under the [MIT licence](LICENSE), like the rest
of the project's own content. Do not add third-party material without stating its source and licence in
[`NOTICE.md`](NOTICE.md).
