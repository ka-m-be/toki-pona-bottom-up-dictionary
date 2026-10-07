// Pure helpers: no DOM access, so everything here can be tested with `node --test`.

export const FILTERS = ["all", "prim", "def", "pu", "ku"];
export const SORTS = ["alpha", "order"];

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** Lower case, without diacritics: "Canción" -> "cancion". */
export function normalize(text) {
  return String(text ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

/** "wawa@2" -> { lemma: "wawa", n: 2 }; anything else -> null. */
export function splitId(id) {
  const m = /^([a-z]+)@(\d+)$/.exec(id ?? "");
  return m ? { lemma: m[1], n: Number(m[2]) } : null;
}

export function isPunct(token) {
  return token === ":" || token === ";" || token === "," || token === ".";
}

/**
 * Routes:
 *   ""  "#/"  "#/?q=wawa&f=prim&s=order"  -> { view: "list", q, f, s }
 *   "#/w/wawa"                            -> { view: "word", lemma: "wawa", reading: null }
 *   "#/w/wawa@2"                          -> { view: "word", lemma: "wawa", reading: "wawa@2" }
 *   "#/about"                             -> { view: "about" }
 *   "#/sources"                           -> { view: "sources" }
 */
export function parseRoute(hash) {
  const h = String(hash ?? "").replace(/^#/, "");
  const [path, query = ""] = h.split("?");
  const parts = path.split("/").filter(Boolean).map(decodeURIComponent);
  if (parts[0] === "w" && parts[1]) {
    const id = splitId(parts[1]);
    if (id) return { view: "word", lemma: id.lemma, reading: parts[1] };
    if (/^[a-z]+$/.test(parts[1])) return { view: "word", lemma: parts[1], reading: null };
    return { view: "notfound" };
  }
  if (parts[0] === "about" && parts.length === 1) return { view: "about" };
  if (parts[0] === "sources" && parts.length === 1) return { view: "sources" };
  if (parts.length === 0) {
    const p = new URLSearchParams(query);
    const f = p.get("f");
    const s = p.get("s");
    return {
      view: "list",
      q: p.get("q") ?? "",
      f: FILTERS.includes(f) ? f : "all",
      s: SORTS.includes(s) ? s : "alpha",
    };
  }
  return { view: "notfound" };
}

export function listHash({ q = "", f = "all", s = "alpha" } = {}) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (f !== "all") p.set("f", f);
  if (s !== "alpha") p.set("s", s);
  const qs = p.toString();
  return qs ? `#/?${qs}` : "#/";
}

export function wordHash(idOrLemma) {
  return `#/w/${encodeURIComponent(idOrLemma).replace(/%40/g, "@")}`;
}

export function gloss(reading, lang) {
  const g = reading?.gloss ?? {};
  return g[lang] || g.en || g.de || g.es || "";
}

export function readingCount(dict, lemma) {
  return dict.lemmas[lemma]?.readings.length ?? 0;
}

/** Label parts of a reading: the number is only shown if the lemma has more than one reading. */
export function readingLabel(dict, id) {
  const s = splitId(id);
  if (!s) return { lemma: id, n: null };
  return { lemma: s.lemma, n: readingCount(dict, s.lemma) > 1 ? s.n : null };
}

/** Definition as display tokens. Only the definition itself; expansions are never produced here. */
export function definitionTokens(dict, reading) {
  return (reading.def ?? []).map((token) => {
    if (isPunct(token)) return { type: "punct", text: token };
    const r = dict.readings[token];
    const label = readingLabel(dict, token);
    return { type: "word", id: token, lemma: label.lemma, n: label.n, primitive: Boolean(r?.primitive) };
  });
}

function matchesFilter(dict, lemma, reading, f) {
  const entry = dict.lemmas[lemma];
  switch (f) {
    case "prim":
      return reading ? reading.primitive : entry.primitive;
    case "def":
      return reading ? !reading.primitive : !entry.primitive;
    case "pu":
      return entry.book === "pu";
    case "ku":
      return entry.book === "ku suli";
    default:
      return true;
  }
}

/** Rank of a match (lower is better), or Infinity if there is no match. */
export function matchRank(query, lemma, glosses) {
  const q = normalize(query);
  if (!q) return 0;
  if (lemma === q) return 0;
  if (lemma.startsWith(q)) return 1;
  const words = glosses.flatMap((g) => normalize(g).split(/[^a-z0-9]+/).filter(Boolean));
  if (words.includes(q)) return 2;
  if (words.some((w) => w.startsWith(q))) return 3;
  if (lemma.includes(q)) return 4;
  if (glosses.some((g) => normalize(g).includes(q))) return 5;
  return Infinity;
}

/**
 * Search and filter.
 *   s = "alpha": one item per lemma   { kind: "lemma", lemma, ids }
 *   s = "order": one item per reading { kind: "reading", id, lemma }  in learning (definition) order
 */
export function search(dict, lang, { q = "", f = "all", s = "alpha" } = {}) {
  const items = [];
  if (s === "order") {
    const ids = Object.keys(dict.readings).sort((a, b) => dict.readings[a].order - dict.readings[b].order);
    for (const id of ids) {
      const r = dict.readings[id];
      if (!matchesFilter(dict, r.lemma, r, f)) continue;
      const rank = matchRank(q, r.lemma, [gloss(r, lang)]);
      if (rank !== Infinity) items.push({ kind: "reading", id, lemma: r.lemma, rank, order: r.order });
    }
    if (q) items.sort((a, b) => a.rank - b.rank || a.order - b.order);
    return items;
  }
  for (const lemma of Object.keys(dict.lemmas).sort()) {
    if (!matchesFilter(dict, lemma, null, f)) continue;
    const ids = dict.lemmas[lemma].readings;
    const rank = matchRank(q, lemma, ids.map((id) => gloss(dict.readings[id], lang)));
    if (rank !== Infinity) items.push({ kind: "lemma", lemma, ids, rank });
  }
  if (q) items.sort((a, b) => a.rank - b.rank || a.lemma.localeCompare(b.lemma));
  return items;
}

/** Preferred UI language from a list like navigator.languages. */
export function pickLanguage(preferred, supported = ["en", "de", "es"]) {
  for (const tag of preferred ?? []) {
    const base = String(tag).toLowerCase().split("-")[0];
    if (supported.includes(base)) return base;
  }
  return "en";
}
