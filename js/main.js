// DOM glue: loading, routing, events. All HTML comes from render.js.

import { LANGS, strings } from "./i18n.js";
import { listHash, parseRoute, pickLanguage, search } from "./logic.js";
import * as R from "./render.js";

const THEMES = ["auto", "light", "dark"];

const store = {
  get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, value); } catch { /* private mode: ignore */ }
  },
};

const state = {
  lang: LANGS.includes(store.get("lang")) ? store.get("lang") : pickLanguage(navigator.languages),
  theme: THEMES.includes(store.get("theme")) ? store.get("theme") : "auto",
  dict: null,
  sources: null,
  lastList: "#/",
  lastView: null,
  listScroll: 0,
};

const $ = (selector) => document.querySelector(selector);
const main = $("#main");
const t = () => strings(state.lang);

function renderChrome() {
  document.documentElement.lang = state.lang;
  document.documentElement.dataset.theme = state.theme;
  $("#header").innerHTML = R.renderHeader(t(), state.lang, state.theme);
  $("#footer").innerHTML = R.renderFooter(t(), state.dict?.meta);
}

function markNav(view) {
  for (const a of document.querySelectorAll("[data-nav]")) {
    if (a.dataset.nav === view) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
}

function currentListRoute() {
  const route = parseRoute(location.hash);
  return route.view === "list" ? route : parseRoute(state.lastList);
}

function updateList(route) {
  const items = search(state.dict, state.lang, route);
  $("#results").innerHTML = R.renderResults(state.dict, state.lang, t(), items);
  $("#count").textContent = t().count(items.length);
  const input = $("#q");
  if (input && document.activeElement !== input && input.value !== route.q) input.value = route.q;
  for (const b of document.querySelectorAll("[data-filter]")) b.setAttribute("aria-pressed", b.dataset.filter === route.f);
  for (const b of document.querySelectorAll("[data-sort]")) b.setAttribute("aria-pressed", b.dataset.sort === route.s);
}

function setListRoute(change) {
  const route = { ...currentListRoute(), ...change };
  const hash = listHash(route);
  history.replaceState(null, "", hash || "#/");
  state.lastList = hash;
  updateList(route);
}

function render() {
  if (!state.dict) return;
  hideTip();
  const route = parseRoute(location.hash);
  markNav(route.view);
  if (state.lastView === "list" && route.view !== "list") state.listScroll = window.scrollY;

  if (route.view === "list") {
    state.lastList = location.hash || "#/";
    if (!main.querySelector(".list-view")) main.innerHTML = R.renderListShell(t(), route);
    updateList(route);
    document.title = t().appTitle;
    if (state.lastView && state.lastView !== "list") window.scrollTo(0, state.listScroll);
  } else if (route.view === "word" && state.dict.lemmas[route.lemma] &&
             (!route.reading || state.dict.readings[route.reading])) {
    main.innerHTML = R.renderWord(state.dict, state.sources, state.lang, t(), route.lemma, route.reading,
      state.lastList);
    document.title = `${route.lemma} – ${t().appTitle}`;
    const focus = route.reading && document.getElementById(`r-${route.reading}`);
    if (focus && state.dict.lemmas[route.lemma].readings.length > 1) focus.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  } else if (route.view === "about") {
    main.innerHTML = R.renderAbout(state.dict, t());
    document.title = `${t().navAbout} – ${t().appTitle}`;
    window.scrollTo(0, 0);
  } else if (route.view === "sources") {
    main.innerHTML = R.renderReferences(t(), state.lang);
    document.title = `${t().navSources} – ${t().appTitle}`;
    window.scrollTo(0, 0);
  } else {
    main.innerHTML = R.renderNotFound(t());
    document.title = t().appTitle;
  }
  state.lastView = route.view;
}

function rerenderAll() {
  renderChrome();
  main.innerHTML = "";
  state.lastView = null;
  render();
}

// ----------------------------------------------------------------- tooltip
// One shared tooltip for the word links (a.tok) in definitions and "used in" lists: shown on mouse/pen
// hover after a short delay and on keyboard focus, never on touch (a tap simply follows the link).
const tip = document.createElement("div");
tip.id = "tip";
tip.className = "tip";
tip.setAttribute("role", "tooltip");
tip.hidden = true;
document.body.append(tip);

const SHOW_DELAY = 200;
const HIDE_DELAY = 100;
const TIP_GAP = 6;
const TIP_MARGIN = 8;
// link: the link whose tooltip is visible. next: scheduled change (a link to show, null to hide,
// undefined for nothing scheduled).
const tipState = { link: null, next: undefined, timer: 0 };

function tipLink(element) {
  const link = element instanceof Element ? element.closest("a.tok") : null;
  return link && main.contains(link) ? link : null;
}

function cancelTip() {
  clearTimeout(tipState.timer);
  tipState.next = undefined;
}

function hideTip() {
  cancelTip();
  tipState.link?.removeAttribute("aria-describedby");
  tipState.link = null;
  tip.hidden = true;
}

function placeTip(link) {
  const anchor = link.getBoundingClientRect();
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight;
  tip.style.left = "0px";
  tip.style.top = "0px";
  const box = tip.getBoundingClientRect();
  let top = anchor.bottom + TIP_GAP;
  if (top + box.height > height - TIP_MARGIN && anchor.top - TIP_GAP - box.height >= TIP_MARGIN) {
    top = anchor.top - TIP_GAP - box.height;
  }
  const left = Math.max(TIP_MARGIN, Math.min(anchor.left, width - box.width - TIP_MARGIN));
  tip.style.left = `${Math.round(left)}px`;
  tip.style.top = `${Math.round(top)}px`;
}

function showTip(link) {
  cancelTip();
  const id = parseRoute(link.getAttribute("href")).reading;
  const html = id && state.dict ? R.tooltipHtml(state.dict, id, state.lang, t()) : "";
  if (!html) return hideTip();
  if (tipState.link !== link) tipState.link?.removeAttribute("aria-describedby");
  tip.innerHTML = html;
  tip.hidden = false;
  placeTip(link);
  link.setAttribute("aria-describedby", "tip");
  tipState.link = link;
}

function scheduleTip(next, delay) {
  clearTimeout(tipState.timer);
  tipState.next = next;
  tipState.timer = setTimeout(() => (next ? showTip(next) : hideTip()), delay);
}

document.addEventListener("pointerover", (event) => {
  if (event.pointerType === "touch") return;
  const link = tipLink(event.target);
  if (link) {
    if (link === tipState.link) cancelTip();             // back on the visible link (or its <sup>)
    else if (link === tipState.next) return;             // already scheduled
    else if (tipState.link) showTip(link);               // moving between words: switch at once
    else scheduleTip(link, SHOW_DELAY);
    return;
  }
  if (tipState.next) cancelTip();                        // left before the tooltip appeared
  if (tipState.link && tipState.next !== null) scheduleTip(null, HIDE_DELAY);
});

document.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget) hideTip();                   // the pointer left the window
});

document.addEventListener("focusin", (event) => {
  const link = tipLink(event.target);
  let keyboard = false;
  try { keyboard = Boolean(link?.matches(":focus-visible")); } catch { /* old browser: no tooltip on focus */ }
  if (keyboard) showTip(link);
});

document.addEventListener("focusout", (event) => {
  if (event.target === tipState.link) hideTip();
});

window.addEventListener("scroll", () => {
  // Keyboard focus scrolls the focused link into view: keep its tooltip and move it along.
  if (tipState.link && tipState.link === document.activeElement && !tipState.next) placeTip(tipState.link);
  else if (tipState.link || tipState.next) hideTip();
}, { passive: true });
window.addEventListener("resize", hideTip);

// ------------------------------------------------------------------ events
document.addEventListener("click", (event) => {
  const lang = event.target.closest("[data-lang]");
  if (lang) {
    state.lang = lang.dataset.lang;
    store.set("lang", state.lang);
    rerenderAll();
    return;
  }
  if (event.target.closest("[data-theme-toggle]")) {
    state.theme = THEMES[(THEMES.indexOf(state.theme) + 1) % THEMES.length];
    store.set("theme", state.theme);
    renderChrome();
    markNav(parseRoute(location.hash).view);
    return;
  }
  const filter = event.target.closest("[data-filter]");
  if (filter) return setListRoute({ f: filter.dataset.filter });
  const sort = event.target.closest("[data-sort]");
  if (sort) return setListRoute({ s: sort.dataset.sort });
});

document.addEventListener("input", (event) => {
  if (event.target.id === "q") setListRoute({ q: event.target.value });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideTip();
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName ?? "");
  if (event.key === "/" && !typing) {
    event.preventDefault();
    if (parseRoute(location.hash).view !== "list") location.hash = state.lastList || "#/";
    requestAnimationFrame(() => $("#q")?.focus());
  } else if (event.key === "Escape" && event.target.id === "q" && event.target.value) {
    event.target.value = "";
    setListRoute({ q: "" });
  }
});

window.addEventListener("hashchange", render);

// -------------------------------------------------------------------- start
async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

async function start() {
  renderChrome();
  main.innerHTML = `<p class="loading">${t().loading}</p>`;
  try {
    const [dict, sources] = await Promise.all([
      loadJson("./data/dictionary.json"),
      loadJson("./data/sources.json").catch(() => null),
    ]);
    state.dict = dict;
    state.sources = sources;
  } catch (error) {
    main.innerHTML = `<p class="card">${t().loadError}</p>`;
    console.error(error);
    return;
  }
  renderChrome();
  render();
}

start();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("service worker:", error));
  });
}
