// UI strings in English, German and Spanish. Values are plain text unless the key ends in "Html"
// (those are trusted constants written here, never user input).

export const LANGS = ["en", "de", "es"];
export const LANG_NAMES = { en: "English", de: "Deutsch", es: "Español" };

const en = {
  appTitle: "toki pona bottom up dictionary",
  tagline: "Every word defined in Toki Pona, from a small set of primitives",
  unofficial: "Unofficial community project. Not by Sonja Lang and not Official Toki Pona.",
  navWords: "Words",
  navAbout: "About",
  navSources: "Sources",
  language: "Language",
  theme: { auto: "Theme: automatic", light: "Theme: light", dark: "Theme: dark" },
  searchLabel: "Search",
  searchPlaceholder: "toki pona word or translation…",
  filterLabel: "Show",
  filters: { all: "All", prim: "Primitives", def: "Defined", pu: "pu", ku: "ku suli" },
  sortLabel: "Order",
  sorts: { alpha: "A–Z", order: "Learning order" },
  count: (n) => (n === 1 ? "1 entry" : `${n} entries`),
  stats: (c) => `${c.lemmas} words · ${c.primitives} primitives · ${c.defined_readings} defined readings`,
  noResults: "Nothing found.",
  primitive: "primitive",
  primitiveLong: "Primitive: not defined, learned directly.",
  layer: (n) => `layer ${n}`,
  orderNo: (n) => `no. ${n}`,
  nsmPrime: "NSM prime",
  definition: "Definition",
  usedIn: "Used in",
  notUsed: "Not used in any definition yet.",
  otherLanguages: "Other languages",
  sources: "Sources",
  puWording: "pu (2014)",
  puVariant: (w) => `In pu printed as a variant of ${w}.`,
  kuGlosses: "ku (survey translations)",
  linku: "Linku",
  linkuEnglish: "No Toki Pona definition in Linku yet; English shown.",
  category: "category",
  usage: (pct, survey) => `${pct} % use (survey ${survey})`,
  links: "More",
  linkNames: { sona_pona: "sona pona wiki", lipamanka_semantic: "lipamanka's semantic dictionary" },
  sourcesNote: "Reference data from sona Linku, CC BY-SA 4.0. pu wording: public domain. ku data: CC0.",
  back: "← All words",
  notFound: "Not found.",
  loading: "Loading…",
  loadError: "The dictionary data could not be loaded.",
  refsTitle: "Sources and references",
  refsIntro: "Where the data and the method of this dictionary come from, grouped by topic. All links lead to " +
    "external websites.",
  aboutSourcesLink: "All sources and references: Toki Pona, NSM and layered dictionaries, Forth →",
  aboutHtml: `
<h2>What is this?</h2>
<p>A Toki Pona dictionary in which every word is defined <em>in Toki Pona</em>. A definition may only use
a small set of <strong>primitives</strong> and words that were defined before it, as in the programming
language Forth: a word is available once it has been defined. The primitives follow the semantic primes of
the Natural Semantic Metalanguage (NSM).</p>
<h2>How to read a definition</h2>
<ul>
<li>Words with several readings carry a number: <span class="tok">wawa<sup>2</sup></span> is the second reading of <em>wawa</em>.</li>
<li><span class="tok prim">Primitives</span> are highlighted. Every word links to its own entry. Point at a word
(or move to it with the Tab key) to see its translation.</li>
<li><strong>Layer</strong>: how many definition steps a reading is above the primitives (primitives are layer 0).</li>
<li><strong>Learning order</strong>: the order of the definitions. Everything a definition uses comes before it.</li>
</ul>
<h2>Status</h2>
<p>The dictionary is <strong>formally checked</strong>: no cycles, and every definition can be reduced to
primitives. It is <strong>not semantically verified</strong>: a definition can be well-formed and still miss
the meaning. The English and Spanish translations are AI-assisted and need review.</p>
<h2>Not official</h2>
<p>This is an independent community project. It is not by Sonja Lang (jan Sonja), the creator of Toki Pona,
and it is not part of Official Toki Pona.</p>
<h2>Licences</h2>
<p>Code and dictionary content: MIT licence. Reference data on the word pages: sona Linku (CC BY-SA 4.0), the
dictionary of pu (public domain), ku data (CC0). Details are in the files <code>LICENSE</code> and
<code>NOTICE.md</code> of the repository.</p>`,
};

const de = {
  appTitle: "toki pona bottom up dictionary",
  tagline: "Jedes Wort auf Toki Pona definiert, aus wenigen Grundwörtern",
  unofficial: "Inoffizielles Community-Projekt. Nicht von Sonja Lang und nicht Official Toki Pona.",
  navWords: "Wörter",
  navAbout: "Über",
  navSources: "Quellen",
  language: "Sprache",
  theme: { auto: "Design: automatisch", light: "Design: hell", dark: "Design: dunkel" },
  searchLabel: "Suche",
  searchPlaceholder: "Toki-Pona-Wort oder Übersetzung …",
  filterLabel: "Anzeigen",
  filters: { all: "Alle", prim: "Primitive", def: "Definierte", pu: "pu", ku: "ku suli" },
  sortLabel: "Reihenfolge",
  sorts: { alpha: "A–Z", order: "Lernreihenfolge" },
  count: (n) => (n === 1 ? "1 Eintrag" : `${n} Einträge`),
  stats: (c) => `${c.lemmas} Wörter · ${c.primitives} Primitive · ${c.defined_readings} definierte Lesarten`,
  noResults: "Nichts gefunden.",
  primitive: "Primitiv",
  primitiveLong: "Primitiv: nicht definiert, wird direkt gelernt.",
  layer: (n) => `Ebene ${n}`,
  orderNo: (n) => `Nr. ${n}`,
  nsmPrime: "NSM-Prime",
  definition: "Definition",
  usedIn: "Verwendet in",
  notUsed: "Noch in keiner Definition verwendet.",
  otherLanguages: "Andere Sprachen",
  sources: "Quellen",
  puWording: "pu (2014)",
  puVariant: (w) => `In pu als Variante von ${w} gedruckt.`,
  kuGlosses: "ku (Übersetzungen aus der Umfrage)",
  linku: "Linku",
  linkuEnglish: "Linku hat noch keine Definition auf Toki Pona; gezeigt wird die englische.",
  category: "Kategorie",
  usage: (pct, survey) => `${pct} % Verwendung (Umfrage ${survey})`,
  links: "Mehr",
  linkNames: { sona_pona: "sona-pona-Wiki", lipamanka_semantic: "Semantisches Wörterbuch von lipamanka" },
  sourcesNote: "Referenzdaten aus sona Linku, CC BY-SA 4.0. pu-Wortlaut: gemeinfrei. ku-Daten: CC0.",
  back: "← Alle Wörter",
  notFound: "Nicht gefunden.",
  loading: "Wird geladen …",
  loadError: "Die Wörterbuchdaten konnten nicht geladen werden.",
  refsTitle: "Quellen und Referenzen",
  refsIntro: "Woher die Daten und die Methode dieses Wörterbuchs stammen, nach Thema geordnet. Alle Links führen " +
    "zu externen Websites.",
  aboutSourcesLink: "Alle Quellen und Referenzen: Toki Pona, NSM und geschichtete Wörterbücher, Forth →",
  aboutHtml: `
<h2>Worum geht es?</h2>
<p>Ein Toki-Pona-Wörterbuch, in dem jedes Wort <em>auf Toki Pona</em> definiert ist. Eine Definition darf nur
wenige <strong>Primitive</strong> (Grundwörter) verwenden und Wörter, die schon vorher definiert wurden – wie in
der Programmiersprache Forth: Ein Wort ist verfügbar, sobald es definiert ist. Die Primitive orientieren sich
an den semantischen Primes der Natural Semantic Metalanguage (NSM).</p>
<h2>So liest man eine Definition</h2>
<ul>
<li>Wörter mit mehreren Lesarten tragen eine Zahl: <span class="tok">wawa<sup>2</sup></span> ist die zweite Lesart von <em>wawa</em>.</li>
<li><span class="tok prim">Primitive</span> sind hervorgehoben. Jedes Wort verweist auf seinen eigenen Eintrag. Zeigt man
auf ein Wort (oder springt mit der Tabulatortaste hin), erscheint seine Übersetzung.</li>
<li><strong>Ebene</strong>: wie viele Definitionsschritte eine Lesart über den Primitiven liegt (Primitive = Ebene 0).</li>
<li><strong>Lernreihenfolge</strong>: die Reihenfolge der Definitionen. Alles, was eine Definition verwendet, kommt vorher.</li>
</ul>
<h2>Stand</h2>
<p>Das Wörterbuch ist <strong>formal geprüft</strong>: keine Zyklen, und jede Definition lässt sich auf Primitive
zurückführen. Es ist <strong>nicht inhaltlich geprüft</strong>: Eine Definition kann formal korrekt sein und die
Bedeutung trotzdem verfehlen. Die englischen und spanischen Übersetzungen sind KI-gestützt und müssen noch
geprüft werden.</p>
<h2>Nicht offiziell</h2>
<p>Dies ist ein unabhängiges Community-Projekt. Es stammt nicht von Sonja Lang (jan Sonja), der Schöpferin von
Toki Pona, und gehört nicht zu Official Toki Pona.</p>
<h2>Lizenzen</h2>
<p>Code und Wörterbuchinhalte: MIT-Lizenz. Referenzdaten auf den Wortseiten: sona Linku (CC BY-SA 4.0), das
Wörterbuch aus pu (gemeinfrei), ku-Daten (CC0). Einzelheiten stehen in den Dateien <code>LICENSE</code> und
<code>NOTICE.md</code> des Repositorys.</p>`,
};

const es = {
  appTitle: "toki pona bottom up dictionary",
  tagline: "Cada palabra definida en toki pona, a partir de un pequeño conjunto de primitivas",
  unofficial: "Proyecto comunitario no oficial. No es de Sonja Lang ni forma parte de Official Toki Pona.",
  navWords: "Palabras",
  navAbout: "Acerca de",
  navSources: "Fuentes",
  language: "Idioma",
  theme: { auto: "Tema: automático", light: "Tema: claro", dark: "Tema: oscuro" },
  searchLabel: "Buscar",
  searchPlaceholder: "palabra de toki pona o traducción…",
  filterLabel: "Mostrar",
  filters: { all: "Todas", prim: "Primitivas", def: "Definidas", pu: "pu", ku: "ku suli" },
  sortLabel: "Orden",
  sorts: { alpha: "A–Z", order: "Orden de aprendizaje" },
  count: (n) => (n === 1 ? "1 entrada" : `${n} entradas`),
  stats: (c) => `${c.lemmas} palabras · ${c.primitives} primitivas · ${c.defined_readings} acepciones definidas`,
  noResults: "No se encontró nada.",
  primitive: "primitiva",
  primitiveLong: "Primitiva: no se define, se aprende directamente.",
  layer: (n) => `nivel ${n}`,
  orderNo: (n) => `n.º ${n}`,
  nsmPrime: "primo NSM",
  definition: "Definición",
  usedIn: "Se usa en",
  notUsed: "Todavía no se usa en ninguna definición.",
  otherLanguages: "Otros idiomas",
  sources: "Fuentes",
  puWording: "pu (2014)",
  puVariant: (w) => `En pu aparece como variante de ${w}.`,
  kuGlosses: "ku (traducciones de la encuesta)",
  linku: "Linku",
  linkuEnglish: "Linku aún no tiene una definición en toki pona; se muestra la inglesa.",
  category: "categoría",
  usage: (pct, survey) => `${pct} % de uso (encuesta ${survey})`,
  links: "Más",
  linkNames: { sona_pona: "wiki sona pona", lipamanka_semantic: "diccionario semántico de lipamanka" },
  sourcesNote: "Datos de referencia de sona Linku, CC BY-SA 4.0. Texto de pu: dominio público. Datos de ku: CC0.",
  back: "← Todas las palabras",
  notFound: "No encontrado.",
  loading: "Cargando…",
  loadError: "No se pudieron cargar los datos del diccionario.",
  refsTitle: "Fuentes y referencias",
  refsIntro: "De dónde vienen los datos y el método de este diccionario, ordenados por tema. Todos los enlaces " +
    "llevan a sitios web externos.",
  aboutSourcesLink: "Todas las fuentes y referencias: toki pona, NSM y diccionarios por capas, Forth →",
  aboutHtml: `
<h2>¿Qué es esto?</h2>
<p>Un diccionario de toki pona en el que cada palabra se define <em>en toki pona</em>. Una definición solo
puede usar un pequeño conjunto de <strong>primitivas</strong> y palabras definidas antes, como en el lenguaje
de programación Forth: una palabra está disponible en cuanto se ha definido. Las primitivas se basan en los
primos semánticos del Metalenguaje Semántico Natural (NSM).</p>
<h2>Cómo leer una definición</h2>
<ul>
<li>Las palabras con varias acepciones llevan un número: <span class="tok">wawa<sup>2</sup></span> es la segunda acepción de <em>wawa</em>.</li>
<li>Las <span class="tok prim">primitivas</span> aparecen resaltadas. Cada palabra enlaza con su propia entrada. Al
señalar una palabra (o llegar a ella con la tecla Tab) aparece su traducción.</li>
<li><strong>Nivel</strong>: cuántos pasos de definición hay entre una acepción y las primitivas (las primitivas son el nivel 0).</li>
<li><strong>Orden de aprendizaje</strong>: el orden de las definiciones. Todo lo que usa una definición aparece antes.</li>
</ul>
<h2>Estado</h2>
<p>El diccionario está <strong>comprobado formalmente</strong>: no hay ciclos y cada definición se puede reducir
a primitivas. <strong>No está verificado semánticamente</strong>: una definición puede ser correcta en la forma y
aun así no acertar el significado. Las traducciones al inglés y al español se hicieron con ayuda de IA y deben
revisarse.</p>
<h2>No oficial</h2>
<p>Este es un proyecto comunitario independiente. No es obra de Sonja Lang (jan Sonja), creadora de toki pona,
ni forma parte de Official Toki Pona.</p>
<h2>Licencias</h2>
<p>Código y contenido del diccionario: licencia MIT. Datos de referencia en las páginas de palabras: sona Linku
(CC BY-SA 4.0), el diccionario de pu (dominio público), datos de ku (CC0). Los detalles están en los archivos
<code>LICENSE</code> y <code>NOTICE.md</code> del repositorio.</p>`,
};

export const STRINGS = { en, de, es };

export function strings(lang) {
  return STRINGS[lang] ?? STRINGS.en;
}
