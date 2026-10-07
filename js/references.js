// Sources and references shown on the page #/sources. Plain data, no HTML: every value is escaped when
// rendered. Text fields are either a string (same in every language) or an object { en, de, es }.
// Titles of works stay in their original language.

const PD = { en: "public domain", de: "gemeinfrei", es: "dominio público" };

export const REFERENCE_GROUPS = [
  {
    id: "toki-pona",
    title: { en: "Toki Pona", de: "Toki Pona", es: "Toki Pona" },
    intro: {
      en: "Where the meanings and the reference data come from. pu and ku are by Sonja Lang; Linku is the " +
        "community dictionary and has the same rank as ku in this project.",
      de: "Woher die Bedeutungen und die Referenzdaten stammen. pu und ku sind von Sonja Lang; Linku ist das " +
        "Community-Wörterbuch und hat in diesem Projekt denselben Rang wie ku.",
      es: "De dónde vienen los significados y los datos de referencia. pu y ku son de Sonja Lang; Linku es el " +
        "diccionario de la comunidad y en este proyecto tiene el mismo rango que ku.",
    },
    sections: [
      {
        title: { en: "Sources of meaning and data", de: "Quellen für Bedeutungen und Daten", es: "Fuentes de significados y datos" },
        items: [
          {
            title: "Toki Pona: The Language of Good (pu)",
            by: "Sonja Lang",
            year: "2014",
            license: PD,
            url: "https://sona.pona.la/wiki/Toki_Pona:_The_Language_of_Good",
            note: {
              en: "The original book. Its dictionary (pp. 125–134) has been in the public domain since 2014; in 2026 " +
                "Sonja Lang declared the whole 2014 English edition public domain. The “pu (2014)” wording on the " +
                "word pages comes from it.",
              de: "Das Originalbuch. Sein Wörterbuch (S. 125–134) ist seit 2014 gemeinfrei; 2026 hat Sonja Lang die " +
                "gesamte englische Ausgabe von 2014 für gemeinfrei erklärt. Der Wortlaut „pu (2014)“ auf den " +
                "Wortseiten stammt daraus.",
              es: "El libro original. Su diccionario (págs. 125–134) es de dominio público desde 2014; en 2026 Sonja " +
                "Lang declaró de dominio público toda la edición inglesa de 2014. El texto «pu (2014)» de las " +
                "páginas de palabras procede de él.",
            },
            links: [
              {
                label: { en: "Official Toki Pona Dictionary (transcription)", de: "Official Toki Pona Dictionary (Abschrift)", es: "Official Toki Pona Dictionary (transcripción)" },
                url: "https://sona.pona.la/wiki/Source:Toki_Pona:_The_Language_of_Good/Official_Toki_Pona_Dictionary",
              },
              {
                label: { en: "Public-domain declaration, 2026-04-14", de: "Gemeinfreiheitserklärung vom 14.04.2026", es: "Declaración de dominio público, 14-04-2026" },
                url: "https://x.com/tokipona/status/2043869843997299173",
              },
            ],
          },
          {
            title: "Toki Pona Dictionary (ku)",
            by: "Sonja Lang",
            year: "2021",
            license: { en: "CC0 (except the cover and pp. 393–402)", de: "CC0 (außer Umschlag und S. 393–402)", es: "CC0 (salvo la cubierta y las págs. 393–402)" },
            url: "https://commons.wikimedia.org/wiki/File:Toki_Pona_Dictionary.pdf",
            note: {
              en: "The dictionary based on community surveys, released under CC0 on 2026-01-12. The survey " +
                "translations with percentages on the word pages come from it. Treated as authoritative, like Linku.",
              de: "Das Wörterbuch auf Grundlage von Community-Umfragen, seit 12.01.2026 unter CC0. Die " +
                "Umfrage-Übersetzungen mit Prozentangaben auf den Wortseiten stammen daraus. Gilt wie Linku als maßgeblich.",
              es: "El diccionario basado en encuestas a la comunidad, publicado bajo CC0 el 12-01-2026. Las " +
                "traducciones de la encuesta con porcentajes de las páginas de palabras proceden de él. Se considera " +
                "autoritativo, igual que Linku.",
            },
            links: [
              { label: "sona pona: Toki Pona Dictionary", url: "https://sona.pona.la/wiki/Toki_Pona_Dictionary" },
              { label: "sona pona: nimi ku", url: "https://sona.pona.la/wiki/nimi_ku" },
            ],
          },
          {
            title: "nimi_pu.txt",
            by: "Sonja Lang",
            year: "2021",
            url: "https://tokipona.org/nimi_pu.txt",
            note: {
              en: "The ku data as a text file on tokipona.org (last updated 2021-05-04). The file asks projects that " +
                "use it for a link back; this is that link.",
              de: "Die ku-Daten als Textdatei auf tokipona.org (zuletzt aktualisiert am 04.05.2021). Die Datei bittet " +
                "Projekte, die sie verwenden, um einen Link zurück; dies ist dieser Link.",
              es: "Los datos de ku como archivo de texto en tokipona.org (última actualización: 04-05-2021). El " +
                "archivo pide a los proyectos que lo usan un enlace de vuelta; este es ese enlace.",
            },
          },
          {
            title: "lipu Linku / sona Linku",
            by: { en: "Linku contributors", de: "Linku-Mitwirkende", es: "colaboradores de Linku" },
            license: "CC BY-SA 4.0",
            url: "https://linku.la",
            note: {
              en: "The community dictionary of Toki Pona, with yearly usage surveys. Treated as authoritative, like " +
                "ku. The reference block on every word page (category, usage, Linku definition, links) is taken from " +
                "the API v1 (retrieved October 2026) and is shared under CC BY-SA 4.0.",
              de: "Das Community-Wörterbuch von Toki Pona mit jährlichen Nutzungsumfragen. Gilt wie ku als " +
                "maßgeblich. Der Referenzblock auf jeder Wortseite (Kategorie, Verwendung, Linku-Definition, Links) " +
                "stammt aus der API v1 (abgerufen im Oktober 2026) und steht unter CC BY-SA 4.0.",
              es: "El diccionario comunitario de toki pona, con encuestas anuales de uso. Se considera autoritativo, " +
                "igual que ku. El bloque de referencia de cada página de palabra (categoría, uso, definición de " +
                "Linku, enlaces) procede de la API v1 (consultada en octubre de 2026) y se comparte bajo CC BY-SA 4.0.",
            },
            links: [
              { label: "lipu-linku/sona (GitHub)", url: "https://github.com/lipu-linku/sona" },
              { label: "API v1", url: "https://api.linku.la/v1/words?lang=tok" },
              { label: { en: "About Linku", de: "Über Linku", es: "Acerca de Linku" }, url: "https://linku.la/about" },
              { label: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/" },
            ],
          },
          {
            title: "toki_pona_dictionary (dictionary.yml)",
            by: "Sascha Rechenberger",
            year: "2019",
            license: "BSD-3-Clause",
            url: "https://github.com/SRechenberger/toki_pona_dictionary",
            note: {
              en: "A YAML transcription of the pu dictionary. Used to build the list of the 120 pu words; not " +
                "included in this app.",
              de: "Eine YAML-Abschrift des pu-Wörterbuchs. Diente zum Aufbau der Liste der 120 pu-Wörter; nicht in " +
                "dieser App enthalten.",
              es: "Una transcripción en YAML del diccionario de pu. Se usó para construir la lista de las 120 palabras " +
                "de pu; no está incluida en esta aplicación.",
            },
          },
        ],
      },
      {
        title: { en: "Further resources", de: "Weitere Ressourcen", es: "Otros recursos" },
        items: [
          {
            title: "tokipona.org",
            by: "Sonja Lang",
            url: "https://tokipona.org/",
            note: {
              en: "The official website of Toki Pona. Sonja Lang asks third-party projects to make clear that they " +
                "are not official; this app says so on every page.",
              de: "Die offizielle Website von Toki Pona. Sonja Lang bittet Projekte Dritter, deutlich zu machen, dass " +
                "sie nicht offiziell sind; diese App sagt das auf jeder Seite.",
              es: "El sitio web oficial de toki pona. Sonja Lang pide a los proyectos de terceros que dejen claro que " +
                "no son oficiales; esta aplicación lo indica en cada página.",
            },
            links: [{ label: "tokipona.org/creator", url: "https://tokipona.org/creator" }],
          },
          {
            title: "Lipamanka's Semantic Dictionary",
            by: "lipamanka",
            license: "CC BY-NC-SA 4.0",
            url: "https://lipamanka.gay/essays/dictionary",
            note: {
              en: "Detailed descriptions of the semantic space of each word. Only linked from the word pages; " +
                "nothing is copied.",
              de: "Ausführliche Beschreibungen des Bedeutungsraums jedes Wortes. Wird auf den Wortseiten nur " +
                "verlinkt; nichts davon ist kopiert.",
              es: "Descripciones detalladas del espacio semántico de cada palabra. Solo se enlaza desde las páginas " +
                "de palabras; no se copia nada.",
            },
          },
          {
            title: "sona pona",
            by: { en: "sona pona contributors", de: "sona-pona-Mitwirkende", es: "colaboradores de sona pona" },
            license: { en: "CC BY-SA 3.0 or later", de: "CC BY-SA 3.0 oder später", es: "CC BY-SA 3.0 o posterior" },
            url: "https://sona.pona.la/",
            note: {
              en: "The community's reference wiki. Its articles on particles, content words and usage categories " +
                "were background reading for this project. Only linked; nothing is copied.",
              de: "Das Referenz-Wiki der Community. Seine Artikel über Partikeln, Inhaltswörter und " +
                "Nutzungskategorien waren Hintergrundlektüre für dieses Projekt. Nur verlinkt; nichts kopiert.",
              es: "La wiki de referencia de la comunidad. Sus artículos sobre partículas, palabras de contenido y " +
                "categorías de uso fueron lectura de fondo para este proyecto. Solo se enlaza; no se copia nada.",
            },
            links: [
              { label: "Particles", url: "https://sona.pona.la/wiki/Particles" },
              { label: "Content words", url: "https://sona.pona.la/wiki/Content_words" },
              { label: "Usage categories", url: "https://sona.pona.la/wiki/Usage_categories" },
            ],
          },
          {
            title: "tuki tiki",
            by: "ka Tumu",
            year: "2020",
            url: "https://sona.pona.la/wiki/tuki_tiki",
            note: {
              en: "A minimalist offshoot of Toki Pona with 39 words. It goes the other way: instead of defining " +
                "words from primitives, it widens the meanings of fewer words. A useful counter-model.",
              de: "Ein minimalistischer Ableger von Toki Pona mit 39 Wörtern. Er geht den umgekehrten Weg: Statt " +
                "Wörter aus Primitiven zu definieren, erweitert er die Bedeutungen weniger Wörter. Ein nützliches " +
                "Gegenmodell.",
              es: "Una variante minimalista de toki pona con 39 palabras. Sigue el camino contrario: en lugar de " +
                "definir palabras a partir de primitivas, amplía los significados de menos palabras. Un contramodelo útil.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "layered",
    title: {
      en: "Layered dictionaries and primitives",
      de: "Geschichtete Wörterbücher und Primitive",
      es: "Diccionarios por capas y primitivas",
    },
    intro: {
      en: "The method: a small set of primitives, every other word defined from words that come before it, and " +
        "a check that no definition is circular.",
      de: "Die Methode: wenige Primitive, jedes andere Wort aus Wörtern definiert, die vor ihm stehen, und eine " +
        "Prüfung, dass keine Definition zirkulär ist.",
      es: "El método: un pequeño conjunto de primitivas, cada palabra definida a partir de palabras anteriores y " +
        "una comprobación de que ninguna definición es circular.",
    },
    sections: [
      {
        title: { en: "Natural Semantic Metalanguage (NSM)", de: "Natural Semantic Metalanguage (NSM)", es: "Metalenguaje Semántico Natural (NSM)" },
        items: [
          {
            title: "NSM approach (nsm-approach.net)",
            url: "https://nsm-approach.net/",
            note: {
              en: "Home of the Natural Semantic Metalanguage by Anna Wierzbicka, Cliff Goddard and colleagues: 65 " +
                "semantic primes that are claimed to exist in all languages. The 53 primitives of this dictionary " +
                "are mapped to NSM primes; grammar particles are marked STRUCTURE.",
              de: "Startseite der Natural Semantic Metalanguage von Anna Wierzbicka, Cliff Goddard und anderen: 65 " +
                "semantische Primes, die es in allen Sprachen geben soll. Die 53 Primitive dieses Wörterbuchs sind " +
                "NSM-Primes zugeordnet; Grammatikpartikeln sind als STRUCTURE markiert.",
              es: "Sitio del Metalenguaje Semántico Natural de Anna Wierzbicka, Cliff Goddard y otros: 65 primos " +
                "semánticos que existirían en todas las lenguas. Las 53 primitivas de este diccionario se asignan a " +
                "primos del NSM; las partículas gramaticales se marcan como STRUCTURE.",
            },
            links: [{ label: { en: "Resources", de: "Materialien", es: "Recursos" }, url: "https://nsm-approach.net/resources" }],
          },
          {
            title: "Chart of NSM Semantic Primes (v20)",
            year: "2022",
            url: "https://nsm-approach.net/wp-content/uploads/2022/05/Chart-of-NSM-Semantic-Primes_English_v20_May-2022.pdf",
            note: {
              en: "The 65 primes in English, with tables of the primes in German and Spanish.",
              de: "Die 65 Primes auf Englisch, dazu Tabellen der Primes auf Deutsch und Spanisch.",
              es: "Los 65 primos en inglés, con tablas de los primos en alemán y en español.",
            },
            links: [
              {
                label: { en: "German table (DOCX)", de: "Deutsche Tabelle (DOCX)", es: "Tabla en alemán (DOCX)" },
                url: "https://nsm-approach.net/wp-content/uploads/2021/10/German_Table_Primes.docx",
              },
              {
                label: { en: "Spanish table (DOCX)", de: "Spanische Tabelle (DOCX)", es: "Tabla en español (DOCX)" },
                url: "https://nsm-approach.net/wp-content/uploads/2021/10/Spanish_Table_Primes.docx",
              },
            ],
          },
          {
            title: "‘Semantic Primitives’, fifty years later",
            by: "Anna Wierzbicka",
            year: "2021",
            url: "https://journals.rudn.ru/linguistics/article/view/26795/19501",
            note: {
              en: "Russian Journal of Linguistics 25(2): 317–342, open access. How the set of primes grew to 65, and why.",
              de: "Russian Journal of Linguistics 25(2): 317–342, frei zugänglich. Wie die Menge der Primes auf 65 " +
                "anwuchs und warum.",
              es: "Russian Journal of Linguistics 25(2): 317–342, de acceso abierto. Cómo creció el conjunto de " +
                "primos hasta 65 y por qué.",
            },
          },
          {
            title: "The Natural Semantic Metalanguage approach",
            by: "Cliff Goddard",
            year: "2010",
            url: "https://web.archive.org/web/20140605051950/http://www.griffith.edu.au/__data/assets/pdf_file/0006/419064/Goddard_2010_OUP_Handbook_Ch18.pdf",
            note: {
              en: "Chapter 18 of The Oxford Handbook of Linguistic Analysis. An overview of the method (archived copy).",
              de: "Kapitel 18 des Oxford Handbook of Linguistic Analysis. Ein Überblick über die Methode (archivierte Kopie).",
              es: "Capítulo 18 de The Oxford Handbook of Linguistic Analysis. Una visión general del método (copia archivada).",
            },
          },
          {
            title: "Semantic molecules",
            by: "Cliff Goddard",
            year: "2007",
            url: "https://web.archive.org/web/20120203071907/http://espace.library.uq.edu.au/eserv/UQ:12798/Goddard_C_ALS2006.pdf",
            note: {
              en: "Proceedings of the 2006 Conference of the Australian Linguistic Society (archived copy). Complex " +
                "meanings built from primes that then serve as building blocks themselves, like the defined words of " +
                "this dictionary.",
              de: "Tagungsband der Konferenz der Australian Linguistic Society 2006 (archivierte Kopie). Komplexe " +
                "Bedeutungen, die aus Primes gebaut sind und dann selbst als Bausteine dienen, wie die definierten " +
                "Wörter dieses Wörterbuchs.",
              es: "Actas del congreso de 2006 de la Australian Linguistic Society (copia archivada). Significados " +
                "complejos construidos a partir de primos que luego sirven a su vez como piezas, como las palabras " +
                "definidas de este diccionario.",
            },
          },
          {
            title: "In Praise of Minimal Languages",
            by: "Cliff Goddard",
            year: "2021",
            url: "https://research-repository.griffith.edu.au/items/0308ee5a-43bd-44f5-b237-4117ba4329b8",
            note: {
              en: "Chapter 1 of Minimal Languages in Action (Palgrave); accepted manuscript.",
              de: "Kapitel 1 von Minimal Languages in Action (Palgrave); akzeptiertes Manuskript.",
              es: "Capítulo 1 de Minimal Languages in Action (Palgrave); manuscrito aceptado.",
            },
          },
          {
            title: "Natural Semantic Metalanguage and Toki Pona",
            by: "Daniel K. Lyons",
            year: "2017",
            url: "https://web.archive.org/web/20190917194319/http://www.storytotell.org/post/natural-semantic-metalanguage-and-toki-pona/",
            note: {
              en: "A blog post with an informal mapping of Toki Pona words onto the NSM primes (archived copy).",
              de: "Ein Blogbeitrag mit einer informellen Zuordnung von Toki-Pona-Wörtern zu den NSM-Primes " +
                "(archivierte Kopie).",
              es: "Una entrada de blog con una correspondencia informal entre palabras de toki pona y los primos del " +
                "NSM (copia archivada).",
            },
          },
          {
            title: "Natural semantic metalanguage",
            by: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Natural_semantic_metalanguage",
            note: {
              en: "Encyclopedia overview. The sona pona wiki has its own article on NSM.",
              de: "Lexikonartikel. Das sona-pona-Wiki hat einen eigenen Artikel über NSM.",
              es: "Artículo enciclopédico. La wiki sona pona tiene su propio artículo sobre el NSM.",
            },
            links: [{ label: "sona pona: Natural semantic metalanguage", url: "https://sona.pona.la/wiki/Natural_semantic_metalanguage" }],
          },
        ],
      },
      {
        title: {
          en: "Layered dictionaries and defining vocabularies",
          de: "Geschichtete Wörterbücher und Definitionswortschätze",
          es: "Diccionarios por capas y vocabularios de definición",
        },
        items: [
          {
            title: "Learn These Words First",
            by: "David Bullock",
            year: "2014",
            url: "https://learnthesewordsfirst.com/",
            note: {
              en: "The closest model for this project: a multi-layer dictionary of English. 61 primes taught with " +
                "pictures, about 300 “molecules”, then the 2,000 words of the Longman Defining Vocabulary. A program " +
                "checks that no word is used before it is defined.",
              de: "Das nächste Vorbild für dieses Projekt: ein mehrschichtiges Wörterbuch des Englischen. 61 Primes, " +
                "mit Bildern vermittelt, etwa 300 „Moleküle“, dann die 2000 Wörter des Longman Defining Vocabulary. " +
                "Ein Programm prüft, dass kein Wort benutzt wird, bevor es definiert ist.",
              es: "El modelo más cercano a este proyecto: un diccionario del inglés por capas. 61 primos enseñados " +
                "con imágenes, unas 300 «moléculas» y luego las 2000 palabras del Longman Defining Vocabulary. Un " +
                "programa comprueba que ninguna palabra se use antes de estar definida.",
            },
            links: [
              {
                label: { en: "What is a multi-layer dictionary?", de: "Was ist ein mehrschichtiges Wörterbuch?", es: "¿Qué es un diccionario por capas?" },
                url: "https://learnthesewordsfirst.com/about/what-is-a-multi-layer-dictionary.html",
              },
              {
                label: { en: "Research behind the dictionary", de: "Forschung hinter dem Wörterbuch", es: "Investigación detrás del diccionario" },
                url: "https://learnthesewordsfirst.com/about/research-behind-the-dictionary.html",
              },
              {
                label: { en: "Non-circularity checker", de: "Prüfprogramm für Zirkularität", es: "Comprobador de circularidad" },
                url: "https://learnthesewordsfirst.com/tools/CheckNonCircular.html",
              },
            ],
          },
          {
            title: "NSM + LDOCE: A Non-Circular Dictionary of English",
            by: "David Bullock",
            year: "2011",
            url: "https://nsm-approach.net/archives/537",
            note: {
              en: "International Journal of Lexicography 24(2): 226–240. The article behind Learn These Words First " +
                "(entry on nsm-approach.net).",
              de: "International Journal of Lexicography 24(2): 226–240. Der Artikel hinter Learn These Words First " +
                "(Eintrag auf nsm-approach.net).",
              es: "International Journal of Lexicography 24(2): 226–240. El artículo detrás de Learn These Words " +
                "First (entrada en nsm-approach.net).",
            },
          },
          {
            title: "Defining vocabulary",
            by: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Defining_vocabulary",
            note: {
              en: "Overview of the controlled vocabularies in which learners' dictionaries write their definitions, " +
                "such as the Longman Defining Vocabulary.",
              de: "Überblick über die kontrollierten Wortschätze, in denen Lernerwörterbücher ihre Definitionen " +
                "schreiben, etwa das Longman Defining Vocabulary.",
              es: "Panorama de los vocabularios controlados con los que los diccionarios para estudiantes escriben " +
                "sus definiciones, como el Longman Defining Vocabulary.",
            },
          },
          {
            title: "Basic English",
            by: "Wikipedia",
            url: "https://en.wikipedia.org/wiki/Basic_English",
            note: {
              en: "C. K. Ogden's English with 850 words (1930). Model and warning at once: the real number of senses " +
                "is much larger than the number of words. This dictionary therefore counts readings, not words.",
              de: "C. K. Ogdens Englisch mit 850 Wörtern (1930). Vorbild und Warnung zugleich: Die tatsächliche Zahl " +
                "der Bedeutungen ist viel größer als die Zahl der Wörter. Dieses Wörterbuch zählt deshalb Lesarten, " +
                "nicht Wörter.",
              es: "El inglés de C. K. Ogden con 850 palabras (1930). Modelo y advertencia a la vez: el número real de " +
                "acepciones es mucho mayor que el de palabras. Por eso este diccionario cuenta acepciones, no palabras.",
            },
          },
          {
            title: "More than one Way to Skin a Cat: Why Full-Sentence Definitions Have not been Universally Adopted",
            by: "Michael Rundell",
            year: "2006",
            url: "https://euralex.org/elx_proceedings/Euralex2006/040_2006_V1_Michael%20RUNDELL_More%20than%20one%20Way%20to%20Skin%20a%20Cat_Why%20Full_Sentence%20Definitions%20Have%20not%20been.pdf",
            note: {
              en: "EURALEX 2006 proceedings. On full-sentence definitions and their cost in length, which matters " +
                "here because paraphrases in Toki Pona are long anyway.",
              de: "Tagungsband EURALEX 2006. Über Definitionen in ganzen Sätzen und ihren Preis an Länge; wichtig, " +
                "weil Umschreibungen auf Toki Pona ohnehin lang sind.",
              es: "Actas de EURALEX 2006. Sobre las definiciones en oraciones completas y su coste en longitud, algo " +
                "importante aquí porque las paráfrasis en toki pona ya son largas.",
            },
          },
        ],
      },
      {
        title: {
          en: "Dictionary graphs and grounding sets",
          de: "Wörterbuch-Graphen und Grounding-Sets",
          es: "Grafos de diccionarios y conjuntos de anclaje",
        },
        items: [
          {
            title: "How Is Meaning Grounded in Dictionary Definitions?",
            by: "Blondin Massé et al.",
            year: "2008",
            url: "https://arxiv.org/abs/0806.3710",
            note: {
              en: "TextGraphs-3 (COLING 2008). Treats a dictionary as a graph. A grounding set is a set of words from " +
                "which all other words can be defined; finding a smallest one is the feedback vertex set problem.",
              de: "TextGraphs-3 (COLING 2008). Behandelt ein Wörterbuch als Graphen. Ein Grounding-Set ist eine " +
                "Menge von Wörtern, aus der sich alle anderen definieren lassen; ein kleinstes zu finden ist das " +
                "Feedback-Vertex-Set-Problem.",
              es: "TextGraphs-3 (COLING 2008). Trata un diccionario como un grafo. Un conjunto de anclaje es un " +
                "conjunto de palabras a partir del cual se pueden definir todas las demás; encontrar uno mínimo es el " +
                "problema del conjunto de vértices de retroalimentación (feedback vertex set).",
            },
          },
          {
            title: "Hierarchies in Dictionary Definition Space",
            by: "Picard et al.",
            year: "2009",
            url: "https://arxiv.org/abs/0911.5703",
            note: {
              en: "Workshop paper (NIPS 2009) on the layered structure of dictionary graphs.",
              de: "Workshop-Beitrag (NIPS 2009) über die Schichtstruktur von Wörterbuch-Graphen.",
              es: "Contribución a un taller (NIPS 2009) sobre la estructura por capas de los grafos de diccionarios.",
            },
          },
          {
            title: "Hidden Structure and Function in the Lexicon",
            by: "Picard et al.",
            year: "2013",
            url: "https://arxiv.org/abs/1308.2428",
            note: {
              en: "The kernel of a dictionary, about 10 % of its words, is itself a grounding set: all other words " +
                "can be defined from it.",
              de: "Der Kern eines Wörterbuchs, etwa 10 % seiner Wörter, ist selbst ein Grounding-Set: Alle anderen " +
                "Wörter lassen sich daraus definieren.",
              es: "El núcleo de un diccionario, alrededor del 10 % de sus palabras, es en sí un conjunto de anclaje: " +
                "todas las demás palabras se pueden definir a partir de él.",
            },
          },
          {
            title: "The Latent Structure of Dictionaries",
            by: "Vincent-Lamarre et al.",
            year: "2016",
            url: "https://arxiv.org/abs/1411.0129",
            note: {
              en: "Topics in Cognitive Science 8(3): 625–659. Words in the kernel and its core are, on average, more " +
                "frequent and learned earlier than the rest of the dictionary.",
              de: "Topics in Cognitive Science 8(3): 625–659. Wörter im Kern und in dessen Core sind im Mittel " +
                "häufiger und werden früher gelernt als der Rest des Wörterbuchs.",
              es: "Topics in Cognitive Science 8(3): 625–659. Las palabras del núcleo y de su core son, de media, más " +
                "frecuentes y se aprenden antes que el resto del diccionario.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "forth",
    title: { en: "Ideas from Forth", de: "Ideen aus Forth", es: "Ideas de Forth" },
    intro: {
      en: "Where the rule “define before use” comes from. In Forth a program is a dictionary: a few primitives " +
        "are built in, and every new word is defined from words that already exist.",
      de: "Woher die Regel „erst definieren, dann benutzen“ kommt. In Forth ist ein Programm ein Wörterbuch: " +
        "Wenige Primitive sind eingebaut, und jedes neue Wort wird aus schon vorhandenen Wörtern definiert.",
      es: "De dónde viene la regla «definir antes de usar». En Forth un programa es un diccionario: unas pocas " +
        "primitivas vienen incorporadas y cada palabra nueva se define a partir de palabras que ya existen.",
    },
    sections: [
      {
        title: { en: "Books and standard", de: "Bücher und Standard", es: "Libros y estándar" },
        items: [
          {
            title: "Starting Forth",
            by: "Leo Brodie",
            url: "https://www.forth.com/starting-forth/",
            note: {
              en: "The classic introduction. Chapter 1 explains the dictionary and how new words are defined from " +
                "existing ones.",
              de: "Die klassische Einführung. Kapitel 1 erklärt das Wörterbuch und wie neue Wörter aus vorhandenen " +
                "definiert werden.",
              es: "La introducción clásica. El capítulo 1 explica el diccionario y cómo se definen palabras nuevas a " +
                "partir de las existentes.",
            },
            links: [{ label: { en: "Chapter 1", de: "Kapitel 1", es: "Capítulo 1" }, url: "https://www.forth.com/starting-forth/1-forth-stacks-dictionary/" }],
          },
          {
            title: "Thinking Forth",
            by: "Leo Brodie",
            year: { en: "2004 edition", de: "Ausgabe 2004", es: "edición de 2004" },
            url: "https://www.forth.com/wp-content/uploads/2018/11/thinking-forth-color.pdf",
            note: {
              en: "On building an application as layers of lexicons, each built from the ones below it, and on naming.",
              de: "Über den Aufbau einer Anwendung aus Schichten von Lexika, jedes aus den darunterliegenden gebaut, " +
                "und über Namensgebung.",
              es: "Sobre cómo construir una aplicación como capas de léxicos, cada uno construido a partir de los de " +
                "abajo, y sobre cómo poner nombres.",
            },
          },
          {
            title: "Forth 2012 Standard",
            url: "https://forth-standard.org/standard/",
            note: {
              en: "Relevant parts: the colon definition, word lists and the search order, and the test suite.",
              de: "Wichtige Teile: die Colon-Definition, Wortlisten und die Suchreihenfolge sowie die Testsuite.",
              es: "Partes relevantes: la definición con dos puntos, las listas de palabras y el orden de búsqueda, y " +
                "el conjunto de pruebas.",
            },
            links: [
              { label: ": (colon)", url: "https://forth-standard.org/standard/core/Colon" },
              { label: { en: "Search-Order word set", de: "Wortsatz Search-Order", es: "Conjunto de palabras Search-Order" }, url: "https://forth-standard.org/standard/search" },
              { label: { en: "Test suite", de: "Testsuite", es: "Conjunto de pruebas" }, url: "https://forth-standard.org/standard/testsuite" },
            ],
          },
        ],
      },
      {
        title: { en: "Small kernels", de: "Kleine Kerne", es: "Núcleos pequeños" },
        items: [
          {
            title: "eForth Overview",
            by: "C. H. Ting, ed. J. Pintaske",
            year: "2013",
            url: "http://www.exemark.com/FORTH/eForthOverviewv5.pdf",
            note: {
              en: "About 190 high-level words built on 31 primitive words. Ting: all computable functions can be " +
                "constructed from a small number of primitive words.",
              de: "Etwa 190 höhere Wörter, gebaut auf 31 primitiven Wörtern. Ting: Alle berechenbaren Funktionen " +
                "lassen sich aus wenigen primitiven Wörtern konstruieren.",
              es: "Unas 190 palabras de alto nivel construidas sobre 31 palabras primitivas. Ting: todas las " +
                "funciones computables se pueden construir a partir de un número pequeño de palabras primitivas.",
            },
          },
          {
            title: "Moving Forth, Part 5",
            by: "Brad Rodriguez",
            url: "https://www.bradrodriguez.com/papers/moving5.htm",
            note: {
              en: "How to split a Forth kernel into machine-code primitives and high-level words, with rules for " +
                "choosing the primitives.",
              de: "Wie man einen Forth-Kern in Maschinencode-Primitive und höhere Wörter aufteilt, mit Regeln für " +
                "die Wahl der Primitive.",
              es: "Cómo dividir el núcleo de Forth en primitivas en código máquina y palabras de alto nivel, con " +
                "reglas para elegir las primitivas.",
            },
          },
          {
            title: "sectorforth",
            by: "Cesar Blum",
            url: "https://github.com/cesarblum/sectorforth",
            note: {
              en: "A Forth in a 512-byte boot sector: 8 primitives plus 2 for input and output. Everything else can " +
                "be written in Forth itself.",
              de: "Ein Forth in einem 512-Byte-Bootsektor: 8 Primitive plus 2 für Ein- und Ausgabe. Alles andere " +
                "lässt sich in Forth selbst schreiben.",
              es: "Un Forth en un sector de arranque de 512 bytes: 8 primitivas más 2 de entrada y salida. Todo lo " +
                "demás se puede escribir en el propio Forth.",
            },
          },
          {
            title: "jonesforth",
            by: "Richard W. M. Jones",
            url: "https://github.com/nornagon/jonesforth/blob/master/jonesforth.S",
            note: {
              en: "The primitives are written in assembly (jonesforth.S), everything else is defined in Forth " +
                "(jonesforth.f).",
              de: "Die Primitive sind in Assembler geschrieben (jonesforth.S), alles andere ist in Forth definiert " +
                "(jonesforth.f).",
              es: "Las primitivas están escritas en ensamblador (jonesforth.S) y todo lo demás está definido en " +
                "Forth (jonesforth.f).",
            },
            links: [{ label: "jonesforth.f", url: "https://github.com/nornagon/jonesforth/blob/master/jonesforth.f" }],
          },
        ],
      },
      {
        title: { en: "Background", de: "Hintergrund", es: "Contexto" },
        items: [
          {
            title: "1x Forth",
            by: "Chuck Moore",
            year: "1999",
            url: "https://www.ultratechnology.com/1xforth.htm",
            note: {
              en: "Transcript of a talk: “You factor, you factor, you factor and you throw away everything that " +
                "isn't being used.” A guideline here as well: readings that no definition uses are counted and reviewed.",
              de: "Abschrift eines Vortrags: „You factor, you factor, you factor and you throw away everything that " +
                "isn't being used.“ Auch hier eine Leitlinie: Lesarten, die keine Definition verwendet, werden " +
                "gezählt und überprüft.",
              es: "Transcripción de una charla: «You factor, you factor, you factor and you throw away everything " +
                "that isn't being used». También aquí es una pauta: las acepciones que ninguna definición usa se " +
                "cuentan y se revisan.",
            },
          },
          {
            title: "The Evolution of Forth",
            by: "E. Rather, D. Colburn, C. Moore",
            url: "https://www.forth.com/resources/forth-programming-language/",
            note: {
              en: "The history of Forth, told by its inventor and early users.",
              de: "Die Geschichte von Forth, erzählt von seinem Erfinder und frühen Anwendern.",
              es: "La historia de Forth, contada por su inventor y sus primeros usuarios.",
            },
          },
        ],
      },
    ],
  },
];

/** A text field in the requested language: strings are language-neutral, objects fall back to English. */
export function pick(value, lang) {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? "";
}
