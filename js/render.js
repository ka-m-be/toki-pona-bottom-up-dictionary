// Pure rendering: data in, HTML strings out. No DOM access, so it can be tested with `node --test`.
// Every value that comes from data is escaped with esc().

import { LANGS, LANG_NAMES } from "./i18n.js";
import { FILTERS, SORTS, definitionTokens, esc, gloss, readingLabel, wordHash } from "./logic.js";
import { REFERENCE_GROUPS, pick } from "./references.js";

const EXTERNAL = 'target="_blank" rel="noopener noreferrer"';

function labelHtml(lemma, n) {
  return `${esc(lemma)}${n ? `<sup>${esc(n)}</sup>` : ""}`;
}

export function tokenHtml(token) {
  const cls = token.primitive ? "tok prim" : "tok";
  return `<a class="${cls}" href="${wordHash(token.id)}">${labelHtml(token.lemma, token.n)}</a>`;
}

/** The Toki Pona definition with every word linked. Never an expansion. */
export function definitionHtml(dict, reading) {
  let html = "";
  for (const token of definitionTokens(dict, reading)) {
    if (token.type === "punct") html += esc(token.text);
    else html += (html ? " " : "") + tokenHtml(token);
  }
  return html;
}

export function refLinkHtml(dict, id, lang) {
  const r = dict.readings[id];
  const { lemma, n } = readingLabel(dict, id);
  const cls = r?.primitive ? "tok prim" : "tok";
  return `<a class="${cls}" href="${wordHash(id)}" lang="tok">${labelHtml(lemma, n)}</a>`;
}

/**
 * Content of the hover/focus tooltip of a word link: the gloss in the current language, the other
 * languages smaller below. Returns "" for an unknown reading id.
 */
export function tooltipHtml(dict, id, lang, t) {
  const r = dict.readings[id];
  if (!r) return "";
  const { lemma, n } = readingLabel(dict, id);
  const kind = r.primitive ? t.primitive : t.layer(r.layer);
  const others = LANGS.filter((l) => l !== lang && r.gloss?.[l])
    .map((l) => `<span lang="${l}"><b>${l.toUpperCase()}</b> ${esc(r.gloss[l])}</span>`)
    .join("");
  return `<div class="tip-head"><span class="tip-lemma${r.primitive ? " prim" : ""}" lang="tok">` +
    `${labelHtml(lemma, n)}</span><span class="tip-kind">${esc(kind)}</span></div>` +
    `<div class="tip-gloss" lang="${lang}">${esc(gloss(r, lang))}</div>` +
    (others ? `<div class="tip-other">${others}</div>` : "");
}

export function renderHeader(t, lang, theme) {
  const langs = LANGS.map(
    (l) => `<button type="button" class="lang" data-lang="${l}" aria-pressed="${l === lang}" ` +
      `title="${esc(LANG_NAMES[l])}" lang="${l}">${l.toUpperCase()}</button>`,
  ).join("");
  return `
<div class="container header-row">
  <a class="brand" href="#/"><img src="icons/icon.svg" alt="" width="28" height="28"><span>${esc(t.appTitle)}</span></a>
  <nav class="nav" aria-label="${esc(t.navWords)}">
    <a href="#/" data-nav="list">${esc(t.navWords)}</a>
    <a href="#/about" data-nav="about">${esc(t.navAbout)}</a>
    <a href="#/sources" data-nav="sources">${esc(t.navSources)}</a>
  </nav>
  <div class="tools">
    <div class="langs" role="group" aria-label="${esc(t.language)}">${langs}</div>
    <button type="button" class="theme" data-theme-toggle title="${esc(t.theme[theme])}" aria-label="${esc(t.theme[theme])}">
      <span aria-hidden="true">${theme === "dark" ? "☾" : theme === "light" ? "☀" : "◐"}</span>
    </button>
  </div>
</div>`;
}

export function renderFooter(t, meta) {
  const version = meta ? ` · ${esc(meta.version)}` : "";
  return `<div class="container"><p>${esc(t.unofficial)}</p>
<p class="muted"><a href="#/about">${esc(t.navAbout)}</a> · <a href="#/sources">${esc(t.navSources)}</a>${version} ·
  MIT · Linku data CC BY-SA 4.0</p></div>`;
}

export function renderListShell(t, route) {
  const chips = (kind, values, labels, current) =>
    values.map((v) => `<button type="button" class="chip" data-${kind}="${v}" aria-pressed="${v === current}">` +
      `${esc(labels[v])}</button>`).join("");
  return `
<section class="list-view">
  <p class="tagline">${esc(t.tagline)}</p>
  <div class="controls">
    <label class="search">
      <span class="visually-hidden">${esc(t.searchLabel)}</span>
      <input id="q" type="search" value="${esc(route.q)}" placeholder="${esc(t.searchPlaceholder)}"
        autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search">
    </label>
    <div class="chips" role="group" aria-label="${esc(t.filterLabel)}">${chips("filter", FILTERS, t.filters, route.f)}</div>
    <div class="chips" role="group" aria-label="${esc(t.sortLabel)}">${chips("sort", SORTS, t.sorts, route.s)}</div>
  </div>
  <p class="count" id="count" aria-live="polite"></p>
  <ul class="results" id="results"></ul>
</section>`;
}

function badges(dict, lemma, t) {
  const e = dict.lemmas[lemma];
  let html = "";
  if (e.primitive) html += `<span class="badge prim">${esc(t.primitive)}</span>`;
  if (e.book === "ku suli") html += `<span class="badge">ku suli</span>`;
  return html;
}

export function renderResults(dict, lang, t, items) {
  if (!items.length) return `<li class="empty">${esc(t.noResults)}</li>`;
  return items.map((item) => {
    if (item.kind === "reading") {
      const r = dict.readings[item.id];
      const { lemma, n } = readingLabel(dict, item.id);
      const prim = r.primitive ? " prim" : "";
      return `<li><a class="entry reading" href="${wordHash(item.id)}">` +
        `<span class="ord">${r.order + 1}</span>` +
        `<span class="lemma${prim}" lang="tok">${labelHtml(lemma, n)}</span>` +
        `<span class="glosses">${esc(gloss(r, lang))}</span>` +
        `<span class="badge layer" title="${esc(t.layer(r.layer))}">L${r.layer}</span></a></li>`;
    }
    const many = item.ids.length > 1;
    const glosses = item.ids.map((id) => {
      const r = dict.readings[id];
      return `<span class="g">${many ? `<b>${r.n}</b> ` : ""}${esc(gloss(r, lang))}</span>`;
    }).join("");
    return `<li><a class="entry" href="${wordHash(item.lemma)}">` +
      `<span class="head"><span class="lemma" lang="tok">${esc(item.lemma)}</span>${badges(dict, item.lemma, t)}</span>` +
      `<span class="glosses">${glosses}</span></a></li>`;
  }).join("");
}

function readingCard(dict, lang, t, id, focus) {
  const r = dict.readings[id];
  const { lemma, n } = readingLabel(dict, id);
  const others = LANGS.filter((l) => l !== lang && r.gloss[l])
    .map((l) => `<span lang="${l}"><abbr title="${esc(LANG_NAMES[l])}">${l}</abbr> ${esc(r.gloss[l])}</span>`)
    .join("");
  const body = r.primitive
    ? `<p class="prim-note">${esc(t.primitiveLong)}</p>
       <p class="meta">${esc(t.nsmPrime)}: <span class="prime">${esc(r.prime)}</span></p>`
    : `<p class="def" lang="tok">${definitionHtml(dict, r)}</p>
       <p class="meta">${esc(t.layer(r.layer))} · ${esc(t.orderNo(r.order + 1))}</p>`;
  const used = r.usedBy.length
    ? `<p class="refs">${r.usedBy.map((u) => refLinkHtml(dict, u, lang)).join(" ")}</p>`
    : `<p class="muted">${esc(t.notUsed)}</p>`;
  return `
<section class="card reading-card${focus ? " focus" : ""}" id="r-${esc(id)}">
  <h2><span class="lemma${r.primitive ? " prim" : ""}" lang="tok">${labelHtml(lemma, n)}</span>
    <span class="gloss">${esc(gloss(r, lang))}</span></h2>
  ${others ? `<p class="other-langs" aria-label="${esc(t.otherLanguages)}">${others}</p>` : ""}
  ${body}
  <details class="used-in"${r.usedBy.length && r.usedBy.length <= 12 ? " open" : ""}>
    <summary>${esc(t.usedIn)} (${r.usedBy.length})</summary>
    ${used}
  </details>
</section>`;
}

export function renderSources(source, t) {
  if (!source) return "";
  const rows = [];
  if (source.pu) {
    const lines = source.pu.split("\n").map(esc).join("<br>");
    const variant = source.puVariantOf
      ? `<p class="note">${esc(t.puVariant(source.puVariantOf))}</p>` : "";
    rows.push(`<dt>${esc(t.puWording)}</dt><dd><p class="pu" lang="en">${lines}</p>${variant}</dd>`);
  }
  if (source.ku?.length) {
    const items = source.ku.map(([g, pct]) => `<li lang="en">${esc(g)} <span class="pct">${esc(pct)} %</span></li>`)
      .join("");
    rows.push(`<dt>${esc(t.kuGlosses)}</dt><dd><ul class="ku">${items}</ul></dd>`);
  }
  const meta = [];
  if (source.category) meta.push(`${esc(t.category)}: ${esc(source.category)}`);
  if (source.usage) meta.push(esc(t.usage(source.usage.percent, source.usage.survey)));
  if (source.linku || meta.length) {
    const text = source.linku
      ? `<p class="linku" lang="${esc(source.linku.lang)}">${esc(source.linku.text)}</p>` +
        (source.linku.lang === "en" ? `<p class="note">${esc(t.linkuEnglish)}</p>` : "")
      : "";
    rows.push(`<dt>${esc(t.linku)}</dt><dd>${text}${meta.length ? `<p class="note">${meta.join(" · ")}</p>` : ""}</dd>`);
  }
  const links = Object.entries(source.links ?? {})
    .filter(([, url]) => /^https:\/\//.test(url))
    .map(([k, url]) => `<a href="${esc(url)}" ${EXTERNAL}>${esc(t.linkNames[k] ?? k)}</a>`);
  if (links.length) rows.push(`<dt>${esc(t.links)}</dt><dd>${links.join(" · ")}</dd>`);
  return `
<section class="card sources">
  <h2>${esc(t.sources)}</h2>
  <dl>${rows.join("")}</dl>
  <p class="license-note">${esc(t.sourcesNote)}</p>
</section>`;
}

export function renderWord(dict, sources, lang, t, lemma, focusId, backHash = "#/") {
  const entry = dict.lemmas[lemma];
  if (!entry) return renderNotFound(t);
  const cards = entry.readings.map((id) => readingCard(dict, lang, t, id, id === focusId)).join("");
  return `
<article class="word-view">
  <p><a class="back" href="${esc(backHash)}">${esc(t.back)}</a></p>
  <header class="word-head"><h1 lang="tok">${esc(lemma)}</h1>${badges(dict, lemma, t)}</header>
  ${cards}
  ${renderSources(sources?.lemmas?.[lemma], t)}
</article>`;
}

export function renderAbout(dict, t) {
  const m = dict.meta;
  const c = m.counts;
  return `
<article class="card prose about">
  <h1>${esc(t.appTitle)}</h1>
  ${t.aboutHtml}
  <p class="muted">${esc(m.version)} · ${esc(t.stats(c))}</p>
  <p><a href="#/sources">${esc(t.aboutSourcesLink)}</a></p>
</article>`;
}

function referenceItemHtml(item, lang) {
  const meta = [item.by, item.year, item.license].map((v) => pick(v, lang)).filter(Boolean).map(esc).join(" · ");
  const links = (item.links ?? [])
    .map((l) => `<a href="${esc(l.url)}" ${EXTERNAL}>${esc(pick(l.label, lang))}</a>`)
    .join(" · ");
  return `
    <li>
      <a class="ref-title" href="${esc(item.url)}" ${EXTERNAL}>${esc(item.title)}</a>` +
    `${meta ? ` <span class="ref-meta">${meta}</span>` : ""}
      <p class="ref-note">${esc(pick(item.note, lang))}</p>
      ${links ? `<p class="ref-links">${links}</p>` : ""}
    </li>`;
}

/** The page #/sources: all sources and references, grouped by topic. All links are external. */
export function renderReferences(t, lang, groups = REFERENCE_GROUPS) {
  const body = groups.map((g) => {
    const sections = g.sections.map((s) => `
    ${s.title ? `<h3>${esc(pick(s.title, lang))}</h3>` : ""}
    <ul class="refs-list">${s.items.map((item) => referenceItemHtml(item, lang)).join("")}
    </ul>`).join("");
    return `
  <section class="refs-group" data-group="${esc(g.id)}">
    <h2>${esc(pick(g.title, lang))}</h2>
    <p class="refs-intro">${esc(pick(g.intro, lang))}</p>${sections}
  </section>`;
  }).join("");
  return `
<article class="card prose refs">
  <h1>${esc(t.refsTitle)}</h1>
  <p>${esc(t.refsIntro)}</p>${body}
</article>`;
}

export function renderNotFound(t) {
  return `<section class="card"><p>${esc(t.notFound)}</p><p><a href="#/">${esc(t.back)}</a></p></section>`;
}
