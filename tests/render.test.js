import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { LANGS, strings } from "../js/i18n.js";
import { esc, search } from "../js/logic.js";
import { REFERENCE_GROUPS, pick } from "../js/references.js";
import {
  definitionHtml, renderAbout, renderFooter, renderHeader, renderListShell, renderReferences, renderResults,
  renderWord, tooltipHtml,
} from "../js/render.js";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const dict = read("../data/dictionary.json");
const sources = read("../data/sources.json");

test("data: the app data contains no expansions", () => {
  const forbidden = /expan|paren/i;
  for (const [id, r] of Object.entries(dict.readings)) {
    for (const key of Object.keys(r)) assert.ok(!forbidden.test(key), `${id}.${key}`);
    for (const token of r.def ?? []) {
      assert.ok(/^[:;,.]$/.test(token) || token in dict.readings, `${id}: ${token}`);
    }
  }
  const raw = readFileSync(new URL("../data/dictionary.json", import.meta.url), "utf8");
  assert.ok(!raw.includes('"("'), "no bracket tokens in the data");
});

test("data: consistency of lemmas, readings, back-references and glosses", () => {
  assert.equal(Object.keys(dict.lemmas).length, 137);
  assert.equal(Object.keys(dict.readings).length, 220);
  for (const [lemma, e] of Object.entries(dict.lemmas)) {
    assert.ok(e.readings.length >= 1, lemma);
    for (const id of e.readings) assert.equal(dict.readings[id].lemma, lemma);
    assert.ok(sources.lemmas[lemma], `sources for ${lemma}`);
  }
  for (const [id, r] of Object.entries(dict.readings)) {
    for (const lang of LANGS) assert.ok(r.gloss[lang], `${id} gloss ${lang}`);
    for (const user of r.usedBy) assert.ok(dict.readings[user].def.includes(id), `${user} uses ${id}`);
  }
});

test("definitionHtml links every word and shows no brackets", () => {
  for (const [id, r] of Object.entries(dict.readings)) {
    if (r.primitive) continue;
    const html = definitionHtml(dict, r);
    const words = r.def.filter((t) => !/^[:;,.]$/.test(t)).length;
    assert.equal((html.match(/<a class="tok/g) ?? []).length, words, id);
    const text = html.replace(/<[^>]+>/g, "");
    assert.ok(!/[()]/.test(text), `${id}: ${text}`);
  }
});

test("definitionHtml: superscript only for lemmas with several readings", () => {
  const html = definitionHtml(dict, dict.readings["wawa@3"]);
  assert.match(html, /href="#\/w\/wawa@1">wawa<sup>1<\/sup><\/a>/);
  assert.match(html, /class="tok prim" href="#\/w\/pilin@1">pilin<sup>1<\/sup><\/a>/);
  const kiwen = definitionHtml(dict, dict.readings["pan@1"]);
  assert.match(kiwen, />kiwen<\/a>/);
});

test("every word page renders in every language", () => {
  for (const lang of LANGS) {
    const t = strings(lang);
    for (const lemma of Object.keys(dict.lemmas)) {
      const html = renderWord(dict, sources, lang, t, lemma, dict.lemmas[lemma].readings.at(-1), "#/");
      assert.ok(html.includes(`<h1 lang="tok">${lemma}</h1>`), lemma);
      assert.ok(!html.includes("undefined"), `${lang} ${lemma}`);
      assert.ok(html.includes(t.sources), `${lang} ${lemma} sources`);
    }
  }
});

test("word page: primitives show their NSM prime, sources are attributed", () => {
  const t = strings("en");
  const html = renderWord(dict, sources, "en", t, "pona", null, "#/");
  assert.ok(html.includes("NSM prime"));
  assert.ok(html.includes("GOOD"));
  assert.ok(html.includes("CC BY-SA 4.0"));
  const fallback = renderWord(dict, sources, "en", t, "wawa", null, "#/");
  assert.ok(fallback.includes(t.linkuEnglish), "English fallback of Linku is labelled");
});

test("list, header, footer and about render", () => {
  for (const lang of LANGS) {
    const t = strings(lang);
    const route = { q: "", f: "all", s: "alpha" };
    assert.ok(renderListShell(t, route).includes('id="results"'));
    assert.ok(renderResults(dict, lang, t, search(dict, lang, route)).includes('href="#/w/wawa"'));
    assert.ok(renderResults(dict, lang, t, search(dict, lang, { ...route, s: "order" })).includes("wawa@2"));
    assert.ok(renderResults(dict, lang, t, []).includes(t.noResults));
    assert.ok(renderHeader(t, lang, "auto").includes(`data-lang="${lang}" aria-pressed="true"`));
    assert.ok(renderHeader(t, lang, "auto").includes('href="#/sources"'));
    assert.ok(renderFooter(t, dict.meta).includes(dict.meta.version));
    assert.ok(renderFooter(t, dict.meta).includes('href="#/sources"'));
    const about = renderAbout(dict, t);
    assert.ok(about.includes("Sonja Lang"));
    assert.ok(about.includes('href="#/sources"'));
    assert.ok(!about.includes("undefined"));
  }
});

test("tooltip: gloss in the current language first, the other languages below", () => {
  const r = dict.readings["wawa@2"];
  const en = tooltipHtml(dict, "wawa@2", "en", strings("en"));
  assert.match(en, /wawa<sup>2<\/sup>/);
  assert.ok(en.includes(strings("en").layer(r.layer)));
  const gloss = en.indexOf(`<div class="tip-gloss" lang="en">`);
  const other = en.indexOf(`<div class="tip-other">`);
  assert.ok(gloss >= 0 && other > gloss, "current language comes first");
  for (const lang of LANGS) assert.ok(en.includes(esc(r.gloss[lang])), lang);
  const de = tooltipHtml(dict, "wawa@2", "de", strings("de"));
  assert.ok(de.includes(`<div class="tip-gloss" lang="de">`));
  assert.ok(!de.includes(`<b>DE</b>`), "the current language is not repeated below");
  const prim = tooltipHtml(dict, "ijo@1", "en", strings("en"));
  assert.ok(prim.includes("tip-lemma prim"));
  assert.ok(prim.includes(strings("en").primitive));
  assert.ok(!/<sup>/.test(tooltipHtml(dict, "kiwen@1", "en", strings("en"))), "no number for single readings");
  assert.equal(tooltipHtml(dict, "nope@1", "en", strings("en")), "");
});

test("tooltip: every linked reading has a tooltip in every language", () => {
  const ids = new Set();
  for (const r of Object.values(dict.readings)) {
    for (const id of [...(r.def ?? []), ...r.usedBy]) if (!/^[:;,.]$/.test(id)) ids.add(id);
  }
  for (const lang of LANGS) {
    for (const id of ids) {
      const html = tooltipHtml(dict, id, lang, strings(lang));
      assert.ok(html && !html.includes("undefined"), `${lang} ${id}`);
    }
  }
});

test("word links carry no title attribute (the tooltip replaces it)", () => {
  const html = renderWord(dict, sources, "en", strings("en"), "wawa", null, "#/");
  assert.ok(!/<a class="tok[^"]*"[^>]*title=/.test(html));
});

test("references: complete data in every language", () => {
  const full = (v, what) => {
    if (typeof v === "string") return assert.ok(v.trim(), what);
    for (const lang of LANGS) assert.ok(v?.[lang]?.trim(), `${what} [${lang}]`);
  };
  assert.deepEqual(REFERENCE_GROUPS.map((g) => g.id), ["toki-pona", "layered", "forth"]);
  const urls = new Set();
  for (const g of REFERENCE_GROUPS) {
    full(g.title, `${g.id} title`);
    full(g.intro, `${g.id} intro`);
    for (const s of g.sections) {
      if (s.title !== null) full(s.title, `${g.id} section`);
      assert.ok(s.items.length, `${g.id}: empty section`);
      for (const item of s.items) {
        const what = `${g.id}: ${item.title}`;
        assert.ok(item.title, what);
        assert.match(item.url, /^https?:\/\/[^\s"<>]+$/, what);
        assert.ok(!urls.has(item.url), `${what}: duplicate url`);
        urls.add(item.url);
        full(item.note, `${what} note`);
        for (const key of ["by", "year", "license"]) if (item[key] != null) full(item[key], `${what} ${key}`);
        for (const link of item.links ?? []) {
          full(link.label, `${what} link`);
          assert.match(link.url, /^https?:\/\/[^\s"<>]+$/, `${what} link`);
        }
      }
    }
  }
  assert.equal(pick({ en: "a", de: "b" }, "es"), "a");
  assert.equal(pick("x", "de"), "x");
  assert.equal(pick(undefined, "de"), "");
});

test("references page renders in every language with the key sources", () => {
  for (const lang of LANGS) {
    const t = strings(lang);
    const html = renderReferences(t, lang);
    assert.ok(html.includes(`<h1>${t.refsTitle}</h1>`), lang);
    assert.ok(!html.includes("undefined"), lang);
    for (const g of REFERENCE_GROUPS) assert.ok(html.includes(`<h2>${pick(g.title, lang)}</h2>`), `${lang} ${g.id}`);
    for (const needle of ["nsm-approach.net", "forth", "tokipona.org/nimi_pu.txt", "linku.la", "learnthesewordsfirst.com"]) {
      assert.ok(html.includes(needle), `${lang}: ${needle}`);
    }
    const external = html.match(/<a [^>]*href="https?:/g) ?? [];
    assert.equal(external.length, (html.match(/rel="noopener noreferrer"/g) ?? []).length, "all links external-safe");
  }
});
