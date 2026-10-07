import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { LANGS, STRINGS } from "../js/i18n.js";
import {
  definitionTokens, esc, listHash, matchRank, normalize, parseRoute, pickLanguage, readingLabel, search, splitId,
} from "../js/logic.js";

const dict = JSON.parse(readFileSync(new URL("../data/dictionary.json", import.meta.url), "utf8"));

test("esc escapes HTML", () => {
  assert.equal(esc(`<a href="x">'&'</a>`), "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;");
  assert.equal(esc(undefined), "");
});

test("normalize removes diacritics and case", () => {
  assert.equal(normalize("  Canción ÄÖÜ "), "cancion aou");
});

test("splitId", () => {
  assert.deepEqual(splitId("wawa@2"), { lemma: "wawa", n: 2 });
  assert.equal(splitId("wawa"), null);
  assert.equal(splitId("Wawa@2"), null);
});

test("parseRoute and listHash", () => {
  assert.deepEqual(parseRoute(""), { view: "list", q: "", f: "all", s: "alpha" });
  assert.deepEqual(parseRoute("#/"), { view: "list", q: "", f: "all", s: "alpha" });
  assert.deepEqual(parseRoute("#/?q=s%C3%BC%C3%9F&f=prim&s=order"), { view: "list", q: "süß", f: "prim", s: "order" });
  assert.deepEqual(parseRoute("#/?f=nonsense"), { view: "list", q: "", f: "all", s: "alpha" });
  assert.deepEqual(parseRoute("#/w/wawa"), { view: "word", lemma: "wawa", reading: null });
  assert.deepEqual(parseRoute("#/w/wawa@2"), { view: "word", lemma: "wawa", reading: "wawa@2" });
  assert.deepEqual(parseRoute("#/about"), { view: "about" });
  assert.deepEqual(parseRoute("#/sources"), { view: "sources" });
  assert.equal(parseRoute("#/sources/x").view, "notfound");
  assert.equal(parseRoute("#/w/<x>").view, "notfound");
  assert.equal(parseRoute("#/elsewhere").view, "notfound");
  for (const r of [{ q: "", f: "all", s: "alpha" }, { q: "süß & mehr", f: "ku", s: "order" }]) {
    assert.deepEqual(parseRoute(listHash(r)), { view: "list", ...r });
  }
  assert.equal(listHash({}), "#/");
});

test("pickLanguage", () => {
  assert.equal(pickLanguage(["de-AT", "en"]), "de");
  assert.equal(pickLanguage(["fr", "es-MX"]), "es");
  assert.equal(pickLanguage(["fr"]), "en");
  assert.equal(pickLanguage(undefined), "en");
});

test("matchRank prefers exact lemma, then prefix, then gloss word", () => {
  assert.equal(matchRank("", "wawa", []), 0);
  assert.equal(matchRank("wawa", "wawa", []), 0);
  assert.equal(matchRank("wa", "wawa", []), 1);
  assert.equal(matchRank("strong", "wawa", ["strong, powerful"]), 2);
  assert.equal(matchRank("pow", "wawa", ["strong, powerful"]), 3);
  assert.equal(matchRank("xyz", "wawa", ["strong"]), Infinity);
});

test("search: counts by filter and sort", () => {
  assert.equal(search(dict, "en", {}).length, 137);
  assert.equal(search(dict, "en", { f: "prim" }).length, 53);
  assert.equal(search(dict, "en", { f: "def" }).length, 84);
  assert.equal(search(dict, "en", { f: "ku" }).length, 17);
  assert.equal(search(dict, "en", { f: "pu" }).length, 120);
  assert.equal(search(dict, "en", { s: "order" }).length, 220);
  assert.equal(search(dict, "en", { s: "order", f: "prim" }).length, 53);
  assert.equal(search(dict, "en", { s: "order", f: "def" }).length, 167);
});

test("search finds glosses in every language", () => {
  assert.equal(search(dict, "en", { q: "strong" })[0].lemma, "wawa");
  assert.equal(search(dict, "de", { q: "stark" })[0].lemma, "wawa");
  assert.equal(search(dict, "es", { q: "fuerte" })[0].lemma, "wawa");
  assert.equal(search(dict, "es", { q: "medicina" })[0].lemma, "misikeke");
  assert.equal(search(dict, "en", { q: "toki" })[0].lemma, "toki");
  const order = search(dict, "en", { s: "order", q: "energetic" });
  assert.equal(order[0].id, "wawa@2");
});

test("learning order lists primitives first and respects the Forth rule", () => {
  const ids = Object.keys(dict.readings).sort((a, b) => dict.readings[a].order - dict.readings[b].order);
  const position = Object.fromEntries(ids.map((id, i) => [id, i]));
  ids.slice(0, 53).forEach((id) => assert.ok(dict.readings[id].primitive, id));
  for (const id of ids) {
    for (const token of dict.readings[id].def ?? []) {
      if (/^[:;,.]$/.test(token)) continue;
      assert.ok(position[token] < position[id], `${id} uses ${token} before it is defined`);
    }
  }
});

test("readingLabel shows the number only for lemmas with several readings", () => {
  assert.deepEqual(readingLabel(dict, "wawa@2"), { lemma: "wawa", n: 2 });
  assert.deepEqual(readingLabel(dict, "kiwen@1"), { lemma: "kiwen", n: null });
  assert.deepEqual(readingLabel(dict, "pona@1"), { lemma: "pona", n: 1 });
});

test("definitionTokens resolve every word and mark primitives", () => {
  const tokens = definitionTokens(dict, dict.readings["wawa@3"]);
  assert.ok(tokens.some((t) => t.type === "word" && t.id === "wawa@1" && t.n === 1 && !t.primitive));
  assert.ok(tokens.some((t) => t.type === "word" && t.id === "pilin@1" && t.primitive));
  assert.ok(tokens.some((t) => t.type === "punct" && t.text === ":"));
});

test("i18n: all languages define the same keys", () => {
  const keys = (o) => Object.keys(o).sort();
  for (const lang of LANGS) assert.deepEqual(keys(STRINGS[lang]), keys(STRINGS.en), lang);
});
